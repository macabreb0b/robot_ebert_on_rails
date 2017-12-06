require 'open-uri'



RottenTomatoesData = KwStruct.new(
    :tomato_meter,
    :audience_score
)

def parse_title_and_year(bomojo_title)
    match_regex_title_year = /(?<title>.+)\s\((?<year>[12][0-9]{3})\)/.match(bomojo_title)
    if match_regex_title_year
        return [
            match_regex_title_year.named_captures['title'], 
            Integer(match_regex_title_year.named_captures['year'])
        ]
    else
        return bomojo_title, nil # no year indicated in title
    end
end

def to_snake_case(string)
    stripped_string = string.gsub(/[^a-zA-Z0-9\s]/, '')
    return stripped_string.gsub(' ', '_').downcase
end

def rotten_tomatoes_urls_to_try(
    title_string
)
    parsed_title, parsed_year = parse_title_and_year(title_string)

    snake_case_title = to_snake_case(parsed_title)
    snake_case_title_plus_year = snake_case_title + "_#{parsed_year || Date.today.year}"

    return [
        rotten_tomatoes_url(snake_case_title_plus_year),
        rotten_tomatoes_url(snake_case_title)
    ]
end

def rotten_tomatoes_url(movie_alias)
    return "https://www.rottentomatoes.com/m/#{movie_alias}"
end


def parse_percent_string(number_string)
    return Integer(number_string.gsub(/[\%]/, ''))
end

class RottenTomatoesSession
    def self.get_movie_data(bomojo_title)
        rotten_tomatoes_urls_to_try(bomojo_title).each do |url|
            begin
                response = open(url)
            rescue OpenURI::HTTPError => e
                next
            end

            movie_details_html = Nokogiri::HTML(response)

            tomato_meter_string = movie_details_html.css(
                '#all-critics-numbers .critic-score .meter-value'
            ).text
            audience_score_string = movie_details_html.css(
                '.audience-score .meter-value'
            ).text

            return RottenTomatoesData.new(
                tomato_meter: parse_percent_string(tomato_meter_string),
                audience_score: parse_percent_string(audience_score_string)
            )
        end

        return RottenTomatoesData.new
    end
end
