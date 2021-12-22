import React from 'react';
import { Alert, FloatingLabel, Form } from 'react-bootstrap';
import { useRef, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const Register = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();
    const mobileRef = useRef();
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [show, setShow] = useState(true);


    const register = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const name = nameRef.current.value;
        const mobile = mobileRef.current.value;


        axios({
            method: 'post',
            url: 'https://ttmg-backend.herokuapp.com/api/auth/staffRegister',
            data: {
              email: email,
              password: password,
              name: name,
              mobile: mobile
            }
          }).then(data => {
            if(data.status === 200){
              setShow(true);
              setSuccess('Login Successful');
              setError('');
            }
            if(data.status === 400){
                setShow(true);
                setSuccess('');
                setError('Some of the fields are missing or invalid');
            }
            if(data.status === 402){
              setShow(true);
              setSuccess('');
              setError('User Already exists!!! Please Login.');
            }
            console.log(data)
          })
          .catch(err => {
            if(err.status === 400 || err.message.endsWith('400')){
                setShow(true);
                setSuccess('');
                setError('Some of the fields are missing or invalid');
            }
            if(err.status === 402 || err.message.endsWith('402')){
              setShow(true);
              setSuccess('');
              setError('User Already exists!!! Please Login.');
            }
            console.log(err);
          });
          emailRef.current.value = '';
          passwordRef.current.value = '';
          nameRef.current.value = '';
          mobileRef.current.value = '';
    }


    return (
        <div>
            <h1 className="text-center my-5">Register Here</h1>
            <Form onSubmit={register} className="container my-5 col-lg-6">
            <FloatingLabel
              label="Name"
              className="mb-3 "
            >
              <Form.Control type="text" placeholder="Name" ref={nameRef}/>
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3 "
            >
              <Form.Control type="email" placeholder="name@example.com" ref={emailRef}/>
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
              <Form.Control type="password" placeholder="Password" ref={passwordRef}/>
            </FloatingLabel>
            
            <FloatingLabel
              label="Mobile"
              className="mb-3 "
            >
              <Form.Control type="number" placeholder="Mobile" ref={mobileRef}/>
            </FloatingLabel>

            {/* bootstrap alert  */}

            {success && show === true && <Alert variant="success" className='my-3' onClose={() => setShow(false)} dismissible>{success}</Alert>}
            {error && show === true && <Alert variant="danger" className='my-3' onClose={() => setShow(false)} dismissible>{error}</Alert>}

            {/* submit button  */}

            <input type="submit" className="btn btn-primary d-block w-100 fs-5 mx-auto px-4" value="Register" />
          </Form>

          <p className='text-center'> Already Have An Account? <NavLink to="/login">Login</NavLink></p>
        </div>
    );
};

export default Register;