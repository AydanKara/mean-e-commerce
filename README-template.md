# AuraLux E-Commerce Platform

![](/frontend/public/assets/desktop-preview.png)

<p>AuraLux is an e-commerce platform where users can browse and purchase various products such as perfumes, bags, watches, shoes, and more. Users can register, manage their profiles, add products to their cart, place orders, and mark products as favorites. The project also has admin functionality to manage products and users.</p>

## Table of contents

- [Overview](#overview)
  - [Application structure](#application-structure)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### Application structure

- Public part (accessible without authentication)
- Private part (available for registered users)
- Admin part (available for admin users)

### The challenge

#### Public part(Guest users):

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- See the all products in Shop page
- Receive form validations if fields are missed or incorrect at Login or Register pages

#### Private part(Registered users):

- Have a personal area in the web application
- Have access to user's profiles management functionality
  - Orders management
  - Wishlist management
  - Adding Personal Info and Addresses
  - Adding Payment information
- Add/Remove products from the cart
- Edit product quantities in the cart
- See an order confirmation page after checking out

#### Admin part(Admin users):

- Have a personal area in the web application - Admin Dashboard
- Have access to create, edit and delete products
- Have access to create, edit and delete categories
- Manage user orders
- Have access to Users List in the Database and change their status

### Screenshot

![](/frontend/public/assets/screens.png)

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
