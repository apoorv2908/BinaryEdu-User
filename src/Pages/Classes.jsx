import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import "./Styles/Classes.css";
import config from "../config";
import LoadingContext from '../Components/Access/LoadingContext';
import Loader from '../Components/Access/Loader';

const Classes = () => {
  const { class_id } = useParams();
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { loading, startLoading, stopLoading } = useContext(LoadingContext);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!dataFetched) {
        startLoading();
      }
      try {
        const response = await fetch(`${config.apiBaseUrl}/fullmarks-user/navbar/fetchbooksforclasses.php?class_id=${class_id}`);
        const data = await response.json();
        setBooks(data);
        setDataFetched(true);
        if (loading) {
          stopLoading();
        }
      } catch (error) {
        console.error('Error fetching book details:', error);
        if (loading) {
          stopLoading();
        }
      }
    };

    fetchBooks();
  }, [class_id, dataFetched, loading, startLoading, stopLoading]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBooks = books.filter(book =>
    book.book_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="containerx mt-4">
        <br /><br />
        <div className='d-flex justify-content-between'>
          Home/Class
        </div>
        <hr />
        <div className="row">
          <div className="col-md-12 d-flex justify-content-between">
            <div className='text-black mt-2 h5 fw-bold'>Books for {class_id}</div>
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
        <div className="bg-light shadow-lg p-3 mt-3 mb-5 rounded">
          <div className="row mt-3">
            {filteredBooks.map((book) => (
              <div key={book.book_id} className="col-md-3 mb-4">
                <div className="book-item">
                  <Link to={`/book/${book.book_id}`} className="book-link">
                    {book.book_cover && (
                      <div className='book-cover'>
                        <img src={`${config.apiBaseUrl}/fullmarks-server/uploads/${book.book_cover}`} alt="Book Cover" className="img-fluid" />
                      </div>
                    )}
                  </Link>
                  <div className='h5 text-center mt-2'>
                    <Link to={`/book/${book.book_id}`} className="book-link">{book.book_name}</Link>
                  </div>
                  <div className="text-center mt-2">
                    <Link to={`/book/${book.book_id}`} className="book-link">
                      <button type="button" className='mx-1 btn btn-warning'>View Details</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classes;
