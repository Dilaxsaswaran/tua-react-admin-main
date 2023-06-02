import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import RecentWorks from '../pages/RecentWorks'
import DefinedGraph from '../pages/DefinedGraph'
import FunctionList from '../pages/FunctionList'

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Dashboard} />
            <Route path='/recentWorks' component={RecentWorks} />
            <Route path='/functions' component={FunctionList} />
            <Route path='/definedGraph' component={DefinedGraph} />
        </Switch>
    )
}

export default Routes
