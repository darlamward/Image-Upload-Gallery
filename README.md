# Image Upload & Gallery App

This project is a simple image upload and gallery app built with **React** and **Firebase**. It allows users to upload images by drag-and-drop, displays a progress bar during uploads, and fetches the uploaded images from Firebase. Images can be reordered via drag-and-drop and deleted from the gallery. Image metadata (URLs and order) is stored and updated in **Firestore**.

## Features

- Drag-and-drop image upload with progress bar
- Fetch and display uploaded images from Firebase Storage
- Reorder images in the gallery via drag-and-drop
- Delete images from the gallery and Firebase Storage
- Image URLs and order persisted in Firestore

## Tech Stack

- React
- Firebase Storage & Firestore
- react-easy-sort for drag-and-drop reordering
- react-spinners for loading indicators

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/) (v16+)
- [Firebase CLI](https://firebase.google.com/docs/cli) (Optional for setting up Firebase)
- A Firebase account with a Firebase project set up

### Setup Firebase

1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
2. Set up Firebase Storage and Firestore in your Firebase project.
3. Go to **Project Settings** in Firebase, and under **Your apps**, register a new web app.
4. Copy the Firebase config snippet to use in the project.

### Clone the Repository

```bash
git clone https://github.com/your-username/image-upload-gallery.git
cd image-upload-gallery

