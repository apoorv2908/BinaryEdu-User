import React, { useState } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import ReCAPTCHA from 'react-google-recaptcha';
import './Styles/ContactPage.css';

const ContactPage = () => {
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!captchaVerified) {
      alert('Please complete the CAPTCHA verification');
      return;
    }
    // Add your form submission logic here
  };

  return (
    <Container className="contact-page mt-5">
      <Row className="mt-4 mb-2 bg-light rounded">
        <Col md={6} className="contact-form">
          <h2>Reach out to us!</h2>
          <p>
            Got a question about Lancer? Are you interested in partnering with us? Have some suggestions or just want to say hi? Contact us.
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFirstName">
              <Form.Control type="text" placeholder="First name" />
            </Form.Group>
            <br></br>
            <Form.Group controlId="formLastName">
              <Form.Control type="text" placeholder="Last name" />
            </Form.Group>
            <br></br>
            <Form.Group controlId="formEmail">
              <Form.Control type="email" placeholder="Your Email Address" />
            </Form.Group>
            <br></br>
            <Form.Group controlId="formPhone">
              <Form.Control type="text" placeholder="Phone Number" />
            </Form.Group>
            <br></br>
            <Form.Group controlId="formMessage">
              <Form.Control as="textarea" rows={5} placeholder="Message" />
            </Form.Group>
            <br></br>

            <ReCAPTCHA
              sitekey="YOUR_GOOGLE_RECAPTCHA_SITE_KEY"
              onChange={handleCaptchaChange}
            />
            <br></br>

            <Button variant="primary" type="submit" className="submit-btn" disabled={!captchaVerified}>
              Submit
            </Button>
          </Form>
        </Col>
        <Col md={6} className="customer-care">
          <h2>Customer Care</h2>
          <p>Not sure where to start? Need help adding that extra mojo to your landing page? Just send us a note or get in touch with us:</p>
          <div className="customer-care-info">
            <div className="person">
              <img src="path-to-claudio-image.jpg" alt="Claudio Pleskonos" />
              <div className="info">
                <h5>Claudio Pleskonos</h5>
                <p>claudio@lancer.com</p>
              </div>
            </div>
            <div className="person">
              <img src="path-to-noviel-image.jpg" alt="Noviel Rosenberg" />
              <div className="info">
                <h5>Noviel Rosenberg</h5>
                <p>noviel@lancer.com</p>
              </div>
            </div>
          </div>
          <h3>Other ways to connect</h3>
          <p>
            <span>📘</span> Be the first on your block to get product updates, announcements, read stories of (relatively) good content.
            Join us on <a href="https://facebook.com">Facebook</a>.
          </p>
          <p>
            <span>🐦</span> Want the best tips on conversion optimization, landing pages, content marketing, SEO & SEM? Then follow us on
            Twitter at <a href="https://twitter.com">Blenderapp</a>.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;
