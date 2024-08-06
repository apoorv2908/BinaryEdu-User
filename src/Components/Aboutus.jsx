import React from 'react';
import logo from "./Assets/logo-2.jpeg";
import "./Styles/Aboutus.css";

const Aboutus = () => {
  return (
    <div className='mt-5'>
                  <p className="text-center mb-3  h6 rn1" style={{ color: "#0A1172" }}>OUT STORY</p>
      <div className= 'pt-2 d-flex justify-content-center h2 '>About Us</div>
      <div className='about-title text-warning h5 fw-bold px-5'>ABOUT BINARY EDUCATION</div>
  
    <div className='about-content px-5 mt-3'>
          <span className= 'h5'>Welcome to Binary Education Pvt Ltd,</span> your gateway to a world of educational wonders and inspiration for young minds. At Binary Education, our passion is ignited by the enchanting world of books, and our mission is to instill the love of learning in children from grades 1 to 8. 
            <br /><br />
            <div className= 'h5 mb-2' style={{ color: "#0A1172" }}>Our Specilization</div>
            Binary Education specializes in crafting educational treasures that encompass Computer and General Knowledge. We dedicate our expertise exclusively to these domains, creating engaging, informative, and interactive books that captivate young imaginations.          
            <br></br><br></br>

      <div className=" d-flex flex-column flex-lg-row justify-content-between align-items-center">
      <div className= 'h5 mb-2' style={{ color: "#0A1172" }}>Our Vison</div>
            We firmly believe that quality education is the cornerstone of a brighter and more promising future. Our commitment is reflected in the thoughtful design of our books, where learning is transformed into an exciting adventure. We are dedicated to making education not only accessible but also enjoyable for young learners, fostering a lifelong love for exploration and discovery.
            <br></br><br></br>
            <div className='m-5 image-container'>
          <img src={logo} alt="Logo" className='img-fluid' />
        </div>
        
        <div className='m-5 text-container'>
          <br />
            

            </div>

        
        </div>

        
      </div>

      <div className= 'h5 mb-2 px-5' style={{ color: "#0A1172" }}>Embracing Technology</div>
      <div className= 'px-5'>
      In today's digital age, we embrace technology to enhance the learning experience. Our books are seamlessly integrated with supplementary digital resources, providing students with an enriched and interactive educational journey. We understand that education must evolve with the times, and we're proud to lead the way in this exciting transformation.

      </div>
            <br></br><br></br>
            <div className= 'h5 mb-2 px-5' style={{ color: "#0A1172" }}>Join Our Journey</div>
            <div className= 'px-5 mb-2'>
            Join us on this incredible journey as we ignite the sparks of curiosity, nurture a deep-seated love for learning, and empower the next generation of thinkers, innovators, and problem-solvers. Explore our extensive collection of books and witness young minds flourish within the pages of our educational wonders.
At Binary Education Pvt Ltd, we are more than just a publishing company; we are the architects of young dreams and the champions of future brilliance. Together, let's create a world where learning knows no bounds, and every child can aspire to greatness through the power of education.

            </div>

    </div>
  );
}

export default Aboutus;
