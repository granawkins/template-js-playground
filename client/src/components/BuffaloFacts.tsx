import { useState } from 'react';

interface Fact {
  id: number;
  text: string;
  emoji: string;
}

const BuffaloFacts = () => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const facts: Fact[] = [
    {
      id: 1,
      text: 'Bison (commonly called buffalo in North America) can run up to 35 mph!',
      emoji: '🏃',
    },
    {
      id: 2,
      text: 'Buffalo can jump up to 6 feet vertically!',
      emoji: '⬆️',
    },
    {
      id: 3,
      text: "A buffalo's horns can grow up to 2 feet long and are used for defense and digging in the snow for food.",
      emoji: '❄️',
    },
    {
      id: 4,
      text: 'Buffalo can live up to 20 years in the wild!',
      emoji: '🎂',
    },
    {
      id: 5,
      text: 'A male buffalo (bull) can weigh up to 2,000 pounds - as heavy as a small car!',
      emoji: '🚗',
    },
    {
      id: 6,
      text: 'Buffalo have poor eyesight but excellent hearing and sense of smell.',
      emoji: '👃',
    },
    {
      id: 7,
      text: 'Buffalo calves can stand and follow their mothers within hours of being born!',
      emoji: '👶',
    },
    {
      id: 8,
      text: 'Buffalo are excellent swimmers and can cross rivers up to a mile wide!',
      emoji: '🏊',
    },
  ];

  const handleNextFact = () => {
    setIsFlipped(true);
    setTimeout(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % facts.length);
      setIsFlipped(false);
    }, 300);
  };

  const handlePrevFact = () => {
    setIsFlipped(true);
    setTimeout(() => {
      setCurrentFactIndex((prevIndex) =>
        prevIndex === 0 ? facts.length - 1 : prevIndex - 1
      );
      setIsFlipped(false);
    }, 300);
  };

  return (
    <div className="buffalo-facts">
      <h2 className="facts-header">Did You Know? 🧠</h2>
      <div className="facts-container">
        <button
          className="facts-nav-button"
          onClick={handlePrevFact}
          aria-label="Previous fact"
        >
          ◀
        </button>

        <div className={`fact-card ${isFlipped ? 'flipped' : ''}`}>
          <div className="fact-emoji">{facts[currentFactIndex].emoji}</div>
          <p className="fact-text">{facts[currentFactIndex].text}</p>
          <div className="fact-counter">
            {currentFactIndex + 1} / {facts.length}
          </div>
        </div>

        <button
          className="facts-nav-button"
          onClick={handleNextFact}
          aria-label="Next fact"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default BuffaloFacts;
