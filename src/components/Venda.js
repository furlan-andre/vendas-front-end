import React from "react"
import Table from 'react-bootstrap/Table';

class Produto extends React.Component{ 
    
    constructor(props){
        super(props);

        this.state = {
            vendas: []
        }
    }
    
    componentDidMount() {
        fetch('http://localhost:3001/Venda')        
        .then((res) => res.json())
        .then(dados => {
            this.setState({ vendas: dados});
        })
        .catch(() => {
          console.log('serviço não disponível');
        });   
    }

    render(){
        return (
            <Table striped bordered hover>
            <thead>
              <tr>
                <th>Descrição</th>                
                <th>Valor</th> 
                <th>Cliente</th>    
                <th>Data</th>           
              </tr>
            </thead>
            <tbody>     
                {
                    this.state.vendas.map((venda) =>
                    <tr>                
                        <td> {venda.Descricao} </td>                        
                        <td> {venda.valor_total} </td>
                        <td> {venda.cliente?.nome} </td>
                        <td> {venda.data_venda}  </td>
                    </tr> 
                    )
                }
            </tbody>
          </Table>
        )
    }
}

export default Produto;