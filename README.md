# Image Upload & Gallery App

This project is a simple image upload and gallery app built with **React** and **Firebase**. It allows users to upload images by drag-and-drop, displays a progress bar during uploads, and fetches the uploaded images from Firebase. Images can be reordered via drag-and-drop and deleted from the gallery. Image metadata (URLs and order) is stored and updated in **Firestore**.

## Tech Stack

- React
- Firebase Storage & Firestore
- react-easy-sort for drag-and-drop reordering
- react-spinners for loading indicators

## Design Choices

### [Figma Mockup](https://www.figma.com/design/q8h0MoQ4tel21E818GGPtt/Upload-Demo?node-id=0-1&t=yRNoP2OUyYcT0AzV-1)

### **1. Drag-and-Drop Interface**
The drag-and-drop zone is visually prominent in the UI, inviting users to easily upload files.
### **2. Loading Indicators**
The react-spinners library is used to provide visual feedback to users while images are being uploaded or reordered. I chose this library because it offers a simple yet effective way to indicate loading states, which is crucial for ensuring users know the app is responsive during lengthy uploads or updates.
### **3. Responsive Design**
The layout was designed to be responsive, ensuring that the drag-and-drop upload zone and image gallery adapt to different screen sizes, offering an optimal experience across desktop and mobile devices.
### **4. Dark Theme**
One of the primary design choices was to implement a dark color scheme. Dark colors reduce eye strain, especially in low-light environments, and enhance the user's focus on the images in the gallery. This theme provides a visually calming experience, making it easier to concentrate on the content.
### **5. Color Harmony**
All the colors in the app have been carefully selected to work together harmoniously, ensuring a clean, cohesive, and aesthetically pleasing user interface. The color palette helps in creating a smooth user experience without clashing visuals.

## Challenges Faced
### **1. Managing Image Reordering**
Implementing drag-and-drop reordering for the image gallery was a key challenge. I initially tried different libraries but settled on react-easy-sort because of its simplicity and flexibility in handling both horizontal and vertical reordering. The challenge here was ensuring that the new order is consistently saved to Firestore and reflected in the UI without performance issues or state inconsistencies.

### **2. Progressive Image Loading**
One of the other challenges I encountered was implementing a placeholder image that only applies to newly uploaded images, rather than all images in the gallery. This required conditional logic to ensure the placeholders appear only for files currently being processed.

### **3. Handling Multiple File Uploads**
Initially, the gallery was being reset when multiple images were uploaded using the drag-and-drop functionality. This was a bug that required restructuring how image state was managed. I successfully resolved this by handling file processing asynchronously and ensuring the gallery state was preserved during multiple uploads.

## Extra Features
- **Image Reordering:** Users can drag and drop images to reorder them, with the updated order saved in Firestore.
- **Progress Bar:** A progress bar is shown while the image is uploading, improving the user experience by giving real-time feedback.
- **Loading Indicators:** A loading spinner ensures users are aware when images are being processed or fetched from Firebase.
- **Image Deletion:** Users can delete images from the gallery, and the changes are reflected both in the Firebase Storage and the Firestore database.

## Conclusion
This project was an excellent learning opportunity in building full-stack applications with Firebase, managing real-time data, and implementing complex features like drag-and-drop reordering. As someone who had not used Firebase before, achieving a successful implementation was a significant milestone. Despite some initial hurdles, the final product is both user-friendly and functional, with features that are extendable for future improvements. This experience has broadened my skills and understanding of integrating Firebase with React to build dynamic web applications.

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
git clone https://github.com/darlamward/Image-Upload-Gallery.git
cd Image-Upload-Gallery
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
│   ├── assets
│   │   └── logo.svg
│   ├── components
│   │   ├── DragAndDrop.js
│   │   ├── UploadAndDisplay.js
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
    └── index.html
```
# License

This project is licensed under the MIT License.

