import axios from "axios";

const API_URL = "https://backendfile-new.onrender.com/api"; // Change if your backend URL is different

// Get all books
export const getBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/books`);
    console.log(response, "GET");

    return response.data;
  } catch (error) {
    console.error("There was an error fetching the books!", error);
  }
};

// Create a new book
export const createBook = async (bookData) => {
  try {
    const response = await axios.post(`${API_URL}/create-book`, bookData);
    console.log(response, "REA");

    return response.data;
  } catch (error) {
    console.error("There was an error creating the book!", error);
  }
};

// Update an existing book
export const updateBook = async (id, bookData) => {
  try {
    const response = await axios.put(`${API_URL}/books/${id}`, bookData);
    return response.data;
  } catch (error) {
    console.error("There was an error updating the book!", error);
  }
};

// Delete a book
export const deleteBook = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/books/${id}`);
    return response.data;
  } catch (error) {
    console.error("There was an error deleting the book!", error);
  }
};
