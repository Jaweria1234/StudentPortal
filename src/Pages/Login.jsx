import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCheckbox } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';  // ✅ Import useAuth
import Navbar from '../Components/Navbar/Navbar';
import homeImage from "../assets/loginimage.jpg";

const Login = () => {
  const { login } = useAuth();  // ✅ Use AuthContext
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post('https://studentforumfyp.azurewebsites.net/api/Login', {
        lg_email: email,
        lg_password: password,
      });

      const userId = response.data.userId;
      if (userId) {
        login(userId); // ✅ Use login from AuthContext
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  return (
    <><Navbar />
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
                Sign in
              </h4>

              {errorMessage && <p className="text-danger text-center mb-3">{errorMessage}</p>}

              <div className="form-outline mb-4">
                <MDBInput
                  label="Email address"
                  id="form1Example13"
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-outline position-relative">
                <MDBInput
                  label="Password"
                  id="form1Example23"
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="password-toggle-icon position-absolute"
                  style={{ right: '10px', top: '18px', cursor: 'pointer' }}
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>

              <div className="d-flex justify-content-around align-items-center mb-5">
                
                <a href="#!">Forgot password?</a>
              </div>

              <MDBBtn className="btn btn-block #386BC0" type="submit">Sign in</MDBBtn>

              <div className="divider d-flex justify-content-center align-items-center my-2">
                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
              </div>

              <MDBBtn
                className="btn btn-block"
                style={{ backgroundColor: '#dd4b39', borderColor: '#dd4b39' }}
                href="#!"
                role="button"
              >
                <i className="fab fa-google me-2"></i>Continue with Google
              </MDBBtn>

              <p className="text-center mx-3 mb-0 text-muted">
                Don't have an account?{' '}
                <Link to="/signup">
                  <u>Sign up</u>
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

export default Login;
