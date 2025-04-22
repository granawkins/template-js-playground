const Footer = () => {
  return (
    <footer className="buffalo-footer">
      <div className="footer-content">
        <div className="footer-logo">
          <div className="buffalo-icon"></div>
          <h3>Buffalo Wonder</h3>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4>Learn More</h4>
            <ul>
              <li>
                <a href="#facts">Buffalo Facts</a>
              </li>
              <li>
                <a href="#quiz">Buffalo Quiz</a>
              </li>
              <li>
                <a href="#gallery">Buffalo Gallery</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Conservation</h4>
            <ul>
              <li>
                <a href="#conservation">Help the Bison</a>
              </li>
              <li>
                <a href="#parks">National Parks</a>
              </li>
              <li>
                <a href="#history">History</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="buffalo-footprints">
          <div className="footprint"></div>
          <div className="footprint"></div>
          <div className="footprint"></div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Buffalo Wonder. Made with ❤️ for the
          American Bison.
        </p>
        <p className="footer-tagline">Roaming the digital plains since 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
