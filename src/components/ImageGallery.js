import React, { useState, useEffect } from 'react';
import { ref, deleteObject } from 'firebase/storage';
import { storage } from '../firebaseConfig';
import { ClipLoader } from 'react-spinners'; // Import the spinner
import '../ImageGallery.css'; // Import the CSS file

const ImageGallery = ({ images, setImages }) => {
  const [loadingStates, setLoadingStates] = useState({});

  useEffect(() => {
    // Initialize the loading states for new images
    const newImages = images.filter(url => !(url in loadingStates));
    
    if (newImages.length > 0) {
      setLoadingStates(prev => {
        const newState = { ...prev };
        newImages.forEach(url => (newState[url] = true)); // Set new images as loading
        return newState;
      });

      // Remove loading state after 1 second
      const timer = setTimeout(() => {
        setLoadingStates(prev => {
          const newState = { ...prev };
          newImages.forEach(url => (newState[url] = false)); // Set new images as not loading
          return newState;
        });
      }, 1000); // 1 second delay

      return () => clearTimeout(timer);
    }
  }, [images]);

  const handleDelete = async (imageUrl) => {
    try {
      const fileRef = ref(storage, decodeURIComponent(imageUrl.split('/o/')[1].split('?')[0]));
      await deleteObject(fileRef);
      setImages(prevImages => prevImages.filter(url => url !== imageUrl));
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleImageLoad = (url) => {
    if (loadingStates[url]) {
      setLoadingStates(prev => ({ ...prev, [url]: false })); // Image loaded
    }
  };

  return (
    <div className="image-gallery">
      {images.length > 0 ? (
        images.map((url, index) => (
          <div key={index} className="image-item">
            <div className="image-wrapper">
              {loadingStates[url] && (
                <div className="loading-overlay">
                  <ClipLoader color="#208AAE" size={50} /> {/* Display the spinner */}
                </div>
              )}
              <img
                src={url}
                alt={`Uploaded #${index + 1}`}
                onLoad={() => handleImageLoad(url)}
                style={{ display: loadingStates[url] ? 'none' : 'block' }} // Hide image while loading
              />
            </div>
            <button className="close-button" onClick={() => handleDelete(url)}>
              &times;
            </button>
          </div>
        ))
      ) : (
        <p>No images uploaded yet.</p>
      )}
    </div>
  );
};

export default ImageGallery;
