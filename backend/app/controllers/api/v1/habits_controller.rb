module Api
  module V1
    class HabitsController < ApplicationController
      before_action :require_authentication

      def show
        render json: Habit.all, serializer: HabitSerializer
      end

      def get_habits_for_user
        habits = Habit.where(user_id: current_user.id)
        render json: habits, serializer: HabitSerializer
      end



      def update
        if current_user.update(profile_params)
          render json: {
            id: current_user.id,
            email: current_user.email,
            name: current_user.name
          }
        else
          render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def profile_params
        params.require(:profile).permit(:name, :email)
      end
    end
  end
end
