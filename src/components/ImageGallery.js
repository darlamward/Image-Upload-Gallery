import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import '../ImageGallery.css'; // Import the CSS file

const ImageGallery = ({ images, setImages }) => {

  const handleDelete = (url) => {
    const updatedImages = images.filter(image => image !== url);
    setImages(updatedImages);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    
    // Handle item reordering
    if (source.droppableId === destination.droppableId) {
      const updatedImages = Array.from(images);
      const [movedImage] = updatedImages.splice(source.index, 1);
      updatedImages.splice(destination.index, 0, movedImage);
      setImages(updatedImages);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="image-gallery" direction="horizontal">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="image-gallery"
          >
            {images.map((url, index) => (
              <Draggable key={url} draggableId={url} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="image-item"
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
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ImageGallery;
