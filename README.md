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

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/image-upload-gallery.git
cd image-upload-gallery
```

###  Step 2: Install dependencies

Install the required dependencies for the project using npm:
```bash
npm install
```

### Step 3: Firebase setup

1. Go to the Firebase Console and create a new project.
2. Enable Firebase Storage and Firestore in your project.
3. Create a file named firebaseConfig.js in the src/ directory, and add your Firebase configuration:
```bash
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { firestore, storage };
```

### Step 4: Running the app locally

To start the development server, run the following command:
```bash
npm start
```
Your application will be available at ```http://localhost:3000.```

### Step 5: Building for production
To create a production build of the app, run:
```bash
npm run build
```
The production-ready files will be generated in the ```build/``` directory.

### Step 6: Deploying the app
You can deploy this app to any static hosting service, such as Firebase Hosting, Netlify, or Vercel.

## File Structure
```bash
├── src
│   ├── components
│   │   ├── DragAndDrop.js
│   │   ├── UploadAndDisplay.js
│   │   ├── StrictModeDroppable.js
│   │   ├── ImageGallery.js
│   │   └── Footer.js
│   ├── firebaseConfig.js
│   ├── App.js
│   ├── index.js
│   └── styles
│       ├── styles.css
│       ├── ImageGallery.css
│       ├── UploadAndDisplay.css
│       ├── index.css
│       └── Footer.css
└── public
    ├── index.html
```
# License

This project is licensed under the MIT License.
