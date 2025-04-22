// Key facts section for the buffalo website
const KeyFactsSection = () => {
  const facts = [
    {
      id: 1,
      title: 'Size',
      description:
        'Buffalo can weigh up to 2,000 pounds (900 kg) and stand 6 feet (1.8 m) tall',
    },
    {
      id: 2,
      title: 'Lifespan',
      description:
        'Buffalo typically live 15-20 years in the wild, and up to 40 years in captivity',
    },
    {
      id: 3,
      title: 'Diet',
      description:
        'Buffalo are herbivores, primarily grazing on grasses and other vegetation',
    },
    {
      id: 4,
      title: 'Social Structure',
      description: 'Buffalo are highly social animals that travel in herds',
    },
    {
      id: 5,
      title: 'Habitat',
      description:
        'Buffalo can be found across grasslands, plains, forests, and wetlands',
    },
  ];

  return (
    <section className="key-facts-section" id="key-facts">
      <h2>Key Buffalo Facts</h2>
      <div className="facts-container">
        {facts.map((fact) => (
          <div key={fact.id} className="fact-card">
            <h3>{fact.title}</h3>
            <p>{fact.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KeyFactsSection;
