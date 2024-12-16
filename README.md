# mean-e-commerce
This is a a web application (Single Page Application) using MongoDB, Express.js, Angular, Node.js

<h2>Starting the app locally</h2>

<h3>To run the application on your local machine, follow these steps:</h3>

1. Clone the repository:
```bash
git clone https://github.com/AydanKara/mean-e-commerce.git
```
2. Start the Backend Server: <br>
   2.1 Open a terminal and navigate to the server directory /backend
   ```bash
   cd .\mean-e-commerce\backend\
   ```
   2.2 Instal dependencies
   ```bash
   npm install
   ```
   2.3 Create .env file in the backend folder and copy these variables into the file:
   ```bash
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/mean-ecommerce
   PORT=5500
   JWT_SECRET=your_jwt_secret_key
   FRONT_END_URL=http://localhost:4200
   ```
   2.4 Start the server
   ```bash
   npm run dev
   ```

3. Start the Frontend: <br>
    3.1 Open another terminal and navigate to the frontend directory 
   ```bash
   cd .\mean-e-commerce\frontend\
   ```
   3.2 Install dependencies
    ```bash
   npm install
    ```
   3.3 Create environments folder in /frontend/src/
   
   3.4 Add two files into this folder
   ```bash
   /frontend/src/environments
     1. environment.prod.ts
	    export const environment = {
	      production: true,
	      apiUrl: 'https://api.yourdomain.com/api',
	    };
     
     2. environment.ts
	    export const environment = {
	      production: false,
	      apiUrl: 'http://localhost:5500/api',
	    };
   ```
   3.4 Start the development server
   ```bash
   ng serve
   ```

<h3>And you are ready to go!</h3>
