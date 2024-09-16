import React, { useState, useCallback } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage, firestore } from '../firebaseConfig'; 
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import '../styles/UploadAndDisplay.css';

const UploadAndDisplay = ({ onImagesUpload }) => {
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Prevent default behavior and propagation of events
  const preventDefaults = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // Handle drag over event to set drop effect
  const handleDragOver = useCallback((e) => {
    preventDefaults(e);
    e.dataTransfer.dropEffect = 'copy'; 
  }, [preventDefaults]);

  // Handle file drop event
  const handleDrop = useCallback(async (e) => {
    preventDefaults(e);
    const files = Array.from(e.dataTransfer.files); 
    uploadFiles(files);
  }, [preventDefaults]);

  // Handle file input change event
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    uploadFiles(files);
  };

  const uploadFiles = async (files) => {
    setUploadingFiles(files.map(file => ({ name: file.name, progress: 0 }))); // Initialize upload progress for each file
    setUploadProgress(0); // Reset overall upload progress

    const newUploads = [];
    const totalFiles = files.length;
    let completedFiles = 0;

    // Create an array of upload promises
    const uploadPromises = files.map((file) => {
      const fileRef = ref(storage, `images/${file.name}`); // Create a reference to the file in Firebase Storage
      const uploadTask = uploadBytesResumable(fileRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadingFiles(prev => 
              prev.map(fileState => 
                fileState.name === file.name ? { ...fileState, progress: Math.round(percentage) } : fileState
              )
            );
            setUploadProgress(Math.round(((completedFiles * 100) + percentage) / totalFiles));
          },
          (error) => {
            console.error('Error uploading file:', error);
            reject(error);
          },
          async () => {
            try {
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              newUploads.push(url);
              completedFiles++;
              if (completedFiles === totalFiles) {
                setUploadProgress(100);
                setUploadingFiles([]);
                onImagesUpload(newUploads); // Notify parent component with the new image URLs
                
                // Update Firestore with new image URLs
                const orderRef = doc(firestore, 'images', 'order');
                
                // Check if the document exists
                const orderDoc = await getDoc(orderRef);
                if (orderDoc.exists()) {
                  // Update existing document
                  await updateDoc(orderRef, {
                    imageUrls: arrayUnion(...newUploads)
                  });
                } else {
                  // Create a new document
                  await setDoc(orderRef, {
                    imageUrls: newUploads
                  });
                }
              }
              resolve();
            } catch (error) {
              console.error('Error getting download URL:', error);
              reject(error);
            }
          }
        );
      });
    });

    try {
      await Promise.all(uploadPromises);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  const handleClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div
      className="drop-zone"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <p>{uploadingFiles.length > 0 ? `Uploading ${uploadingFiles.length} file(s)...` : 'Drag and drop or click to upload'}</p>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="fileInput"
      />
      {uploadingFiles.length > 0 && (
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${uploadProgress}%` }}></div>
        </div>
      )}
    </div>
  );
};

export default UploadAndDisplay;
