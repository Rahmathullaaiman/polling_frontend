import React from 'react'
import { Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function LoginForm({ userdata, Setuserdata, handlelogin }) {
    return (
        <Form className='mt-3 w-100'>
            <Form.Group className="mb-3 w-75" controlId="formBasicUsername">
                <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={userdata.username}
                    onChange={(e) => Setuserdata({ ...userdata, username: e.target.value })}
                />
            </Form.Group>
            <Form.Group className="mb-3 w-75" controlId="formBasicPassword">
                <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={userdata.password}
                    onChange={(e) => Setuserdata({ ...userdata, password: e.target.value })}
                />
            </Form.Group>
            <div className='d-flex justify-content-center align-items-center'>
                <div style={{ marginLeft: "5%" }}>
                    <button onClick={handlelogin} className='btn btn-primary'>Login</button>
                    <div style={{ marginLeft: "-50%" }} className='d-flex justify-content-center align-items-center mt-4'>
                        <p>New User?Click here to <Link style={{ textDecoration: "none" }} to={'/Register'}>Register</Link></p>
                    </div>
                </div>
            </div>
        </Form>
    )
}

export default LoginForm
