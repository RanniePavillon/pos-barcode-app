// Libraries
import React, { Suspense } from 'react';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { ToolProvider } from '../core/context/ToolContext';

// Assets
import '../assets/css/global.css';
import '../assets/css/scrollbar.css';

// Layouts
import { Core as AuthCore } from './Core';
import { SSORqx } from './SSORqx';
import { domain, env, key } from '../core/Env';
import { Box } from '@mui/system';
import { Logo } from '../core/global/Icons';
import { SnakeLoader } from '../core/loader/SnakeLoader';

export const Index = () => {
	const pageTheme = createTheme({
		palette: {
			background: {
				default: '#F0F5F9'
			},
			primary: {
				main: '#11783C',
				dark: '#11783C',
				light: '#e9ebee',
				lighter: '#f8f9fa',
			},
			secondary: {
				main: '#165320',
				dark: '#7aa3a1',
				light: '#ffffff',
			},
			info: {
				main: '#7aa3a1',
				dark: '#506e6c',
				light: '#b8d4d2',
			},
			error: {
				main: '#f44336',
				light: '#f6685e',
				dark: '#d32f2f'
			},
			warning: {
				main: '#ff9800',
				dark: '#b26a00',
				light: '#ffac33'
			},
			success: {
				main: '#4caf50',
				dark: '#388e3c',
				light: '#81c784'
			},
			btnYellow:{
				light: '#ffcd87',
				main: '#ffb347',
				color: '#f2f5fa'
			},
			text:{
				main: '#107038',
			},

		},
		typography: {
			button: {
				textTransform: 'none'
			},
			fontFamily: [
			  '-apple-system',
			  '"Inter"',
			].join(','),
		},
	});	
	const __SESSION = JSON.parse(localStorage.getItem('pos_biz_session'))
	const loc = window.location.pathname
	let Core

	if (loc === '/biz/sso/account/auth') {
		Core = SSORqx
	} else if (__SESSION !== null) {
		Core = AuthCore
	} else {
		window.location.href = `${domain('pm').url}/sso/rqx?from=${key('tsa_key')}&callback=${env() === 'dev' || env() === 'local' || env() === 'sb' ? 'sandbox' : 'production'}&platform=business`
	}

	return (
		<ThemeProvider theme= { pageTheme }>
			<CssBaseline />
			<ToolProvider platform="business">
				<Suspense fallback={
					<Box height="100%" width="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
						<Logo size={60}/>
						<Box mt={4}>
							<SnakeLoader size="1rem" bg="#0070EF" distance="0.3rem" />
						</Box>
					</Box>
				}>
					<Core />
				</Suspense>
			</ToolProvider>
		</ThemeProvider>
	)
}