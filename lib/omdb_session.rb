require 'open-uri'

OMDBMetaData = KwStruct.new(
    :mpaa_rating,
    :release_date,
    :imdb_id,
    :runtime,
    :metacritic_rating,
    :imdb_vote_count,
    :imdb_rating,
    :tomato_consensus,
    :tomato_meter,
    :tomato_review_count,
    :year
)

def _title_contains_year(title)
    title.split(/[()]/).length > 1    
end

def omdb_url(
    title_string, 
    year=Date.today.year
)
    if _title_contains_year(title_string)
        # TODO - handle 're-release'
        title_string, year = title_string.split(/[()]/)
    end

    query = URI.encode_www_form(
        t: title_string.strip,
        y: year.to_i,
        r: 'json',
        plot: 'short',
        tomatoes: true,
        apikey: ENV['OMDB_API_KEY']
    )
    return "http://www.omdbapi.com/?#{query}"
end

def parse_whole_number_string(number_string)
    return nil if number_string == 'N/A'

    return Integer(number_string.gsub(/[,$]/, ''))
end

def parse_imdb_rating_to_int(imdb_rating)
    return nil if imdb_rating == 'N/A'

    return Integer(Float(imdb_rating) * 10)
end

class OMDBSession
    def self.get_movie_data(bomojo_title)
        response = open(omdb_url(bomojo_title))
        json_body = JSON.parse(response.read)

        if json_body['Response'] == 'False'
             # could not find entry in omdb
             # return empty omdb metadata object
            return OMDBMetaData.new
        end

        return OMDBMetaData.new(
            mpaa_rating: json_body['Rated'],
            year: Integer(json_body['Year']),
            release_date: Date.parse(json_body['Released']),
            imdb_id: json_body['imdbID'],
            runtime: json_body['Runtime'],
            metacritic_rating: parse_whole_number_string(
                json_body['Metascore']
            ),
            imdb_vote_count: parse_whole_number_string(
                json_body['imdbVotes']
            ),
            imdb_rating: parse_imdb_rating_to_int(
                json_body['imdbRating']
            ),
            tomato_consensus: json_body['tomatoConsensus'],
            tomato_meter: parse_whole_number_string(
                json_body['tomatoMeter']
            ),
            tomato_review_count: parse_whole_number_string(
                json_body['tomatoReviews']
            )
        )
    end
end