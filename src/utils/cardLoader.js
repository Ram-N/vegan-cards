/**
 * Card loading utilities for the card application
 */
import sampleCards from '../data/cards/sample-cards.json';

/**
 * Loads the sample cards
 * @returns {Array} Array of card objects
 */
export const loadSampleCards = () => {
  return sampleCards || [];
};

/**
 * Formats card data for display in the CardCollection component
 * @param {Array} cards - Raw card data from JSON
 * @returns {Array} Formatted cards ready for CardCollection
 */
export const formatCardsForDisplay = (cards) => {
  return cards.map(card => {
    // Convert the JSON structure to renderable content
    return {
      id: card.id,
      type: card.type,
      category: card.category,
      frontContent: (
        <div>
          <h2 className="text-lg font-light text-slate-700 mb-1">
            {card.frontContent.title}
          </h2>
          <div className="text-base text-slate-800 mb-2">
            {card.frontContent.content}
          </div>
          {card.frontContent.imageUrl && (
            <img 
              src={card.frontContent.imageUrl} 
              alt={card.frontContent.title} 
              className="max-w-full h-auto rounded-lg"
            />
          )}
        </div>
      ),
      backContent: (
        <div>
          <h2 className="text-lg font-light text-slate-700 mb-1">
            {card.backContent.title}
          </h2>
          <div className="text-base text-slate-800 mb-2">
            {card.backContent.content}
          </div>
          {card.backContent.imageUrl && (
            <img 
              src={card.backContent.imageUrl} 
              alt={card.backContent.title} 
              className="max-w-full h-auto rounded-lg"
            />
          )}
        </div>
      ),
      metadata: card.metadata
    };
  });
};

/**
 * Loads and formats sample cards for display
 * @returns {Array} Formatted cards ready for CardCollection
 */
export const loadFormattedSampleCards = () => {
  const cards = loadSampleCards();
  return formatCardsForDisplay(cards);
};

/**
 * Filters cards by category
 * @param {Array} cards - Array of card objects
 * @param {string} category - Category to filter by
 * @returns {Array} Filtered cards
 */
export const filterCardsByCategory = (cards, category) => {
  if (!category) return cards;
  return cards.filter(card => card.category === category);
};

/**
 * Stores custom cards in localStorage
 * @param {Array} cards - Array of card objects
 */
export const saveCustomCards = (cards) => {
  try {
    localStorage.setItem('custom_cards', JSON.stringify(cards));
  } catch (error) {
    console.error('Error saving custom cards:', error);
  }
};

/**
 * Loads custom cards from localStorage
 * @returns {Array} Custom cards or empty array if none found
 */
export const loadCustomCards = () => {
  try {
    const stored = localStorage.getItem('custom_cards');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn('Error loading custom cards:', error);
  }
  return [];
};