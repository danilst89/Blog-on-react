import React from 'react';
import './SignIn.css';
import Input from "../../ui/Input/Input";
import axios from 'axios';

function validateEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

export default class Auth extends React.Component {

	state= {
		formControls: {
			email: {
				value: '',
				type: 'email',
				label: 'Email',
				errorMessage: 'Введите корректный email',
				valid: false,
				touched: false,
				validation: {
					required: true,
					email: true
				}
			},
			password: {
				value: '',
				type: 'password',
				label: 'Пароль',
				errorMessage: 'Введите корректный пароль',
				valid: false,
				touched: false,
				validation: {
					required: true,
					minLength: 6
				}
			}
		}
	}

	loginHandler = async () => {
		const authData = {
			email: this.state.formControls.email.value,
			password: this.state.formControls.password.value,
			returnSecureToken: true

		};
		try {
			const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBGpZCdakbJU7exk302ldpdsG44hcH4-GI', authData);
			console.log(response.data);
		} catch (e) {
			console.log(e);
		}
	};

	registerHandler = async () => {
		const authData = {
			email: this.state.formControls.email.value,
			password: this.state.formControls.password.value,
			returnSecureToken: true
		};
		try {
			const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBGpZCdakbJU7exk302ldpdsG44hcH4-GI', authData);
			console.log(response.data);
		} catch (e) {
			console.log(e);
		}
	};

	submitHandler = event => {
		event.preventDefault();
	};

	validateControl(value, validation) {
		if (!validation) {
			return true;
		}

		let isValid = true;

		if (validation.required) {
			isValid = value.trim() !== '' && isValid
		}

		if (validation.email) {
			isValid = validateEmail(value) && isValid;
		}

		if (validation.minLength) {
			isValid = value.length >= validation.minLength && isValid;
		}

		return isValid;
	}

	onChangeHandler = (e, controlName) => {
		const formControls = {...this.state.formControls};
		const control = {...formControls[controlName]};

		control.value = e.target.value;
		control.touched = true;
		control.valid = this.validateControl(control.value, control.validation);

		formControls[controlName] = control;

		this.setState({
			formControls
		});
	};

	renderInputs() {
		return Object.keys(this.state.formControls).map((controlName, index) => {
			const control = this.state.formControls[controlName];
			return (
				<Input
					key={controlName + index}
					type={control.type}
					value={control.value}
					valid={control.valid}
					touched={control.touched}
					label={control.label}
					shouldValidate={!!control.validation}
					errorMessage={control.errorMessage}
					onChange={(e) => this.onChangeHandler(e, controlName)}
				/>
			)
		});
	}

	render() {
		return (
			<div className={'Auth'}>
				<div>
					<h1>Авторизация</h1>

					<form className={'AuthForm'} onSubmit={this.submitHandler} action="">

						{this.renderInputs()}

						<button
							type={'success'}
							onClick={this.loginHandler}
						>Войти</button>

						<button
							type={'primary'}
							onClick={this.registerHandler}
						>Заерегстрироваться</button>
					</form>
				</div>
			</div>
		)
	}
}