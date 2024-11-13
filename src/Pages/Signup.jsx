import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [faculty, setFaculty] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    console.log(email, name, mobile, faculty, password);
    try {
      const response = await axios.post('https://localhost:7123/swagger/index.html/api/SignUp', {
        sg_email: email,
        sg_name: name,
        sg_mobile: mobile,
        sg_faculty: faculty,
        sg_password: password,
      });

      // Handle success (e.g., show a success message or redirect)
      console.log('Signup successful:', response.data);
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Signup failed:', error);
      // Handle error (e.g., show a message to the user)
    }
  };

  return (
    <section className="vh-100">
      <MDBContainer className="py-4 h-100">
        <MDBRow className="d-flex align-items-center justify-content-center h-100">
          <MDBCol md="7" lg="5" xl="4">
            <img
              src="https://i.pinimg.com/564x/d1/50/f1/d150f1ef19871338975fd35d34bffc25.jpg"
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
                <Link to="/login" className="link-info">
                  <u>Sign in</u>
                </Link>
              </p>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default Signup;