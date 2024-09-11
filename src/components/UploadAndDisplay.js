import React, { useState, useCallback } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig';
import '../UploadAndDisplay.css';

const UploadAndDisplay = ({ onImagesUpload }) => {
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Prevent default drag behaviors
  const preventDefaults = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // Handle drag over event
  const handleDragOver = useCallback((e) => {
    preventDefaults(e);
    e.dataTransfer.dropEffect = 'copy'; // Show copy cursor
  }, [preventDefaults]);

  // Handle drop event
  const handleDrop = useCallback(async (e) => {
    preventDefaults(e);
    const files = Array.from(e.dataTransfer.files);
    uploadFiles(files);
  }, [preventDefaults]);

  // Handle file input change
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    uploadFiles(files);
  };

  // Upload files to Firebase Storage with progress tracking
  const uploadFiles = async (files) => {
    setUploadingFiles(files.map(file => ({ name: file.name, progress: 0 }))); // Set initial uploading state
    setUploadProgress(0); // Reset the progress for the next upload

    const newUploads = [];
    const totalFiles = files.length;
    let completedFiles = 0;

    const uploadPromises = files.map((file) => {
      const fileRef = ref(storage, `images/${file.name}`);
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
            setUploadProgress(Math.round(((completedFiles * 100) + percentage) / totalFiles)); // Update overall progress
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
                setUploadProgress(100); // Ensure progress is set to 100% once all files are done
                setUploadingFiles([]); // Clear uploading state after all files are uploaded
                onImagesUpload(newUploads); // Notify parent component of new images
              }
              resolve(); // Resolve the promise when upload completes
            } catch (error) {
              console.error('Error getting download URL:', error);
              reject(error);
            }
          }
        );
      });
    });

    try {
      await Promise.all(uploadPromises); // Wait for all uploads to complete
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  // Trigger the hidden file input when the box is clicked
  const handleClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div
      className="drop-zone"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick} // Handle click on the drop zone
    >
      <p>{uploadingFiles.length > 0 ? `Uploading ${uploadingFiles.length} file(s)...` : 'Drag and drop or click to upload'}</p>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="fileInput"
      />

      {/* Show progress bar and individual file progress */}
      {uploadingFiles.length > 0 && (
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${uploadProgress}%` }}></div>
        </div>
      )}
    </div>
  );
};

export default UploadAndDisplay;
