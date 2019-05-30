import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from '../pages/Login'
import Admin from '../pages/Admin'

const routes = (
    <div>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/admin" component={Admin} />
        </Switch>
    </div>
)

export default routes
