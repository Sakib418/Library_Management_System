# 📚 Library Management System

A RESTful API for managing books and borrow operations, built with **Express**, **TypeScript**, and **MongoDB (Mongoose)**.



## 🚀 Features

- ✅ Add new books (`POST /api/books`)
- ✅ Get all books with:
  - Filtering by genre
  - Sorting by fields (e.g. `createdAt`)
  - Limiting results
- ✅ Get book by ID (`GET /api/books/:bookId`)
- ✅ Update book information (`PUT /api/books/:bookId`)
- ✅ Delete a book (`DELETE /api/books/:bookId`)
- ✅ Create borrow records (`POST /api/borrow`) *(if implemented)*
- ✅ Uses `ts-node-dev` for fast development
- ✅ Well-structured code with MVC pattern and TypeScript interfaces
- ✅ Clean and consistent API response format



## 🧱 Tech Stack

- **Backend:** Node.js, Express.js
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose
- **Tools:** ts-node-dev, dotenv, cors


## 🛠️ Setup Instructions

### 1. Clone the Repository

### 2. Install Dependencies

npm install

### 3. Create a `.env` File

In the root of the project:


DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.aine5.mongodb.net/?retryWrites=true&w=majority


> Replace DATABASE_URL with your MongoDB Atlas credentials.

### 4. Run the Application

npm run dev


Server should run on: `http://localhost:5000`

