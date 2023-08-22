# Frontend Chat with Custom AI Model

Welcome to the hiring task for gstudio.ai! In this task, your objective is to create a frontend application that allows users to chat with a custom AI model. You will be provided with the necessary resources to set up the environment and interact with the AI model.


## How to run
- Clone or download this repository.
- Open the repository in a terminal.

#### Backend (AI Model):
- Create a virtual environment using [virtualenv](https://virtualenv.pypa.io/en/latest/user_guide.html) or any other library of your choice. If using virtualenv, run `virtualenv venv` in the terminal to create the virtual environment.
- Activate the virtual environment created. For virtualenv, run `venv\scripts\activate` in the terminal to activate the environment.
- Run `pip install -r requirements.txt` to install all the dependencies.
- Now, run the cells of this [colab](https://colab.research.google.com/drive/1BkL7zYVYtn0JPYKMPJ0tJmK-zMtINx0P?usp=sharing) notebook. Once all the cells are executed, copy the ssl link which will look similar to this: `wss://your-uri-here.trycloudflare.com/api/v1/stream`
- Create a dotenv file and paste the following in it:
    ```
    MODEL_HOST_STRING = '<YOUR_MODEL_HOST_STRING>'
    ```
- Run `uvicorn main:app` to run the backend server. The server will be accessible [here](http://127.0.0.1:8000/).

#### Frontend:
- Open the repository in another terminal and cd into the frontend directory.
- Run `npm install` in the terminal to install all the dependencies.
- Open firebase [console](https://firebase.google.com/) and create a new project. Register a web app to get your firebase credentials.
- Create a dotenv file and paste the following content in it. Make sure to replace the values with your own firebase values.
    ```
    VITE_FIREBASE_API_KEY = "<YOUR_VITE_FIREBASE_API_KEY>"
    VITE_FIREBASE_AUTH_DOMAIN = "<YOUR_VITE_FIREBASE_AUTH_DOMAIN>"
    VITE_FIREBASE_PROJECT_ID = "<YOUR_VITE_FIREBASE_PROJECT_ID>"
    VITE_FIREBASE_STORAGE_BUCKET = "<YOUR_VITE_FIREBASE_STORAGE_BUCKET>"
    VITE_FIREBASE_MESSAGING_SENDER_ID = "<YOUR_VITE_FIREBASE_MESSAGING_SENDER_ID>"
    VITE_FIREBASE_APP_ID = "<YOUR_VITE_FIREBASE_APP_ID>"
    ```
- Run `npm run dev` to start the application.
- The frontend can be accessed at [localhost:5173](http://localhost:5173/).