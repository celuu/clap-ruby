module Api
  module V1
    class DailyHighLowsController < ApplicationController
      before_action :require_authentication

      def show
        date = params[:id] 
        daily_high_low = current_user.daily_high_lows.find_by(date: date)
        if daily_high_low
          render json: daily_high_low, serializer: DailyHighLowSerializer
        else
          render json: { high_content: nil, low_content: nil, date: date }
        end
      end

      def create
        daily_high_low = current_user.daily_high_lows.find_or_initialize_by(date: params[:daily_high_lows][:date])
        daily_high_low.update!(daily_high_low_params)
        render json: daily_high_low, serializer: DailyHighLowSerializer
      end

      private

      def daily_high_low_params
        params.require(:daily_high_lows).permit(:date, :high_content, :low_content)
      end
    end
  end
end
