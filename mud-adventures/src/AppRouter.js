import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Rooms from './Components/Rooms';


export default function AppRouter() {

    return <div className="page-view-ui">
        <Switch>
            <Route path='/register' component={Register}/>
            <Route exact path='/' component={Login}/>
            <Route path='/rooms' component={Rooms}/>
        </Switch>
    </div>
}