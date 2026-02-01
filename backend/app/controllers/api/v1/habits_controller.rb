module Api
  module V1
    class HabitsController < ApplicationController
      before_action :require_authentication

      def get_habits_for_user
        habits = Habit.where(user_id: current_user.id)
        render json: habits, serializer: HabitSerializer
      end

      def update
        habit = Habit.where(id: params[:id], user_id: current_user.id)
        if habit.update(habit_params)
          render json: habit, serializer: HabitSerializer
        else
          render json: { errors: habit.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def delete
        habit = Habit.where(id: params[:id], user_id: current_user.id)
        habit.destroy!
        return 204
      end

      private

      def habit_params
        params.require(:habit).permit(:name)
      end
    end
  end
end
