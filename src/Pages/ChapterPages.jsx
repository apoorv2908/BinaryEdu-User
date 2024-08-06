import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FlipPage from 'react-flip-page';
import './Styles/ChapterPages.css';
import config from "../config"

const ChapterPages = () => {
  const { chapter_id } = useParams();
  const [pages, setPages] = useState([]);

  useEffect(() => {
    fetch(`${config.apiBaseUrl}/fullmarks-user/home/fetchchapterpages.php?chapter_id=${chapter_id}`)
      .then(response => response.json())
      .then(data => setPages(data))
      .catch(error => console.error('Error fetching chapter pages:', error));
  }, [chapter_id]);

  return (
    <div className="container-fluid bg-white shadow-lg p-3 mb-5 rounded">
      <br />
      <div className='d-flex justify-content-between'>
        Home/Class/Chapter/{chapter_id}
      </div>
      <br />
      <div>
        <FlipPage
          orientation="horizontal"
          uncutPages
          showSwipeHint
        >
          {pages.map((page, index) => (
            <article key={index} className="page-container">
              {page.page_content_type === 'image' ? (
                <img
                  src={`${config.apiBaseUrl}/fullmarks-server/uploads/book_pages/${page.image_path}`}
                  alt={`Page ${index + 1}`}
                  className="page-image img-fluid rounded"
                />
              ) : (
                <div className="page-text pre-wrap">
                  <img
                    src={`${config.apiBaseUrl}/fullmarks-server/uploads/book_pages/${page.image_path}`}
                    alt={`Page ${index + 1}`}
                    className="page-image img-fluid rounded"
                  />
                </div>
              )}
            </article>
          ))}
        </FlipPage>
      </div>
    </div>
  );
};

export default ChapterPages;
