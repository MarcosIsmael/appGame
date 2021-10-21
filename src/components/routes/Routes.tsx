import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../../views/home/Home'
import Detail from '../../views/detail/Details'
const Routes = () => {

    return (
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/detail/:id' component={Detail}/>
        </Switch>
    )
}

export default Routes
