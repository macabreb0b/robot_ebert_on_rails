require 'open-uri'
require 'uri'
require 'cgi'

BoxOfficeMojoRowData = KwStruct.new(
    :rank,
    :bomojo_id,
    :title,
    :daily_gross,
    :to_date_gross,
    :theater_count
)

def daily_box_office_url(date)
    # date is like 2017-11-23
    return "http://www.boxofficemojo.com/daily/chart/?view=1day&sortdate=#{date}&p=.htm"
end

def parse_bomojo_id_from_url(movie_detail_url)
    uri = URI.parse(movie_detail_url)
    query_params = CGI::parse(uri.query)

    return query_params['id'][0]
end

def parse_number_from_number_string(number_string)
    return Integer(number_string.gsub(/[,$]/, ''))
end

def parse_rank_value(rank_string)
    begin
        return Integer(rank_string)
    rescue ArgumentError => e
        # rank is '-' 
        # this indicates that this film is out of range of top ~10
        # (box office mojo only goes to ~12)
        return nil
    end
end

class BoxOfficeMojoSession
    def self.get_movie_data_for_date(date)
        movies_for_day = []

        html_body = open(daily_box_office_url(date))
        parsed_html_body = Nokogiri::HTML(html_body)

        parsed_html_body.css('center table table tr').each_with_index do |row, index|
            next if index == 0

            columns = row.css('td')

            title_column = columns[2]
            movie_detail_url = title_column.css('a').attr('href') # get link, parse id from link
            bomojo_id = parse_bomojo_id_from_url(movie_detail_url)

            movies_for_day << BoxOfficeMojoRowData.new(
                rank: parse_rank_value(columns[0].text),
                bomojo_id: bomojo_id,
                title: title_column.text,
                daily_gross: parse_number_from_number_string(
                    columns[4].text
                ),
                to_date_gross: parse_number_from_number_string(
                    columns[9].text
                ),
                theater_count: parse_number_from_number_string(
                    columns[7].text
                )
            )
        end
        
        return movies_for_day
    end
end