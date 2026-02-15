class ColumnSerializer < ActiveModel::Serializer
  attributes :id, :name, :position, :tasks
end