import React, { useState, useCallback } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig';
import '../UploadAndDisplay.css';

const UploadAndDisplay = ({ onImagesUpload }) => {
  const [uploadingFiles, setUploadingFiles] = useState([]);

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

  // Upload files to Firebase Storage
  const uploadFiles = async (files) => {
    const newUploads = [];

    for (const file of files) {
      const fileRef = ref(storage, `images/${file.name}`);

      // Add to uploading state (to show placeholder)
      setUploadingFiles((prev) => [...prev, file.name]);

      try {
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        newUploads.push(url);
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        // Remove from uploading state once upload is complete
        setUploadingFiles((prev) => prev.filter((name) => name !== file.name));
      }
    }

    onImagesUpload(newUploads); // Notify parent component of new images
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
      <p>Drag and drop or click to upload</p>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="fileInput"
      />

      {/* Show progress message while files are uploading */}
      {uploadingFiles.length > 0 && (
        <p>Uploading {uploadingFiles.length} file(s)...</p>
      )}
    </div>
  );
};

export default UploadAndDisplay;




