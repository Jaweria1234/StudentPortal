import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCheckbox } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
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
            <form>
              <h4 className="mb-4 divider d-flex justify-content-center align-items-center my-4 text-center fw-bold">
                Sign in
              </h4>

              {/* Email input */}
              <div className="form-outline mb-4">
                <MDBInput
                  label="Email address"
                  id="form1Example13"
                  type="email"
                  className="form-control"
                />
              </div>

              {/* Password input */}
              <div className="form-outline mb-4 position-relative">
                <MDBInput
                  label="Password"
                  id="form1Example23"
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                />
                <span
                  className="password-toggle-icon"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>

              <div className="d-flex justify-content-around align-items-center mb-4">
                {/* Checkbox */}
                <MDBCheckbox
                  name="flexCheck"
                  id="form1Example3"
                  label="Remember me"
                  defaultChecked
                />
                <a href="#!">Forgot password?</a>
              </div>

              {/* Submit button */}
              <MDBBtn className="btn-lg btn-block #386BC0" type="submit">
                Sign in
              </MDBBtn>

              <div className="divider d-flex justify-content-center align-items-center my-2">
                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
              </div>

              {/* Google button */}
              <MDBBtn
                className="btn btn-lg btn-block"
                style={{ backgroundColor: '#dd4b39' }}
                href="#!"
                role="button"
              >
                <i className="fab fa-google me-2"></i>Continue with Google
              </MDBBtn>

              <p className="text-center mx-3 mb-0 text-muted">
                Don't have an account?{' '}
                <Link to="/signup" className="link-info">
                  <u>Sign up</u>
                </Link>
              </p>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default Login;
