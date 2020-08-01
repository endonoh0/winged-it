import React from 'react';

import useFoodApi from '../../hooks/useFoodApi'

const Submit = (props) => {


	return(
		<button onClick={e => {
			props.onClick()
		}}>Search</button>
	);
}

export default Submit;