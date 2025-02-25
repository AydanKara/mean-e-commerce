# AuraLux E-Commerce Platform

![Angular](https://img.shields.io/badge/Angular-v19-red) ![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-blue) ![Node.js](https://img.shields.io/badge/Node.js-20-green) ![Express](https://img.shields.io/badge/Express-v4-black) ![MongoDB](https://img.shields.io/badge/MongoDB-v7-00ED64)

<p>AuraLux is an e-commerce platform where users can browse and purchase various products such as perfumes, bags, watches, shoes, and more. Users can register, manage their profiles, add products to their cart, place orders, and mark products as favorites. The project also has admin functionality to manage products and users.</p>

## Table of Contents

| Section | Subsection | Description |
|---------|------------|-------------|
| [Overview](#overview) |  | General project information |
|  | [Application Structure](#application-structure) | Breakdown of the project structure |
|  | [The Challenge](#-the-challenge) | Problems solved in this project |
|  | [Screenshots](#-screenshots) | Preview of the application |
|  | [Installation](#%EF%B8%8F-installation) | How to install and set up the project |
|  | [Links](#links) | Useful links related to the project |
| [My Process](#my-process) |  | Development approach |
|  | [Built With](#built-with) | Technologies and tools used |
|  | [Useful Resources](#useful-resources) | References that helped in development |
| [Author](#author) |  | About the creator of the project |

## Overview

### Application structure

- Public part (accessible without authentication)
- Private part (available for registered users)
- Admin part (available for admin users)

### 🚀 The Challenge

#### 👤 Guest Users
- 🖥️ Responsive design: View an optimal layout on any device  
- 🎨 Interactive UI: See hover states for all interactive elements  
- 🛍️ Browse all products in the **Shop page**  
- ⚠️ Form validation: Get error messages when fields are incorrect  

#### 🔐 Registered Users  
- 👤 Personal user area  
- 🛒 Manage orders, wishlist, and cart (add/remove/edit items)  
- 📝 Add personal info, addresses, and payment details  
- ✅ Checkout process with order confirmation  

#### 🛠️ Admin Users  
- 🖥️ **Admin Dashboard** for managing store operations  
- 🛍️ Add, edit, or remove products & categories  
- 📊 View and manage user orders  
- 🔑 Change user roles & permissions  

### 📸 Screenshots

#### 🏠 Homepage  

![](/frontend/public/assets/desktop-preview.png)
_A modern, clean homepage showcasing featured products._

#### 🛒 Shopping Cart  
![](/frontend/public/assets/cart.png)  
_Users can easily add, remove, or modify product quantities._

#### 🛍️ Checkout  
![](/frontend/public/assets/checkout.png)  
_An optimized, user-friendly checkout process._

### ⚙️ Installation

#### To run the application on your local machine, follow these steps

##### 1️⃣ Clone the Repository
Ensure you have **Git** installed, then run:

```bash
git clone https://github.com/AydanKara/mean-e-commerce.git
```

##### 2️⃣ 🔧 Backend Setup (Node.js + Express + MongoDB)
  📂 Navigate to the Backend Folder:

  ```bash
  cd .\mean-e-commerce\backend\
  ```

  📦 Install Dependencies:
  ```bash
  npm install
   ```

   ⚙️ Set Up Environment Variables:
    _Create a .env file inside the backend folder and add:_
    
   ```bash
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/mean-ecommerce
   PORT=5500
   JWT_SECRET=your_jwt_secret_key
   FRONT_END_URL=http://localhost:4200
   ```

   🚀 Start the server

   ```bash
   npm run dev
   ```

##### 3️⃣ 🎨 Frontend Setup (Angular 19 + Bootstrap)
   📂 Open another terminal and navigate to the frontend directory

   ```bash
   cd .\mean-e-commerce\frontend\
   ```

   📦 Install dependencies

   ```bash
   npm install
   ```

   🌍 Create environments folder in /frontend/src/

   🗂️ Add two files into this folder

   ```bash
   /frontend/src/environments
     1️⃣ environment.prod.ts
       export const environment = {
         production: true,
         apiUrl: 'https://api.yourdomain.com/api',
       };

     2️⃣ environment.ts
       export const environment = {
         production: false,
         apiUrl: 'http://localhost:5500/api',
       };
   ```

   🚀 Start the development server

   ```bash
   ng serve
   ```

<h3>And you are ready to go!</h3>

### Links

- Live Site URL: [AuraLux: Where Style Meets Elegance](https://aydankara.github.io/mean-e-commerce/home)

## My process

### Built with

#### Frontend

- [Bootstrap v5.3](https://getbootstrap.com/) - Powerful, extensible, and feature-packed frontend toolkit.
- [Angular v19](https://angular.dev/) - A platform for building scalable web applications.
- [Angular Material](https://material.angular.io/) - A UI component library for Angular that provides pre-built components like buttons, forms, etc.
- [RxJS](https://rxjs.dev/): A library for reactive programming that handles asynchronous data streams in Angular.

#### Backend

- [Express](https://expressjs.com/) - A minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications.
- [Node.js](https://nodejs.org/) - A JavaScript runtime built on Chrome's V8 engine that allows server-side scripting using JavaScript.
- [MongoDB](https://www.mongodb.com/) - A NoSQL database that stores data in flexible, JSON-like documents.

#### Authentication

- [JWT (JSON Web Tokens)](https://jwt.io/) - For secure user authentication and maintaining sessions.

### Useful resources

- [SoftUni](https://softuni.bg/) - The project was prepared during my studies at SoftUni. SoftUni is the largest and most respected educational IT institution in Bulgaria, providing training and career assistance in the fields of software engineering, digital marketing and design.
- [Pexels](https://www.pexels.com/) - Pexels provides high quality and completely free stock photos licensed under the Pexels license.

## Author

- Website - [Aydan Karamehmed](https://github.com/AydanKara)


## Conclusion
<p>AuraLux is a full-stack e-commerce application where users can browse products, manage their profiles, and place orders. Admin users have additional privileges for managing products and users. The project uses Angular for the frontend, Express.js for the backend, and MongoDB for data storage.</p>
