import React from 'react';

/**
 * PhraseGrid component - Displays a grid of phrase cards that users can select
 * 
 * @param {Object} props
 * @param {Array} props.phrases - Array of phrase objects
 * @param {function} props.onPhraseSelect - Function called when a phrase is selected
 * @param {string} props.className - Additional CSS classes
 */
const PhraseGrid = ({ 
  phrases = [], 
  onPhraseSelect,
  className = '' 
}) => {
  // Helper function to extract content from React elements or plain objects
  const extractContent = (content) => {
    if (React.isValidElement(content)) {
      // This is already a React element, just render it
      return content;
    }
    
    if (typeof content === 'object' && content !== null) {
      // Look for the content property in the object
      return content.content || 'No content available';
    }
    
    return content || 'No content available';
  };

  // If no phrases provided, show a message
  if (phrases.length === 0) {
    return (
      <div className="min-h-[250px] flex items-center justify-center bg-slate-100 rounded-xl">
        <p className="text-slate-500">No phrases available</p>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {phrases.map((phrase) => (
          <div 
            key={phrase.id}
            onClick={() => onPhraseSelect(phrase.id)}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer p-4 flex flex-col justify-center phrase-grid-item"
          >
            <div className="text-center">
              {/* Display the phrase content with emphasis */}
              <div className="text-slate-800 text-xl font-medium">
                {extractContent(phrase.frontContent)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhraseGrid;