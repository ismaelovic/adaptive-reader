import React from 'react';
import { AdaptationResponse } from '../types';

interface ResultDisplayProps {
result: AdaptationResponse | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
if (!result) return null;

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  alert('Copied to clipboard!');
};

return (
  <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
    <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Adaptation Results</h2>
    
    <div className="space-y-4">
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium text-gray-700">Adapted Text</h3>
          <button 
            onClick={() => copyToClipboard(result.adaptedText)}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy
          </button>
        </div>
        <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap">{result.adaptedText}</div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">Reading Level Analysis</h3>
        <div className="bg-gray-50 p-4 rounded-md">{result.readingLevelAnalysis}</div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">Key Information Preservation</h3>
        <div className="bg-gray-50 p-4 rounded-md">{result.keyInformationPreservation}</div>
      </div>
      
      <div className="pt-4 border-t">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Original Text</h3>
        <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap">{result.originalText}</div>
      </div>
    </div>
  </div>
);
};

export default ResultDisplay;