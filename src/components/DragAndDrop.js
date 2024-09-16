import React, { useState } from 'react';
import { storage } from './firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

function DragAndDrop({ onFilesUploaded }) {
  const [progress, setProgress] = useState(0);

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    Array.from(files).forEach(file => {
      uploadFile(file);
    });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const uploadFile = (file) => {
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Monitor the upload state
    uploadTask.on('state_changed',
      (snapshot) => {
        // Calculate and set the upload progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error('Upload failed:', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log('File available at:', url);
          onFilesUploaded(url); 
        });
      }
    );
  };

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}
      >
        <p>Drag and drop an image here</p>
      </div>
      {progress > 0 && <p>Upload Progress: {progress}%</p>}
    </div>
  );
}

export default DragAndDrop;
