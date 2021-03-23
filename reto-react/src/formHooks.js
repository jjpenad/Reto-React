import { useState } from 'react';

const useRForm = () => {
	const [ inputs, setInputs ] = useState({});

	const handleSubmit = (preventDefault, event) => {
		//Prevents the form from refreshing the page after submitted
		if (preventDefault) event.preventDefault();

		console.log('submit!!!');
	};

	const handleInputChange = (event) => {
		//console.log('changing', event.target.name);
		setInputs({ ...inputs, [event.target.name]: event.target.value });
	};

	return { handleSubmit, handleInputChange };
};

export default useRForm;
