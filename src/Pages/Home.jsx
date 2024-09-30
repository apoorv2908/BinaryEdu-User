import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import BookList from '../Components/BookList';
import a1 from "./Assets/a1.jpg";
import a2 from "./Assets/a2.jpg";
import a3 from "./Assets/a3.jpg";
import a4 from "./Assets/a4.jpg";
import "./Styles/Home.css";
import config from "../config"; // Your config file with API base URL
import { Link } from 'react-router-dom'; // Import Link for navigation

const banners = [
  { src: a4, text: "Join Our Learning Community", buttonText: "Start Now" },
];

const Home = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [aboutUsContent, setAboutUsContent] = useState('');
  const [aboutUsPreview, setAboutUsPreview] = useState('');
  const previewLength = 290; // Number of characters to show in preview

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
        setFadeIn(true);
      }, 500); // Duration of fade out
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    document.title = 'Home';
  }, []);

  useEffect(() => {
    fetch(`${config.apiBaseUrl}/fullmarks-user/navbar/fetchaboutus.php`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setAboutUsContent(data.content);
          setAboutUsPreview(data.content.length > previewLength ? `${data.content.substring(0, previewLength)}...` : data.content);
        } else {
          console.error('Failed to fetch content:', data.message);
        }
      })
      .catch(error => console.error('Error fetching About Us content:', error));
  }, []);

  return (
    <Container fluid className='p-0'>
      <Row className='p-0'>
        <Col>
          <div className="banner-container position-relative">
            <img src={banners[currentBanner].src} className={`banner img-fluid ${fadeIn ? 'fade-in' : 'fade-out'}`} alt="Banner" />
            <div className="banner-text-container d-flex flex-column justify-content-center align-items-center position-absolute top-50 start-50 translate-middle text-center">
              <h2 className="banner-text mb-4">{banners[currentBanner].text}</h2>
              <Button className="banner-button btn-lg">{banners[currentBanner].buttonText}</Button>
            </div>
          </div>
          <p className="text-center mb-3 h6 rn1" style={{ color: "#0A1172" }}></p>
          <div className='about-title text-warning h5 mt-5 fw-bold px-5'>ABOUT BINARY EDUCATION</div>
          <div className='px-5 fs-5 mb-4'>
            <div dangerouslySetInnerHTML={{ __html: aboutUsPreview }} />
            {aboutUsContent.length > previewLength && (
              <div className= 'd-flex justify-content-center'>
              <Link to="/about">
                <button variant="link" className="mt-2 btn btn-success">Read More</button>
              </Link>
              </div>
            )}
          </div>
          <BookList />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
