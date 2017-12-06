class AddAudienceScoreToBoxOfficeDay < ActiveRecord::Migration[5.1]
  def change
    add_column :box_office_days, :tomato_audience_score, :integer
  end
end
