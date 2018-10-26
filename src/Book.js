import React, { Component } from "react";
import PropTypes from "prop-types";
import ShelfChanger from "./ShelfChanger"
import noCover from './images/no-cover-image.png';

class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        changeShelf: PropTypes.func.isRequired
    };
    render() {
        const { book } = this.props;
        const coverImg = book.imageLinks ? book.imageLinks.thumbnail : noCover;

        console.log( book.title);
        console.log( book.imageLinks);
        console.log(coverImg);
        return (
            <div className="book">
                <div className="book-top" id={book.id}>
                    <div className="book-cover" style={{ backgroundImage: `url("${coverImg}")` }}></div>

                    <ShelfChanger
                        book={book}
                        changeShelf={this.props.changeShelf}
                    >
                    </ShelfChanger>

                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.author}</div>
            </div>
        )
    }

}

export default Book;





// render() {
//     const { book } = this.props;
//     return (
//         <div className="book">
//             <div className="book-top">
//                 <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' }}></div>
//                 <div className="book-shelf-changer">
//                     <select>
//                         <option value="move" disabled>Move to...</option>
//                         <option value="currentlyReading">Currently Reading</option>
//                         <option value="wantToRead">Want to Read</option>
//                         <option value="read">Read</option>
//                         <option value="none">None</option>
//                     </select>
//                 </div>
//             </div>
//             <div className="book-title">To Kill a Mockingbird</div>
//             <div className="book-authors">Harper Lee</div>
//         </div>
//     )
// }