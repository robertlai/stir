import 'polyfill';
import 'style.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import Routes from 'routes';
import config from '../config.conf';

global.config = config;

ReactDOM.render(Routes, document.getElementById('app'));