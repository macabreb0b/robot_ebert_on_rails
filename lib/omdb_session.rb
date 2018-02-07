require 'open-uri'

OMDBMetaData = KwStruct.new(
    :mpaa_rating,
    :release_date,
    :imdb_id,
    :runtime,
    :year
)

def _title_contains_year(title)
    title.split(/[()]/).length > 1
end

def omdb_url(
    title_string,
    year
)
    query = URI.encode_www_form(
        t: title_string.strip,
        # TODO - do I need to include year here? this causes issue when the movie came out last year
        y: year.to_i,
        r: 'json',
        plot: 'short',
        apikey: ENV['OMDB_API_KEY']
    )
    return "http://www.omdbapi.com/?#{query}"
end

def omdb_urls_to_try(title_string)
    if _title_contains_year(title_string)
        # bomojo title contains the year in the name - let's go with that year, and *not* try any other years

        # TODO - handle 're-release'
        title_string, year = title_string.split(/[()]/)

        return [
            omdb_url(title_string, year)
        ]
    end

    # if title doesn't contain a year, let's try (1) this year and (2) last year
    return [
        omdb_url(title_string, Date.today.year),
        omdb_url(title_string, Date.today.year - 1)
    ]
end

class OMDBSession
    def self.get_movie_data(bomojo_title)
        omdb_urls_to_try(bomojo_title).each do |omdb_url|
            response = open(omdb_url)
            json_body = JSON.parse(response.read)

            next if json_body['Response'] == 'False'

            return OMDBMetaData.new(
                mpaa_rating: json_body['Rated'],
                year: Integer(json_body['Year']),
                release_date: Date.parse(json_body['Released']),
                imdb_id: json_body['imdbID'],
                runtime: json_body['Runtime'],
            )
        end

         # could not find entry in omdb
         # return empty omdb metadata object
        return OMDBMetaData.new
    end
end