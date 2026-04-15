# Flipkart Clone (MERN Stack)

A fully functional, responsive eCommerce web application inspired by Flipkart. Built from scratch using the MERN stack (MongoDB/PostgreSQL, Express.js, React.js, Node.js), this project serves as a comprehensive demonstration of a modern, multi-vendor online marketplace. 

It features a full authentication system, a complete shopping cart and checkout flow, order history tracking, an interactive wishlist, and integrated payment processing logic via Razorpay. The front-end leverages Material-UI to ensure a polished and fluid user experience across mobile, tablet, and desktop viewing environments.

## Core Features

- **Responsive Design:** A beautifully styled user interface seamlessly adapting to phones, tablets, and large desktop screens.
- **User Authentication:** Secure login and registration functionality protecting sensitive user actions.
- **Product Marketplace:** Explore, filter, and view detailed product specifications with integrated carousels and categories.
- **Wishlist & Cart Management:** Add items to personal wishlists or standard shopping carts with real-time quantity controls.
- **Checkout & Order Processing:** Fill in detailed delivery addresses and review order summaries before placing final orders.
- **Order History:** A dedicated dashboard for users to review past purchases and delivery statuses.
- **Email Notifications:** Automated HTML-formatted email confirmations sent out natively via Nodemailer on successful purchases.
- **Payment Gateway:** Configured to accept secure online payments via Razorpay integration (customizable/mockable for dev environments).

## Tech Stack Overview

- **Frontend:** React.js, Redux & Redux-Thunk (State Management), React Context API, Material-UI (Component Library)
- **Backend:** Node.js, Express.js 
- **Database:** Sequelize (PostgreSQL / SQLite integration) and Mongoose (MongoDB)
- **Payments:** Razorpay API
- **Others:** Axios, Nodemailer, JSON Web Tokens (session handling logic)

## Installation & Setup Guide

### Requirements
- Node.js installed on your machine.
- Basic understanding of running local React and Express environments.

### Running Locally

1. **Clone the repository:**
   Download or clone this project to your local machine.

2. **Backend Setup:**
   - Navigate to the `server/` directory: `cd server`
   - Install dependencies: `npm install`
   - Setup your environment variables: create a `.env` file containing any required endpoints (e.g., SMTP details for emails, Razorpay key, Database URI placeholder).
   - Start the backend server: `npm start` *(Runs on http://localhost:8000 by default)*

3. **Frontend Setup:**
   - Open a separate terminal and navigate to the `client/` directory: `cd client`
   - Install dependencies: `npm install`
   - Start the React development server: `npm start` *(Runs on http://localhost:3000)*



## License
Feel free to fork, explore, and utilize the codebase for learning or extending into your own entrepreneurial eCommerce platform.
