//higher ordered component

import React, { useEffect } from 'react';

import {useDispatch} from 'react-redux'
import {auth} from '../_actions/user_action'

export default function (SpecificComponent, option, adminRoute = null) {

    // console.log(option,adminRoute);
    
    //option => null => 아무나 access 가능
    //       => true => 로긴한 유저만 access
    //       => false => 로긴한 유저는 access 불가능
    function AuthenticationCheck(props) {
        const dispatch = useDispatch();
        useEffect(()=>{
                dispatch(auth()).then(resp=>{
                    console.log(resp);
                    //1. Not logged in state
                    if(!resp.payload.isAuth) {
                        if(option) {
                            props.history.push('/login')
                        }
                    } else {
                        //2. Logged in state

                        if(adminRoute && !resp.payload.isAdmin) {
                            props.history.push('/')
                        } else {
                            if(option===false){
                                    props.history.push('/')
                            }
                        }

                    }
                })
            
        },[])

        return (

            <SpecificComponent />
        )
    }

    return AuthenticationCheck
}