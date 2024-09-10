// DragAndDrop.js
import React, { useState } from 'react';
import { storage } from './firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

function DragAndDrop() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
    uploadFile(droppedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const uploadFile = (file) => {
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      }, 
      (error) => {
        console.error('Upload failed:', error);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log('File available at:', url);
        });
      }
    );
  };

  return (
    <div>
      <div 
        onDrop={handleDrop} 
        onDragOver={handleDragOver} 
        style={{border: '2px dashed #ccc', padding: '20px', textAlign: 'center'}}
      >
        <p>Drag and drop an image here</p>
      </div>
      {progress > 0 && <p>Upload Progress: {progress}%</p>}
    </div>
  );
}

export default DragAndDrop;
