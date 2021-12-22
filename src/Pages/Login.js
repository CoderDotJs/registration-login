import React from 'react';
import { Alert, FloatingLabel, Form } from 'react-bootstrap';
import { useRef, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [show, setShow] = useState(true);


    // login function to send data to server

    const login = (e) =>{
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
    
        axios({
          method: 'post',
          url: 'https://ttmg-backend.herokuapp.com/api/auth/staffLogin',
          data: {
            email: email,
            password: password
          }
        })
        .then(data => {
          if(data.status === 200){
            setShow(true);
            setSuccess('Login Successful');
            setError('');
            console.log(data);
          }
          if(data.status === 400){
            setShow(true);
            setSuccess('');
            setError('Email or Password Missing');
          }
          if(data.status === 401){
            setShow(true);
            setSuccess('');
            setError('Email or Password is incorrect');
          }
          console.log(data)
        })
        .catch(err => {
          if(err.status === 400 || err.message.endsWith('400')){
            setShow(true);
            setSuccess('');
            setError('Email or Password Missing');
          }
          if(err.status === 402 || err.message.endsWith('401')){
            setShow(true);
            setSuccess('');
            setError('Email or Password is incorrect');
          }
        });
        emailRef.current.value = ''
        passwordRef.current.value = ''
      }
    
      if(show === true){
        setTimeout(()=>{
          setShow(false)
        },5000)
      }

    return (
        <div>

          {/* bootstrap form */}

          <h1 className="text-center my-5">Login Here</h1>

            <Form onSubmit={login} className="container my-5 col-lg-6">
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

            {/* bootstrap alert  */}

            {success && show === true && <Alert variant="success" className='my-3' onClose={() => setShow(false)} dismissible>{success}</Alert>}
            {error && show === true && <Alert variant="danger" className='my-3' onClose={() => setShow(false)} dismissible>{error}</Alert>}

            {/* submit button  */}

            <input type="submit" className="btn btn-primary d-block fs-5 w-100 mx-auto px-4" value="Login" />
          </Form>

          <p className='text-center'> Don't Have An Account? <NavLink to="/register">Register</NavLink></p>
        </div>
    );
};

export default Login;