import { Request, Response } from 'express';
import { adaptText } from '../services/geminiService'; // Updated import
import { createAdaptationPrompt } from '../utils/promptTemplates';
import { AdaptationRequest, AdaptationResponse } from '../types';

export const adaptTextController = async (req: Request, res: Response): Promise<void> => {
try {
  const { text, targetLevel, purpose } = req.body as AdaptationRequest;

  // Validate input
  if (!text) {
    res.status(400).json({ error: 'Text is required' });
    return;
  }

  if (!targetLevel) {
    res.status(400).json({ error: 'Target reading level is required' });
    return;
  }

  // Check text length (to avoid excessive API costs)
  if (text.length > 10000) {
    res.status(400).json({ error: 'Text exceeds maximum length of 10,000 characters' });
    return;
  }

  // Create prompt
  const prompt = createAdaptationPrompt(text, targetLevel, purpose || 'general understanding');

  // Call Gemini API
  const rawResponse = await adaptText(prompt);

  // Parse the response
  const adaptedText = parseOpenAIResponse(rawResponse, text);

  res.status(200).json(adaptedText);
} catch (error) {
  console.error('Error in adaptation controller:', error);
  res.status(500).json({ error: 'Failed to process adaptation request' });
}
};

// Helper function to parse the AI response
function parseOpenAIResponse(response: string, originalText: string): AdaptationResponse {
// Default values in case parsing fails
let adaptedText = '';
let readingLevelAnalysis = '';
let keyInformationPreservation = '';

try {
  // Extract the adapted text section
  const adaptedTextMatch = response.match(/Adapted Text:(.*?)(?=Reading Level Analysis:|$)/s);
  if (adaptedTextMatch && adaptedTextMatch[1]) {
    adaptedText = adaptedTextMatch[1].trim();
  }

  // Extract the reading level analysis
  const analysisMatch = response.match(/Reading Level Analysis:(.*?)(?=Key Information Preservation:|$)/s);
  if (analysisMatch && analysisMatch[1]) {
    readingLevelAnalysis = analysisMatch[1].trim();
  }

  // Extract the key information preservation confirmation
  const preservationMatch = response.match(/Key Information Preservation:(.*?)$/s);
  if (preservationMatch && preservationMatch[1]) {
    keyInformationPreservation = preservationMatch[1].trim();
  }

  // If parsing fails for any section, use a fallback
  if (!adaptedText) {
    console.warn('Failed to parse adapted text, using full response');
    adaptedText = response;
  }
} catch (error) {
  console.error('Error parsing AI response:', error);
  // If parsing fails completely, use the whole response as adapted text
  adaptedText = response;
}

return {
  originalText,
  adaptedText,
  readingLevelAnalysis,
  keyInformationPreservation,
};
}