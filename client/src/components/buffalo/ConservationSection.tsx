// Conservation section for the buffalo website
const ConservationSection = () => {
  return (
    <section className="conservation-section" id="conservation">
      <h2>Conservation Status</h2>
      <div className="conservation-container">
        <div className="conservation-image-container">
          <img
            src="/images/conservation.jpg"
            alt="Buffalo conservation efforts"
            className="conservation-image"
          />
        </div>
        <div className="conservation-content">
          <h3>Protection Efforts</h3>
          <p>
            Buffalo, particularly the American Bison, have faced significant
            threats throughout history. In the late 19th century, the American
            Bison was hunted to near-extinction, with populations falling from
            tens of millions to just a few hundred individuals.
          </p>
          <p>
            Today, conservation efforts have helped restore buffalo populations,
            although they remain a fraction of their historical numbers.
            Protected areas, breeding programs, and wildlife management
            initiatives have been crucial for their recovery.
          </p>
          <div className="conservation-status">
            <div className="status-item">
              <h4>American Bison</h4>
              <p className="status-tag near-threatened">Near Threatened</p>
              <p>Population: ~500,000 (including commercial herds)</p>
            </div>
            <div className="status-item">
              <h4>Wild Water Buffalo</h4>
              <p className="status-tag endangered">Endangered</p>
              <p>Population: Less than 4,000 in the wild</p>
            </div>
            <div className="status-item">
              <h4>Cape Buffalo</h4>
              <p className="status-tag least-concern">Least Concern</p>
              <p>Population: ~900,000</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConservationSection;
