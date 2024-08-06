import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Modal } from 'react-bootstrap';
import config from '../../config';
import AuthContext from './AuthContext';
import LoadingContext from './LoadingContext';
import Teacherregister from './Teacherregister';
import Loader from './Loader';

const Teacherlogin = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [forgotPasswordError, setForgotPasswordError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const { loading } = useContext(LoadingContext);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', loginEmail);
    formData.append('password', loginPassword);

    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-user/user/login.php`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        login({ id: data.id, name: data.name, email: loginEmail });
        setLoginError('');
        navigate("/");
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

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='m-5 p-5'>
      <div className='d-flex justify-content-center'>
        <div className="col-md-8">
        <div className="d-flex justify-content-center mb-4">
  <div className="toggle-buttons">
    <button
      className={`toggle-btn ${!isSignUp ? 'active' : ''}`}
      onClick={() => setIsSignUp(false)}
    >
      Sign In
    </button>
    <button
      className={`toggle-btn ${isSignUp ? 'active' : ''}`}
      onClick={() => setIsSignUp(true)}
    >
      Sign Up
    </button>
    <div className={`toggle-slider ${isSignUp ? 'right' : 'left'}`} />
  </div>
</div>

<style jsx>{`
  .toggle-buttons {
    position: relative;
    display: inline-flex;
    background-color: #f0f0f0;
    border-radius: 30px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .toggle-btn {
    padding: 10px 20px;
    font-size: 16px;
    color: #555;
    border: none;
    background-color: transparent;
    cursor: pointer;
    transition: color 0.3s ease;
  }
  .toggle-btn.active {
    color: white;
    font-weight: bold;
  }
  .toggle-btn:hover {
    color: #0A1172;
  }
  .toggle-slider {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 50%;
    background-color: #0A1172;
    border-radius: 30px;
    transition: transform 0.3s ease;
  }
  .toggle-slider.left {
    transform: translateX(0);
  }
  .toggle-slider.right {
    transform: translateX(100%);
  }
`}</style>

          {isSignUp ? (
            <Teacherregister />
          ) : (
            <div>
              <div className="col-md-12">
            <div className="row" >
              <div className="col-md-12 bg-white shadow-lg mb-5 p-3 bg-white rounded " >
              <div className='h5 p-3 ' style={{ backgroundColor: "#0A1172", borderRadius: "5px", color: "white" }}>Login (Teacher)</div>
              <hr></hr>
              <Form onSubmit={handleLogin} >
                <Form.Group controlId="loginEmail" className= 'mt-3' >
                  <Form.Label className= 'fw-bold text-grey'>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required = "true"
                  />
                </Form.Group>
                <Form.Group controlId="loginPassword" className= 'mt-4'>
                <Form.Label className= 'fw-bold'>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required = "true"
                  />
                </Form.Group>
                <div className='d-flex justify-content-end mt-3'>
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
            </div>
          )}
        </div>

      <Modal show={showForgotPasswordModal} onHide={() => setShowForgotPasswordModal(false)}>
        <Modal.Header style={{ backgroundColor: "#0A1172", color: "white" }} closeButton>
          <Modal.Title>Reset Password</Modal.Title>
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
              <br></br>
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
   </div>
  );
};

export default Teacherlogin;
