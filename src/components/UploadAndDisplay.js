import React, { useState, useCallback, useRef } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig';
import '../UploadAndDisplay.css';

const UploadAndDisplay = ({ onImagesUpload }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(null); // Track the image being uploaded
  const fileInputRef = useRef(null);

  const preventDefaults = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOver = useCallback((e) => {
    preventDefaults(e);
    e.dataTransfer.dropEffect = 'copy';
  }, [preventDefaults]);

  const handleDrop = useCallback(async (e) => {
    preventDefaults(e);
    const files = Array.from(e.dataTransfer.files);
    await uploadFiles(files);
  }, [preventDefaults]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    uploadFiles(files);
  };

  const uploadFiles = async (files) => {
    setUploading(true);
    const uploadedImages = [];
    const newUploads = [];

    for (const file of files) {
      const fileRef = ref(storage, `images/${file.name}`);
      try {
        setUploadingImage(file); // Set the current image being uploaded
        const uploadTask = uploadBytes(fileRef, file);
        await uploadTask;
        const url = await getDownloadURL(fileRef);
        uploadedImages.push(url);
        newUploads.push(file); // Add to new uploads array
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setUploadingImage(null); // Clear uploading image state
      }
    }

    onImagesUpload(uploadedImages, newUploads); // Notify parent component of new images
    setUploading(false);
  };

  return (
    <div
      className="drop-zone"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current.click()}
    >
      <p>Drag & Drop or Click to upload</p>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
      {uploading && <p>Uploading...</p>}
    </div>
  );
};

export default UploadAndDisplay;



