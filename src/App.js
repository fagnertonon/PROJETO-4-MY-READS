import React from 'react'
import Shelf from "./Shelf";
import Search from "./Search";
import * as BooksAPI from "./BooksAPI";
import { Link, Route } from "react-router-dom";
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchBooks: []
  }
  componentDidMount() {
    this.fetchBooks();
  }

  async fetchBooks() {
    const books = await BooksAPI.getAll()
    this.setState({ books });
  }

  getShelfBooks(shelfName) {
    return this.state.books.filter((b) => b.shelf === shelfName)
  }

  changeShelf = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then(() => {
      book.shelf = newShelf;

      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }));
    });
  };
  updateQuery = (query) => {
    if (query) {
      BooksAPI.search(query, 30).then((books) => {
        if (books.length) {
          books.forEach((book, index) => {
            let myBook = this.state.books.find((b) => b.id === book.id);
            book.shelf = myBook ? myBook.shelf : 'none';
            books[index] = book;
          });

          this.setState({
            searchBooks: books
          });
        }

      });
    } else {
      this.setState({
        searchBooks: []
      });
    }
  };

  render() {
    return (

      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf
                  title="Currently Reading"
                  books={this.getShelfBooks("currentlyReading")}
                  changeShelf={this.changeShelf}
                />
                <Shelf
                  title="Want to Read"
                  books={this.getShelfBooks("wantToRead")}
                  changeShelf={this.changeShelf}
                />
                <Shelf
                  title="Read"
                  books={this.getShelfBooks("read")}
                  changeShelf={this.changeShelf}
                />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
        <Route path="/search" render={({ history }) => (
          <Search
            books={this.state.searchBooks}
            updateQuery={this.updateQuery}
            changeShelf={this.changeShelf}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
