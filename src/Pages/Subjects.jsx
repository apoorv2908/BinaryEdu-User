import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import "./Styles/Classes.css";
import config from "../config";
import { decodeId } from '../Components/Access/EncodeDecode';
import { encodeId } from '../Components/Access/EncodeDecode';
import nrf from "./Assets/nrfimage.jpeg";

const Subjects = () => {
  const { subject_id } = useParams();
  const decodedId = decodeId(subject_id); // Decode the ID for internal use
  const [books, setBooks] = useState([]);
  const [subjectContent, setSubjectContent] = useState(''); // State for subject content
  const [subjectName, setSubjectName] = useState(''); // State for subject name
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch both books and subject details (including subject name)
    fetch(`${config.apiBaseUrl}/fullmarks-user/navbar/fetchbooksforsubjects.php?subject_id=${decodedId}`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setBooks(data.books);
          setSubjectContent(data.subjectContent); // Set subject content
          setSubjectName(data.subjectName); // Set subject name
        } else {
          console.error('Unexpected response data:', data);
          setBooks([]);
          setSubjectName(data.subjectName); // Still set the subject name even if no books
        }
      })
      .catch(error => console.error('Error fetching book details:', error));
  }, [subject_id]);

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
            {/* Render subject name regardless of filteredBooks length */}
            {subjectName && (
              <div className='text-black mt-2 h5 fw-bold'>
                Books for {subjectName}
              </div>
            )}
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
        <hr></hr>
        {/* Display the subject content */}
        <div className="bg-light p-3 mt-3 mb-5 rounded">
          <div dangerouslySetInnerHTML={{ __html: subjectContent }} />
        </div>
        <div className="bg-white shadow-lg p-3 mt-3 mb-5 rounded">
          <div className="row mt-3">
            {/* Render "No books found" message if there are no books */}
            {filteredBooks.length === 0 && (
              <div className="col-12 text-center">
                <img className='nfr-dim' src={nrf} alt="No Books Found" />
                <p className='fw-bold'>No books found.</p>
              </div>
            )}
            {filteredBooks.map((book) => (
              <div key={book.book_id} className="col-md-3 mb-4">
                <div className="book-item">
                  <Link to={`/book/${encodeId(book.book_id)}`} className="book-link">
                    {book.book_cover && (
                      <div className='book-cover'>
                        <img src={`${config.apiBaseUrl}/admin/fullmarks-server/uploads/book_cover/${book.book_cover}`} alt="Book Cover" className="img-fluid" />
                      </div>
                    )}
                  </Link>
                  <div className='h5 text-center mt-2'>
                    <Link to={`/book/${encodeId(book.book_id)}`} className="book-link">{book.book_name}</Link>
                  </div>
                  <div className="text-center mt-2">
                    <Link to={`/book/${encodeId(book.book_id)}`} className="book-link">
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
}

export default Subjects;
