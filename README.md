<h1>AuraLux E-Commerce Platform</h1>
<p>AuraLux is an e-commerce platform where users can browse and purchase various products such as perfumes, bags, watches, shoes, and more. Users can register, manage their profiles, add products to their cart, place orders, and mark products as favorites. The project also has admin functionality to manage products and users.</p>
<br>

<h2>Tech Stack</h2>
<h3>Frontend:</h3>
<li>Angular 19: A platform for building scalable web applications.</li>
<li>Angular Material: A UI component library for Angular that provides pre-built components like buttons, forms, etc.</li>
<li>RxJS: A library for reactive programming that handles asynchronous data streams in Angular.</li>

<h3>Backend:</h3>
<li>Express: A minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications.</li>
<li>Node.js: A JavaScript runtime built on Chrome's V8 engine that allows server-side scripting using JavaScript.</li>
<li>MongoDB: A NoSQL database that stores data in flexible, JSON-like documents.</li>

<h3>Authentication:</h3>
<li>JWT (JSON Web Tokens): For secure user authentication and maintaining sessions.</li>

<h3>State Management:</h3>
<li>RxJS BehaviorSubjects: Used for handling authentication state and loading indicators in the frontend.</li>

<br>

<h2>Functionality</h2>

<h3>User Features</h3>
<p>:heavy_check_mark: Browse Products: Users can browse through a variety of products, including perfumes, bags, watches, and shoes.</p>
<p>:heavy_check_mark: Register/Login: Users can create an account, log in, and manage their profiles.</p>
<p>:heavy_check_mark: Add to Cart: Users can add products to their cart and proceed to place an order.</p>
<p>:heavy_check_mark: Manage Profile: Users have a personal profile where they can:</p>
	<li>Edit personal details such as name, email, and phone number.</li>
	<li>View and manage their wishlist and order history.</li>
	<li>Add shipping address information.</li>

<br>

<h3>Admin Features</h3>
<p>:heavy_check_mark: Manage Products: Admin users can create, update, or delete products.</p>
<p>:heavy_check_mark: Manage Users: Admins can view and manage all users, including promoting or demoting users to/from admin status.</p>
<p>:heavy_check_mark: Manage Categories: Admin users can create, update, or delete categories.</p>
<br>
<br>
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

<h2>Conclusion</h2>
<p>AuraLux is a full-stack e-commerce application where users can browse products, manage their profiles, and place orders. Admin users have additional privileges for managing products and users. The project uses Angular for the frontend, Express.js for the backend, and MongoDB for data storage.</p>
