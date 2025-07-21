import React, { useState, useEffect } from 'react';
import CardCollection from './components/CardCollection';
import { loadFormattedSampleCards } from './utils/cardLoader';
import { loadFormattedVeganPhrases, getAvailableCategories, getAvailableLanguages } from './utils/translationAdapter';

const App = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayMode, setDisplayMode] = useState('vegan'); // 'vegan' or 'sample'
  const [categories, setCategories] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  // Load cards on component mount
  useEffect(() => {
    if (displayMode === 'vegan') {
      // Load vegan translation cards
      const veganCards = loadFormattedVeganPhrases(
        { showLanguageLabels: true, addFlagIcons: true },
        { category: selectedCategory, language2: selectedLanguage }
      );
      
      // Get available categories and languages
      const allVeganCards = loadFormattedVeganPhrases();
      const availableCategories = getAvailableCategories(allVeganCards);
      const availableLanguages = getAvailableLanguages(allVeganCards, 2); // Language2
      
      setCards(veganCards);
      setCategories(availableCategories);
      setLanguages(availableLanguages);
    } else {
      // Load sample cards
      const sampleCards = loadFormattedSampleCards();
      setCards(sampleCards);
    }
    
    setIsLoading(false);
  }, [displayMode, selectedCategory, selectedLanguage]);

  // Toggle between vegan and sample cards
  const toggleDisplayMode = () => {
    setDisplayMode(prev => prev === 'vegan' ? 'sample' : 'vegan');
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Handle language selection
  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-2xl font-light text-slate-700 mb-2">Loading Cards...</div>
          <div className="text-sm text-slate-500">Preparing your card collection</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-light text-slate-700 mb-2">
            {displayMode === 'vegan' ? 'Vegan Translation Cards' : 'Sample Cards'}
          </h1>
          <p className="text-sm text-slate-500">Flip cards to see both sides</p>
          
          {/* Mode Toggle */}
          <button 
            onClick={toggleDisplayMode}
            className="mt-2 px-4 py-2 bg-white rounded-md shadow-sm text-sm text-slate-700 hover:bg-slate-50"
          >
            Switch to {displayMode === 'vegan' ? 'Sample' : 'Vegan'} Cards
          </button>
        </div>

        {/* Filters for Vegan Mode */}
        {displayMode === 'vegan' && (
          <div className="mb-4 flex flex-wrap gap-2">
            {/* Category Filter */}
            <select 
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="p-2 rounded-md border border-slate-200 text-sm flex-1"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            
            {/* Language Filter */}
            <select 
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="p-2 rounded-md border border-slate-200 text-sm flex-1"
            >
              <option value="">All Languages</option>
              {languages.map(language => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Card Collection */}
        <CardCollection 
          cards={cards} 
          tickInterval={5}
          initialAutoPlay={true}
          cardClassName={displayMode === 'vegan' ? 'card-vegan' : ''}
        />
        
        {/* Card Count */}
        <div className="text-center mt-4 text-sm text-slate-500">
          {cards.length} {displayMode === 'vegan' ? 'vegan' : 'sample'} cards available
        </div>
      </div>
    </div>
  );
};

export default App;