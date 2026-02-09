import { useCallback, useState } from 'react';
import { API_BASE_URL, API_ENDPOINTS, fetchWithCredentials } from '../config/api';
import { HighLow } from '@/types';


export const getHighLowByDate = async (date: string) => {
  const data = await fetchWithCredentials(`${API_ENDPOINTS.dailyHighLows}/${date}`, {
    method: 'GET',
  });
  return data;
};

export const useCreateDailyHighLow = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [dailyHighLow, setDailyHighLow] = useState<HighLow | null>(null);

  const execute = useCallback(async (highLow: { high_content: string; low_content: string; date: string }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithCredentials(`${API_ENDPOINTS.dailyHighLows}`, {
        method: 'POST',
        body: JSON.stringify({ high_low: highLow }),
      });
      setDailyHighLow(data);
    } catch (err: any) {
      setError(err.message || 'Failed to create daily high low');
    } finally {
      setLoading(false);
    }
  }, []);
  return { dailyHighLow, error, loading, execute }; 
};