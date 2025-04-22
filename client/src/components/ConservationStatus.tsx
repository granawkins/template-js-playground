import React from 'react';

const ConservationStatus = () => {
  return (
    <section className="section" id="conservation">
      <h2>Conservation Status</h2>
      <div className="section-content">
        <div className="info-card">
          <h3>Historical Decline</h3>
          <p>
            In the early 1800s, an estimated 30-60 million buffalo roamed North
            America. By the late 1880s, they were hunted to near extinction,
            with fewer than 1,000 animals remaining. This dramatic decline was
            primarily due to commercial hunting and a government policy aimed at
            controlling Native American tribes.
          </p>
        </div>
        <div className="info-card">
          <h3>Current Status</h3>
          <p>
            Today, American bison are no longer endangered, with approximately
            500,000 individuals living across North America. However, only about
            15,000 are considered wild, free-ranging animals not confined to
            reserves or ranches. The species is classified as "Near Threatened"
            by the International Union for Conservation of Nature (IUCN).
          </p>
        </div>
        <div className="info-card">
          <h3>Recovery Efforts</h3>
          <p>
            Conservation efforts have helped restore buffalo populations
            through:
            <ul>
              <li>
                Protected herds in national parks like Yellowstone and Grand
                Teton
              </li>
              <li>Tribal nation restoration programs</li>
              <li>Private ranchers dedicated to conservation</li>
              <li>Collaborative management between various stakeholders</li>
            </ul>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ConservationStatus;
