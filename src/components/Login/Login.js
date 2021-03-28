import React, { useContext } from 'react';

import { useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFrameWork, signInWithEmailAndPassword } from './loginManager';



function Login() {
    const [newUser, setNewUser] = useState(false)
    document.title = 'login'

    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
    });

    initializeLoginFrameWork();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleRes(res, true)
            })
    }

    const fbSignIn = () => {
        handleFbSignIn()
            .then(res => {
                handleRes(res, true)
            })
    }

    const signOut = () => {
        handleSignOut()
            .then(res => {
                handleRes(res, false)
            })
    }

    const handleRes = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }

    }

    const handleBlur = (event) => {
        let isFieldValid = true;
        if (event.target.name === 'email') {
            isFieldValid = /^[^\s@]+@[^\s@]+$/.test(event.target.value)
        }
        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(event.target.value)
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo)
        }
    }


    const handleSubmit = (event) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handleRes(res, true)
                })
        }

        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleRes(res, true)
                })
        }
        event.preventDefault();
    }


    return (
        <>
            <div className='pt-5' style={{textAlign:'center'}} >
                <div className='d-flex justify-content-center align-items-center flex-column'>
                    <div style={{ boxShadow: "5px 5px 5px  gray", borderRadius: '10px', padding: '75px'}}>
                        {
                            newUser ?
                                <h3 style={{ fontWeight: '700' }}>Create an account</h3>
                                : <h3 style={{ fontWeight: '700' }}>Login</h3>
                        }
                        <div>
                            <form onSubmit={handleSubmit}>
                                {
                                    newUser && <input name='name' placeholder='Your name' onBlur={handleBlur} type="text" required />
                                }<br />
                                <input type="text" onBlur={handleBlur} name='email' placeholder='Email' required /> <br />
                                <input type="password" onBlur={handleBlur} name="password" placeholder="Password" required />
                                <br />
                                <br />
                                <input type="submit" style={{ width: '180px' }} className='btn btn-danger' value={newUser ? 'create an account' : 'Login'} />
                            </form>
                        </div>
                        {
                            newUser ? <p className='pt-3'> <small>Already has account?</small> <strong><a style={{ cursor: 'pointer', color: 'red' }} onClick={() => setNewUser(!newUser)}> Login</a></strong></p> :

                                <p className='pt-3'><small> Don't have an account?</small>  <strong><a style={{ cursor: 'pointer', color: 'red' }} onClick={() => setNewUser(!newUser)}> create an account</a></strong></p>
                        }
                    </div>
                </div>

                <p style={{textAlign:'center'}}> <strong>or</strong> </p>


                <div className='d-flex justify-content-center align-items-center flex-column flex-wrap'>

                    <div  style={{ border: '1px solid black', borderRadius: '40px', cursor: 'pointer'}}
                        onClick={fbSignIn}> <p> <strong>Sign in with facebook</strong> </p>
                    </div>

                    <div style={{ border: '1px solid black', borderRadius: '40px', cursor: 'pointer'}}
                        onClick={googleSignIn}> <p> <strong>Sign in with google</strong> </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
