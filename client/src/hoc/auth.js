// HOC : Higher-order component is a function that takes a component and return a new component
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { auth } from '../_action/user_action';
import { useNavigate } from 'react-router-dom';

export default function (SpecificComponent, option, adminRout = null) {
    // option
    // null => everyone
    // true => only for user who sign in
    // false => only for user who did not sign in
    function AuthenticationCheck(props) {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        useEffect(() => {
            dispatch(auth()).then(response => {
                // no sign up
                if (!response.payload.isAuth) {
                    // use should sign up in order to access 
                    if (option) {
                        navigate('/login');
                    }
                } else {
                    // sign up
                    if (adminRout && !response.payload.isAuth) {
                        // this is only for admin
                        navigate('/');
                    } else {
                        if (!option) {
                            // user has signed up no need to acces login or register page
                            navigate('/');
                        }
                    }
                }
            })
                
        }, [])
        return (
            <SpecificComponent/>
        )
            
        
    }
    return AuthenticationCheck;
}

