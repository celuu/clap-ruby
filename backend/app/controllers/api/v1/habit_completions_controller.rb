module Api
  module V1
    class HabitCompletionsController < ApplicationController
      before_action :require_authentication

      def index
        habit_completions = current_user.habit_completions.includes(:habit)
        render json: habit_completions, each_serializer: HabitCompletionSerializer
      end

      def create
        habit_completion = current_user.habit_completions.build(habit_completion_params)
        habit_completion.completed_at = Time.current        
        if habit_completion.save
          render json: habit_completion, serializer: HabitCompletionSerializer, status: :created
        else
          render json: { errors: habit_completion.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        habit_completion = current_user.habit_completions.find_by(id: params[:id])
        
        if habit_completion.nil?
          render json: { error: 'Habit completion not found' }, status: :not_found
          return
        end

        habit_completion.destroy!
        head :no_content
      end

      private

      def habit_completion_params
        params.require(:habit_completion).permit(:habit_id)
      end
    end
  end
end
