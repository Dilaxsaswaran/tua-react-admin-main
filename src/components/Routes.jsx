import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Customers from '../pages/Customers'
import Functions from '../pages/Functions'
import Order from '../pages/Order'

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Dashboard} />
            <Route path='/customers' component={Customers} />
            <Route path='/functions' component={Functions} />
            <Route path='/order' component={Order} />
        </Switch>
    )
}

export default Routes
