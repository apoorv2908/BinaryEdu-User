import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import config from '../../config';


const Updatestudents = () => {
  const { id } = useParams(); // Assuming you have a route parameter for id
  const navigate = useNavigate();

  // State variables to hold student details
  const [studentName, setStudentName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [school, setSchool] = useState('');
  const [schools, setSchools] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchStudentDetails();
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

  const fetchStudentDetails = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Users/Students/getstudents.php?id=${id}`);
      const data = await response.json();
      if (data.success) {
        const student = data.student;
        setStudentName(student.student_name);
        setEmail(student.email);
        setPassword(student.password);
        setContactNumber(student.contact_no);
        setCountry(student.country);
        setState(student.state);
        setCity(student.city);
        setZipcode(student.zipcode);
        setSchool(student.school_id);
      } else {
        console.error('Failed to fetch student details');
      }
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };

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
          'X-CSCAPI-KEY': 'SmNzN3BHZTFvRTlmQW43MG01M0hleThOVFFGVnF6c0RPbEF4cmJIRQ=='
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
          'X-CSCAPI-KEY': 'SmNzN3BHZTFvRTlmQW43MG01M0hleThOVFFGVnF6c0RPbEF4cmJIRQ=='
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
          'X-CSCAPI-KEY': 'SmNzN3BHZTFvRTlmQW43MG01M0hleThOVFFGVnF6c0RPbEF4cmJIRQ=='
        }
      });
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Users/Students/updatestudents.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, studentName, email, password, contactNumber, country, state, city, zipcode, school }),
      });
      const data = await response.json();
      if (data.success) {
        alert('Student updated successfully');
        navigate("/students");
      } else {
        alert('Failed to update student');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating student');
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          {/* Main content */}
          <div className="col-md-12">
            <div className="container mt-3">
              {/* Topbar */}
              <div className="row">
                <div className="col-md-12 bg-white shadow-lg p-3 mb-5 bg-white rounded">
                  <div className='text-grey h6'><span>
                    <Link as={Link} style={{ color: 'black', textDecoration: 'none' }} to="/students">🡨</Link>
                  </span> Update Student</div>
                  <hr></hr>
                  <form onSubmit={handleSubmit}>
                    <label className='fw-bold'>Student Name</label><br />
                    <input
                      className='custom-input mt-3 cursor'
                      placeholder='Enter Student Name'
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                    /><br /><br></br>
                    <label className='fw-bold'>Email</label><br />
                    <input
                      className='custom-input mt-3 cursor'
                      type='email'
                      placeholder='Enter Email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    /><br /><br></br>
                    <label className='fw-bold'>Password*</label><br />
                    <input
                      className='custom-input mt-3 cursor'
                      type='password'
                      placeholder='Enter Password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    /><br /><br></br>
                    <label className='fw-bold'>Contact Number*</label><br />
                    <input
                      className='custom-input mt-3 cursor'
                      placeholder='Enter Contact Number'
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                    /><br /><br></br>
                    <label className='fw-bold'>School</label><br />
                    <select
                      className='custom-input mt-3 cursor'
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                    >
                      <option value="">Select School</option>
                      {schools.map((school) => (
                        <option key={school.school_id} value={school.school_id}>{school.school_name}</option>
                      ))}
                    </select><br /><br></br>
                    <label className='fw-bold'>Country</label><br />
                    <select
                      className='custom-input mt-3 cursor'
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option key={country.iso2} value={country.iso2}>{country.name}</option>
                      ))}
                    </select><br /><br></br>
                    <label className='fw-bold'>State</label><br />
                    <select
                      className='custom-input mt-3 cursor'
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state.iso2} value={state.iso2}>{state.name}</option>
                      ))}
                    </select><br /><br></br>
                    <label className='fw-bold'>City</label><br />
                    <select
                      className='custom-input mt-3 cursor'
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.name}>{city.name}</option>
                      ))}
                    </select><br /><br></br>
                    <label className='fw-bold'>Zipcode</label><br />
                    <input
                      className='custom-input mt-3 cursor'
                      placeholder='Enter Zipcode'
                      value={zipcode}
                      onChange={(e) => setZipcode(e.target.value)}
                    /><br /><br></br>
                    <div className='d-flex justify-content-end'>
                      <button type="submit" className="btn btn-primary mt-3">Update Student</button>
                    </div>
                  </form>
                </div>
              </div>
              </div>
              </div>
              </div>
              </div>
              </div>
              );
            };
            
            export default Updatestudents;
            
           
