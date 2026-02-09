module Api
  module V1
    class DailyHighLowsController < ApplicationController
      before_action :require_authentication

      def show
        daily_high_low = current_user.daily_high_lows.find_by(date: params[:date])
        render json: daily_high_low, serializer: DailyHighLowSerializer
      end

      def createOrUpdate  
        daily_high_low = current_user.daily_high_lows.find_or_initialize_by(date: params[:date])
        daily_high_low.update!(daily_high_low_params)
        render json: daily_high_low, serializer: DailyHighLowSerializer
      end

      private

      def daily_high_low_params
        params.require(:daily_high_low).permit(:date, :high_content, :low_content)
      end
    end
  end
end
