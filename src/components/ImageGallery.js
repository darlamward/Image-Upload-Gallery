import React, { useState } from 'react';
import SortableList, { SortableItem } from 'react-easy-sort';
import arrayMove from 'array-move';
import '../ImageGallery.css'; // Import the CSS file

const ImageGallery = ({ images, setImages }) => {
  const [draggingIndex, setDraggingIndex] = useState(null);

  const handleDelete = (url) => {
    const updatedImages = images.filter(image => image !== url);
    setImages(updatedImages);
  };

  const onSortEnd = (oldIndex, newIndex) => {
    setImages((array) => arrayMove(array, oldIndex, newIndex));
  };

  return (
    <SortableList
      onSortEnd={onSortEnd}
      className="image-gallery"
      draggedItemClassName="dragged"
      axis="xy" // Allow sorting in both horizontal and vertical directions
      onDragStart={(index) => setDraggingIndex(index)}
      onDragEnd={() => setDraggingIndex(null)}
    >
      {images.map((url, index) => (
        <SortableItem key={url}>
          <div
            className={`image-item ${index === draggingIndex ? 'dragging' : ''}`}
            style={{ transition: 'transform 0.2s ease' }} // Smooth transition
          >
            <img
              src={url}
              alt={`Uploaded #${index + 1}`}
              style={{ width: '100%', height: 'auto' }}
            />
            <button className="close-button" onClick={() => handleDelete(url)}>
              &times;
            </button>
          </div>
        </SortableItem>
      ))}
    </SortableList>
  );
};

export default ImageGallery;

