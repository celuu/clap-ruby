module Api
  module V1
    class SessionsController < ApplicationController
      # POST /api/v1/login
      def create
        user = User.find_by(email: params[:email])
        
        if user&.authenticate(params[:password])
          session[:user_id] = user.id
          render json: { 
            user: {
              id: user.id,
              email: user.email,
              name: user.name
            }
          }, status: :ok
        else
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      end

      # DELETE /api/v1/logout
      def destroy
        session[:user_id] = nil
        head :no_content
      end

      # GET /api/v1/current_user
      def show
        if current_user
          render json: {
            user: {
              id: current_user.id,
              email: current_user.email,
              name: current_user.name
            }
          }
        else
          render json: { error: 'Not authenticated' }, status: :unauthorized
        end
      end
    end
  end
end
