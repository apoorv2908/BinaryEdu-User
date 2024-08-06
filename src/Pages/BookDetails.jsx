import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './Styles/BookDetails.css';
import config from "../config";
import AuthContext from '../Components/Access/AuthContext';
import LoginRequiredModal from '../Components/Access/LoginRequiredModal';
import share from "./Assets/share.png"
import { decodeId } from '../Components/Access/EncodeDecode';

const BookDetails = () => {
  const { book_id } = useParams();
  const decodedId = decodeId(book_id); // Decode the ID for internal use
  const [book, setBook] = useState({});
  const [chapters, setChapters] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false); // State for showing the modal
  const { user } = useContext(AuthContext); // Get the user from the AuthContext
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  useEffect(() => {
    fetch(`${config.apiBaseUrl}/fullmarks-user/navbar/fetchbookdetails.php?book_id=${decodedId}`)
      .then(response => response.json())
      .then(data => setBook(data))
      .catch(error => console.error('Error fetching book details:', error));

    fetch(`${config.apiBaseUrl}/fullmarks-user/navbar/fetchchapters.php?book_id=${decodedId}`)
      .then(response => response.json())
      .then(data => setChapters(data))
      .catch(error => console.error('Error fetching chapters:', error));
  }, [book_id]);

  const handleChapterClick = (chapterId) => {
    if (user) {
      navigate(`/chapterpages/${chapterId}`);
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <div className="containery m-5 bg-white shadow-lg p-3 mb-5 rounded">
      <br></br>
      <div className='d-flex justify-content-between'>
        Home/Class/{book.book_name}
      </div>
      <br></br>
      <div className="row">
        <div className="col-md-4 d-flex flex-column align-items-center">
          {book.book_cover && (
            <img src={`${config.apiBaseUrl}/fullmarks-server/uploads/${book.book_cover}`} alt="Book Cover" className="book-cover hipi img-fluid rounded" />
          )}
        </div>
        <div className="col-md-8">
          <div className= 'd-flex justify-content-between mt-2'>
          <h4 className="fw-bold">{book.book_name}</h4>
          <img className= 'share-logo' src= {share}></img>
          </div>
          <p className="text-grey fst-italic pre-wrap">{book.book_description}</p>
          <hr />
          <div className='fw-bold'>
            Chapters:
          </div>
          <div className='mt-2'>
            <ol className= 'bg-light'>
              {chapters.map(chapter => (
                <li  className= 'chapter-box' key={chapter.chapter_id} style={{ border: "none", cursor: "pointer" }} onClick={() => handleChapterClick(chapter.chapter_id)}>
                  {chapter.chapter_title}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <LoginRequiredModal show={showLoginModal} handleClose={() => setShowLoginModal(false)} />
    </div>
  );
}

export default BookDetails;
