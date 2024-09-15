import React, { useState, useEffect } from 'react';
import SortableList, { SortableItem } from 'react-easy-sort';
import { ref, deleteObject } from 'firebase/storage';
import { updateDoc, doc } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';
import { storage } from '../firebaseConfig';
import arrayMove from 'array-move';
import { ClipLoader } from 'react-spinners';
import '../styles/ImageGallery.css';

const ImageGallery = ({ images = [], setImages }) => {
  const [loadingStates, setLoadingStates] = useState({});

  useEffect(() => {
    const newImages = images.filter((url) => !(url in loadingStates));
    if (newImages.length > 0) {
      setLoadingStates((prev) => {
        const newState = { ...prev };
        newImages.forEach((url) => (newState[url] = true));
        return newState;
      });
    }
  }, [images]);

  const handleImageLoad = (url) => {
    setLoadingStates((prev) => ({ ...prev, [url]: false }));
  };

  const handleDelete = async (imageUrl) => {
    try {
      const fileRef = ref(storage, decodeURIComponent(imageUrl.split('/o/')[1].split('?')[0]));
      await deleteObject(fileRef);
      setImages((prevImages) => prevImages.filter((url) => url !== imageUrl));
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const onSortEnd = async (oldIndex, newIndex) => {
    const newImages = arrayMove(images, oldIndex, newIndex);
    setImages(newImages);

    // Update Firestore with the new order
    try {
      await updateDoc(doc(firestore, 'images', 'order'), { imageUrls: newImages });
    } catch (error) {
      console.error('Error updating Firestore:', error);
    }
  };

  return (
    <SortableList
      onSortEnd={onSortEnd}
      className="image-gallery"
      draggedItemClassName="dragged"
      axis="xy"
    >
      {images.length > 0 ? (
        images.map((url, index) => (
          <SortableItem key={url}>
            <div className="image-item">
              <div className="image-wrapper">
                {loadingStates[url] && (
                  <div className="loading-overlay">
                    <ClipLoader color="#208AAE" size={50} />
                  </div>
                )}
                <img
                  src={url}
                  alt={`Uploaded #${index + 1}`}
                  onLoad={() => handleImageLoad(url)}
                  style={{ display: loadingStates[url] ? 'none' : 'block' }}
                />
              </div>
              <button className="close-button" onClick={() => handleDelete(url)}>
                &times;
              </button>
            </div>
          </SortableItem>
        ))
      ) : (
        <p>No images uploaded yet.</p>
      )}
    </SortableList>
  );
};

export default ImageGallery;

