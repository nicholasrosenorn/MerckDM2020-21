# MerckPhoneApp
# Note: For a more detailed documentation, please refer to ./09-PhoneApp-FinalDoc.Rmd
## How to run the app frontend on expo
First, run "npm install" to install all the dependencies.

then, run "npm start" on the root folder

## How to run the backend
1. Go to ./backend/biometricBackend

2. run "node server.js"

# Naming Convention:
Foldername: CamelCase.

Filename: camelCase.

Functional Component: CamelCase

JS variable/function names: camelCase

stylesheet object name: camelCase


# How to Setup
**Note: You will not be able to run the application until you finish all the setup steps below. These steps make sure that your frontend (React Native), backend (Node.js), and the two databases used (Firebase and Amazon S3) are interconnected correctly. </br></br>
Note: A global search of the word "PUTYOURDATAHERE" will help you find all the places where you need to add your own config info. A more detailed instruction is also presented below.**</br>

Once you are in the root folder of the project repo, type "npm start" on the command line. The expo browser tool will open in your browser. Then, you can choose to run the application on browser (as a website), Android device, or Apple device. For the spring 2021 semester final version, the code works best on an Android device (you can either use an emulator or a real device), and it works mostly on website. We haven't had a chance to test it on Apple device.

In order to configure the frontend to work with your firebase authentication, correct credentials need to be put into "config.js" file located in /src/FireBase. To work with your Amazon S3, change the AMAZON_S3_DOMAIN variable to your Amazon S3 URL in the env.json file. The API_DOMAIN url is the URL of your backend.

For the Node.js backend, the root folder is at /backend/biometricBackend. Once you navigate there, you can type "node server.js" to start the server on port 3000.

In order to configure the backend to work with your MySQL database, correct credentials need to be put into "db.config.js" file located in /backend/biometricBackend/app/config.

In order to configure the backend to work with your Amazon S3, correct credentials need to be put into /backend/biometricBackend/app/controllers/image.controller.js. Some tutorials that might help you include https://medium.com/@otoloye/uploading-files-to-aws-s3-using-nodejs-multer-mongodb-and-postman-part-1-de790b8131d4.

# Technologies Used
The phone application Frontend is built with React-native and Expo CLI. 
Backend is supported by Firebase, AWS S3, mySQL and Node.js. 

Firebase is used for login authentication. User's email and password are stored in Firebase. Whenever the user wants to login, their provided credentials are checked against the values stored in the Firebase. The codes upon which this application is built are independently developed by our team members. The data used to develop the application is Biometric data collected currently only through Fitbit, though the goal is to expand the collection capability to be able to obtain Apple Watch data as well. 

This data is accessed through an external Merck API which is linked through an SCTP request. Our application’s users are patients and their information is very confidential, It is important to implement our login and authentication system securely. Instead of building a secure login system from scratch by ourselves, we chose to use a pre-existing login authentication solution--firebase. In firebase, users’ passwords are first encrypted and then stored. Even if hackers successfully gain access to firebase’s database, they still would not know the passwords because everything stored there is the encrypted version. 

We use Amazon S3 to store all of our user and questionnaire images. Unlike MySQL, Amazon S3 provides us with a ready-to-use file system that is more efficient to store large data such as images.

We use MySQL to store all the data other than images. Information related to the data schema used in our MySQL database is in Data Architecture Team's document.

Besides, our main backend is Node.js. It is used to help the Frontend communicate with the MySQL database. It also helps the frontend store image to Amazon S3 instance.