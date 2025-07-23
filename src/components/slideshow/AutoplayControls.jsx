import React from 'react';

/**
 * AutoplayControls component - Handles play/pause and displays progress for slideshows
 * Extracted from CardCollection for reuse in future card-based apps
 * 
 * @param {Object} props
 * @param {boolean} props.isPlaying - Whether autoplay is currently active
 * @param {function} props.onPlayPauseToggle - Function to call when play/pause is toggled
 * @param {number} props.progress - Current progress (0-100) for the progress bar
 * @param {function} props.onNext - Function to call to move to next card
 * @param {function} props.onPrev - Function to call to move to previous card
 * @param {string} props.className - Additional CSS classes
 */
const AutoplayControls = ({
  isPlaying,
  onPlayPauseToggle,
  progress = 0,
  onNext,
  onPrev,
  className = ''
}) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Progress Bar */}
      <div className="h-1 bg-stone-200 rounded-full overflow-hidden w-full max-w-[200px] mx-auto mb-4">
        <div 
          className="h-full bg-gradient-to-r from-amber-400 to-orange-400 transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Navigation and Controls */}
      <div className="flex justify-between items-center">
        <button
          onClick={onPrev}
          className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 text-slate-600 hover:text-slate-800"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-center space-x-4">
          <button
            onClick={onPlayPauseToggle}
            className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 text-slate-600 hover:text-slate-800"
          >
            {isPlaying ? (
              // Pause icon - two parallel bars
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              // Play icon - triangle
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
        </div>

        <button
          onClick={onNext}
          className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 text-slate-600 hover:text-slate-800"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AutoplayControls;