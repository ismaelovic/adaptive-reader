import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// Check if API key is available
if (!process.env.GEMINI_API_KEY) {
console.error('GEMINI_API_KEY is not defined in environment variables');
process.exit(1);
}

// Initialize the Google Generative AI SDK
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const adaptText = async (prompt: string): Promise<string> => {
try {
  // For text-only input, use the "gemini-2.0-flash" model
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
  // Generate content
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  return text;
} catch (error) {
  console.error('Error calling Gemini API:', error);
  throw new Error('Failed to adapt text');
}
};