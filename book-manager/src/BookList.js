import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookList() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = () => {
        axios.get('http://127.0.0.1:5000/books')
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => console.log(error));
    };

    const handleDelete = (id) => {
        axios.delete(`http://127.0.0.1:5000/books/${id}`)
            .then(() => {
                setBooks(books.filter(book => book.id !== id));
            })
            .catch(error => console.log(error));
    };

    return (
        <div>
            <h2>Book List</h2>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        {book.title} - {book.author}
                        <button onClick={() => handleDelete(book.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BookList;
