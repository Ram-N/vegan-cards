import React, { useState, useEffect } from 'react';
import PhraseGrid from './components/PhraseGrid';
import TranslationView from './components/TranslationView';
import { loadFormattedSampleCards } from './utils/cardLoader';
import { loadFormattedVeganPhrases, getAvailableCategories, getAvailableLanguages } from './utils/translationAdapter';

const App = () => {
  const [phrases, setPhrases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayMode, setDisplayMode] = useState('vegan'); // 'vegan' or 'sample'
  const [categories, setCategories] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  
  // Navigation state
  const [currentView, setCurrentView] = useState('grid'); // 'grid' or 'translation'
  const [selectedPhraseId, setSelectedPhraseId] = useState(null);

  // Load phrases on component mount or when filters change
  useEffect(() => {
    if (displayMode === 'vegan') {
      // Load vegan translation phrases
      const veganPhrases = loadFormattedVeganPhrases(
        { showLanguageLabels: false, addFlagIcons: false }, // Turn off language labels
        { category: selectedCategory, language2: selectedLanguage }
      );
      
      // Get available categories and languages
      const allVeganPhrases = loadFormattedVeganPhrases();
      const availableCategories = getAvailableCategories(allVeganPhrases);
      const availableLanguages = getAvailableLanguages(allVeganPhrases, 2); // Language2
      
      setPhrases(veganPhrases);
      setCategories(availableCategories);
      setLanguages(availableLanguages);
    } else {
      // Load sample phrases
      const samplePhrases = loadFormattedSampleCards();
      setPhrases(samplePhrases);
    }
    
    setIsLoading(false);
  }, [displayMode, selectedCategory, selectedLanguage]);

  // Toggle between vegan and sample phrases
  const toggleDisplayMode = () => {
    setDisplayMode(prev => prev === 'vegan' ? 'sample' : 'vegan');
    // Reset to grid view when changing display mode
    setCurrentView('grid');
    setSelectedPhraseId(null);
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Handle language selection
  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  // Handle phrase selection
  const handlePhraseSelect = (phraseId) => {
    setSelectedPhraseId(phraseId);
    setCurrentView('translation');
  };

  // Handle back navigation
  const handleBackToGrid = () => {
    setCurrentView('grid');
    setSelectedPhraseId(null);
  };

  // Find the selected phrase
  const selectedPhrase = phrases.find(phrase => phrase.id === selectedPhraseId);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-2xl font-light text-slate-700 mb-2">Loading Phrases...</div>
          <div className="text-sm text-slate-500">Preparing your phrase collection</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        {/* Header - Always visible */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-light text-slate-700 mb-2">
            {displayMode === 'vegan' ? 'Vegan Translation Phrases' : 'Sample Phrases'}
          </h1>
          
          {currentView === 'grid' && (
            <p className="text-sm text-slate-500">
              Select a phrase to view its translation
            </p>
          )}
          
          {/* Mode Toggle - Only on grid view */}
          {currentView === 'grid' && (
            <button 
              onClick={toggleDisplayMode}
              className="mt-2 px-4 py-2 bg-white rounded-md shadow-sm text-sm text-slate-700 hover:bg-slate-50"
            >
              Switch to {displayMode === 'vegan' ? 'Sample' : 'Vegan'} Phrases
            </button>
          )}
        </div>

        {/* Filters for Vegan Mode - Only on grid view */}
        {currentView === 'grid' && displayMode === 'vegan' && (
          <div className="mb-6 flex flex-wrap gap-2 max-w-md mx-auto">
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

        {/* Main Content Area */}
        <div className="w-full">
          {/* Grid View */}
          {currentView === 'grid' && (
            <PhraseGrid 
              phrases={phrases}
              onPhraseSelect={handlePhraseSelect}
            />
          )}
          
          {/* Translation View */}
          {currentView === 'translation' && (
            <TranslationView 
              phrase={selectedPhrase}
              onBack={handleBackToGrid}
            />
          )}
        </div>
        
        {/* Phrase Count - Only on grid view */}
        {currentView === 'grid' && (
          <div className="text-center mt-6 text-sm text-slate-500">
            {phrases.length} {displayMode === 'vegan' ? 'vegan' : 'sample'} phrases available
          </div>
        )}
      </div>
    </div>
  );
};

export default App;