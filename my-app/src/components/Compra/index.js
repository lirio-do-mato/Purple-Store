import './Compra.scss';
import React, { Component } from 'react';
import Imagem from '../Produtos/ImagemProduto';
import imagens from '../../Imagens';

export default class Compra extends Component {
    render(){
        return(
            <div className="geralCompra">
                <div className="conteudo">
                    <h1 className="nomeProduto">{this.props.produto.nome}</h1>
                    <div>
                        <div className="fotoProduto"><Imagem arquivo={imagens[this.props.produto.imagem]}/></div>
                        <div className="informacoes">
                            <h2 className="precoProduto">Preço: R${this.props.produto.preco} </h2>
                            <h2 className="quantidadeProduto">Quantidade: {this.props.produto.quantidade} em estoque. </h2>
                            <h3 className="descricaoProduto">{this.props.produto.descricao}</h3>
                            <button className="btnCompra">Comprar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}