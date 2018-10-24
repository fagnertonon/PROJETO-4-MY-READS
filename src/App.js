//https://github.com/tsega/udacity-reactnd-project-myreads/tree/master/src

import React from 'react'
import Shelf from "./Shelf";
import Book from './Book';
import Search from "./Search";
import * as BooksAPI from "./BooksAPI";

// import { Link } from 'react-router-dom'

// import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     * 
     * * TODO: Em vez de usar essa variável de estado para rastrear qual página
     * estamos em, use o URL na barra de endereços do navegador. Isso garantirá que
     * os usuários podem usar os botões voltar e avançar do navegador para navegar entre
     * páginas, bem como fornecer um bom URL que eles podem marcar e compartilhar.
     */
    books: [],
    showSearchPage: false
  }
  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  getShelfBooks(shelfName) {
    return this.state.books.filter((b) => b.shelf === shelfName)
  }

  changeShelf = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then(() => {
      // Update the local copy of the book
      book.shelf = newShelf;

      // Filter out the book and append it to the end of the list
      // so it appears at the end of whatever shelf it was added to.
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }));
    });
  };
  updateQuery = (query) => {
    if (query) {
      BooksAPI.search(query, this.MAX_RESULTS).then((books) => {
        // if the BookAPI.search worked properly, this would be unnecessary
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
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
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
                {/* <Link to="/search">Add a book</Link> */}
              </div>
            </div>)}
      </div>
    )
  }
}

export default BooksApp
