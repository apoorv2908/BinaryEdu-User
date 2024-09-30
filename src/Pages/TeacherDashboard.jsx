import React, { useEffect, useContext, useState } from 'react';
import { Container, Button, Card, Row, Col, Modal } from 'react-bootstrap';
import config from '../config';
import { useParams, Link } from 'react-router-dom';
import './Styles/Dash.css';
import AuthContext from '../Components/Access/AuthContext';
import Updateteachers from '../Components/Access/Updateteachers';
import Updatepasswordteacher from '../Components/Access/Updatepasswordteacher';
import banner from "./Assets/banner-4.jpg";
import defaultProfilePic from "./Assets/user-default.jpg"; // Import your default profile picture

const TeacherDashboard = () => {
    const { teacher_id } = useParams();
    const [userDetails, setUserDetails] = useState(null);
    const [activeButton, setActiveButton] = useState(null);
    const [assignedBooks, setAssignedBooks] = useState([]);
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        fetchUserDetails(teacher_id);
    }, [teacher_id]);

    const fetchUserDetails = (teacher_id) => {
        fetch(`${config.apiBaseUrl}/fullmarks-user/user/fetchteacherdetail.php?teacher_id=${teacher_id}`)
            .then(response => response.json())
            .then(data => setUserDetails(data))
            .catch(error => console.error('Error fetching user details:', error));
    };

    const fetchAssignedBooks = (teacher_id) => {
        fetch(`${config.apiBaseUrl}/fullmarks-user/user/fetchAssignedBooks.php?teacher_id=${teacher_id}`)
            .then(response => response.json())
            .then(data => setAssignedBooks(data))
            .catch(error => console.error('Error fetching assigned books:', error));
    };

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
        if (buttonName === 'MyBooks') {
            fetchAssignedBooks(teacher_id);
        }
    };

    const handleOpenEditModal = () => {
        setShowEditProfileModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditProfileModal(false);
    };

    const handleOpenPasswordModal = () => {
        setShowChangePasswordModal(true);
    };

    const handleClosePasswordModal = () => {
        setShowChangePasswordModal(false);
    };

    return (
        <Container className='ap'>
            
            
            <div className="p-3 profile-cont ">
                <Row className=' mt-5 mb-5'>
                <div className= 'border diskdil mb-3'>
                    <p className= 'text-center h3 mt-4 text-white fw-bold text-uppercase '>My Dashboard</p>
                </div> 
                    <Col lg={2} className="vertical-buttons border bg-light p-3 rounded">
                        <div className="text-center">
                            <div className='profile-pic mb-2'>
                                <img
                                    src={userDetails?.profile_pic
                                        ? `${config.apiBaseUrl}/admin/fullmarks-server/uploads/teachers/${userDetails.profile_pic}`
                                        : defaultProfilePic}
                                    alt="User Profile"
                                    className="profile-pic-img rounded-circle"
                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                />
                            </div>
                            <h5 className="text-dark">{userDetails?.name}</h5>
                            <p className="text-dark">{userDetails?.email}</p>
                        </div>
                        <hr className= 'text-dark'></hr>
                        <Button
                            variant={activeButton === 'MyBooks' ? 'dark' : 'outline-dark'}
                            className="zu w-100 mb-2"
                            onClick={() => handleButtonClick('MyBooks')}
                        >
                            My Books
                        </Button>
                        <Button
                            variant="outline-dark"
                            className="zu w-100 mb-2"
                            onClick={handleOpenEditModal}
                        >
                            Edit Profile
                        </Button>
                        <Button
                            variant="outline-dark"
                            className="zu w-100 mb-2"
                        >
                            Test Generator
                        </Button>
                        <Button
                            variant="outline-dark"
                            className="zu w-100 mb-2"
                            onClick={handleOpenPasswordModal}
                        >
                            Change Password
                        </Button>
                        <Button variant="outline-dark" className="zu w-100" onClick={logout}>
                            Logout
                        </Button>
                    </Col>

                    <Col lg={10}>
                        <div className=" p-4 rounded">
                            {activeButton === 'MyBooks' && (
                                <div>
                                    <h3 className="mb-4">My Books</h3>
                                    <hr></hr>
                                    {assignedBooks.length > 0 ? (
                                        <Row>
                                            {assignedBooks.map((book) => (
                                                <Col md={4} key={book.book_teacher_id} className="mb-4">
                                                    <Link to={`/book-details/${book.book_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                        <Card>
                                                            {book.book_cover && (
                                                                <Card.Img
                                                                    variant="top"
                                                                    src={`${config.apiBaseUrl}/admin/fullmarks-server/uploads/book_cover/${book.book_cover}`}
                                                                    alt={book.book_name}
                                                                    style={{ objectFit: 'cover' }}
                                                                />

                                                            )}
                                                                 <div className='fw-bold text-center mb-2' >{book.book_name}</div>                                                          
                                                           <button className='btn btn-warning'>View Book</button>
                                                        </Card>
                                                    </Link>
                                                </Col>
                                            ))}
                                        </Row>
                                    ) : (
                                        <p>No books assigned.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </div>

            {/* Edit Profile Modal */}
            <Modal show={showEditProfileModal} onHide={handleCloseEditModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Updateteachers />
                </Modal.Body>
            </Modal>

            {/* Change Password Modal */}
            <Modal show={showChangePasswordModal} onHide={handleClosePasswordModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Updatepasswordteacher />
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default TeacherDashboard;
