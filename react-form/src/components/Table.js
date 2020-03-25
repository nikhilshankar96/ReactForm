import React, { useEffect } from "react";

const Table = props => {
	const display = () => {
		// if (props.show) {
		const formData = JSON.parse(localStorage.getItem("formData"));
		console.log(formData[0]);
		Object.keys(formData[0]).forEach(k => {
			document.getElementById("thead1").innerHTML += `<th>${k}</th>`;
		});
		formData.forEach(person => {
			populateRow(person);
		});
		// }
	};

	const populateRow = person => {
		let row = "<tr>";
		// for (key in person) {
		// 	row += `<td>${person[key]}</td>`;
		// }
		Object.keys(person).forEach(key => {
			row += `<td>${person[key]}</td>`;
			console.log(person[key]);
		});
		row += "</tr>";

		document.getElementById("tBody1").innerHTML += row;
	};

	useEffect(() => {
		if (props.show) display();
	}, [props.show]);

	return (
		props.show && (
			<div
				className='z-depth-5 main'
				style={{
					backgroundColor: "white",
					padding: " 20px",
					marginTop: " 20px",
					marginBottom: "20px",
					minWidth: "fit-content"
				}}
			>
				<table
					className='highlight stripped centered responsive-table'
					style={{ padding: "10px" }}
				>
					<thead>
						<tr id='thead1'></tr>
					</thead>

					<tbody id='tBody1'></tbody>
				</table>
			</div>
		)
	);
};

export default Table;
