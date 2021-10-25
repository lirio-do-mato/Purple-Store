import React from 'react';
import './ImagemProduto.scss'

export default (props) => {
    return(
       <div>
           <img src={props.arquivo} alt={props.nome} />
       </div>
    );
}