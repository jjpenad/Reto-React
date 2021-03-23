import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';

import useRForm from './formHooks';

function BuildForm(props) {
	const req = props.req;
	const { handleSubmit, handleInputChange } = useRForm();

	let i = 0;
	const groups = req.groups.map(
		(item) =>
			item.control.type === 'checkbox' || item.control.type === 'radio' ? (
				<Form.Group className="d-flex" key={++i}>
					<Form.Control
						type={item.control.type}
						id={item.control.id}
						name={item.control.name}
						onChange={handleInputChange}
					/>
					<Form.Label htmlFor={item.control.name}>{item.label}</Form.Label>
				</Form.Group>
			) : (
				<Form.Group key={++i}>
					<Form.Label htmlFor={item.control.name}>{item.label}</Form.Label>

					<Form.Control
						type={item.control.type}
						id={item.control.id}
						name={item.control.name}
						onChange={handleInputChange}
					/>
				</Form.Group>
			)
	);

	return (
		<Form onSubmit={handleSubmit.bind(this, req.preventDefault)}>
			{groups}
			<Button type="submit">Register</Button>
		</Form>
	);
}

function RForm(props) {
	return (
		<Container className="p-3">
			<Jumbotron>
				<BuildForm req={props.req} />
			</Jumbotron>
		</Container>
	);
}

export default RForm;
