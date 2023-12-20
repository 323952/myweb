import React, { useState } from 'react';
import axios from 'axios';

function BorrowManage() {
    const [bookId, setBookId] = useState('');
    const [message, setMessage] = useState('');

    const handleBorrow = () => {
        axios.post(`http://127.0.0.1:5000/books/borrow/${bookId}`)
            .then(response => {
                setMessage(`Book borrowed successfully. Due date: ${response.data.due_date}`);
                setBookId('');
            })
            .catch(error => {
                setMessage('Error borrowing book: ' + (error.response?.data.message || error.message));
            });
    };

    const handleReturn = () => {
        axios.post(`http://127.0.0.1:5000/books/return/${bookId}`)
            .then(response => {
                setMessage('Book returned successfully.');
                setBookId('');
            })
            .catch(error => {
                setMessage('Error returning book: ' + (error.response?.data.message || error.message));
            });
    };

    return (
        <div>
            <h2>Borrow Management</h2>
            <input
                type="text"
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
                placeholder="Enter Book ID"
            />
            <button onClick={handleBorrow}>Borrow Book</button>
            <button onClick={handleReturn}>Return Book</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default BorrowManage;
