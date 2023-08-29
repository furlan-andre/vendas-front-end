import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Produto from './components/Produto';
import Venda from './components/Venda';
import './App.css'
import ProdutoCreate from './components/ProdutoCreate';

function App() {
  return (
    <div className="App">    
    <h1>App de Vendas</h1> 
    <BrowserRouter>
    <Navbar bg="primary" data-bs-theme="dark">
        <Container>          
          <Nav className="me-auto">                      
            <Nav.Link href="/produto">Produto</Nav.Link>
            <Nav.Link href="/venda">Venda</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

    <Routes>      
      <Route path='/produto' index element={<Produto/>}></Route>
      <Route path='/produto/novo' index element={<ProdutoCreate/>}></Route>
      <Route path='/venda' index element={<Venda/>}></Route>
      {/* <Route path='/venda/novo' index element={<Venda/>}></Route> */}
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
