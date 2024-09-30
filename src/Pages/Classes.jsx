import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import "./Styles/Classes.css";
import config from "../config";
import { decodeId } from '../Components/Access/EncodeDecode';
import { encodeId } from '../Components/Access/EncodeDecode';
import nrf from "./Assets/nrfimage.jpeg"

const Classes = () => {
  const { class_id } = useParams();
  const decodedId = decodeId(class_id); // Decode the ID for internal use
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [className, setClassName] = useState(''); // State for class name

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}/fullmarks-user/navbar/fetchbooksforclasses.php?class_id=${decodedId}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setBooks(data);
          if (data.length > 0) {
            setClassName(data[0].class_name); // Adjust based on actual data
          }
        } else {
          console.error('Unexpected response data:', data);
          setBooks([]);
        }
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBooks();
  }, [decodedId]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBooks = books.filter(book =>
    book.book_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="containerx mt-4">
        <br /><br />
        <div className='d-flex justify-content-between'>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-12 d-flex justify-content-between">
            <div className='text-black mt-2 h5 fw-bold'>
              Books for {className}
            </div>
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search by book name"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
        <div className="bg-white shadow-lg p-3 mt-3 mb-5 rounded">
          <div className="row mt-3">
            {filteredBooks.length === 0 ? (
              <div className="col-12 text-center">
                <img className='nfr-dim' src={nrf} alt="No books found" />
                <p className='fw-bold'>No books found.</p>
              </div>
            ) : (
              filteredBooks.map((book) => (
                <div key={book.book_id} className="col-md-3 mb-4 d-flex">
                  <div className="book-item flex-grow-1 d-flex flex-column">
                    <Link to={`/book/${encodeId(book.book_id)}`} className="book-link">
                      {book.book_cover && (
                        <div className='book-cover'>
                          <img src={`${config.apiBaseUrl}/admin/fullmarks-server/uploads/book_cover/${book.book_cover}`} alt="Book Cover" className="img-fluid" />
                        </div>
                      )}
                    </Link>
                    <div className='h5 text-center mt-2 flex-grow-1'>
                      <Link to={`/book/${encodeId(book.book_id)}`} className="book-link">{book.book_name}</Link>
                    </div>
                    <div className="text-center mt-2">
                      <Link to={`/book/${encodeId(book.book_id)}`} className="book-link">
                        <button type="button" className='mx-1 btn btn-warning'>View Details</button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Classes;
