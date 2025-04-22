import { useState, useEffect } from 'react';
import BuffaloBackground from './BuffaloBackground';
import HeroSection from './HeroSection';
import KeyFactsSection from './KeyFactsSection';
import SpeciesSection from './SpeciesSection';
import ConservationSection from './ConservationSection';
import InterestingFactsSection from './InterestingFactsSection';
import Footer from './Footer';

const BuffaloPage = () => {
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
        setServerMessage(data.message);
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
    <div className="buffalo-page">
      <BuffaloBackground />

      <main className="main-content">
        <HeroSection />
        <KeyFactsSection />
        <SpeciesSection />
        <ConservationSection />
        <InterestingFactsSection />
      </main>

      <Footer />

      {/* Server message display (small footer note) */}
      <div className="server-message">
        <p>
          {loading
            ? 'Connecting to server...'
            : error
              ? `Connection error: ${error}`
              : serverMessage
                ? `Server status: ${serverMessage}`
                : 'Server status: Offline'}
        </p>
      </div>
    </div>
  );
};

export default BuffaloPage;
