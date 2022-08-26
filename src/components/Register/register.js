import React from 'react';
import {alertMe} from '../Alert/alertBox';

class register extends React.Component {
	constructor(props) {
		super();
		this.state = {
			email: '',
			password: '',
			name: '',
		}
	}

	onNameChange = (event) => {
		this.setState({name: event.target.value})
	}

	onEmailChange = (event) => {
		this.setState({email: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({password: event.target.value})
	}

	onSubmitSignIn = () => {
		const validateEmail = (email) => {
		  return String(email)
		    .toLowerCase()
		    .match(
		      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		    );
		};

		fetch('https://serenuy-face-api.herokuapp.com/register', {
		method: 'POST',
		headers: {'Content-Type':'application/json'},
		body: JSON.stringify({
			name: this.state.name,
			email: this.state.email,
			password: this.state.password
			})
		})
		.then(res => {
			if(this.state.name.length === 0) {
				return alertMe('Name field is empty, please provide your name');
			} else if (this.state.email.length === 0) {
				return alertMe('Email field is empty, please provide your email');
			} else if (this.state.password.length < 6) {
				return alertMe('Please enter a password with 6 characters or more'); 
			} else if (!validateEmail(this.state.email)) {
				return alertMe('Email is not valid. Please enter a valid email.');
			}
			return res.json();
		})
		.then(user => {
			if(user.error === undefined) {
				alertMe('Successfully registered. Welcome!')
				setTimeout(() => {
					this.props.loadUser(user);
					this.props.onRouteChange('home');
				},1200);
			} else {
				alertMe(user.error)
			}
		})
		.catch(err => {
			alertMe('Something went wrong')
		})	
	}

	render() {
	const { onRouteChange } = this.props;
	return (
		<article className="br3 shadow-5 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw8 center">
			<main className="pa4 black-80">
			<div className="measure">
				<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					<legend className="f4 fw6 ph0 mh0">Register</legend>
					<div className="mt3">
						<label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
						<div className='input-container'>
							<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="white bg-black pa1 bi bi-person" viewBox="0 0 16 16">
							  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
							</svg>
							<input 
							className="pa2 input-reset ba b--black bg-clear-coat hover-bg-black hover-white w-100" 
							type="text" 
							name="name"  
							id="name"
							onChange={this.onNameChange}
							/>
						</div>
					</div>
					<div className="mt3">
						<label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
						<div className='input-container'>
							<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="pa1 white bg-black bi bi-envelope" viewBox="0 0 16 16">
							  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
							</svg>
							<input className="pa2 input-reset ba b--black bg-clear-coat hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"
							onChange={this.onEmailChange}
							/>
						</div>
					</div>
				<div className="mv3">
					<label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
					<div className='input-container'>
						<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="pa1 bi bi-key white bg-black" viewBox="0 0 16 16">
						  <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z"/>
						  <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
						</svg>
						<input 
						className="b pa2 input-reset ba b--black bg-clear-coat hover-bg-black hover-white w-100" 
						type="password" 
						name="password"  
						id="password"
						onChange={this.onPasswordChange}
						/>
					</div>
				</div>
				</fieldset>
				<div>
					<input 
					className="b ph3 pv2 input-reset ba b--black bg-black white grow pointer f6 dib" 
					type="submit" 
					value="Register" 
					onClick={this.onSubmitSignIn}
					/>
				</div>
				<div className="lh-copy mt3">
					<p 
					onClick={() => onRouteChange('signin')} 
					className="f5 link dim black db">
					Already have an account? Sign In.
					</p>
				</div>
			</div>
		</main>
	</article>
		);
	}
}

export default register;