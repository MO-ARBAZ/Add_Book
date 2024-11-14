import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import EditBook from "./components/EditBook";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans">
        {/* Header */}

        {/* Navigation Bar */}
        <nav className="bg-blue-700 text-white py-4 shadow-md fixed w-full top-0 left-0 z-50">
          <div className="container mx-auto flex justify-center space-x-6">
            <Link to="/" className="hover:bg-blue-500 py-2 px-4 rounded-md">
              Home
            </Link>
            <Link to="/add" className="hover:bg-blue-500 py-2 px-4 rounded-md">
              Add Book
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto mt-24">
          {" "}
          {/* Increased margin-top to prevent overlap with fixed navbar */}
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/add" element={<AddBook />} />
            <Route path="/edit/:id" element={<EditBook />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
