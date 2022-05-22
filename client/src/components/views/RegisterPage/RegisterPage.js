import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../_action/user_action';
export default function RegisterPage() {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  
  const onEmailHanlder = (event) => {
      setEmail(event.currentTarget.value);
  }
  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  }
  const onPassword = (event) => {
    setPassword(event.currentTarget.value);
  }
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    
    if (Password !== ConfirmPassword) {
      return alert('Password should be equal!');
    }
    let body = {
        email: Email,
        password: Password,
        name: Name
        
    }
    dispatch(registerUser(body))
        .then(response => {
          if (response.payload.success) {
            navigate('/login');
          } else {
            alert('Failed to sign up');
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
            
            <label>Name</label>
            <input type="text" value={Name} onChange={onNameHandler} />
        
            <label>Password</label>
            <input type="password" value={Password} onChange={onPassword} />
        
            <label>Comfirm Password</label>
            <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
            <br />
            <button type="submit">
                Sign up
            </button>
      </form>
    
    </div>
  )
}
