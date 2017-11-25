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
    :tomato_review_count
)

def omdb_url(title_string, year)
    query = URI.encode_www_form(
        t: title_string,
        y: year,
        r: 'json',
        tomatoes: true,
        apikey: ENV['OMDB_API_KEY']
    )
    return "http://www.omdbapi.com/?#{query}"
end

def parse_number_from_number_string(number_string)
    return Integer(number_string.gsub(/[,$]/, ''))
end


class OMDBSession
    def self.get_movie_data(title, release_year)
        response = open(omdb_url(title, release_year))
        json_body = JSON.parse(response.read)

        tomato_meter = json_body['tomatoMeter'] == 'N/A' ? 
            nil: Integer(json_body['tomatoMeter'])
        
        tomato_review_count = json_body['tomatoReviews'] == 'N/A' ? 
            nil : Integer(json_body['tomatoReviews'])

        return OMDBMetaData.new(
            mpaa_rating: json_body['Rated'],
            release_date: Date.parse(json_body['Released']),
            imdb_id: json_body['imdbID'],
            runtime: json_body['Runtime'],
            metacritic_rating: Integer(json_body['Metascore']),
            imdb_vote_count: Integer(json_body['imdbVotes']),
            imdb_rating: Integer(Float(json_body['imdbRating']) * 10),
            tomato_consensus: json_body['tomatoConsensus'],
            tomato_meter: tomato_meter,
            tomato_review_count: tomato_review_count
        )
    end
end