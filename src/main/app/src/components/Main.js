import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Boards from './Board/Boards'
import Login from './User/Login'
import Signup from './User/Signup'
import Logout from './User/Logout'
const Main = () => {
    return (
    <main>
        <Switch>
        <Route exact path='/' component={Boards} />
            <Route path='/user/login' component={Login} />
            <Route path='/user/signup' component={Signup} />
            <Route path='/user/logout' component={Logout} />
        </Switch>
    </main>
    )
}

export default Main