import React, { Component } from 'react';
import './Rodape.scss';

export default class Menu extends Component{
    render(){
        return(
            <div className="rodape">
                <footer>
                    <code>
                        Um projeto de Ian de Almeida Pinheiro, do RA 19179<br />
                        Matéria de Desenvolvimento para Internet III (INI33)<br />
                        Colégio Técnico de Campinas<br />
                        Campinas, junho de 2021<br />
                    </code>
                </footer>
            </div>
        )
    }
}