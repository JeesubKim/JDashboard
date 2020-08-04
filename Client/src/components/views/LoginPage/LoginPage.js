import React, {useState} from 'react'
import Axios from 'axios'
import {useDispatch} from 'react-redux'
import {loginUser} from '../../../_actions/user_action'

import {withRouter} from 'react-router-dom'

function LoginPage(props) { 
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const onEmailHandler = event=>{
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = event=>{
        setPassword(event.currentTarget.value)
    }
    const onSubmitHandler = event=>{
        event.preventDefault();

        let body = {
            email:Email,
            password:Password
        }

        dispatch(loginUser(body))
        .then(resp=>{
            if(resp.payload.loginSuccess){
                props.history.push('/')
            }else{
                alert('Error');
            }
        })
    }
    return (
        <div>
            LoginPage
            <form style={{display:'flex',flexDirection:'column'}}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br/>
                <button>login</button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)
