# Reusable Card Components

This document explains the reusable card components that have been extracted during the vegan cards app redesign. These components can be used in future card-based applications.

## Overview

As part of the UI/UX redesign, we've extracted the slideshow functionality into standalone, reusable components. While the vegan cards app now uses a grid-based selection interface, these slideshow components remain available for future card-based applications.

The components are located in:
```
src/components/slideshow/
```

## Available Components

### 1. FlipCard

**File:** `src/components/slideshow/FlipCard.jsx`

A foundational card component that handles the flip animation between front and back content.

```jsx
import { FlipCard } from './components/slideshow';

<FlipCard
  frontContent={<div>Front side content</div>}
  backContent={<div>Back side content</div>}
  isFlipped={isCardFlipped}
  onClick={handleCardClick}
  className="custom-card-class"
  frontClassName="front-specific-class"
  backClassName="back-specific-class"
/>
```

**Props:**
- `frontContent`: React node for the front of the card
- `backContent`: React node for the back of the card
- `isFlipped`: Boolean controlling the flip state
- `onClick`: Function to handle card clicks
- `className`: Additional CSS class for the card
- `frontClassName`: Additional CSS class for front side
- `backClassName`: Additional CSS class for back side

### 2. AutoplayControls

**File:** `src/components/slideshow/AutoplayControls.jsx`

Controls for play/pause and navigation in a card slideshow.

```jsx
import { AutoplayControls } from './components/slideshow';

<AutoplayControls
  isPlaying={isAutoPlaying}
  onPlayPauseToggle={toggleAutoPlay}
  progress={currentProgress}
  onNext={goToNextCard}
  onPrev={goToPrevCard}
  className="custom-controls-class"
/>
```

**Props:**
- `isPlaying`: Boolean indicating if autoplay is active
- `onPlayPauseToggle`: Function to toggle play/pause
- `progress`: Number (0-100) for the progress bar
- `onNext`: Function to go to the next card
- `onPrev`: Function to go to the previous card
- `className`: Additional CSS class

### 3. CardSlideshow

**File:** `src/components/slideshow/CardSlideshow.jsx`

A complete slideshow component that combines FlipCard and AutoplayControls.

```jsx
import { CardSlideshow } from './components/slideshow';

<CardSlideshow
  cards={cardsArray}
  tickInterval={5}
  initialAutoPlay={true}
  className="custom-slideshow-class"
  cardClassName="custom-card-class"
/>
```

**Props:**
- `cards`: Array of card objects with frontContent and backContent
- `tickInterval`: Seconds between card changes in autoplay mode
- `initialAutoPlay`: Whether to start with autoplay enabled
- `className`: Additional CSS class for the container
- `cardClassName`: Additional CSS class for all cards

## Card Data Structure

The components expect cards in this format:

```javascript
const cards = [
  {
    id: "unique_id_1",
    frontContent: <div>Front content of card 1</div>,
    backContent: <div>Back content of card 1</div>,
    // Additional metadata as needed
  },
  // More cards...
];
```

## Features

### Autoplay

The CardSlideshow component includes:
- Automatic card rotation at specified intervals
- Progress bar visualization
- Play/pause controls
- Manual navigation (prev/next)

### Touch Support

Built-in support for:
- Touch swipe navigation (left/right)
- Tap to flip cards

### Auto-flip Timer

When a card is flipped:
- Autoplay pauses
- Card auto-flips back after 5 seconds
- Autoplay state is remembered and restored

## CSS Requirements

These components rely on specific CSS classes defined in `src/index.css`:

```css
.card-container { /* ... */ }
.card { /* ... */ }
.card.flipped { /* ... */ }
.card-front, .card-back { /* ... */ }
```

Ensure these styles are available in any project using these components.

## Example Usage

### Basic Slideshow

```jsx
import React, { useState, useEffect } from 'react';
import { CardSlideshow } from './components/slideshow';

const MyCardApp = () => {
  const [cards, setCards] = useState([]);
  
  useEffect(() => {
    // Load your cards data
    const loadedCards = [
      {
        id: "card1",
        frontContent: <div>Card 1 Front</div>,
        backContent: <div>Card 1 Back</div>
      },
      // More cards...
    ];
    
    setCards(loadedCards);
  }, []);
  
  return (
    <div className="app-container">
      <h1>My Card Slideshow</h1>
      <CardSlideshow 
        cards={cards}
        tickInterval={7}
        initialAutoPlay={true}
        cardClassName="my-custom-card"
      />
    </div>
  );
};
```

### Custom Implementation

You can also use the individual components to create a custom slideshow:

```jsx
import React, { useState } from 'react';
import { FlipCard, AutoplayControls } from './components/slideshow';

const CustomSlideshow = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Custom implementation logic
  // ...
  
  return (
    <div className="custom-slideshow">
      <FlipCard 
        frontContent={cards[currentIndex].frontContent}
        backContent={cards[currentIndex].backContent}
        isFlipped={isFlipped}
        onClick={() => setIsFlipped(!isFlipped)}
      />
      
      <AutoplayControls 
        isPlaying={isPlaying}
        onPlayPauseToggle={() => setIsPlaying(!isPlaying)}
        progress={progress}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
};
```

## Future Development Considerations

When implementing these components in future card-based applications:

1. **Theming**: The current components use predefined gradient backgrounds. Consider creating a theme provider for consistent styling across applications.

2. **Animation Customization**: The flip animation timing is currently hardcoded. Future versions could accept animation parameters.

3. **Accessibility**: Additional keyboard navigation and screen reader support could be added.

4. **State Management**: For larger applications, consider moving state management to React Context or another state management library.

5. **Mobile Optimization**: While the components are responsive, additional mobile-specific features could be implemented.

## Conclusion

These extracted components provide a solid foundation for building card-based applications with slideshow functionality. They can be used as-is or extended to meet specific requirements of future projects.