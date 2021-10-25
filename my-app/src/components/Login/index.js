import React, { useState } from 'react';
import Manutencao from '../Manutencao';
import Compra from '../Compra'

import './Login.scss';

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [senha, setPassword] = useState("");
    const [user, setUser] = useState();
    const [erro, setErro] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const userForm = { username, senha };
        console.log(userForm);
        await fetch("https://localhost:5001/api/home/login/", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        body: JSON.stringify(userForm)
        })
        .then(
            resp => {
                if (resp.ok) {
                    resp.json().then((data) => {
                        console.log(data);
                        setUser(data);
                        localStorage.setItem('user', data);
                    })
                }
                else {
                    console.log('Usuário inexistente ou servidor off-line.');
                    setErro("Usuário inexistente ou servidor off-line.");
                }
            }
        )
        .catch(function (error) {
            console.log('Houve um problema coa operação de fetch: ' + error.message);
        });
    };

    if (user) {                     //MELHORAR ESSE ROLÊ PARA SÓ USUÁRIOS MANUTENTORES IREM À MANUTENÇÃO
        //console.log(user);
        if(props.location.state.compra)
            return <Compra produto={props.location.state.produto} />
        if(user.user.role == "Administrador")
            return <Manutencao/>
        alert("Apenas usuários administradores podem acessar a manutenção.");
    }
    
    return (
        <div className='geral'>
            <form onSubmit={handleSubmit}>
                <div className='formulario'>
                    <div className='campo'>
                        <label htmlFor="username" className='texto'>Username:</label>
                        <input className='entrada'
                        value={username}
                        type='text'
                        placeholder="Coloca teu nome de usuário"
                        onChange={({ target }) => setUsername(target.value)}/>
                    </div>
                    <div className='campo'>
                        <label htmlFor="senha" className='texto'>Senha:</label>
                        <input className='entrada'
                        type="password"
                        value={senha}
                        placeholder="Coloca tua senha"
                        onChange={({ target }) => setPassword(target.value)}/>
                    </div>
                </div>
                <button type="submit" className="submit">
                    Entrar
                </button>
                <p className="msgErro">{erro}</p>
            </form>
        </div>
    )
}

export default Login;