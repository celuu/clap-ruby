// TODO: Implement high/low service with Rails backend
// This is a placeholder - you'll need to create the Rails models and controllers first

import { API_BASE_URL, fetchWithCredentials } from '../config/api';

export const getHighLows = async () => {
  // TODO: Implement after creating Rails HighLow model and controller
  // const data = await fetchWithCredentials(`${API_BASE_URL}/api/v1/high_lows`);
  // return data;
  console.warn('getHighLows: Not yet implemented - create Rails HighLow model first');
  return [];
};

export const getHighLowByDate = async (date: string) => {
  // TODO: Implement after creating Rails HighLow model and controller
  // const data = await fetchWithCredentials(`${API_BASE_URL}/api/v1/high_lows/by_date?date=${date}`);
  // return data;
  console.warn('getHighLowByDate: Not yet implemented - create Rails HighLow model first');
  return null;
};

export const upsertHighLow = async (highLow: { 
  high_content: string; 
  low_content: string; 
  date: string 
}) => {
  // TODO: Implement after creating Rails HighLow model and controller
  // const data = await fetchWithCredentials(`${API_BASE_URL}/api/v1/high_lows/upsert`, {
  //   method: 'POST',
  //   body: JSON.stringify({ high_low: highLow }),
  // });
  // return data;
  console.warn('upsertHighLow: Not yet implemented - create Rails HighLow model first');
  return null;
};

export const createHighLow = async (highLow: { high_content: string; low_content: string, date: string }) => {
  // TODO: Implement after creating Rails HighLow model and controller
  // const data = await fetchWithCredentials(`${API_BASE_URL}/api/v1/high_lows`, {
  //   method: 'POST',
  //   body: JSON.stringify({ high_low: highLow }),
  // });
  // return data;
  console.warn('createHighLow: Not yet implemented - create Rails HighLow model first');
  return null;
};

export const updateHighLow = async (id: string, highLow: { high_content: string; low_content: string }) => {
  // TODO: Implement after creating Rails HighLow model and controller
  // const data = await fetchWithCredentials(`${API_BASE_URL}/api/v1/high_lows/${id}`, {
  //   method: 'PUT',
  //   body: JSON.stringify({ high_low: highLow }),
  // });
  // return data;
  console.warn('updateHighLow: Not yet implemented - create Rails HighLow model first');
  return null;
};

export const deleteHighLow = async (id: string) => {
  // TODO: Implement after creating Rails HighLow model and controller
  // await fetchWithCredentials(`${API_BASE_URL}/api/v1/high_lows/${id}`, {
  //   method: 'DELETE',
  // });
  console.warn('deleteHighLow: Not yet implemented - create Rails HighLow model first');
  return 204;
};
