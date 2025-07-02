import React, { useState } from 'react';
import { AdaptationRequest } from '../types';

interface AdaptationFormProps {
onSubmit: (request: AdaptationRequest) => void;
isLoading: boolean;
}

const AdaptationForm: React.FC<AdaptationFormProps> = ({ onSubmit, isLoading }) => {
const [text, setText] = useState('');
const [targetLevel, setTargetLevel] = useState('elementary school');
const [purpose, setPurpose] = useState('education');

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  onSubmit({ text, targetLevel, purpose });
};

const readingLevels = [
  'elementary school',
  'middle school',
  'high school',
  'college',
  'beginner ESL',
  'intermediate ESL',
  'advanced ESL',
  'simplified adult',
];

const purposes = [
  'education',
  'general understanding',
  'technical explanation',
  'language learning',
  'simplified summary',
];

const characterCount = text.length;
const maxCharacters = 10000;

return (
  <form onSubmit={handleSubmit} className="space-y-6">
    <div>
      <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
        Text to Adapt
      </label>
      <textarea
        id="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        rows={8}
        placeholder="Paste or type the text you want to adapt..."
        required
      />
      <div className="mt-1 text-sm text-gray-500 flex justify-between">
        <span>Enter the text you want to adapt to a different reading level.</span>
        <span className={characterCount > maxCharacters ? 'text-red-500' : ''}>
          {characterCount}/{maxCharacters}
        </span>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label htmlFor="targetLevel" className="block text-sm font-medium text-gray-700 mb-1">
          Target Reading Level
        </label>
        <select
          id="targetLevel"
          value={targetLevel}
          onChange={(e) => setTargetLevel(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        >
          {readingLevels.map((level) => (
            <option key={level} value={level}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1">
          Purpose
        </label>
        <select
          id="purpose"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          {purposes.map((p) => (
            <option key={p} value={p}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div>
      <button
        type="submit"
        disabled={isLoading || characterCount > maxCharacters || characterCount === 0}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
          isLoading || characterCount > maxCharacters || characterCount === 0
            ? 'bg-blue-300 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        }`}
      >
        {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Adapting...</span>
            </>
        ) : (
          'Adapt Text'
        )}
      </button>
    </div>
  </form>
);
};

export default AdaptationForm;