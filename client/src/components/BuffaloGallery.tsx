import { useState } from 'react';

interface GalleryImage {
  id: number;
  url: string;
  caption: string;
  alt: string;
}

const BuffaloGallery = () => {
  // Using placeholders for images - in a real site these would be actual buffalo images
  const images: GalleryImage[] = [
    {
      id: 1,
      url: 'https://placehold.co/600x400/8B4513/FFF?text=Grazing+Buffalo',
      caption: 'Buffalo grazing on the open plains',
      alt: 'Buffalo grazing in a grassland',
    },
    {
      id: 2,
      url: 'https://placehold.co/600x400/654321/FFF?text=Buffalo+Herd',
      caption: 'A mighty herd crossing the prairie',
      alt: 'Herd of buffalo crossing a river',
    },
    {
      id: 3,
      url: 'https://placehold.co/600x400/8B5A2B/FFF?text=Buffalo+Calf',
      caption: 'Adorable buffalo calf with its mother',
      alt: 'Buffalo calf standing next to adult buffalo',
    },
    {
      id: 4,
      url: 'https://placehold.co/600x400/A0522D/FFF?text=Winter+Buffalo',
      caption: 'Buffalo standing strong in the snow',
      alt: 'Buffalo with snow covering its thick fur',
    },
    {
      id: 5,
      url: 'https://placehold.co/600x400/CD853F/FFF?text=Buffalo+Portrait',
      caption: 'Majestic portrait of an American bison',
      alt: 'Close-up portrait of a buffalo head',
    },
    {
      id: 6,
      url: 'https://placehold.co/600x400/D2691E/FFF?text=Buffalo+Sunset',
      caption: 'Buffalo silhouette against a dramatic sunset',
      alt: 'Buffalo silhouette at sunset',
    },
  ];

  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const openImageModal = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="gallery-container">
      <h2>Buffalo Gallery</h2>
      <div className="gallery-grid">
        {images.map((image) => (
          <div
            key={image.id}
            className="gallery-item"
            onClick={() => openImageModal(image)}
          >
            <img src={image.url} alt={image.alt} />
            <div className="gallery-caption">{image.caption}</div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="image-modal-overlay" onClick={closeImageModal}>
          <div
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-modal-btn" onClick={closeImageModal}>
              &times;
            </button>
            <img src={selectedImage.url} alt={selectedImage.alt} />
            <p className="modal-caption">{selectedImage.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuffaloGallery;
