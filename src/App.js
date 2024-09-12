import React, { useState, useEffect } from 'react';
import UploadAndDisplay from './components/UploadAndDisplay';
import ImageGallery from './components/ImageGallery';
import Footer from './components/Footer'; // Import the Footer component
import { storage } from './firebaseConfig';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import './styles.css';
import { getDoc, doc } from 'firebase/firestore';
import { firestore } from './firebaseConfig';


const App = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Fetch images from Firebase Storage
        const imageRef = ref(storage, 'images/');
        const res = await listAll(imageRef);
        const urls = await Promise.all(
          res.items.map((itemRef) => getDownloadURL(itemRef))
        );
  
        console.log('Fetched image URLs from Firebase Storage:', urls); // Debugging line
  
        // Fetch image order from Firestore
        const orderDoc = await getDoc(doc(firestore, 'images', 'order'));
        const orderedUrls = orderDoc.exists() ? orderDoc.data().imageUrls : urls;
  
        console.log('Fetched image URLs from Firestore or default:', orderedUrls); // Debugging line
  
        setImages(orderedUrls); // Set the images in the order fetched from Firestore
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
  
    fetchImages();
  }, []);

  const handleImagesUpload = (newImages) => {
    setImages((prevImages) => {
      const updatedImages = [...new Set([...prevImages, ...newImages])];
      return updatedImages;
    });
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
      <Footer /> {/* Add the Footer component */}
    </div>
  );
};

export default App;



