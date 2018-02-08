
def render_fetching(bomojo_data, bomojo_rankings)
    puts "Fetching: #{_fill_spaces(
        bomojo_data.title,
        _longest_title_length(bomojo_rankings)
    )} - daily gross: $#{bomojo_data.daily_gross}"
end

def _longest_title_length(bomojo_rankings)
    @longest_title_length ||= bomojo_rankings.max_by { |row| row.title.length }.title.length
end

def _fill_spaces(title, longest_length)
    missing_space = longest_length - title.length
    return title + ' ' * missing_space
end



namespace :box_office do
    desc 'Fetch box office and rating data for given date'
    task :fetch_for_day, [:date] => :environment do |_, args|
        puts "Fetching box office data for #{args[:date]}"
        # date should look like 2015-10-11
        box_office_mojo_rankings = BoxOfficeMojoSession.get_movie_data_for_date(
            args[:date]
        )

        day = Date.parse(args[:date])

        box_office_mojo_rankings.each do |bomojo_data|
            render_fetching(bomojo_data, box_office_mojo_rankings)

            movie = Movie.find_by_bomojo_id(bomojo_data.bomojo_id)

            if movie && movie.box_office_days.any? { |box_office_day|
                box_office_day.day == day
            }
                # we already have data for requested day
                next
            end

            if !movie
                begin
                    # TODO - handle case where release date is different from "year"
                    # see "Leap! (2016)"
                    omdb_data = OMDBSession.get_movie_data(bomojo_data.title)
                rescue ArgumentError => e
                    puts "ArgumentError - skipping movie: #{bomojo_data.title}"
                    puts e
                    next
                rescue
                    puts "OMDBError - skipping movie: #{bomojo_data.title}"
                    next
                end

                movie = Movie.new(
                    title: bomojo_data.title,
                    bomojo_id: bomojo_data.bomojo_id,
                    year: omdb_data.year,
                    release_date: omdb_data.release_date,
                    mpaa_rating: omdb_data.mpaa_rating,
                    runtime: omdb_data.runtime,
                    imdb_id: omdb_data.imdb_id,
                )
                movie.save!
            end

            begin
                imdb_data = IMDBSession.get_movie_data(
                    movie.imdb_id
                )
            rescue OpenURI::HTTPError => e
                puts "skipping imdb for #{movie.title}"
                # return blank IMDBData object
                imdb_data = IMDBData.new
            end

            rotten_tomatoes_data = RottenTomatoesSession.get_movie_data(
                movie.title
            )

            movie.box_office_days << BoxOfficeDay.new(
                day: day,
                metacritic_score: imdb_data.metacritic_rating,
                imdb_rating: imdb_data.imdb_rating,
                imdb_vote_count: imdb_data.imdb_vote_count,
                tomato_audience_score: rotten_tomatoes_data.audience_score,
                tomato_meter: rotten_tomatoes_data.tomato_meter,
                bomojo_rank: bomojo_data.rank,
                bomojo_daily_gross: bomojo_data.daily_gross,
                bomojo_to_date_gross: bomojo_data.to_date_gross,
                bomojo_theater_count: bomojo_data.theater_count
            )

            # update best box office rank if needed
            # TODO - convert to helper method on Movie model
            if bomojo_data.rank
                if movie.box_office_data['best_rank'].nil?
                    movie.box_office_data['best_rank'] = bomojo_data.rank
                    movie.box_office_data['days_at_best_rank'] = 1

                elsif bomojo_data.rank < movie.box_office_data['best_rank']
                    movie.box_office_data['best_rank'] = bomojo_data.rank

                elsif bomojo_data.rank == movie.box_office_data['best_rank']
                    movie.box_office_data['days_at_best_rank'] += 1
                end
            end

            movie.save!
        end
    end

    desc 'Fetch for yesterday'
    task :fetch_for_yesterday => :environment do
        # do some fudging for time zone and when box office is reported
        yesterday = (DateTime.now - 8.hours - 1.day).to_date
        time_string = yesterday.strftime("%Y-%m-%d")
        Rake::Task['box_office:fetch_for_day'].invoke(time_string)
    end
end