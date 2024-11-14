import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function BookList() {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  useEffect(() => {
    // Fetch all books from the backend
    axios
      .get("http://localhost:4000/api/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the books:", error);
      });
  }, []);

  // Function to open the modal and set the book to delete
  function openModal(bookId) {
    setBookToDelete(bookId);
    setIsModalOpen(true);
  }

  // Function to close the modal
  function closeModal() {
    setIsModalOpen(false);
    setBookToDelete(null);
  }

  // Handle book deletion
  function handleDelete() {
    axios
      .delete(`http://localhost:4000/api/books/${bookToDelete}`)
      .then(() => {
        setBooks(books.filter((book) => book._id !== bookToDelete));
        closeModal(); // Close the modal after deletion
      })
      .catch((error) => {
        console.error("There was an error deleting the book:", error);
      });
  }

  return (
    <div className="container mx-auto p-6">
      {/* Heading */}
      {/* <h2 className="text-3xl font-bold text-center mb-6">All Books</h2> */}

      {/* Book List Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition duration-300"
          >
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
              <p className="text-gray-700 mb-4">{book.author}</p>
              <p className="text-gray-600 text-sm">
                {book.description.slice(0, 100)}...
              </p>
              <div className="mt-4 flex justify-between">
                <Link
                  to={`/edit/${book._id}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </Link>
                <button
                  onClick={() => openModal(book._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this book?
            </p>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookList;
