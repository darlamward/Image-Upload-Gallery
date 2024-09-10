import React, { useState, useEffect } from 'react';
import { ref, deleteObject } from 'firebase/storage';
import { storage } from '../firebaseConfig';
import '../ImageGallery.css';

const ImageGallery = ({ images = [], setImages, newUploads = [] }) => {
  const [imageStates, setImageStates] = useState({});

  useEffect(() => {
    if (newUploads.length > 0) {
      // Initialize states for new uploads
      const newStates = {};
      newUploads.forEach((file) => {
        newStates[file.name] = { loading: true };
      });
      setImageStates((prev) => ({ ...prev, ...newStates }));
    }
  }, [newUploads]);

  useEffect(() => {
    if (images.length > 0) {
      const imagePromises = images.map((url) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = () => resolve(url);
        })
      );

      Promise.all(imagePromises).then((urls) => {
        const updatedStates = {};
        urls.forEach((url) => {
          const fileName = url.split('/').pop();
          updatedStates[fileName] = { loading: false };
        });
        setImageStates((prev) => ({ ...prev, ...updatedStates }));
      });
    }
  }, [images]);

  const handleDelete = async (imageUrl) => {
    try {
      const fileRef = ref(storage, decodeURIComponent(imageUrl.split('/o/')[1].split('?')[0]));
      await deleteObject(fileRef);
      setImages((prevImages) => prevImages.filter((url) => url !== imageUrl));
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <div className="image-gallery">
      {(images.length > 0 || Object.values(imageStates).some(state => state.loading)) ? (
        images.map((url, index) => (
          <div key={index} className="image-item">
            {imageStates[url.split('/').pop()]?.loading ? (
              <div className="image-item uploading-placeholder">
                <p>Uploading...</p>
              </div>
            ) : (
              <img src={url} alt={`Uploaded #${index + 1}`} />
            )}
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
