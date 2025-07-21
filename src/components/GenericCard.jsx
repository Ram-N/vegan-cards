import React from 'react';

/**
 * GenericCard component - a reusable card with front and back content
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.frontContent - Content to display on the front of the card
 * @param {React.ReactNode} props.backContent - Content to display on the back of the card
 * @param {boolean} props.isFlipped - Whether the card is flipped to show the back
 * @param {function} props.onClick - Function to call when the card is clicked
 * @param {string} props.className - Additional CSS classes to apply to the card
 * @param {string} props.frontClassName - Additional CSS classes for front side
 * @param {string} props.backClassName - Additional CSS classes for back side
 */
const GenericCard = ({ 
  frontContent, 
  backContent, 
  isFlipped, 
  onClick, 
  className = '',
  frontClassName = '',
  backClassName = ''
}) => {
  return (
    <div className="card-container" onClick={onClick}>
      <div className={`card ${isFlipped ? 'flipped' : ''} ${className}`}>
        {/* Front Side */}
        <div className={`card-front ${frontClassName}`}>
          {frontContent}
        </div>

        {/* Back Side */}
        <div className={`card-back ${backClassName}`}>
          {backContent}
        </div>
      </div>
    </div>
  );
};

export default GenericCard;