# 🛒 Shop.co - E-Commerce Website

Welcome to **Shop.co**, a clean, stylish e-commerce website made with **Node.js** and **Angular**. This project showcases a modern shopping experience with dynamic features and a seamless user interface.

🌐 **Live Demo:** [shopco-fs-webmasters.netlify.app](https://shopco-fs-webmasters.netlify.app/)

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed:
- **Node.js** (v16+)
- **Angular CLI** (v17+)

### 📦 Installation

To install all required **npm packages** for both the Node.js backend and Angular frontend, simply run:

```bash
cd frontend
npm install:all
```

▶️ Running the Application

To run both the **Node.js server** and the **Angular frontend** in one go, execute:

```bash
cd frontend
npm start:fs
```

The application should be up and running! 🌟

*   The **Node.js** backend (with APIs and cart management) will be available on localhost:8888.

*   The **Angular** frontend will be available on localhost:4200.


📁 Project Structure
--------------------

This project is divided into two main folders:

*   frontend/: Contains the **Angular** code (UI/UX, cart display, store item management).

*   backend/: Contains the **Node.js** server (API endpoints, cart operations, product data handling).


⚙️ Features
-----------

*   **Shopping Cart**: Add, update, and remove items from your cart dynamically. Items persist via local storage and server sync.

*   **Dynamic Price Updates**: Total cart price updates automatically as products are added or removed.

*   **Product Management**: Products can be filtered and updated based on user input.

*   **Color Customization**: Choose colors for products, which will be merged with existing selected colors in the cart.

*   **Netlify and Local Compatibility**: The app works on both **Netlify** and **local environments**, with environment-specific handling.


🛠️ Development Notes
---------------------

*   **Backend APIs**: The backend is built using **Node.js** and provides routes for adding, updating, and removing products from the user’s cart.

*   **Angular Signals**: Angular’s signals are used for managing state in the frontend, ensuring reactivity and dynamic updates.

*   **SCSS Styling**: The project uses SCSS with variable definitions for consistent and clean styling.

*   **Bootstrap Integration**: Responsive UI is powered by **Bootstrap**, ensuring the app looks great on all devices.


🔧 Available Scripts
--------------------

In the project, you can run:

*   npm install:all: Installs all backend and frontend dependencies.

*   npm start:fs: Starts both the backend and frontend for fullstack development.

*   npm run build: Builds the Angular app for production.

*   npm start: Starts the **Node.js** server alone.


💡 Future Improvements
----------------------

*   **User Authentication**: Implement user login and authentication for a personalized shopping experience.

*   **Search and Filters**: Enhance the product search and filtering capabilities.

*   **Payment Integration**: Add a payment gateway for seamless checkout.


💻 Technologies Used
--------------------

*   **Frontend**: Angular 17, SCSS, Bootstrap

*   **Backend**: Node.js, Express.js, Netlify Functions

*   **Deployment**: Netlify


👨‍💻 Author
------------

*   **Ahmed** – [GitHub Profile](#)
*   **Abdelrahman Essam** - [GitHub Profile](https://github.com/abdelrhmanvh)
------------

📜 License
This project is licensed under the MIT License.


