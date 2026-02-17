module Api
  module v1
    class IntervalsController < ApplicationController
      def index
        habits = current_user.habits
        render json: habits, each_serializer: HabitSerializer
      end

    end
  end
end
