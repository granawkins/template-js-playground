import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import BuffaloFacts from './components/BuffaloFacts';
import BuffaloQuiz from './components/BuffaloQuiz';
import BuffaloGallery from './components/BuffaloGallery';
import Footer from './components/Footer';
import Background from './components/Background';

function App() {
  // State to track if the page has loaded for animations
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set loaded state after a short delay for animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`buffalo-main ${isLoaded ? 'loaded' : ''}`}>
      {/* Background stays for decorative elements */}
      <Background />

      {/* Hero Section */}
      <Hero />

      {/* Main Content Sections */}
      <main>
        {/* Buffalo Facts Section */}
        <section id="facts">
          <BuffaloFacts />
        </section>

        {/* Buffalo Quiz Section */}
        <section id="quiz">
          <BuffaloQuiz />
        </section>

        {/* Buffalo Gallery Section */}
        <section id="gallery">
          <BuffaloGallery />
        </section>

        {/* Conservation Section - Simple placeholder */}
        <section id="conservation">
          <div className="conservation-container">
            <h2>Buffalo Conservation</h2>
            <p className="conservation-text">
              Once nearly extinct with fewer than 1,000 individuals remaining,
              the American bison has made a remarkable recovery thanks to
              conservation efforts. Today, there are approximately 500,000 bison
              across North America, though most are not pure wild bison but have
              been crossbred with cattle.
            </p>
            <p className="conservation-text">
              You can help support buffalo conservation by learning more about
              these magnificent animals, visiting national parks where they roam
              freely, and supporting organizations dedicated to their
              preservation.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
