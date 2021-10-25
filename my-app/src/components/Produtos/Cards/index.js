import React from 'react';
import './Cards.scss'
import { Link } from 'react-router-dom';
import imagens from '../../../Imagens'
import ImagemProduto from '../ImagemProduto';


class Card extends React.Component{
    constructor(){
        super();
        this.state = {descricao: false}
        this.Trocar = this.Trocar.bind(this)
    }
    Trocar(){
        this.setState({descricao: !(this.state.descricao)})
        console.log(this.state.descricao)
    }
    render(props){
        return(
            <div className="card" onClick={this.Trocar}>
                <ImagemProduto arquivo={imagens[this.props.produto.imagem]}
                nome={this.props.produto.nome} className="imagem"/>
                <div className="container">
                    <h4 className='cardProduto'><b>{this.props.produto.nome}</b></h4>
                    {(
                        this.state.descricao ? <p className='cardProduto'>{this.props.produto.descricao}</p>:
                        <>
                            <p className='cardProduto'>R${this.props.produto.preco}</p>
                            <p className='cardProduto'>{this.props.produto.quantidade} em estoque</p>
                        </>
                    )}
                </div>
                <button>
                    <Link to={{
                        pathname : "/login",
                        state : {
                            compra : true,
                            produto: this.props.produto
                        }
                    }}>Comprar</Link>
                </button>
            </div>
        );
    }
}
export default Card