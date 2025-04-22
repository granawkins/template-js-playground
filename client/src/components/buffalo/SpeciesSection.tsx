// Species information section for the buffalo website
const SpeciesSection = () => {
  const species = [
    {
      id: 1,
      name: 'American Bison',
      scientific: 'Bison bison',
      description:
        'The American bison, also known as buffalo, is the largest mammal in North America. Once roaming the continent in vast herds, it was driven to near extinction but has since recovered through conservation efforts.',
      image: '/images/american-bison.jpg',
    },
    {
      id: 2,
      name: 'Water Buffalo',
      scientific: 'Bubalus bubalis',
      description:
        'The water buffalo is a large bovine native to the Indian subcontinent, Southeast Asia, and China. They are widely used for plowing, transport, as a source of milk, meat, and hide.',
      image: '/images/water-buffalo.jpg',
    },
    {
      id: 3,
      name: 'Cape Buffalo',
      scientific: 'Syncerus caffer',
      description:
        'The African buffalo or Cape buffalo is a large African bovine. They are known for their unpredictable nature and are considered one of the most dangerous animals in Africa.',
      image: '/images/cape-buffalo.jpg',
    },
  ];

  return (
    <section className="species-section" id="species">
      <h2>Buffalo Species</h2>
      <div className="species-container">
        {species.map((item) => (
          <div key={item.id} className="species-card">
            <div className="species-image-container">
              <img src={item.image} alt={item.name} className="species-image" />
            </div>
            <div className="species-info">
              <h3>{item.name}</h3>
              <p className="scientific-name">{item.scientific}</p>
              <p className="species-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpeciesSection;
