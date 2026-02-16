class ColumnSerializer < ActiveModel::Serializer
  attributes :id, :name, :position, :tasks, :user_id
end