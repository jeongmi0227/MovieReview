import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../_action/user_action';


export default function LoginPage(props) {
    const dispatch = useDispatch();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const onEmailHanlder = (event) => {
        setEmail(event.currentTarget.value);
    }

    const onPassword = (event) => {
        setPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        let body = {
            email: Email,
            password:Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    navigate('/');
                } else {
                    alert('error');
                }
        })

 
    }
  return (
    <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
      }}onSubmit={onSubmitHandler}>
          <form style={{display:'flex',flexDirection:'column'}}> 
              <label>Email</label>
              <input type="email" value={Email} onChange={onEmailHanlder} />
              <label>Password</label>
              <input type="password" value={Password} onChange={onPassword}/>
              <br />
              <button type="submit">
                  Login
              </button>
        </form>
      
      </div>
  )
}
