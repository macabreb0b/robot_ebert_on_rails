require 'open-uri'
require 'uri'
require 'cgi'

IMDBData = KwStruct.new(
    :imdb_rating,
    :imdb_vote_count,
    :metacritic_rating
)

def imdb_movie_details_url(imdb_id)
    return "http://www.imdb.com/title/#{imdb_id}"
end

def imdb_metacritic_url(imdb_id)
    return "http://www.imdb.com/title/#{imdb_id}/criticreviews"
end

def parse_imdb_rating(rating_string)
    begin
        return Integer(Float(rating_string) * 10)
    rescue ArgumentError => e
        return nil
    end
end

class IMDBSession
    def self.get_movie_data(imdb_id)
        movies_for_day = []

        response = open(imdb_movie_details_url(imdb_id))
        movie_details_html = Nokogiri::HTML(response)

        imdb_rating = movie_details_html.css(
            '[itemprop="aggregateRating"] [itemprop="ratingValue"]'
        ).text
        imdb_vote_count = movie_details_html.css(
            '[itemprop="aggregateRating"] [itemprop="ratingCount"]'
        ).text

        critic_reviews_html_body = open(imdb_metacritic_url(imdb_id))
        parsed_critic_reviews_html_body = Nokogiri::HTML(critic_reviews_html_body)

        metacritic_rating = parsed_critic_reviews_html_body.css(
            '[itemprop="aggregateRating"] [itemprop="ratingValue"]'
        ).text

        return IMDBData.new(
            imdb_rating: parse_imdb_rating(imdb_rating),
            imdb_vote_count: imdb_vote_count,
            metacritic_rating: metacritic_rating
        )
    end
end