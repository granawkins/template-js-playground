import { useState, useEffect } from 'react';
import buffaloImage from '/buffalo.jpg'; // We'll need to add this image to the public directory

const BuffaloPage = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
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
      <h1>American Bison (Buffalo)</h1>

      <div className="buffalo-image-container">
        <img
          src={buffaloImage}
          alt="American Bison (Buffalo)"
          className="buffalo-image"
        />
        <p className="image-caption">
          The majestic American Bison in its natural habitat
        </p>
      </div>

      <section className="info-section">
        <h2>About the American Bison</h2>
        <p>
          The American bison (Bison bison), also commonly known as the American
          buffalo, is a large bovine mammal native to North America. Once
          roaming the plains in vast herds, the bison nearly went extinct due to
          commercial hunting and slaughter in the 19th century. Today, thanks to
          conservation efforts, their populations have rebounded significantly.
        </p>
      </section>

      <section className="info-section">
        <h2>Physical Characteristics</h2>
        <ul>
          <li>
            <strong>Size:</strong> One of the largest terrestrial mammals in
            North America
          </li>
          <li>
            <strong>Weight:</strong> Males (bulls) can weigh up to 2,000 pounds
            (907 kg)
          </li>
          <li>
            <strong>Height:</strong> Can stand 5-6.5 feet (1.5-2 m) tall at the
            shoulder
          </li>
          <li>
            <strong>Features:</strong> Distinctive shoulder hump, thick dark
            brown fur, and large head
          </li>
          <li>
            <strong>Lifespan:</strong> 15-20 years in the wild, up to 40 years
            in captivity
          </li>
        </ul>
      </section>

      <section className="info-section">
        <h2>Habitat & Range</h2>
        <p>
          Historically, bison ranged from Alaska and western Canada to northern
          Mexico, and from the east coast of the United States to the Rocky
          Mountains. Today, they are primarily found in protected areas such as
          Yellowstone National Park and various wildlife refuges. They prefer
          open plains and grasslands but can also adapt to semi-forested areas.
        </p>
      </section>

      <section className="info-section">
        <h2>Conservation Status</h2>
        <p>
          The American bison was pushed to the brink of extinction in the late
          1800s, with fewer than 1,000 individuals remaining by 1890. Today,
          thanks to conservation efforts, the population has recovered to
          approximately 500,000, though most of these are on private ranches and
          are partially hybridized with cattle.
        </p>
        <p>
          The IUCN Red List currently lists the American bison as "Near
          Threatened." Wild bison conservation remains an important focus for
          preserving this iconic North American species.
        </p>
      </section>

      <section className="info-section">
        <h2>Cultural Significance</h2>
        <p>
          The American bison holds immense cultural significance, particularly
          for Native American tribes of the Great Plains, who relied on bison
          for food, shelter, tools, and spiritual practices. The bison has also
          become an important symbol of American conservation success and has
          been designated as the national mammal of the United States.
        </p>
      </section>

      <div className="server-message">
        <p>
          <b>Message from server:</b>{' '}
          {loading
            ? 'Loading message from server...'
            : error
              ? `Error: ${error}`
              : message
                ? message
                : 'No message from server'}
        </p>
      </div>
    </div>
  );
};

export default BuffaloPage;
