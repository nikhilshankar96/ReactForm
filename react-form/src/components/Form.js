import React, { useEffect, useState } from "react";
import { TextInput, Toast, Button } from "react-materialize";
import Table from "./Table";

import M from "materialize-css";

const Form = () => {
	const [showTable, setShowTable] = useState(false);
	const [state, setState] = useState({
		title: "",
		name: "",
		email: "",
		phone: "",
		zip: "",
		source: "",
		comment: ""
	});

	//Query selectors
	const $ = document.querySelector.bind(document);
	useEffect(() => {
		let elems = document.querySelectorAll("select");
		let instances = M.FormSelect.init(elems);
		radioValidate();
	}, []);

	useEffect(() => {
		console.log(state);
	}, [state]);

	const data = {
		title: "",
		name: "",
		email: "",
		phone: "",
		zip: "",
		source: "",
		comment: ""
	};

	const radioValidate = () => {
		document.getElementsByName("group1").forEach(element => {
			if (element.checked) {
				data.title = element.value;
				setState({ ...state, title: element.value });
			}
		});
		return true;
	};

	const validateName = () => {
		let input = $("#name");
		let str = input.value.toString().trim();
		let regex = /^[a-zA-Z ]{2,40}$/;

		if (str !== "" && regex.test(str)) {
			input.classList.remove("invalid");
			input.classList.add("valid");
			data.name = str;
			setState({ ...state, name: str });

			return true;
		} else {
			input.classList.add("invalid");
			input.classList.remove("valid");
			data.name = "";
			setState({ ...state, name: "" });
			return false;
		}
	};
	const validateComment = () => {
		let input = $("#comment");
		let str = input.value.toString().trim();
		let regex = /^[a-zA-Z ]{2,200}$/;

		if (str !== "" && regex.test(str)) {
			input.classList.remove("invalid");
			input.classList.add("valid");
			data.comment = str;
			setState({ ...state, comment: str });

			return true;
		} else {
			input.classList.add("invalid");
			input.classList.remove("valid");
			data.comment = "";
			setState({ ...state, comment: "" });
			return false;
		}
	};

	const validateEmail = () => {
		let input = $("#email");
		let str = input.value.toString().trim();
		let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (str !== "" && regex.test(str)) {
			input.classList.remove("invalid");
			input.classList.add("valid");
			data.email = str;
			setState({ ...state, email: str });

			return true;
		} else {
			input.classList.add("invalid");
			input.classList.remove("valid");
			data.email = "";
			setState({ ...state, email: "" });
			return false;
		}
	};

	const validatePhone = () => {
		let input = $("#phone");
		let str = input.value;

		let regex = /^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/;

		if (str !== "" && regex.test(str)) {
			input.classList.remove("invalid");
			input.classList.add("valid");
			data.phone = str;
			setState({ ...state, phone: str });

			return true;
		} else {
			input.classList.add("invalid");
			input.classList.remove("valid");
			data.phone = "";
			setState({ ...state, phone: "" });
			return false;
		}
	};

	const validateZip = () => {
		let input = $("#zip");
		let str = input.value;
		let regex = /^\d{5}(?:[-\s]\d{4})?$/;

		if (str !== "" && regex.test(str)) {
			input.classList.remove("invalid");
			input.classList.add("valid");
			data.zip = str;
			setState({ ...state, zip: str });

			return true;
		} else {
			input.classList.add("invalid");
			input.classList.remove("valid");
			data.zip = "";
			setState({ ...state, zip: "" });
			return false;
		}
	};

	const validateCheckboxes = () => {
		// console.log("!!!");
		let checkBoxes = document.getElementsByClassName("checkBoxes");
		// console.log(checkBoxes);
		for (let i = 0; i < 3; i++) {
			if (checkBoxes[i].checked && !data.source.includes(checkBoxes[i].value)) {
				data.source += checkBoxes[i].value + " ";
				setState({
					...state,
					source: data.source
				});
			} else if (
				!checkBoxes[i].checked &&
				data.source.includes(checkBoxes[i].value)
			) {
				data.source = data.source.replace(checkBoxes[i].value, " ");
				setState({
					...state,
					source: data.source
				});
			}
		}

		if (data.source.trim() == "") {
			$("#checkError").innerHTML = "Select at least one checkbox!";
			return false;
		} else {
			$("#checkError").innerHTML = "";
			return true;
		}
	};

	const handleSubmit = event => {
		event.preventDefault();
		if (
			radioValidate() &&
			validateName() &&
			validateEmail() &&
			validatePhone() &&
			validateZip() &&
			validateComment() &&
			validateCheckboxes()
		) {
			data.source = data.source
				.trim()
				.split(" ")
				.join("   ");
			if (localStorage.getItem("formData")) {
				let formData = JSON.parse(localStorage.getItem("formData"));
				formData.push(state);
				localStorage.setItem("formData", JSON.stringify(formData));
			} else {
				localStorage.setItem("formData", JSON.stringify([state]));
			}
			setShowTable(true);
		} else {
			M.toast({ html: "Please correct fields before submitting!" });
		}
	};

	const changeView = () => setShowTable(!showTable);

	useEffect(() => {}, [showTable]);

	return (
		<div className=''>
			<h2>
				<b>Feedback</b>
			</h2>
			{!showTable && (
				<div className='formDiv container'>
					<div className='center'>
						<h3>Love something? Hate something? Let us know!</h3>
						<h6 className='red-text'>
							Note: Fields marked with an asterisk (
							<span className='red-text'>&#9733;</span>) are mandatory
						</h6>
					</div>
					<div className='row'>
						<form action='#' style={{ marginTop: "35px" }}>
							<div className='col s12' style={{ fontSize: "20px" }}>
								<span>Title</span>
							</div>
							<div
								className='col s12 valign-wrapper'
								id='prefix-div'
								style={{ marginTop: "15px" }}
							>
								<div className='col s4 waves waves-effect'>
									<label>
										<input
											name='group1'
											id='mr-radio'
											value='Mr.'
											type='radio'
											defaultChecked
											onChange={radioValidate}
										/>
										<span>Mr.</span>
									</label>
								</div>
								<div className='col s4 waves waves-effect'>
									<label>
										<input
											name='group1'
											id='ms-radio'
											value='Ms.'
											type='radio'
											onChange={radioValidate}
										/>
										<span>Ms.</span>
									</label>
								</div>
								<div className='col s4 waves waves-effect'>
									<label>
										<input
											name='group1'
											id='mrs-radio'
											value='Mrs.'
											type='radio'
											onChange={radioValidate}
										/>
										<span>Mrs.</span>
									</label>
								</div>
							</div>
							<div
								className='col s12 valign-wrapper'
								style={{ marginTop: "25px" }}
							>
								<div className='input-field col s12'>
									<input
										id='name'
										type='text'
										className=''
										required
										onChange={validateName}
									/>
									<label htmlFor='name'>
										Name&nbsp; <span className='red-text'>&#9733;</span>
									</label>

									<span
										className='helper-text'
										data-error={validateName ? "Enter a valid name" : ""}
										data-success=''
									></span>
								</div>
							</div>

							<div className='col s12 valign-wrapper'>
								<div className='input-field col s12'>
									<input
										id='email'
										type='email'
										className=''
										required
										onChange={validateEmail}
									/>
									<label htmlFor='email'>
										Email&nbsp; <span className='red-text'>&#9733;</span>
									</label>

									<span
										className='helper-text'
										data-error={validateEmail ? "Enter a valid email" : ""}
										data-success=''
									></span>
								</div>
							</div>
							<div className='col s12 valign-wrapper' style={{}}>
								<div className='input-field col s12'>
									<input
										id='phone'
										type='number'
										className=''
										required
										onChange={validatePhone}
									/>
									<label htmlFor='phone'>
										Phone&nbsp; <span className='red-text'>&#9733;</span>
									</label>

									<span
										className='helper-text'
										data-error={validatePhone ? "Enter a valid phone" : ""}
										data-success=''
									></span>
								</div>
							</div>
							<div className='col s12 valign-wrapper' style={{}}>
								<div className='input-field col s12'>
									<input
										id='zip'
										type='number'
										className=''
										required
										onChange={validateZip}
									/>
									<label htmlFor='Zip'>
										Zip&nbsp; <span className='red-text'>&#9733;</span>
									</label>

									<span
										className='helper-text'
										data-error={validateZip ? "Enter a valid Zip" : ""}
										data-success=''
									></span>
								</div>
							</div>
							<div
								className='col s12 valign-wrapper'
								// style={{ marginTop: "25px" }}
							>
								<div className='input-field col s12'>
									<input
										id='comment'
										type='text'
										className=''
										required
										onChange={validateComment}
									/>
									<label htmlFor='comment'>
										Comment&nbsp; <span className='red-text'>&#9733;</span>
									</label>

									<span
										className='helper-text'
										data-error={validateComment ? "Enter a valid comment" : ""}
										data-success=''
									></span>
								</div>
							</div>

							<div
								className='col s12'
								style={{ fontSize: "20px", marginBottom: "20px" }}
							>
								<span>How did you hear about us?</span>
							</div>

							<div
								className='row col valign-wrapper center-align'
								style={{ width: "99%" }}
							>
								<div className='col s6 m4' style={{ width: "33%" }}>
									<label>
										<input
											type='checkbox'
											className='checkBoxes'
											id='f-check'
											value='FaceBook'
											onChange={validateCheckboxes}
										/>
										<span>Facebook</span>
									</label>
								</div>
								<div className='col s4'>
									{" "}
									<label>
										<input
											type='checkbox'
											className='checkBoxes'
											id='l-check'
											value='LinkedIn'
											onChange={validateCheckboxes}
										/>
										<span>LinkedIn</span>
									</label>
								</div>
								<div className='col s4'>
									{" "}
									<label>
										<input
											type='checkbox'
											className='checkBoxes'
											id='r-check'
											value='Reddit'
											onChange={validateCheckboxes}
										/>
										<span>Reddit</span>
									</label>
								</div>
							</div>
							<div
								className='col s12'
								style={{
									fontSize: "20px",
									marginBottom: "50px",
									height: "30px"
								}}
							>
								<span className='invalid red-text' id='checkError'>
									{"     "}
								</span>
							</div>
							<div className='col s12'>
								<Button
									className='waves waves-effect z-depth-2 cyan'
									large
									onClick={handleSubmit}
								>
									<strong>Submit</strong>
								</Button>
							</div>
						</form>
					</div>
				</div>
			)}
			{showTable && (
				<div className='tableDiv' style={{ width: "100%" }}>
					<Table show={showTable} />

					<Button
						onClick={changeView}
						style={{
							marginTop: "20px",
							marginBottom: "40px"
						}}
					>
						Add another entry
					</Button>
				</div>
			)}
		</div>
	);
};

export default Form;
