/**
 * Adapter for converting vegan translation data to generic card format
 */
import veganPhrases from '../data/cards/vegan-phrases.json';

/**
 * Loads the vegan translation phrases
 * @returns {Array} Array of translation phrase objects
 */
export const loadVeganPhrases = () => {
  return veganPhrases || [];
};

/**
 * Formats vegan phrases for display in the CardCollection component
 * @param {Array} phrases - Raw translation phrase data from JSON
 * @param {Object} options - Formatting options
 * @param {boolean} options.showLanguageLabels - Whether to show language labels
 * @param {boolean} options.addFlagIcons - Whether to add flag icons for languages
 * @returns {Array} Formatted cards ready for CardCollection
 */
export const formatVeganPhrasesForDisplay = (phrases, options = {}) => {
  const { showLanguageLabels = true, addFlagIcons = false } = options;
  
  return phrases.map(phrase => {
    // Get language flag emojis if needed
    const lang1Flag = addFlagIcons ? getLanguageFlag(phrase.language1) : '';
    const lang2Flag = addFlagIcons ? getLanguageFlag(phrase.language2) : '';
    
    // Format the content with language labels if needed
    const frontTitle = showLanguageLabels 
      ? `${lang1Flag} ${phrase.frontContent.title}`
      : '';
      
    const backTitle = showLanguageLabels 
      ? `${lang2Flag} ${phrase.backContent.title}`
      : '';
    
    return {
      id: phrase.id,
      type: phrase.type,
      category: phrase.category,
      frontContent: (
        <div>
          {frontTitle && (
            <h2 className="text-lg font-light text-slate-700 mb-1">
              {frontTitle}
            </h2>
          )}
          <div className="text-base text-slate-800 mb-2">
            {phrase.frontContent.content}
          </div>
          {phrase.frontContent.imageUrl && (
            <img 
              src={phrase.frontContent.imageUrl} 
              alt={phrase.frontContent.title} 
              className="max-w-full h-auto rounded-lg"
            />
          )}
        </div>
      ),
      backContent: (
        <div>
          {backTitle && (
            <h2 className="text-lg font-light text-slate-700 mb-1">
              {backTitle}
            </h2>
          )}
          <div className="text-base text-slate-800 mb-2">
            {phrase.backContent.content}
          </div>
          {phrase.backContent.imageUrl && (
            <img 
              src={phrase.backContent.imageUrl} 
              alt={phrase.backContent.title} 
              className="max-w-full h-auto rounded-lg"
            />
          )}
        </div>
      ),
      metadata: phrase.metadata,
      language1: phrase.language1,
      language2: phrase.language2
    };
  });
};

/**
 * Filters vegan phrases by category or language
 * @param {Array} phrases - Array of phrase objects
 * @param {Object} filters - Filter criteria
 * @param {string} filters.category - Category to filter by
 * @param {string} filters.language1 - Primary language to filter by
 * @param {string} filters.language2 - Secondary language to filter by
 * @returns {Array} Filtered phrases
 */
export const filterVeganPhrases = (phrases, filters = {}) => {
  const { category, language1, language2 } = filters;
  
  return phrases.filter(phrase => {
    // Apply category filter if specified
    if (category && phrase.category !== category) {
      return false;
    }
    
    // Apply language filters if specified
    if (language1 && phrase.language1 !== language1) {
      return false;
    }
    
    if (language2 && phrase.language2 !== language2) {
      return false;
    }
    
    return true;
  });
};

/**
 * Gets available languages from the phrases data
 * @param {Array} phrases - Array of phrase objects
 * @param {number} position - 1 for language1, 2 for language2
 * @returns {Array} Unique language names
 */
export const getAvailableLanguages = (phrases, position = 1) => {
  const languageKey = position === 1 ? 'language1' : 'language2';
  
  // Extract unique languages
  const languages = new Set(phrases.map(phrase => phrase[languageKey]));
  return [...languages].sort();
};

/**
 * Gets available categories from the phrases data
 * @param {Array} phrases - Array of phrase objects
 * @returns {Array} Unique category names
 */
export const getAvailableCategories = (phrases) => {
  // Extract unique categories
  const categories = new Set(phrases.map(phrase => phrase.category));
  return [...categories].sort();
};

/**
 * Gets a flag emoji for a language
 * @param {string} language - Language name
 * @returns {string} Flag emoji or empty string
 */
const getLanguageFlag = (language) => {
  const languageFlags = {
    'English': '🇬🇧',
    'Spanish': '🇪🇸',
    'French': '🇫🇷',
    'German': '🇩🇪',
    'Italian': '🇮🇹',
    'Portuguese': '🇵🇹',
    'Japanese': '🇯🇵',
    'Chinese': '🇨🇳',
    'Korean': '🇰🇷',
    'Russian': '🇷🇺',
    'Arabic': '🇸🇦',
    'Hindi': '🇮🇳',
    'Thai': '🇹🇭',
    'Vietnamese': '🇻🇳'
  };
  
  return languageFlags[language] || '';
};

/**
 * Loads and formats vegan phrases for display
 * @param {Object} options - Formatting options
 * @param {Object} filters - Filter criteria
 * @returns {Array} Formatted phrases ready for CardCollection
 */
export const loadFormattedVeganPhrases = (options = {}, filters = {}) => {
  const phrases = loadVeganPhrases();
  const filteredPhrases = filterVeganPhrases(phrases, filters);
  return formatVeganPhrasesForDisplay(filteredPhrases, options);
};