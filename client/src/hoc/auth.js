// HOC : Higher-order component is a function that takes a component and return a new component
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { auth } from '../_action/user_action';

export default function (SpecificComponent, option, adminRout = null) {
    // option
    // null => everyone
    // true => only for user who sign in
    // false => only for user who did not sign in
    function AuthenticationCheck(props) {
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response);
            })
                
        }, [])
        return (
            <SpecificComponent/>
        )
            
        
    }
    return AuthenticationCheck;
}

