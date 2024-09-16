# Image Upload & Gallery App

This project is a simple image upload and gallery app built with **React** and **Firebase**. It allows users to upload images by drag-and-drop, displays a progress bar during uploads, and fetches the uploaded images from Firebase. Images can be reordered via drag-and-drop and deleted from the gallery. Image metadata (URLs and order) is stored and updated in **Firestore**.

## Tech Stack

- React
- Firebase Storage & Firestore
- react-easy-sort for drag-and-drop reordering
- react-spinners for loading indicators

## Getting Started

### [Figma Mockup](https://www.figma.com/design/q8h0MoQ4tel21E818GGPtt/Upload-Demo?node-id=0-1&t=yRNoP2OUyYcT0AzV-1)

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
git clone https://github.com/darlamward/Image-Upload-Gallery-Demo.git
cd Image-Upload-Gallery-Demo
```

###  Step 2: Install dependencies

Install the required dependencies for the project using npm:
```bash
npm install
```

### Step 3: Firebase setup

1. Go to the Firebase Console and create a new project.
2. Enable Firebase Storage and Firestore Database in your project.
3. Go to **Project Settings** in Firebase, and under Your apps, register a new web app.
4. Copy the Firebase configuration keys.

    Next, create a ```.env``` file in the root directory of the project and add your Firebase configuration as follows:
    ```bash
    REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY
    REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT_ID.firebaseapp.com
    REACT_APP_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
    REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT_ID.appspot.com
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
    REACT_APP_FIREBASE_APP_ID=YOUR_APP_ID
    REACT_APP_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID
    ```
    **Important:** Never commit your .env file to GitHub. Add the .env file to your .gitignore to keep it secure.

5. **Set Firebase Storage Rules:** In the Firebase Console, navigate to **Storage > Rules** and replace the existing rules with the following:
   ```bash
   rules_version = '2';
   
   service firebase.storage {
   match /b/{bucket}/o {
   match /{allPaths=**} {
   allow read, write: if true;
   }
   }
   }
   ```
   
6. **Set Firestore Database Rules:** In the Firebase Console, go to **Firestore Database > Rules** and replace the existing rules with the following:
    ```bash
    rules_version = '2';
    
    service cloud.firestore {
      match /databases/{database}/documents {
        match /images/order {
          allow read, write: if true;
        }
    
        match /images/{document=**} {
          allow read, write: if true;
        }
      }
    }
    ```
7. Firebase configuration in the code will automatically use these environment variables.

### Step 4: Running the app locally

To start the development server, run the following command:
```bash
npm start
```
Your application will be available at ```http://localhost:3000.```

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

