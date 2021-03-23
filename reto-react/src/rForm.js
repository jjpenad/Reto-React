import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';

import * as Joi from 'joi';

import useRForm from './formHooks';

function BuildForm(props) {
	let req = props.req;
	let schema = null;
	let schemaObj = {};

	req.groups.forEach((item) => {
		let dt = false;
		if (item.verifications) {
			Object.keys(item.verifications).forEach((key) => {
				if ('dataType' in item.verifications) {
					if (item.verifications[key] === 'string') {
						schemaObj[[ item.control.name ]] = Joi.string();
						dt = true;
					}
					else if (item.verifications[key] === 'number') {
						schemaObj[[ item.control.name ]] = Joi.number();
						dt = true;
					}
				}
				if (dt) {
					if (key === 'min') {
						schemaObj[[ item.control.name ]] = schemaObj[[ item.control.name ]].min(
							item.verifications[key]
						);
					}
					else if (key === 'max') {
						schemaObj[[ item.control.name ]] = schemaObj[[ item.control.name ]].max(
							item.verifications[key]
						);
					}
					else if (key === 'regex') {
						schemaObj[[ item.control.name ]] = schemaObj[[ item.control.name ]].regex(
							item.verifications[key]
						);
					}
					else if (key === 'required') {
						if (item.verifications[key]) {
							schemaObj[[ item.control.name ]] = schemaObj[[ item.control.name ]].required();
						}
					}
				}
			});
		}
	});

	if (schemaObj !== {}) {
		schema = Joi.object(schemaObj);
	}

	const { handleSubmit, handleInputChange } = useRForm(schema);

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
