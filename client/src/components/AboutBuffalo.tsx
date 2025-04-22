import React from 'react';

const AboutBuffalo = () => {
  return (
    <section className="section" id="about">
      <h2>About Buffalo</h2>
      <div className="section-content">
        <div className="info-card">
          <h3>Physical Characteristics</h3>
          <p>
            The American bison (Bison bison), commonly known as buffalo, is the
            largest land mammal in North America. Adult males can weigh up to
            2,000 pounds and stand 6 feet tall at the shoulder. Their
            distinctive features include a massive head, a shoulder hump of
            muscle, and thick, shaggy fur.
          </p>
        </div>
        <div className="info-card">
          <h3>Habitat</h3>
          <p>
            Buffalo historically roamed the Great Plains of North America in
            enormous herds. Today, they can be found in national parks,
            preserves, and private ranches across the United States and Canada.
            They adapt well to different environments, from open grasslands to
            forested areas.
          </p>
        </div>
        <div className="info-card">
          <h3>Diet</h3>
          <p>
            American bison are primarily grazers, consuming grasses and sedges.
            They can consume up to 24 pounds of vegetation daily. Their grazing
            patterns help maintain healthy grassland ecosystems by preventing
            any single plant species from dominating.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutBuffalo;
