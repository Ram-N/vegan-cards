import React from 'react';

/**
 * TranslationView component - Displays a vertically stacked view of a phrase and its translation
 * 
 * @param {Object} props
 * @param {Object} props.phrase - The phrase object with translation data
 * @param {function} props.onBack - Function to call when back button is clicked
 * @param {string} props.className - Additional CSS classes
 */
const TranslationView = ({ 
  phrase, 
  onBack,
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

  // Get language abbreviation
  const getLanguageAbbreviation = (language) => {
    const abbreviations = {
      'English': 'EN',
      'French': 'FR',
      'Spanish': 'ES',
      'German': 'DE',
      'Italian': 'IT',
      'Portuguese': 'PT',
      'Japanese': 'JP',
      'Chinese': 'CN',
      'Korean': 'KR',
      'Russian': 'RU',
      'Arabic': 'AR',
      'Hindi': 'HI',
      'Thai': 'TH',
      'Vietnamese': 'VI'
    };
    
    return abbreviations[language] || language?.substring(0, 2)?.toUpperCase() || '??';
  };

  // If no phrase provided, show a message
  if (!phrase) {
    return (
      <div className="min-h-[250px] flex items-center justify-center bg-slate-100 rounded-xl">
        <p className="text-slate-500">No translation available</p>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-4 p-2 rounded-md flex items-center text-slate-600 hover:bg-slate-100 transition-colors back-button"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to phrases
      </button>

      {/* Translation Card - Top */}
      <div className="translation-card translated">
        <div className="text-center">
          {/* Language Label - Small */}
          <div className="text-xs font-medium text-blue-600 mb-3 inline-block px-2 py-1 bg-blue-50 rounded-full">
            {getLanguageAbbreviation(phrase.language2)}
          </div>
          
          {/* Translated Content - Bigger and Bolder */}
          <div className="text-2xl font-medium text-slate-800 mb-2">
            {extractContent(phrase.backContent)}
          </div>
        </div>
      </div>

      {/* Original Card - Bottom */}
      <div className="translation-card original">
        <div className="text-center">
          {/* Language Label - Small */}
          <div className="text-xs font-medium text-green-600 mb-3 inline-block px-2 py-1 bg-green-50 rounded-full">
            {getLanguageAbbreviation(phrase.language1)}
          </div>
          
          {/* Original Content - Bigger and Bolder */}
          <div className="text-2xl font-medium text-slate-800 mb-2">
            {extractContent(phrase.frontContent)}
          </div>
          
          {/* Category Tag - Only show if needed */}
          {phrase.category && (
            <div className="mt-4">
              <span className="inline-block bg-white/50 text-slate-500 text-xs px-2 py-1 rounded-full">
                {phrase.category}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TranslationView;