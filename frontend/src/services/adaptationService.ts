import axios from 'axios';
import { AdaptationRequest, AdaptationResponse } from '../types';

const API_URL = 'http://localhost:3001/api/adaptation';

export const adaptText = async (request: AdaptationRequest): Promise<AdaptationResponse> => {
try {
  const response = await axios.post<AdaptationResponse>(`${API_URL}/adapt`, request);
  return response.data;
} catch (error) {
  console.error('Error adapting text:', error);
  throw new Error('Failed to adapt text. Please try again.');
}
};