# Thread - Modern E-Commerce Platform

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Redux-4.2.1-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux" />
  <img src="https://img.shields.io/badge/Styled_Components-5.3.10-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" alt="Styled Components" />
  <img src="https://img.shields.io/badge/React_Router-6.11.1-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router" />
</div>

<div align="center">
  <p><strong>Thread</strong> is a modern, responsive e-commerce platform built with React and Redux.</p>
  <p>Featuring a sleek dark mode, intuitive navigation, and a seamless shopping experience.</p>
</div>

## ✨ Features

<div align="center">
  <table>
    <tr>
      <td align="center">🌓 Dark/Light Mode</td>
      <td align="center">🛒 Shopping Cart</td>
      <td align="center">🔍 Product Search</td>
    </tr>
    <tr>
      <td align="center">👤 User Authentication</td>
      <td align="center">💳 Checkout Process</td>
      <td align="center">📱 Responsive Design</td>
    </tr>
    <tr>
      <td align="center">🔎 Product Filtering</td>
      <td align="center">⭐ Product Reviews</td>
      <td align="center">❤️ Wishlist</td>
    </tr>
  </table>
</div>

## 🚀 Live Demo

Check out the live demo of Thread: [https://shopping-app-bxmt.vercel.app/](https://shopping-app-bxmt.vercel.app/)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Integration](#-api-integration)
- [State Management](#-state-management)
- [Styling](#-styling)
- [Responsive Design](#-responsive-design)
- [Performance Optimizations](#-performance-optimizations)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

## 🛠 Tech Stack

<div align="center">
  <table>
    <tr>
      <th>Category</th>
      <th>Technologies</th>
    </tr>
    <tr>
      <td>Frontend Framework</td>
      <td>React 18, React Hooks</td>
    </tr>
    <tr>
      <td>State Management</td>
      <td>Redux Toolkit, Redux Thunk</td>
    </tr>
    <tr>
      <td>Routing</td>
      <td>React Router v6</td>
    </tr>
    <tr>
      <td>Styling</td>
      <td>Styled Components, CSS Variables</td>
    </tr>
    <tr>
      <td>HTTP Client</td>
      <td>Axios</td>
    </tr>
    <tr>
      <td>Form Handling</td>
      <td>React Hook Form</td>
    </tr>
    <tr>
      <td>Icons</td>
      <td>Font Awesome</td>
    </tr>
    <tr>
      <td>API</td>
      <td>MockAPI</td>
    </tr>
  </table>
</div>

## 📂 Project Structure

```
thread-ecommerce/
├── public/                 # Static files
├── src/
│   ├── components/         # Reusable components
│   │   ├── auth/           # Authentication components
│   │   ├── cart/           # Shopping cart components
│   │   ├── layout/         # Layout components (Header, Footer)
│   │   ├── product/        # Product-related components
│   │   └── ui/             # UI components (buttons, inputs, etc.)
│   ├── pages/              # Page components
│   ├── redux/              # Redux store and slices
│   │   ├── slices/         # Redux Toolkit slices
│   │   └── store.js        # Redux store configuration
│   ├── styles/             # Global styles and theme
│   ├── utils/              # Utility functions
│   ├── App.js              # Main App component
│   └── index.js            # Entry point
└── package.json            # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/thread-ecommerce.git
   cd thread-ecommerce
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## 🔌 API Integration

Thread uses the MockAPI service to simulate a backend. The API endpoints include:

- `/product` - Get all products
- `/product/:id` - Get a specific product
- `/order` - Place an order

API calls are handled using Axios and Redux Thunk for asynchronous actions.

## 📊 State Management

Thread uses Redux Toolkit for state management with the following slices:

- `productSlice` - Manages product data and filtering
- `cartSlice` - Handles shopping cart functionality
- `authSlice` - Manages user authentication
- `uiSlice` - Controls UI state (dark mode, notifications, etc.)

## 💅 Styling

The application uses Styled Components with a theme provider that supports both dark and light modes. The theme includes:

- Color palette
- Typography
- Spacing
- Shadows
- Border radii
- Breakpoints for responsive design

## 📱 Responsive Design

Thread is fully responsive and works on devices of all sizes:

- Mobile-first approach
- Responsive grid layouts
- Adaptive navigation (hamburger menu on mobile)
- Optimized images for different screen sizes

## ⚡ Performance Optimizations

- Code splitting with React.lazy and Suspense
- Memoization with React.memo and useMemo
- Redux state normalization
- Optimized images
- Lazy loading of images and components

## 🔮 Future Enhancements

- User profiles with order history
- Advanced filtering and sorting
- Product recommendations
- Payment gateway integration
- Admin dashboard
- Multi-language support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">
  <p>Designed and developed with ❤️ by <a href="https://github.com/yourusername">Your Name</a></p>
  <p>© 2023 Thread. All rights reserved.</p>
</div>
