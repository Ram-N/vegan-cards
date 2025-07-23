import React, { useState, useEffect, useRef, useCallback } from 'react';
import FlipCard from './FlipCard';
import AutoplayControls from './AutoplayControls';

/**
 * CardSlideshow component - manages a collection of cards with navigation and autoplay
 * Extracted from CardCollection for reuse in future card-based apps
 * 
 * @param {Object} props
 * @param {Array} props.cards - Array of card objects with frontContent and backContent
 * @param {number} props.tickInterval - Seconds between card changes in autoplay mode
 * @param {boolean} props.initialAutoPlay - Whether to start with autoplay enabled
 * @param {string} props.className - Additional CSS classes for the container
 * @param {string} props.cardClassName - Additional CSS classes for all cards
 */
const CardSlideshow = ({ 
  cards = [], 
  tickInterval = 5,
  initialAutoPlay = true,
  className = '',
  cardClassName = ''
}) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(initialAutoPlay);
  const [progress, setProgress] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [flipTimer, setFlipTimer] = useState(null);
  const [wasAutoPlayingBeforeFlip, setWasAutoPlayingBeforeFlip] = useState(false);
  
  const intervalRef = useRef(null);
  const progressRef = useRef(null);
  
  // Current card
  const currentCard = cards[currentCardIndex] || null;

  // Handle navigation to next card
  const nextCard = useCallback(() => {
    // Reset flip state when navigating
    if (isFlipped) {
      clearTimeout(flipTimer);
      setIsFlipped(false);
      setFlipTimer(null);
      // Resume auto-play if it was playing before flip
      if (wasAutoPlayingBeforeFlip) {
        setIsAutoPlaying(true);
        setWasAutoPlayingBeforeFlip(false);
      }
    }
    
    if (cards.length > 0) {
      setCurrentCardIndex(prev => (prev + 1) % cards.length);
      setProgress(0);
    }
  }, [cards.length, isFlipped, flipTimer, wasAutoPlayingBeforeFlip]);

  // Handle navigation to previous card
  const prevCard = useCallback(() => {
    // Reset flip state when navigating
    if (isFlipped) {
      clearTimeout(flipTimer);
      setIsFlipped(false);
      setFlipTimer(null);
      // Resume auto-play if it was playing before flip
      if (wasAutoPlayingBeforeFlip) {
        setIsAutoPlaying(true);
        setWasAutoPlayingBeforeFlip(false);
      }
    }
    
    if (cards.length > 0) {
      setCurrentCardIndex(prev => (prev - 1 + cards.length) % cards.length);
      setProgress(0);
    }
  }, [cards.length, isFlipped, flipTimer, wasAutoPlayingBeforeFlip]);

  // Start autoplay
  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
    
    setProgress(0);
    
    // Progress animation
    const progressInterval = (tickInterval * 1000) / 100; // Calculate interval for smooth progress
    progressRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 1;
      });
    }, progressInterval);

    // Card rotation
    intervalRef.current = setInterval(() => {
      nextCard();
    }, tickInterval * 1000);
  }, [tickInterval, nextCard]);

  // Stop autoplay
  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(0);
  };

  // Handle autoplay start/stop
  useEffect(() => {
    if (isAutoPlaying && cards.length > 0 && !isFlipped) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }

    return () => {
      stopAutoPlay();
      if (flipTimer) {
        clearTimeout(flipTimer);
      }
    };
  }, [isAutoPlaying, currentCardIndex, cards.length, startAutoPlay, isFlipped, flipTimer, wasAutoPlayingBeforeFlip]);

  // Handle card click - flip the card
  const handleCardClick = () => {
    if (isFlipped) {
      // If already flipped, flip back immediately
      clearTimeout(flipTimer);
      setIsFlipped(false);
      setFlipTimer(null);
      // Resume auto-play if it was playing before flip
      if (wasAutoPlayingBeforeFlip) {
        setIsAutoPlaying(true);
      }
      // Always reset the state after manual flip back
      setWasAutoPlayingBeforeFlip(false);
    } else {
      // Remember current auto-play state before flipping
      setWasAutoPlayingBeforeFlip(isAutoPlaying);
      
      // Pause auto-play when flipping
      if (isAutoPlaying) {
        setIsAutoPlaying(false);
      }
      
      // Flip to back side
      setIsFlipped(true);
      
      // Set timer to auto-flip back after 5 seconds
      const timer = setTimeout(() => {
        setIsFlipped(false);
        setFlipTimer(null);
        // Resume auto-play if it was playing before flip
        if (wasAutoPlayingBeforeFlip) {
          setIsAutoPlaying(true);
        }
        // Always reset the state after auto flip back
        setWasAutoPlayingBeforeFlip(false);
      }, 5000);
      
      setFlipTimer(timer);
    }
  };

  // Handle play/pause button click
  const handlePlayPauseClick = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Touch event handlers for swipe navigation
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextCard();
    } else if (isRightSwipe) {
      prevCard();
    }
  };

  // If no cards provided, show a message
  if (cards.length === 0) {
    return (
      <div className="min-h-[250px] flex items-center justify-center bg-slate-100 rounded-xl">
        <p className="text-slate-500">No cards available</p>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Card Display */}
      <div 
        onTouchStart={handleTouchStart} 
        onTouchMove={handleTouchMove} 
        onTouchEnd={handleTouchEnd}
      >
        <FlipCard
          frontContent={
            <div className="p-4 flex flex-col justify-center items-center h-full text-center">
              {currentCard?.frontContent}
            </div>
          }
          backContent={
            <div className="p-4 flex flex-col justify-center items-center h-full text-center">
              {currentCard?.backContent}
            </div>
          }
          isFlipped={isFlipped}
          onClick={handleCardClick}
          className={cardClassName}
        />
      </div>

      {/* Controls */}
      <AutoplayControls 
        isPlaying={isAutoPlaying}
        onPlayPauseToggle={handlePlayPauseClick}
        progress={progress}
        onNext={nextCard}
        onPrev={prevCard}
        className="mt-2"
      />

      {/* Card Counter */}
      <div className="text-center mt-4 text-xs text-slate-400">
        <p>Card {currentCardIndex + 1} of {cards.length}</p>
        <p className="mt-1">Tap card to flip • Swipe or use arrows to navigate</p>
      </div>
    </div>
  );
};

export default CardSlideshow;