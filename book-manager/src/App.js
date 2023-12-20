import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './BookList';
import AddBook from './AddBook';
import SearchBook from './SearchBook';
import BorrowManage from './BorrowManage';  // 确保您有这个组件

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<BookList />} exact />
          <Route path="/add" element={<AddBook />} />
          <Route path="/search" element={<SearchBook />} />
          <Route path="/manage" element={<BorrowManage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
