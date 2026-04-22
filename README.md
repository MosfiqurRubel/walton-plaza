# WaltonShop E-commerce Frontend

A modern e-commerce frontend built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Redux Toolkit**. This project includes product listing, product details, cart management with persistence, and responsive UI.

---

## 🚀 Features

* Product listing with responsive cards
* Product details page
* Add to cart / remove from cart
* Cart quantity update
* Persistent cart using Redux Persist
* Product image gallery
* Discount / price display
* Mobile responsive design
* Smooth UI interactions

---

## 🛠️ Tech Stack

* **Next.js 16 (App Router)**
* **React 19**
* **TypeScript**
* **Tailwind CSS v4**
* **Redux Toolkit**
* **Redux Persist**
* **RTK Query**
* **Apollo Client / GraphQL**
* **Lucide React Icons**

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone git@github.com:MosfiqurRubel/walton-plaza.git
cd walton-plaza
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

### 4. Build for production

```bash
npm run build
```
---

## ⚙️ Environment Setup

Create a `.env.local` file (if needed for API configuration):

```env
NEXT_PUBLIC_GRAPHQL_API=http://localhost:3000/api/graphql
```

> Update the API URL based on your backend / GraphQL endpoint configuration.

---

## 📁 Project Structure

```bash
app/
 ┣ components/
 ┃ ┣ product/
 ┃ ┣ ui/
 ┣ store/
 ┃ ┣ slices/
 ┃ ┣ hooks.ts
 ┣ products/
 ┣ cart/
 ┣ providers.tsx
 ┗ layout.tsx
```

---

## 🛒 Cart State Management

Cart is managed using **Redux Toolkit**.

### Cart actions:

* Add product
* Remove product
* Increase / decrease quantity
* Clear cart

### Persistence:

Cart data is stored in browser localStorage using **redux-persist**, so cart items remain after page reload.

---

## 📸 Screens / Pages

* Home page
* Products page
* Product details page
* Cart page

---

## 🧑‍💻 Development Notes

* Uses dynamic imports for better performance
* Optimized images with Next.js Image
* Reusable UI components
* Clean folder structure

---
