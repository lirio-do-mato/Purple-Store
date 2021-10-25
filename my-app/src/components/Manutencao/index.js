import React, { Component } from 'react';
import './Manutencao.scss';

const apiURL = 'https://localhost:5001/api/produto';
const stateInicial = {
    produto: {nome: '', imagem: '', preco: 0, descricao: '', quantidade: 0},
    dadosProdutos: []
}

export default class ManutencaoProduto extends Component {
    state = { ...stateInicial };

    componentDidMount() {
        fetch(apiURL)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    dadosProdutos: result
                });
                console.log("Função didMount:" + result);
            },
            (error) => {
                this.setState({ error });
            }
        );
    }

    limpar() {
        this.setState({ produto: stateInicial.produto });
    }
    salvar() {
        const produto = this.state.produto;
        produto.quantidade = Number(produto.quantidade);
        produto.preco = Number(produto.preco);
        const metodo = produto.id ? 'put' : 'post';
        const url = produto.id ? `${apiURL}/${produto.id}` : apiURL;//maybe????
        fetch(url, {
                method: metodo,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'},
                body: JSON.stringify(produto)
            }
        )
        .then(
            resp => {
                    resp.json().then((data) => {
                        console.log(data);
                        const listaProdutos = this.getListaAtualizada(data);
                        this.setState({
                            produto: stateInicial.produto, dadosProdutos: listaProdutos 
                            }
                        );
                    }
                )
            }
        )
    }
    getListaAtualizada(produto, add=true) {
        const lista = this.state.dadosProdutos.filter(a => a.id !== produto.id);
        if(add) lista.unshift(produto);

        return lista;
    }
    atualizaCampo(event) {
        //clonar usuário a partir do state, para não alterar o state diretamen
        const produto = { ...this.state.produto };
        //usar o atributo NAME do input identificar o campo a ser atualizado
        produto[event.target.name] = event.target.value;
        //atualizar o state
        this.setState({ produto: produto });
    }

    renderForm() {
        return(
            <>
                <div className="inclui-container">
                    <div>
                        <label> Nome: </label>

                        <input
                        type="text"
                        id="nome"
                        placeholder="Nome do produto"
                        className="form-input"
                        className="entrada-texto"
                        name="nome"
                        value={this.state.produto.nome}
                        onChange={ e => this.atualizaCampo(e)}/>

                        <label> Imagem: </label>

                        <input
                        type="text"
                        id="imagem"
                        placeholder="Nome do arquivo da imagem"
                        className="form-input"
                        className="entrada-texto"
                        name="imagem"
                        value={this.state.produto.imagem}
                        onChange={ e => this.atualizaCampo(e)}/>

                        <label> Preco: </label>

                        <input
                        type="number"
                        id="preco"
                        placeholder="00"
                        className="form-input"
                        name="preco"
                        value={this.state.produto.preco}
                        onChange={ e => this.atualizaCampo(e)}/>
                    </div>
                    <div>
                        <label> Descrição: </label>

                        <input
                        type="textbox"
                        id="descricao"
                        placeholder="Descrição do produto"
                        className="form-input"
                        className="entrada-texto"
                        name="descricao"
                        value={this.state.produto.descricao}
                        onChange={ e => this.atualizaCampo(e)}/>

                        <label> Quantidade: </label>

                        <input
                        type="number"
                        id="quantidade"
                        placeholder="Quantidade em estoque"
                        className="form-input"
                        name="quantidade"
                        value={this.state.produto.quantidade}
                        onChange={ e => this.atualizaCampo(e)}/>

                        
                        <div className="botoes">
                            <button className="btnSalvar"
                            onClick={e => {this.salvar(e)
                                        console.log(this.state.produto)}}>
                            Salvar
                            </button>
                            <button className="btnCancelar"
                            onClick={e => this.limpar(e)}>
                            Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    renderTable() {
        return (
            <div className="listagem">
                <table className="listaProdutos" id="tblListaProdutos">
                    <thead>
                        <tr className="cabecTabela">
                            <th className="tabTituloNome">Nome</th>
                            <th className="tabTituloImagem">Imagem</th>
                            <th className="tabTituloPreco">Preço</th>
                            <th className="tabTituloDescricao">Descrição</th>
                            <th className="tabTituloQuantidade">Quantidade</th>
                            <th className="tabTituloAlterar"> </th>
                            <th className="tabTituloRemover"> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.dadosProdutos.map(
                            (produto) =>
                            <tr key={produto.id}>
                                <td>{produto.nome}</td>
                                <td>{produto.imagem}</td>
                                <td>{produto.preco}</td>
                                <td>{produto.descricao}</td>
                                <td>{produto.quantidade}</td>
                                <td>
                                    <button onClick={() => this.carregar(produto)} className="btnTabela">
                                    Altera </button>
                                </td>
                                <td>
                                    <button onClick={() => this.remover(produto)} className="btnTabela">
                                    Remove</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }

    carregar(produto) {
        this.setState({ produto });
    }

    remover(produto) {
        const url = apiURL+"/"+produto.id;
        if (window.confirm("Confirma remoção do produto: " + produto.nome)) {
            fetch(url, { method: 'delete' })
            .then(resp => {
                const lista = this.getListaAtualizada(produto, false)
                this.setState({ dadosProdutos: lista });
            });
        }
    }
    
    render() {
        return (
            <div>
                {this.renderForm()}
                {this.renderTable()}
            </div>
        )
    }
}