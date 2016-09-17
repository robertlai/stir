import 'polyfill';
import 'style.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import Routes from 'routes';
import config from '../config.conf';
import io from 'socket.io-client';

global.config = config;
global.socket = io(config.api_root);

ReactDOM.render(Routes, document.getElementById('app'));