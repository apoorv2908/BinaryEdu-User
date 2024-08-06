import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Modal } from 'react-bootstrap';
import config from '../../config';
import AuthContext from './AuthContext';
import { Link } from 'react-router-dom';

const Schoollogin = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [forgotPasswordError, setForgotPasswordError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', loginEmail);
    formData.append('password', loginPassword);

    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-user/user/loginschool.php`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        login({ id: data.id, name: data.name, email: loginEmail });
        setLoginError('');
        navigate("/dashboard");
      } else {
        setLoginError('Username/password not found');
      }
    } catch (error) {
      console.error('Error:', error);
      setLoginError('Error during login');
    }
  };

  const handleForgotPassword = async () => {
    if (newPassword !== confirmPassword) {
      setForgotPasswordError('Passwords do not match');
      return;
    }

    const formData = new FormData();
    formData.append('email', forgotEmail);
    formData.append('newPassword', newPassword);

    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-user/user/forgotpassword.php`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        alert('Password reset successful');
        setShowForgotPasswordModal(false);
        setForgotPasswordError('');
      } else {
        setForgotPasswordError('Failed to reset password');
      }
    } catch (error) {
      console.error('Error:', error);
      setForgotPasswordError('Error resetting password');
    }
  };

  return (
    <div className='m-5 p-5'>
        <div className= 'd-flex justify-content-center'>
      <div className="col-md-8">

        <div className= ''>
            Home / Login 
        </div>
        
        <div className=" p-4 mt-3 bg-light shadow-lg mb-5 bg-white rounded">
          <div className='h5 p-2' style={{ backgroundColor: "#0A1172", borderRadius: "5px", color: "white" }}>Login (School)</div>
          <Form onSubmit={handleLogin}>
            <div className='d-flex justify-content-start text-red'>
                *For School Registration, Please contact Admin
            </div>
            <br></br>

            <Form.Group controlId="loginEmail" className='input-group'>
              <span className="input-group-text" id="basic-addon1">🔒</span>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </Form.Group>
            <br></br><br></br>
            <Form.Group controlId="loginPassword" className='input-group'>
              <span className="input-group-text" id="basic-addon1">🔑</span>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </Form.Group>
            <br></br>
            <div className='d-flex justify-content-end'>
              <Button type="submit" style={{ backgroundColor: "#0A1172", outline: "none", color: "white", border: "none" }}>Login</Button>
            </div>
            <div className='mt-2 d-flex justify-content-end'>
              <span onClick={() => setShowForgotPasswordModal(true)} style={{ cursor: 'pointer', color: 'blue' }}>Forgot Password?</span>
            </div>
            {loginError && <div>{loginError}</div>}
          </Form>
        </div>
      </div>
      </div>

      <Modal show={showForgotPasswordModal} onHide={() => setShowForgotPasswordModal(false)}>
        <Modal.Header style={{ backgroundColor: "#0A1172", color: "white" }} closeButton>
          <Modal.Title >Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="forgotEmail">
              <Form.Label>Email/Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your email or username"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="newPassword" className='mt-3'>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword" className='mt-3'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            {forgotPasswordError && <div className='text-danger mt-2'>{forgotPasswordError}</div>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowForgotPasswordModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleForgotPassword}>
            Reset Password
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Schoollogin;
