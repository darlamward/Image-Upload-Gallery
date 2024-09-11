import React, { useState, useEffect } from 'react';
import UploadAndDisplay from './components/UploadAndDisplay';
import ImageGallery from './components/ImageGallery';
import { storage } from './firebaseConfig';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import './styles.css';

const App = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageRef = ref(storage, 'images/');
        const res = await listAll(imageRef);
        const urls = await Promise.all(
          res.items.map((itemRef) => getDownloadURL(itemRef))
        );
        setImages(urls); // Set the initial images
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  // Log the image URLs every time the 'images' state changes
  useEffect(() => {
    console.log('Updated images:', images);
  }, [images]);

  const handleImagesUpload = (newImages) => {
    // Use a Set to remove duplicates
    const updatedImages = [...new Set([...newImages, ...images])];
    setImages(updatedImages); // Add new images before old ones, ensuring no duplicates
  };

  return (
<div className='background'>
  <div className="container">
    <div className="header">
      <h1 className="title">UPLOAD DEMO</h1>
      <div className='upload-container'>
  <UploadAndDisplay onImagesUpload={handleImagesUpload} />
</div>
    </div>
    <div className='image-holder'>
      <ImageGallery images={images} setImages={setImages} />
    </div>
  </div>
</div>

  );
};

export default App;

