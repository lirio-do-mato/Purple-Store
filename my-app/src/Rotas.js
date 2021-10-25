import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import Login from './components/Login'
import Produtos from './components/Produtos'

export default class Rotas extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Produtos} />
                <Route path="/login" component={Login}/>
                <Redirect from='*' to='/' />
            </Switch>
        )
    }
}