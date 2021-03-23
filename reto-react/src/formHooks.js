import { useState } from 'react';

const useRForm = (schema) => {
	const [ inputs, setInputs ] = useState({});
	const [ errors, setErrors ] = useState('');

	const handleSubmit = (preventDefault, event) => {
		//Prevents the form from refreshing the page after submitted
		if (preventDefault) event.preventDefault();

		const { error } = validate();
		if (!error) {
			console.log('Form submited!!!');
		}
		else {
			console.log('Errors', error);
			setErrors(error);
		}
	};

	const handleInputChange = (event) => {
		//console.log('changing', event.target.name);
		setInputs({ ...inputs, [event.target.name]: event.target.value });
	};

	const validate = () => {
		if (schema !== null) {
			return schema.validate(inputs);
		}
	};

	return { handleSubmit, handleInputChange, errors };
};

export default useRForm;
