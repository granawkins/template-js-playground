// Footer component for the buffalo website
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About This Site</h3>
          <p>
            This educational website is dedicated to providing information about
            buffalo species, their habitats, conservation status, and
            interesting facts.
          </p>
        </div>
        <div className="footer-section">
          <h3>Resources</h3>
          <ul>
            <li>
              <a
                href="https://www.worldwildlife.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                World Wildlife Fund
              </a>
            </li>
            <li>
              <a
                href="https://www.nationalgeographic.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                National Geographic
              </a>
            </li>
            <li>
              <a
                href="https://www.iucnredlist.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                IUCN Red List
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Navigation</h3>
          <ul>
            <li>
              <a href="#key-facts">Key Facts</a>
            </li>
            <li>
              <a href="#species">Species</a>
            </li>
            <li>
              <a href="#conservation">Conservation</a>
            </li>
            <li>
              <a href="#interesting-facts">Interesting Facts</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {currentYear} Buffalo Information Portal. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
