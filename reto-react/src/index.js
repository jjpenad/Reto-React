import React from 'react';
import ReactDOM from 'react-dom';
import Form from './rForm';

import './stylesheet.css';

const json = require('./sample.json');

ReactDOM.render(<Form req={json} />, document.getElementById('root'));
