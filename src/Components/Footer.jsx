import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/Footer.css'; // Create this CSS file to style your footer
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className=" text-white pt-5 pb-4" style={{ backgroundColor: "#000029" }}>
            <Container>
                
                <Row>
                    <Col md={4} className="mb-4">
                        <h5 className="text-uppercase">Binary Education</h5>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim cupiditate eos perspiciatis numquam quod eius sint, magnam tenetur corrupti voluptatibus magni, sed atque, nulla autem tempore cum commodi possimus soluta.
                        </p>
                        <div className="d-flex">
                            <a href="#" className="text-white me-2">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="text-white me-2">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="text-white me-2">
                                <i className="fab fa-pinterest-p"></i>
                            </a>
                            <a href="#" className="text-white me-2">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                    </Col>
                    <Col md={4} className="mb-4">
                        <h5 className="text-uppercase">Address</h5>
                        <ul className="list-unstyled">
                            <li>
                                <i className="fas fa-map-marker-alt me-2"></i> 374 William S Canning Blvd, River MA 2721, USA
                            </li>
                            <li>
                                <i className="fas fa-phone me-2"></i> (+880)155-69569
                            </li>
                            <li>
                                <i className="fas fa-envelope me-2"></i> binaryeducation@gmail.com
                            </li>
                        </ul>
                    </Col>
                    <Col md={2} className="mb-4">
                        <h5 className="text-uppercase">Publication</h5>
                        <ul className="list-unstyled">
                            <li>Books</li>
                            <li>Subjects</li>
                            <li>Login/Register</li>
                        </ul>
                    </Col>
                    <Col md={2} className="mb-4">
                    <h5 className="text-uppercase">Subscribe to Newsletter</h5>
                        <Form>
                            <Form.Control type="email" placeholder="Enter Your Email"/>
                            <Button variant="primary">Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <div className="bg-secondary text-center py-3">
                <Container>
                    <Row>
                        <Col>
                            &copy; 2024 All Rights Reserved. Developed By Aritone Global Ventures
                        </Col>
                    </Row>
                </Container>
            </div>
        </footer>
    );
};

export default Footer;
