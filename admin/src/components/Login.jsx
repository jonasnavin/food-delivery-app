import React from 'react'

const Login = () => {
    return (
        <div>
            
            <input className={inputStyle} value={data.email} onChange={onChangeHandler} type="email" placeholder='Email' name="email" />
            <input className={inputStyle} value={data.password} onChange={onChangeHandler} type="password" placeholder='Password' name="password" />
        </div>
    )
}

export default Login