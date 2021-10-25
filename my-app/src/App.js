import './App.css';
import Menu from './components/Menu';
import Rotas from './Rotas';
import Rodape from './components/Rodape'
import { BrowserRouter } from 'react-router-dom';

var verificado = false;

function App() {
  return (
    <BrowserRouter>
      <div className="principal">
        <Menu logado={verificado}/>
        <Rotas Verificar={Verificar}/>
      </div>
      <Rodape />
    </BrowserRouter>
  );
}

function Verificar(){
  verificado = true;
  console.log('I called the callback back.');
}

export default App;
