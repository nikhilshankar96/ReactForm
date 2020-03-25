import React, { Fragment } from "react";

const Form = () => {
	//
	//validate names and comments
	const validateString = e => {
		let regex = /^[a-zA-Z ]{2,20}$/;
		let strVal = e.target.value.toString().trim();
		if (strVal !== "" && regex.test(strVal)) {
			return true;
		} else {
			e.target.classList.add("invalid");
			return false;
		}
	};

	//validate email
	const validateEmail = input => {
		let email = input.value.toString().trim();
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (re.test(email)) {
			return true;
		} else {
			input.classList.add("invalid");
			return false;
		}
	};

	//validate numbers
	const validatePhone = () => {
		let reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
		let e = email.value;
		if (reg.test(e.target.value)) {
			e.target.classList.add("valid");
			e.target.classList.remove("invalid");
			return true;
		} else {
			e.target.classList.add("invalid");
			e.target.classList.remove("valid");
			return false;
		}
	};

	//validate zip
	const validateZip = zip => {
		let reg = /^\d{5}$|^\d{5}-\d{4}$/;
		if (reg.test(zip.value)) {
			zip.classList.remove("invalid");
			return true;
		} else {
			zip.classList.add("invalid");
			return false;
		}
	};
	//
	return (
		<Fragment>
			<div className='container row center-align'>
				<h3>Form</h3>
				<form>
					<div className='input-field col s12 l6'>
						<input
							id='fname'
							type='text'
							className='validate'
							required
							onChange={validateString}
						/>
						<label htmlFor='fname'>First Name</label>
					</div>
					<div className='input-field col s12 l6'>
						<input id='lname' type='text' className='validate' required />
						<label htmlFor='lname'>Last Name</label>
					</div>
					<div className='input-field col s12 l6'>
						<input id='email' type='email' className='validate' required />
						<label htmlFor='email'>Email</label>
					</div>
					<div className='input-field col s12 l6'>
						<input
							id='number'
							type='number'
							className='validate'
							required
							onChange={validatePhone(this)}
						/>
						<label htmlFor='number'>Number</label>
					</div>
					<div className='input-field col s12 l6'>
						<input id='zip' type='number' className='validate' required />
						<label htmlFor='zip'>Zip</label>
					</div>

					<div className='row container'>
						<h6 style={{ textAlign: "left" }}>How did you hear about us?</h6>
						<div className='col s4'>
							<p>
								<label>
									<input
										type='checkbox'
										class='checks'
										id='fb-check'
										// onchange='validateCheckboxes'
									/>
									<span>Facebook</span>
								</label>
							</p>
						</div>
						<div className='col s4'>
							<p>
								<label>
									<input
										type='checkbox'
										class='checks'
										id='l-check'
										// onchange='validateCheckboxes'
									/>
									<span>LinkedIn</span>
								</label>
							</p>
						</div>
						<div className='col s4'>
							<p>
								<label>
									<input
										type='checkbox'
										class='checks'
										id='t-check'
										// onchange='validateCheckboxes'
									/>
									<span>Twitter</span>
								</label>
							</p>
						</div>
					</div>
					<div className='input-field col s12 l6'>
						<input id='comment' type='text' className='validate' required />
						<label htmlFor='comment'>Comments</label>
					</div>
					{/*  */}
					<div class='col s12'>
						<div style={{ height: "50px" }}></div>
						<div class='col s6 center'>
							<a
								class='waves-effect waves-light btn'
								id='submitBtn'
								onclick='submitFn()'
							>
								Submit
							</a>
						</div>
						<div class='col s6 center'>
							<a
								class='waves-effect waves-light btn red'
								id='resetBtn'
								onclick='resetFn()'
							>
								Reset
							</a>
						</div>
					</div>
					{/*  */}
				</form>
			</div>
		</Fragment>
	);
};

export default Form;
//  <input id="email" type="email" class="validate">
//           <label for="email">Email</label>
