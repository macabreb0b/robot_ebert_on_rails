class AddDefaultValueForMovieBoxOfficeDataColumn < ActiveRecord::Migration[5.1]
  def change
    change_column_default(:movies, :box_office_data, {})

    Movie.where(
      box_office_data: nil
    ).update_all(
      box_office_data: {}
    )

    change_column_null(:movies, :box_office_data, false)
  end
end
