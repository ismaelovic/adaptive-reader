import React, { useState } from 'react';
import Header from "./components/Header";
import AdaptationForm from './components/AdaptationForm';
import ResultDisplay from './components/ResultDisplay';
import { adaptText } from './services/adaptationService';
import { AdaptationRequest, AdaptationResponse } from './types';
import './App.css';

function App() {
const [result, setResult] = useState<AdaptationResponse | null>(null);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

const handleSubmit = async (request: AdaptationRequest) => {
  setIsLoading(true);
  setError(null);
  
  try {
    const response = await adaptText(request);
    setResult(response);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'An unknown error occurred');
    setResult(null);
  } finally {
    setIsLoading(false);
  }
};

return (
  <div className="min-h-screen bg-gray-100">
    <Header />
    
    <main className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Adapt Text to Any Reading Level</h2>
          <AdaptationForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {result && <ResultDisplay result={result} />}
      </div>
    </main>
    
    <footer className="bg-white py-6 mt-12">
      <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
        <p>Adaptive Reader - Transform text to any reading level</p>
      </div>
    </footer>
  </div>
);
}

export default App;