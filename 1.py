from datetime import datetime, timedelta
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///books.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    author = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(255))
    is_borrowed = db.Column(db.Boolean, default=False)

class BorrowRecord(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'), nullable=False)
    borrow_date = db.Column(db.DateTime, default=datetime.utcnow)
    due_date = db.Column(db.DateTime)
    return_date = db.Column(db.DateTime)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.due_date = self.borrow_date + timedelta(days=30)

@app.route('/books', methods=['GET', 'POST'])
def handle_books():
    if request.method == 'GET':
        books = Book.query.all()
        return jsonify([{
            'id': book.id, 
            'title': book.title, 
            'author': book.author, 
            'description': book.description, 
            'is_borrowed': book.is_borrowed
        } for book in books])
    elif request.method == 'POST':
        data = request.json
        new_book = Book(title=data['title'], author=data['author'], description=data.get('description', ''))
        db.session.add(new_book)
        db.session.commit()
        return jsonify({'id': new_book.id}), 201

@app.route('/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    book = Book.query.get(book_id)
    if book is None:
        return jsonify({'message': 'Book not found'}), 404
    db.session.delete(book)
    db.session.commit()
    return jsonify({'message': 'Book deleted'}), 200

# ... [其他路由和函数，包括借阅、还书和续借等] ...

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)
