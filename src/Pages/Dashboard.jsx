import React, { useEffect, useContext, useState, useNavigate } from 'react';
import { Container, Row, Col, Button, } from 'react-bootstrap';
import config from '../config';
import { useParams } from 'react-router-dom';
import './Styles/Dash.css'; // Import custom CSS file for Dashboard
import AuthContext from '../Components/Access/AuthContext';
import { Link } from 'react-router-dom';



const Dashboard = () => {
    const { id } = useParams(); // Get userName from URL params
    const [userDetails, setUserDetails] = useState(null);
    const [activeButton, setActiveButton] = useState(null); // Track active button
    const [showDetails, setShowDetails] = useState(true); // Set initial state to show details
    const { logout } = useContext(AuthContext);


    useEffect(() => {
        // Fetch user details based on userName
        fetchUserDetails(id);
    }, [id]);

    const fetchUserDetails = (id) => {
        fetch(`${config.apiBaseUrl}/fullmarks-user/user/fetchuserdetails.php?id=${id}`)
            .then(response => response.json())
            .then(data => setUserDetails(data))
            .catch(error => console.error('Error fetching user details:', error));
    };



    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
        setShowDetails(true); // Show details section
        // Fetch additional details based on the button clicked
        switch (buttonName) {
            case 'MyOrders':
                // Implement fetch for My Orders details
                break;
            case 'MyBooks':
                // Implement fetch for My Books details
                break;
            case 'MySubjects':
                // Implement fetch for My Subjects details
                break;
            default:
                break;
        }
    };

 
    return (
        <Container className= ' ap mb-5 bg-light'>
            <div className="p-3 profile-cont mt-5 d-flex justify-content-between">
                <div className=" vertical-buttons bg-dark div-width">
                        <Button variant={activeButton === 'MyOrders' ? 'primary' : 'outline-primary'} className="zu w-100" onClick={() => handleButtonClick('MyOrders')}>
                            My Orders
                        </Button>
                        <br />
                        <Button variant={activeButton === 'MyBooks' ? 'primary' : 'outline-primary'} className=" zu w-100" onClick={() => handleButtonClick('MyBooks')}>
                            My Books
                        </Button>
                        <br />
                        <Button variant={activeButton === 'MySubjects' ? 'primary' : 'outline-primary'} className="zu w-100" onClick={() => handleButtonClick('MySubjects')}>
                            My Subjects
                        </Button>
                    
                        <Link to = "/edit-student/:id">

                        <Button 
                            variant="outline-primary" 
                            className="zu w-100" 
                        >
                            Edit Profile
                        </Button>
                        
                        </Link>

                        <Button 
                            variant="outline-primary" 
                            className="zu w-100" 
                        >
                            Change Password
                        </Button>

                        <Button 
                            variant="outline-primary" 
                            className="zu w-100" 
                        >
                            Edit Profile
                        </Button>

                        <Button 
                            variant="outline-danger" 
                            className=" zu w-100" 
                            onClick={logout}
                        >
                            Logout
                        </Button>
                       
                       
                        <br></br>       
                </div>
                <div>
                        {activeButton === 'MyOrders' && (
                         <p><strong>My Orders:</strong> Details fetched from API</p>
                        )}
                        {activeButton === 'MyBooks' && (
                        <p><strong>My Books:</strong> Details fetched from API</p>
                        )}
                        {activeButton === 'MySubjects' && (
                        <p><strong>My Subjects:</strong> Details fetched from API</p>
                        )}
                </div>

                 <div>
                 <div className='profile-pic'>
  {userDetails?.profile_pic && (
    <img
      src={`${config.apiBaseUrl}/fullmarks-server/uploads/teachers/${userDetails?.profile_pic}`}
      alt="User Profile"
      className="profile-pic-img"
    />
  )}
</div>
                                <br />
                                <p><strong>Name:</strong> {userDetails?.name}</p>
                                <p><strong>Email:</strong> {userDetails?.email}</p>
                                <p><strong>Id:</strong> {userDetails?.id}</p>
                                <p><strong>Phone:</strong> {userDetails?.phone}</p>

                            </div>
                </div>
        </Container>
    );
};

export default Dashboard;
