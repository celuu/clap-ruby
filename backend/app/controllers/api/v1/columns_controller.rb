module Api
  module V1
    class ColumnsController < ApplicationController

      def show
        current_user_columns = current_user.columns
        render json: current_user_columns, serializer: ColumnSerializer
      end

      def create
        new_column = Column.create!(column_params)
        render json: new_column, serializer: ColumnSerializer, status: :created
      end

      def update
        column = current_user.columns.find_by(id: params[:id])

        if column.nil?
          render json: {error: "Column not found"}, status: :not_found
          return
        end

        if column.update(column_params)
          render json: column, serializer: ColumnSerializer
        else
          render json: {errors: column.errors.full_messages}, status: :unprocessable_entity
        end
      end

      def destroy
        column = current_user.columns.find_by(id: parmas[:id])
        column.destroy!
        head :no_content
      end


      private
      def column_params
        params.require(:column).permit(:name, :position)
      end
    end
  end
end