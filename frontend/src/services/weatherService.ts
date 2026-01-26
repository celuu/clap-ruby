import { useEffect, useState } from "react";

// src/services/weatherService.ts
const WEATHER_API = process.env.REACT_APP_WEATHER_API;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const weatherService = {
  async getCurrentWeather() {
    const latitude = 37.7117984000001;
    const longitude = -121.88571939417722;
    try {
      const response = await fetch(
        `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API}&units=imperial`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      return {
        temperature: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      };


    } catch (error) {
      console.error('Weather API error:', error);
      throw error;
    }
  },

  async getForecast(city: string, days: number = 5) {
    try {
      const response = await fetch(
        `${BASE_URL}/forecast?q=${city}&appid=${WEATHER_API}&units=metric&cnt=${days * 8}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch forecast data');
      }

      return await response.json();
    } catch (error) {
      console.error('Forecast API error:', error);
      throw error;
    }
  },

};
