import React, { useState } from 'react';
import { Typography, Button, OutlinedInput,InputAdornment, IconButton, InputLabel, FormControl, TextField  } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from "react-router-dom"
import "./auth.css";
import { Loader } from '../../components/Loader/Loader';
import { loginHandler } from '../../features/auth';
import { useDispatch, useSelector } from 'react-redux';

 export const Login = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth)
    const [ login, setLogin ] = useState({ input: {}, error:"", showPassword: false});
    const guestLogin = {email: "adarshbalika@gmail.com", password: "adarshBalika123"};

    const credentialsChangeHandler = (e) => {
        const { name, value } = e.target;
        setLogin({...login, input: { ...login.input, [name]:value}});
    }

    const handleClickShowPassword = () => {
        setLogin({
          ...login,
          showPassword: !login.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

      const formSubmit = () => {
        dispatch(loginHandler({login, setLogin}))
      }

    return (
        <div className="page-container auth-page">
            {loading ? <Loader /> : 
                <form className="authentication-form" onSubmit={formSubmit} >
                <Typography component="div" variant="h3">Login</Typography>
            
                <TextField 
                    required
                    id="outlined-name"
                    label="Email"
                    value={login.input['email'] || ""}
                    name="email"
                    onChange={credentialsChangeHandler}
                    />
                
                <FormControl variant="outlined">

                    <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
                    <OutlinedInput
                    required
                    id="outlined-adornment-password"
                    name='password'
                    type={login.showPassword ? 'text' : 'password'}
                    value={login.input['password'] || ""}
                    onChange={credentialsChangeHandler}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                        {login.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label="Password"
                />
                </FormControl>
                
                <Button onClick={formSubmit} type="submit" sx={{bgcolor: 'var(--accent-color)'}} size="large" variant="contained">Login</Button>
                <Button onClick={()=>{
                    setLogin({...login, input: guestLogin});
                }} type="submit" name="guest-login" sx={{bgcolor: 'var(--accent-color)'}} size="large" variant="contained">Login with guest account</Button>
                {login.error && <Typography variant="body1" sx={{color:"red"}}> {login.error} </Typography>}
                <Link to="/signup" className="link" >Don't have an account yet?</Link>
                
            </form>
            }
        </div>
    )
}