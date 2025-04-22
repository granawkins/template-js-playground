import { useState } from 'react';

const BuffaloFacts = () => {
  const facts = [
    'Bison can run up to 35 miles per hour - faster than an Olympic sprinter!',
    "A bison's fur is so thick and insulating that snow can settle on their backs without melting.",
    'Despite weighing up to 2,000 pounds, bison are surprisingly nimble and can jump up to 6 feet vertically!',
    'Bison are the largest land mammals in North America.',
    "A bison's horn can grow up to 2 feet long and is made of keratin, the same material as human fingernails.",
    'Bison can live up to 20-25 years in the wild.',
    'Baby bison (called calves) can stand within 30 minutes of being born and can run with the herd within a few hours!',
    'Bison are excellent swimmers and can cross rivers with ease.',
  ];

  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  const nextFact = () => {
    setCurrentFactIndex((prevIndex) => (prevIndex + 1) % facts.length);
  };

  const prevFact = () => {
    setCurrentFactIndex(
      (prevIndex) => (prevIndex - 1 + facts.length) % facts.length
    );
  };

  return (
    <div className="facts-container">
      <h2>Fun Buffalo Facts</h2>
      <div className="fact-card">
        <p>{facts[currentFactIndex]}</p>
        <div className="fact-number">
          Fact {currentFactIndex + 1} of {facts.length}
        </div>
      </div>
      <div className="fact-controls">
        <button className="fact-btn" onClick={prevFact}>
          ← Previous Fact
        </button>
        <button className="fact-btn" onClick={nextFact}>
          Next Fact →
        </button>
      </div>
    </div>
  );
};

export default BuffaloFacts;
