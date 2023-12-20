import React, { useState } from 'react';
import axios from 'axios';

function SearchBook() {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = (event) => {
        event.preventDefault();
        axios.get(`http://127.0.0.1:5000/books?search=${encodeURIComponent(searchQuery)}`)
            .then(response => {
                setResults(response.data);
            })
            .catch(error => console.log(error));
    };

    return (
        <div>
            <h2>Search Books</h2>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            <ul>
                {results.map(book => (
                    <li key={book.id}>{book.title} - {book.author}</li>
                ))}
            </ul>
        </div>
    );
}

export default SearchBook;
