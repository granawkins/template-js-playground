import { useState } from 'react';
import AnimatedBuffalo from './AnimatedBuffalo';

interface Habitat {
  id: number;
  name: string;
  description: string;
  color: string;
  secondaryColor: string;
}

const HabitatSection = () => {
  const [activeHabitat, setActiveHabitat] = useState<number>(0);

  const habitats: Habitat[] = [
    {
      id: 0,
      name: 'Grasslands',
      description:
        'Buffalo love to roam the wide open prairies! These grassy plains provide them with their favorite food - grass! Buffalo are grazers who spend up to 9-11 hours a day eating grass.',
      color: '#7CB342',
      secondaryColor: '#8BC34A',
    },
    {
      id: 1,
      name: 'Meadows',
      description:
        'Buffalo enjoy meadows where wildflowers bloom among the grass. These colorful spots provide nutritious food varieties and make buffalo very happy with their diverse plant life!',
      color: '#9CCC65',
      secondaryColor: '#CDDC39',
    },
    {
      id: 2,
      name: 'River Valleys',
      description:
        'Buffalo need to drink a lot of water - up to 10 gallons a day! River valleys provide essential water sources and lush vegetation that buffalo love to munch on.',
      color: '#4FC3F7',
      secondaryColor: '#03A9F4',
    },
    {
      id: 3,
      name: 'Forest Edges',
      description:
        'While buffalo prefer open areas, they sometimes hang out near forest edges. These areas provide shade during hot summer days and shelter during storms.',
      color: '#388E3C',
      secondaryColor: '#2E7D32',
    },
  ];

  return (
    <div className="habitat-section">
      <h2 className="habitat-header">Buffalo Habitats 🏞️</h2>

      <div className="habitat-content">
        <div className="habitat-tabs">
          {habitats.map((habitat) => (
            <button
              key={habitat.id}
              className={`habitat-tab ${activeHabitat === habitat.id ? 'active' : ''}`}
              style={{
                backgroundColor:
                  activeHabitat === habitat.id ? habitat.color : 'transparent',
                borderColor: habitat.color,
              }}
              onClick={() => setActiveHabitat(habitat.id)}
            >
              {habitat.name}
            </button>
          ))}
        </div>

        <div
          className="habitat-display"
          style={{
            backgroundColor: habitats[activeHabitat].color,
            backgroundImage: `linear-gradient(45deg, ${habitats[activeHabitat].color} 0%, ${habitats[activeHabitat].secondaryColor} 100%)`,
          }}
        >
          <div className="habitat-info">
            <h3>{habitats[activeHabitat].name}</h3>
            <p>{habitats[activeHabitat].description}</p>
          </div>

          <div className="habitat-scene">
            {/* Showing buffalo in the habitat */}
            <div className="scene-element ground"></div>
            <div className="scene-element buffalo-group">
              <AnimatedBuffalo size="medium" delay={0} />
              <AnimatedBuffalo size="small" delay={0.3} />
            </div>

            {/* Dynamic habitat elements based on active habitat */}
            {activeHabitat === 0 && (
              <div className="scene-element grass-tufts">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="grass-tuft"
                    style={{ left: `${i * 15 + 5}%` }}
                  ></div>
                ))}
              </div>
            )}

            {activeHabitat === 1 && (
              <div className="scene-element flowers">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="flower"
                    style={{ left: `${i * 20 + 10}%` }}
                  ></div>
                ))}
              </div>
            )}

            {activeHabitat === 2 && (
              <div className="scene-element river">
                <div className="river-waves"></div>
              </div>
            )}

            {activeHabitat === 3 && (
              <div className="scene-element trees">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="tree"
                    style={{ left: `${i * 30 + 15}%` }}
                  ></div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitatSection;
