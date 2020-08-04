import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {registerUser} from '../../../_actions/user_action'

import {withRouter} from 'react-router-dom'

function RegisterPage(props) {
    const dispatch = useDispatch();
    let initialState = "";
    const [Email, setEmail] = useState(initialState)
    const [FirstName, setFirst] = useState(initialState)
    const [LastName, setLastName] = useState(initialState)
    const [Password, setPassword] = useState(initialState)
    const [ConfirmPassword, setConfirmPassword] = useState(initialState)    
    const [Institute, setInstitute] = useState(initialState)

    const onEmailHandler = event=>{
        setEmail(event.currentTarget.value)
    }

    const onFirstNameHandler = event=>{
        setFirst(event.currentTarget.value)
    }

    const onLastNameHandler = event=>{
        setLastName(event.currentTarget.value)
    }

    const onPasswordHandler = event=>{
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = event=>{
        setConfirmPassword(event.currentTarget.value)
    }
    const onSubmitHandler = event=>{
        event.preventDefault();

        if(Password !== ConfirmPassword){
            return alert('Password is not matched with Confirm password')
        }
        let body={
            email:Email,
            firstName:FirstName,
            lastName:LastName,
            password:Password,

        }

        dispatch(registerUser(body)).then(resp=>{
            if(resp.payload.success) {
                alert("Sign up complete!");
                props.history.push("/login")

            }
            else{
                alert("Failed to sign up");
            }
        })
    }
    return (
        <div>
            RegisterPage


            <form style={{display:'flex',flexDirection:'column'}}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />

                <label>First name</label>
                <input type="text" value={FirstName} onChange={onFirstNameHandler} />

                <label>last name</label>
                <input type="text" value={LastName} onChange={onLastNameHandler} />

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

                <label>Institution</label>
                <select name="Institution" value = {Institute} onChange={setInstitute}>
                    <option value="none"></option>
                    <option value="ssir">SSIR</option>
                    <option value="srpol">SRPOL</option>
                    <option value="src-b">SRC-B</option>
                    <option value="dsa">DSA</option>
                    <option value="dsr">DSR</option>
                </select>

                <br/>
                <button type="submit">Sign-in</button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
