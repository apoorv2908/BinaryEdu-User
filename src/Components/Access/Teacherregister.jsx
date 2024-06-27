import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button, Form, Modal } from 'react-bootstrap';
import config from '../../config';

const Teacherregister = () => {
  const [teacherName, setTeacherName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [school, setSchool] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [schools, setSchools] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showModal, setShowModal] = useState(true);

  const navigate = useNavigate();

  const apiKey = 'SmNzN3BHZTFvRTlmQW43MG01M0hleThOVFFGVnF6c0RPbEF4cmJIRQ==';

  useEffect(() => {
    fetchSchools();
    fetchCountries();
  }, []);

  useEffect(() => {
    if (country) {
      fetchStates();
    }
  }, [country]);

  useEffect(() => {
    if (state) {
      fetchCities();
    }
  }, [state]);

  const fetchSchools = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Users/Schools/fetchschools.php`);
      const data = await response.json();
      if (data.success) {
        setSchools(data.schools);
      } else {
        console.error('Failed to fetch schools');
      }
    } catch (error) {
      console.error('Error fetching schools:', error);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://api.countrystatecity.in/v1/countries', {
        headers: {
          'X-CSCAPI-KEY': apiKey
        }
      });
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchStates = async () => {
    try {
      const response = await fetch(`https://api.countrystatecity.in/v1/countries/${country}/states`, {
        headers: {
          'X-CSCAPI-KEY': apiKey
        }
      });
      const data = await response.json();
      setStates(data);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await fetch(`https://api.countrystatecity.in/v1/countries/${country}/states/${state}/cities`, {
        headers: {
          'X-CSCAPI-KEY': apiKey
        }
      });
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

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
        setLoggedInUser(data.username);
        setLoginError('');
        setShowModal(false);

        // Close the login form modal (assumed to be a modal)
        // Implement modal close logic here
      } else {
        setLoginError('Username/password not found');
      }
    } catch (error) {
      console.error('Error:', error);
      setLoginError('Error during login');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('teacherName', teacherName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('contactNumber', contactNumber);
    formData.append('country', country);
    formData.append('state', state);
    formData.append('city', city);
    formData.append('zipcode', zipcode);
    formData.append('school', school);
    if (profilePic) {
      formData.append('profilePic', profilePic);
    }

    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Users/Teachers/addteachers.php`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        alert('Teacher added successfully');
        navigate("/");
      } else {
        alert('Failed to add teacher');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding teacher');
    }
  };

  return (
    <div className='m-5 p-5'>
    <div className= 'd-flex justify-content-center'>
  <div className="col-md-8">
  <div className= ''>
            Home / Login / Register
        </div>
        
    
    <div className=" p-4 mt-3 bg-light shadow-lg mb-5 bg-white rounded">
      <div className='h5 p-2' style={{ backgroundColor: "#0A1172", borderRadius: "5px", color: "white" }}>Registration (Teacher)</div>

                  <form onSubmit={handleSubmit} encType="multipart/form-data" >
                    <br></br>
                    <div>
                        <div>
                          <label className='fw-bold'>Teacher Name</label>
                          <input
                            className='mt-3 xyf cursor form-control'
                            placeholder='Enter Teacher Name'
                            value={teacherName}
                            onChange={(e) => setTeacherName(e.target.value)}
                            required
                          /><br></br>
                        </div>
                        <div>
                          <label className='fw-bold'>Email</label>
                          <input
                            className='form-control mt-3 cursor'
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          /><br />
                        </div>
                        <div>
                          <label className='fw-bold'>Contact Number</label><br />
                          <input
                            className='form-control mt-3 cursor'
                            placeholder='Enter Contact Number'
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            required
                          /><br />
                        </div>
                      <div><label className='fw-bold'>School</label><br />
                        <select
                          className='form-control mt-3 cursor'
                          value={school}
                          onChange={(e) => setSchool(e.target.value)}
                        >
                          <option value="">Select School</option>
                          {schools.map((school) => (
                            <option key={school.school_id} value={school.school_id}>{school.school_name}</option>
                          ))}
                        </select><br /></div>
                      
                      <div>
                        <label className='fw-bold'>Country</label><br />
                        <select
                          className='form-control mt-3 cursor'
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        >
                          <option value="">Select Country</option>
                          {countries.map((country) => (
                            <option key={country.iso2} value={country.iso2}>{country.name}</option>
                          ))}
                        </select><br />
                      </div>
                        <div>
                          <label className='fw-bold'>State</label><br />
                          <select
                            className='form-control mt-3 cursor'
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                          >
                            <option value="">Select State</option>
                            {states.map((state) => (
                              <option key={state.iso2} value={state.iso2}>{state.name}</option>
                            ))}
                          </select><br />
                        </div>
                        <div>
                          <label className='fw-bold'>City</label><br />
                          <select
                            className='form-control mt-3 cursor'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                          >
                            <option value="">Select City</option>
                            {cities.map((city) => (
                              <option key={city.id} value={city.id}>{city.name}</option>
                            ))}
                          </select><br />
                        </div>
                        <div>
                          <label className='fw-bold'>Zipcode</label><br />
                          <input
                            className='form-control mt-3 cursor'
                            placeholder='Enter Zipcode'
                            value={zipcode}
                            onChange={(e) => setZipcode(e.target.value)}
                          /><br />
                        </div>
                      <div className='d-flex justify-content-between'>
                       
                        <div>
                          <label className='fw-bold'>Password</label><br />
                          <input
                            className='form-control mt-3 cursor'
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          /><br />
                        </div>
                      </div>
                      <div className='d-flex justify-content-between'>
                        <div>
                          <label className='fw-bold'>Profile Picture</label><br />
                          <input
                            className=' form-control mt-3 cursor'
                            type='file'
                            accept='image/*'
                            onChange={(e) => setProfilePic(e.target.files[0])}
                          />
                        </div>
                      </div>
                      <br></br>
                      <div className= 'd-flex justify-content-end'>
                      <Button style={{ backgroundColor: "#0A1172", outline: "none", border: "none" }} type="submit" className="mt-3">
                        Register
                      </Button>



                      </div>
                      <div className= 'd-flex justify-content-end mt-2'>
                        <Link to = "/login-teacher">
                        Already User? Sign in

                        </Link>
                      </div>
                    </div>
                    
                  </form>
                </div>
              </div>

              
            </div>
          </div>
          
  );
};

export default Teacherregister;