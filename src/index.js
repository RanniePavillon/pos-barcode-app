// Libraries
import React from 'react';
import ReactDOM from 'react-dom';

import { Index as IndexBusiness } from './__business'
import { Index as IndexPersonal } from './__personal'

const loc = window.location.pathname
const subdir = loc.split('/')[1]
let Core

if (subdir === 'psl') {
	Core = IndexPersonal
} else if(subdir === 'biz'){
	Core = IndexBusiness
}
else{
	window.location.href = "/biz"
	// Core = IndexBusiness
	// Core = IndexPersonal
}

ReactDOM.render(
<Core/>, document.getElementById('root'));