import React, { useState } from 'react';
import axios from 'axios';

function AddBook() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://127.0.0.1:5000/books', {
            title,
            author,
            description
        })
            .then(() => {
                alert('Book added successfully');
                setTitle('');
                setAuthor('');
                setDescription('');
            })
            .catch(error => console.log(error));
    };

    return (
        <div>
            <h2>Add a New Book</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Author:</label>
                    <input type="text" value={author} onChange={e => setAuthor(e.target.value)} />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)}></textarea>
                </div>
                <button type="submit">Add Book</button>
            </form>
        </div>
    );
}

export default AddBook;
