import { useEffect, useState } from 'react';

interface BuffaloFact {
  id: number;
  text: string;
}

const BUFFALO_FACTS: BuffaloFact[] = [
  {
    id: 1,
    text: 'The American bison (Bison bison), also commonly known as the American buffalo, is the largest surviving land mammal in North America.',
  },
  {
    id: 2,
    text: 'Bison can run at speeds up to 35 mph (56 km/h) and are good swimmers.',
  },
  {
    id: 3,
    text: "A bison's thick fur and large head allow them to survive harsh winter conditions by plowing through deep snow.",
  },
  {
    id: 4,
    text: 'Adult males (bulls) can weigh up to 2,000 pounds (900 kg) and stand 6 feet (1.8 m) tall.',
  },
  {
    id: 5,
    text: 'Bison were critically important to Native American cultures, providing food, clothing, shelter, and tools.',
  },
  {
    id: 6,
    text: 'The American bison population declined from an estimated 30-60 million in the 1500s to just a few hundred by the late 1800s due to mass hunting.',
  },
  {
    id: 7,
    text: 'Today, thanks to conservation efforts, the bison population has recovered to around 500,000.',
  },
  {
    id: 8,
    text: 'Bison are now the national mammal of the United States, designated in 2016.',
  },
];

const BuffaloPage: React.FC = () => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Rotate through facts every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFactIndex(
        (prevIndex) => (prevIndex + 1) % BUFFALO_FACTS.length
      );
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  // Fetch message from API
  useEffect(() => {
    const fetchBackendMessage = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api');

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();
        setMessage(data.message);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBackendMessage();
  }, []);

  return (
    <div className="buffalo-container">
      <header>
        <h1 className="buffalo-title">The Majestic American Buffalo</h1>
        <p className="buffalo-subtitle">
          A Symbol of North American Wilderness
        </p>
      </header>

      <div className="buffalo-main">
        <section className="buffalo-image-section">
          <img
            src="/images/buffalo.jpg"
            alt="American Buffalo (Bison)"
            className="buffalo-image"
          />
          <p className="image-caption">
            American Bison (Bison bison) in its natural habitat
          </p>
        </section>

        <section className="buffalo-info">
          <div className="buffalo-fact-card">
            <h3>Did You Know?</h3>
            <p className="buffalo-fact">
              {BUFFALO_FACTS[currentFactIndex].text}
            </p>
            <div className="fact-indicator">
              {BUFFALO_FACTS.map((_, index) => (
                <span
                  key={index}
                  className={`indicator ${index === currentFactIndex ? 'active' : ''}`}
                ></span>
              ))}
            </div>
          </div>

          <div className="buffalo-description">
            <h2>Historical Significance</h2>
            <p>
              The American buffalo, or bison, holds a significant place in North
              American history and culture. For thousands of years, Native
              American tribes of the Great Plains relied on buffalo for
              survival, using every part of the animal for food, clothing,
              shelter, tools, and spiritual practices.
            </p>
            <p>
              By the late 19th century, commercial hunting and government
              policies had driven the species to near extinction, with fewer
              than 1,000 individuals remaining. This dramatic decline not only
              devastated the ecosystem but also profoundly impacted the cultures
              and livelihoods of Native American tribes.
            </p>

            <h2>Conservation Success</h2>
            <p>
              The story of the American buffalo represents one of the earliest
              conservation success stories in the United States. Thanks to the
              efforts of conservationists, government policies, and private
              ranchers, the buffalo population has rebounded significantly.
            </p>
            <p>
              In 2016, the American bison was designated as the national mammal
              of the United States, symbolizing resilience, strength, and the
              country's commitment to wildlife conservation.
            </p>
          </div>
        </section>
      </div>

      <footer className="buffalo-footer">
        <p>
          <b>Server Status:</b>{' '}
          {loading
            ? 'Connecting to server...'
            : error
              ? `Error: ${error}`
              : message
                ? message
                : 'No connection to server'}
        </p>
      </footer>
    </div>
  );
};

export default BuffaloPage;
