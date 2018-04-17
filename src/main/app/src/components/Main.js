import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Boards from './Board/Boards'
import Login from './User/Login'
import Signup from './User/Signup'

const Main = (props) => {
    return (
    <main>
        <Switch>
        <Route exact path='/' component={Boards} />
            <Route path='/user/login' component={Login} />
            <Route path='/user/signup' component={Signup} />
        </Switch>
    </main>
    )
}

export default Main