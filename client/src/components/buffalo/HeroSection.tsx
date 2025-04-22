// Hero section component for the buffalo website
const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>The Majestic Buffalo</h1>
        <p>Powerful icons of wilderness and resilience</p>
      </div>
      <div className="hero-image-container">
        <img
          src="/images/buffalo-hero.jpg"
          alt="Majestic buffalo in natural habitat"
          className="hero-image"
        />
      </div>
    </section>
  );
};

export default HeroSection;
