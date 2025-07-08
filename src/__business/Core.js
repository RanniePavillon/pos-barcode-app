import { Suspense, useContext, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Box } from '@mui/material/';
import { ToolContext } from '../core/context/ToolContext';
import { WebRoute } from "../core/webrouter/bizRoute";
import { SnakeLoader } from '../core/loader/SnakeLoader'
import { Logo } from '../core/global/Icons';
import { InstallPromotion } from './components/layouts/installation/InstallPromotion';
import { rqx } from '../core/request/API';
import { env } from '../core/Env';
import { BrandLog } from '../core/global/BrandLog';

const __SESSION = JSON.parse(localStorage.getItem('pos_biz_session'))
const tool_id =  "630";

export const Core = () => {
	const { tool_state, install_state } = useContext(ToolContext)

	const __installer = () => {
		window.addEventListener('beforeinstallprompt', (e) => {
			e.preventDefault();
			install_state.prompt.set(e)
			installPromptHandler()
		});
	}

	const installPromptHandler = () => {
		setTimeout(() => {
			// install_state.ip.set({stat: true, prompt_type: 'first_prompt'})
		}, 2000);
	}
	
	useEffect(() => {
		BrandLog()
		const __init = async () => {
			// RUN AN API REQUEST HERE ( SAMPLE REQUESTS BELOW: )
			let ainfo = await rqx.get(`<<global>>/${env()==='local'?'dev':env()}/account/read`, {aid: __SESSION.ainfo.aid})
			let pinfo = await rqx.get(`<<global>>/${env()==='local'?'dev':env()}/primeinfo/read`, {aid: __SESSION.ainfo.aid})
			let uaccess = await rqx.get(`<<global>>/${env()==='local'?'dev':env()}/roleaccess/uap`, {aid: __SESSION.ainfo.aid, tid:tool_id})
			let uaddress = await rqx.get(`<<global>>/${env()==='local'?'dev':env()}/location/assigned`, {aid:__SESSION.ainfo.aid})
			await tool_state.__SESSION.set({ainfo, pinfo, uaccess, uaddress})
            
			// SET STATES HERE ( SAMPLE STORING BELOW: )
			let d = new Date()
			d.setDate(d.getDate() + 30);
			localStorage.setItem('pos_biz_session', JSON.stringify({expiration: `${d.getMonth()+1}${d.getUTCDate()}${d.getUTCFullYear()}`, ainfo: ainfo}))
			tool_state.userId.set(parseInt(window.atob(ainfo.aid).split('_')[1]))
			tool_state.prefetch.set(true)
			// RUN PWA INSTALLATION PROMPT HANDLER
			// installPromptHandler()
		}
		
		if (__SESSION !== null) {
			__installer()
			__init()
		} else {
			setTimeout(() => {
				// SET STATES HERE ( SAMPLE STORING BELOW: )
				tool_state.prefetch.set(true)

				// RUN PWA INSTALLATION PROMPT HANDLER
				
				installPromptHandler()
			}, 1000);
		}
		
		console.log(`POS Business Version V1.1.6 is running`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<Box width="100%" height="100%" >
			{
				tool_state.prefetch.data ? (
					<Router>
						<Suspense fallback={
							<Box height="100%" width="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
								<Logo size={60}/>
								<Box mt={4}>
									<SnakeLoader size="1rem" bg="#165320" distance="0.3rem" />
								</Box>
							</Box>
						}>
							<WebRoute />
						</Suspense>
					</Router>
				) : (
					<Box height="100%" width="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
						<Logo size={60}/>
						<Box mt={4}>
							<SnakeLoader size="1rem" bg="#165320" distance="0.3rem" />
						</Box>
					</Box>
				)
			}
			<InstallPromotion install_state={install_state} />
		</Box>
	)
}