module Api
  module V1
    class HabitsController < ApplicationController
      before_action :require_authentication

      def index
        habits = current_user.habits
        render json: habits, each_serializer: HabitSerializer
      end

      def create
        habit = current_user.habits.build(habit_params)
        if habit.save
          render json: habit, serializer: HabitSerializer, status: :created
        else
          render json: { errors: habit.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        habit = current_user.habits.find_by(id: params[:id])
        
        if habit.nil?
          render json: { error: 'Habit not found' }, status: :not_found
          return
        end

        if habit.update(habit_params)
          render json: habit, serializer: HabitSerializer
        else
          render json: { errors: habit.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        habit = current_user.habits.find_by(id: params[:id])
        
        if habit.nil?
          render json: { error: 'Habit not found' }, status: :not_found
          return
        end

        habit.destroy!
        head :no_content
      end

      private

      def habit_params
        params.require(:habit).permit(:label, :weekly_target)
      end
    end
  end
end
