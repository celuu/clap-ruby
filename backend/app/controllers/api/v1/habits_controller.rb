module Api
  module V1
    class HabitsController < ApplicationController
      before_action :require_authentication

      # GET /api/v1/habits
      def show
        render json: {
          id: current_user.id,
          email: current_user.email,
          name: current_user.name
        }
      end

      # PUT /api/v1/profile
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
