import React, { Component } from 'react';
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
// import sortBy from 'sort-by'
import Book from './Book'


class Shelf extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        changeShelf: PropTypes.func.isRequired
    };

    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.map((book) => (
                            <li key={book.id} className="contact-list-item">
                                <Book
                                    book={book}
                                    changeShelf={this.props.changeShelf}>
                                </Book>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }

}

export default Shelf


// render() {
//     return (
//         <div className="bookshelf">
//             <h2 className="bookshelf-title">{this.props.title}</h2>
//             <div className="bookshelf-books">
//                 <ol className="books-grid">
//                     {this.props.books.map((book) => (
//                         <li key={book.id} className="contact-list-item">
//                             <Book
//                                 book={book}
//                             />
//                         </li>
//                     ))}
//                 </ol>
//             </div>
//         </div>
//     )
// }