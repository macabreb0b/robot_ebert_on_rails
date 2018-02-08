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

  urls_with_years = parsed_year ? [
    rotten_tomatoes_url(snake_case_title, parsed_year)
  ] : [
    rotten_tomatoes_url(snake_case_title, Date.today.year),
    # handle case where movie came out last year (e.g., today is January 1st)
    rotten_tomatoes_url(snake_case_title, Date.today.year - 1)
  ]

  return urls_with_years + [
    rotten_tomatoes_url(snake_case_title)
  ]
end

def rotten_tomatoes_url(movie_alias, year: nil)
  url_with_alias = "https://www.rottentomatoes.com/m/#{movie_alias}"

  return year ? url_with_alias + "_#{year}" : url_with_alias
end


def parse_percent_string(number_string)
  return Integer(number_string.gsub(/[\%]/, ''))
end

def get_tomato_meter_from_markup(html_markup)
  tomato_meter_string = html_markup.css(
    '#all-critics-numbers .critic-score .meter-value'
  ).text

  if tomato_meter_string == ''
    if html_markup.css('#all-critics-numbers .noReviewText').length == 1
      puts 'skipping tomatometer - 0 critic reviews available'
    else
      # if we hit this case, could be an edge case or could be that the HTML on the page changed
      puts 'skipping tomatometer - unknown error (check HTML changed)'
    end

    nil
  else
    parse_percent_string(tomato_meter_string)
  end
end

def get_audience_score_from_markup(html_markup)
  if html_markup.css('.audience-score .wts')
    # page shows "wants to see" % instead of audience score
    puts 'skipping audience score - page shows "wants to see" % instead'

    nil
  else
    audience_score_string = html_markup.css(
      '.audience-score .meter-value'
    ).text

    parse_percent_string(audience_score_string)
  end
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

      return RottenTomatoesData.new(
        tomato_meter: get_tomato_meter_from_markup(
          movie_details_html
        ),
        audience_score: get_audience_score_from_markup(
          movie_details_html
        )
      )
    end

    return RottenTomatoesData.new
  end
end
