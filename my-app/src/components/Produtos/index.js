import React, { Component } from 'react';
import './Produtos.css';
import Cards from './Cards';
const apiUrl = 'https://localhost:5001/api/produto';

export default class Produtos extends Component {
    state = {
        dadosProdutos: []
    }

    componentDidMount() {
        fetch(apiUrl)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    dadosProdutos: result
                });
                console.log("dadosProdutos:" + result);
            }
        )
    }

    render() {
        return (
            <div className="cards">
                {
                    this.state.dadosProdutos.map(
                        (produto) =>
                            <Cards produto={produto} key={produto.id}/>
                    )
                }
            </div>
        )
    }
}