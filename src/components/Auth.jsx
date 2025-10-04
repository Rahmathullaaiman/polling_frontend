import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { loginapi, registerapi } from '../services/allapi'
import Swal from 'sweetalert2'
import LoginForm from './LoginForm'
import { initialUserData } from '../types'
import { validateRegisterForm, validateLoginForm } from '../helpers.js/formvalidations'
import { UserContext } from '../context/UserContext'

function Auth({ Register }) {

	const [userdata, Setuserdata] = useState(initialUserData)
	const navigate = useNavigate()
	const { setUser } = useContext(UserContext);

	const regform = Register ? true : false
	const handleregister = async (e) => {
		e.preventDefault()
		const validation = validateRegisterForm(userdata)
		if (!validation.valid) {
			Swal.fire({
				title: validation.message,
				icon: "error"
			});
			return
		}

		const result = await registerapi(userdata);

		if (result.data && result.data.success === true) {
			Swal.fire({
				title: result.data.message,
				icon: "success"
			});
			Setuserdata({
				username: "",
				password: ""
			});
			navigate('/login');
		} else {
			Swal.fire({
				title: "Registration Failed",
				text: result.data.message,
				icon: "error"
			});
		}


	}

	const handlelogin = async (e) => {
		e.preventDefault()
		const validation = validateLoginForm(userdata)
		if (!validation.valid) {
			Swal.fire({
				title: validation.message,
				icon: "error"
			});
			return
		}
		const cleanUserdata = {
			username: userdata.username,
			password: userdata.password
		};


		const result = await loginapi(cleanUserdata);


		if (result.data && result.data.success === true) {
			Swal.fire({
				title: "LOGGED IN",
				icon: "success"
			});
			const userWithToken = {
				...result.data.data.user,
				token: result.data.data.access_token
			};
			setUser(userWithToken);
			Setuserdata({
				username: "",
				password: ""
			});
			navigate('/polling');
		} else {
			Swal.fire({
				title: "Login Failed",
				text: result.data?.message || "Invalid credentials",
				icon: "error"
			});
		}

	}



	return (
		<div className="auth-main-container d-flex justify-content-center align-items-center">
			<div className='auth-inner-container w-75 container'>
				<Link className='fs-2 auth-home-link' to={'/'}></Link>
				<div className='auth-bg bg-white p-5'>
					<div className='row align-items-center'>
						<div className='auth-title-container d-flex justify-content-center align-items-center'>
							<h2 className="text-center mb-3 fw-bolder fs-1">Wel<span className='text-primary'>come!</span></h2>
						</div>
						<div className='col-lg-6'>
							<img className="auth-image" src="https://t3.ftcdn.net/jpg/03/39/70/90/360_F_339709048_ZITR4wrVsOXCKdjHncdtabSNWpIhiaR7.jpg" alt="no img" />
						</div>
						<div className='col-lg-6 p-4'>
							<div className='d-flex align-items-center justify-content-center flex-column'>
								<h1 className="auth-stack-icon"><i className="fa-brands fa-stack-overflow fa-2x"></i></h1>
								<h5 className='text-light ms-5'>
									{
										regform ? <div className='d-flex justify-content-center align-items-center'>
											<h2 className='fw-bolder auth-signup-title'>SIGN <span className='text-primary'>UP</span></h2>
										</div> :
											<div className='d-flex justify-content-center align-items-center'>
												<h2 className='fw-bolder auth-signin-title'>SIGN <span className='text-primary'>IN</span></h2>
											</div>
									}
								</h5>
								<Form className='mt-3 w-100'>
									{regform ? (
										<>
											<Form.Group className="mb-3  w-75" controlId="formBasicUsername">
												<Form.Control type="text" placeholder="Enter username" value={userdata.username} onChange={(e) => Setuserdata({ ...userdata, username: e.target.value })} />
											</Form.Group>
											<Form.Group className="mb-3 w-75" controlId="formBasicPassword">
												<Form.Control type="password" placeholder="Enter Password" value={userdata.password} onChange={(e) => Setuserdata({ ...userdata, password: e.target.value })} />
											</Form.Group>
											<div className='d-flex justify-content-center align-items-center'>
												<div>
													<button onClick={handleregister} className='btn btn-primary'>Register</button>
													<div className='auth-login-link-container d-flex justify-content-center align-items-center mt-4'>
														<p>Already a user?Click here to <Link className="auth-login-link" to={'/Login'}>Login</Link></p>
													</div>
												</div>
											</div>
										</>
									) : (
										<LoginForm
											userdata={userdata}
											Setuserdata={Setuserdata}
											handlelogin={handlelogin}
										/>
									)}
								</Form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Auth