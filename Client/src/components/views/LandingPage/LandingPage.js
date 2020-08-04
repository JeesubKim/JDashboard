import React, {useEffect} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom'
function LandingPage(props) {


    useEffect(()=>{
        axios.get('/api/test/CORP')
        .then(res=>{
            console.log('LandingPage' , res.data)
        })
    },[])


    const onClickHandler = ()=>{
        axios.get('/api/v1/users/logout')
        .then(resp=>{
            console.log(resp);
            if(resp.data.success){
                props.history.push('/login')
            }else{
                alert("Failed to logout");
            }
        })
    }
    return (
        <div>
            LandingPage

            <button onClick={onClickHandler}>Log out</button>
        </div>
    )
}

export default withRouter(LandingPage)
