import { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { VM } from '../VM';

import { Index as ToolCategories } from '../../__personal/components/toolcategories/Index';
import { RenderAPI } from '../../__personal/components/global/RenderAPI';
import { Switching } from '../../__personal/components/swtiching/Index'
import { Settings } from '../../__personal/components/settings/Index';

let view = VM();
const Navigation = lazy(() => import(`../../__personal/components/layouts/navigations${view}/Index`))
const Home = lazy(() => import (`../../__personal/components/home${view}/Index`))

export const WebRoute = () => {
    const location = useLocation().pathname;
    
    return (
        <Switch>
            {/* HOME */}
            <Route exact path="/psl" render={props=>(Render(Home, props, location))}/>
            <Route exact path="/psl/switching/:params" render={props=><Switching {...props}/>} />
            <Route exact path="/psl/more" render={props=>(Render(Settings, props, location))} />
            <Route exact path="/psl/tool-categories/:params" render={props=>(Render(ToolCategories, props, location))} />

            {/* 404 NOT FOUND */}
            <Route>
                <Container>
                    <Box display="flex">
                        Error 404
                    </Box>
                </Container>
            </Route>
        </Switch>
    )
}

const Render = (Component, props, location) => (
    
    <>
        {view === '' ? (
            <Box width="100%" height="100%">
                <Box width="100%" height="100%" display="flex">
                    <Box height="100%">
                        {(location !== '/psl/profiling') && (<Navigation side={1} />)}
                    </Box>
                    <Box display="flex" flexDirection="column" width="100%" height="100%">
                        <Navigation side={0} />
                        <Box height="100%" className="overflowY noScrollcss">
                            <Component {...props} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        ) : (
            <Box width="100%" height="100%">
                <Box width="100%" height="100%" display="flex" flexDirection="column">
                    {(location !== '/psl/profiling' && location !== '/psl/more') && (
                        <Box minHeight={location === '/psl' ? '92px' : '40px'}>
                            <Navigation side={0} />
                        </Box>
                    )}
                    <Box height="100%" width="100%" className="overflowY noScrollcss"><Component {...props} /></Box>
                    {(location !== '/profile' && location !== '/psl/profiling') &&
                        <Box minHeight="54px">
                            <Navigation side={2} />
                        </Box>
                    } 
                </Box>
            </Box>
        )}
        <RenderAPI/>
    </>
)