class DailyHighLowSerializer < ActiveModel::Serializer
  attributes :id, :date, :high_content, :low_content


end