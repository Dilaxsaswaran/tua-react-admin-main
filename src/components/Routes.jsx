import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Applications from '../pages/MyApps'
import DefinedGraph from '../pages/DefinedGraph'
import FunctionList from '../pages/FunctionList'
import AppPage from '../pages/Application'

const Routes = () => {
    return (
        <Switch>
            <Route path='/dashboard' exact component={Dashboard} />
            <Route path='/my_apps' component={Applications} />
            <Route path='/functions' component={FunctionList} />
            <Route path='/definedGraph' component={DefinedGraph} />
            <Route path="/application/:applicationId" component={AppPage} />
        </Switch>
    )
}

export default Routes
