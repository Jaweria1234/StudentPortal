import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Navbar from '../Components/Navbar/Navbar';
import homeImage from "../assets/loginimage.jpg";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [faculty, setFaculty] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState(''); // Added this state
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    
    console.log(email,name, mobile, faculty, password);
    // Added validation for passwords match
    if (password !== repeatPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      // Updated API URL
      const response = await axios.post('https://studentforumfyp.azurewebsites.net/api/Signup', {
        sg_email: email, // Ensure keys match the schema
        sg_name: name,
        sg_mobile: mobile,
        sg_faculty: faculty,
        sg_password: password,
      });

      // Handle success (e.g., show a success message or redirect)
      console.log('Signup successful:', response.data);
      
      // Save user data in local storage
    localStorage.setItem("user", JSON.stringify({
      name,
      email,
      mobile,
      faculty,
    }));

      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Signup failed:', error.response?.data || error.message);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <>
    <Navbar />
    <section className="vh-100">
      <MDBContainer className="py-4 h-100">
        <MDBRow className="d-flex align-items-center justify-content-center h-100">
          <MDBCol md="3" lg="3" xl="3">
                       
                      <img
                        src= {homeImage}
                        className="img-fluid"
                        alt="Phone"
                      />
          </MDBCol>

          <MDBCol md="5" lg="4" xl="4" className="offset-xl-1 mb-8">
            <form onSubmit={handleSubmit}>
              <h4 className="mb-4 divider d-flex justify-content-center align-items-center my-4 text-center fw-bold">
                Sign up
              </h4>

              {/* Name input */}
              <div className="form-outline mb-2">
                <MDBInput
                  label="Your Name"
                  id="form3Example1cg"
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Email input */}
              <div className="form-outline mb-2">
                <MDBInput
                  label="Your Email"
                  id="form3Example3cg"
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Mobile Number input */}
              <div className="form-outline mb-2">
                <MDBInput
                  label="Mobile Number"
                  id="form3Example5cg"
                  type="tel"
                  className="form-control"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, ''))}
                />
              </div>

              {/* Faculty input */}
              <div className="form-outline mb-2">
                <MDBInput
                  label="Faculty"
                  id="form3Example6cg"
                  type="text"
                  className="form-control"
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                />
              </div>

              {/* Password input */}
              <div className="form-outline mb-2 position-relative">
                <MDBInput
                  label="Password"
                  id="form3Example4cg"
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>

              {/* Repeat Password input */}
              <div className="form-outline mb-2 position-relative">
                <MDBInput
                  label="Repeat your password"
                  id="form3Example4cdg"
                  type={showRepeatPassword ? 'text' : 'password'}
                  className="form-control"
                  value={repeatPassword} // Added value
                  onChange={(e) => setRepeatPassword(e.target.value)} // Added change handler
                />
                <span className="password-toggle-icon" onClick={toggleRepeatPasswordVisibility}>
                  <FontAwesomeIcon icon={showRepeatPassword ? faEyeSlash : faEye} />
                </span>
              </div>

              {/* Submit button */}
              <MDBBtn className="mt-3 btn btn-block #386BC0" type="submit">
                Register
              </MDBBtn>

              {/* Already have an account? */}
              <p className="text-center mx-3 mb-0 text-muted">
                Have already an account?{' '}
                <Link to="/login" >
                  <u>Sign in</u>
                </Link>
              </p>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
    </>
  );
};

export default Signup;
