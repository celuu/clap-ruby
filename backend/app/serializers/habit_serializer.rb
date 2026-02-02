class HabitSerializer < ActiveModel::Serializer
  attributes :id, :label, :weekly_target, :is_completed
end