class HabitSerializer < ActiveModel::Serializer
  attributes :id, :label, :weekly_target, :is_completed, :completion_id
end