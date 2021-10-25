import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Menu.scss';

export default class Menu extends Component{
    state = {verificado: false}
    render(){
        return(
            <nav className="fundo">
                <div className="Titulo">
                    <h1 className="Nome" alt="Nome da loja"> PURPLE CHILDREN STORE </h1>
                </div>
                <div className="opcoes">
                    <Link className="itemMenu" to="/">
                        Produtos
                    </Link>
                    <Link className="itemMenu" to={{
                        pathname: "/login",
                        state:{
                            compra: false
                        }
                    }}>
                        Manutenção
                    </Link>
                </div>
            </nav>
        )
    }
}