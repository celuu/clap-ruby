module Api
  module V1
    class TasksController < ApplicationController

      def create
        task = Task.create!(task_params)
        if task
          render json: task, serializer: TaskSerializer, status: :created
        else
          render json: {errors: task.errors.full_messages}, status: :unprocessable_entity
        end
      end

      def update
        task = Task.find_by(id: params[:id])
        if task.nil?
          render json: {error: "Task not found"}, status: :not_found
          return
        end

        if task.update(task_params)
          render json: task, serializer: TaskSerializer
        else
          render json: {errors: task.errors.full_messages}, status: :unprocessable_entity
        end
      end

      def destroy
        task = Task.find_by(id: params[:id])
        if !task
          render json: {error: "Task not found"}, status: :not_found
          return
        end
        task.destroy!
        head :no_content

      end

      private
      def task_params
        params.require(:task).permit(:name, :position, :column_id)
      end

    end
  end
end