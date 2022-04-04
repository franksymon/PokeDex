import React, { useState } from 'react';
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    
    const[userName, setUserName] = useState ("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submit = e =>{
        e.preventDefault();
        console.log(userName)
        dispatch({
            type: "GET_USERNAME",
            payload: userName,
        })
        
        setUserName("")
        navigate('/pokedex')
    }
    
    return (
        <section id='login'>
            <div className='login-title'>
                <h2>Hello Trainer!</h2>
                <img src="https://www.seekpng.com/png/full/201-2011786_red-by-xous-54-red-pokemon-trainer-png.png" alt="avatar" />
            </div>
         
            <p>Give me your name to start</p>
            
            <form action="" onSubmit={submit} className="login-form">
                
                <input 
                    type="text"
                    name='userName'
                    id='userName'
                    placeholder='Name'
                    onChange={(e)=> setUserName(e.target.value)} 
                    value={userName}
                />
                <button>
                    <i className="fas fa-paper-plane"></i>
                </button>
            </form>
        </section>
    );
};

export default Login;