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
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### Application structure

- Public part (accessible without authentication)
- Private part (available for registered users)
- Admin part (available for admin users)

### The challenge

Public part(Guest users):

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- See the all products in Shop page
- Receive form validations if fields are missed or incorrect at Login or Register pages

Private part(Registered users):

- Have a personal area in the web application
- Have access to user's profiles management functionality
  - Orders management
  - Wishlist management
  - Adding Personal Info and Addresses
  - Adding Payment information
- Add/Remove products from the cart
- Edit product quantities in the cart
- See an order confirmation page after checking out

Admin part(Admin users):

- Have a personal area in the web application - Admin Dashboard
- Have access to create, edit and delete products
- HAve access to create, edit and delete categories
- Manage user orders
- Have access to Users List in the Database and change their status

### Screenshot

![](/frontend/public/assets/screens.png)

### Links

- Live Site URL: [AuraLux: Where Style Meets Elegance](https://aydankara.github.io/mean-e-commerce/home)

## My process

### Built with

### Frontend

- [Bootstrap v5.3](https://getbootstrap.com/) - Powerful, extensible, and feature-packed frontend toolkit.
- [Angular v19](https://angular.dev/) - A platform for building scalable web applications.
- [Angular Material](https://material.angular.io/) - A UI component library for Angular that provides pre-built components like buttons, forms, etc.
- [RxJS](https://rxjs.dev/): A library for reactive programming that handles asynchronous data streams in Angular.

### Backend

- [Express](https://expressjs.com/) - A minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications.
- [Node.js](https://nodejs.org/) - A JavaScript runtime built on Chrome's V8 engine that allows server-side scripting using JavaScript.
- [MongoDB](https://www.mongodb.com/) - A NoSQL database that stores data in flexible, JSON-like documents.

### Authentication

- [JWT (JSON Web Tokens)](https://jwt.io/) - For secure user authentication and maintaining sessions.

### What I learned

Use this section to recap over some of your major learnings while working through this project. Writing these out and providing code samples of areas you want to highlight is a great way to reinforce your own knowledge.

To see how you can add code snippets, see below:

```html
<h1>Some HTML code I'm proud of</h1>
```

```css
.proud-of-this-css {
  color: papayawhip;
}
```

```js
const proudOfThisFunc = () => {
  console.log("🎉");
};
```

If you want more help with writing markdown, we'd recommend checking out [The Markdown Guide](https://www.markdownguide.org/) to learn more.

**Note: Delete this note and the content within this section and replace with your own learnings.**

### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

### Useful resources

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@yourusername](https://www.twitter.com/yourusername)

**Note: Delete this note and add/remove/edit lines above based on what links you'd like to share.**

## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit.

**Note: Delete this note and edit this section's content as necessary. If you completed this challenge by yourself, feel free to delete this section entirely.**
