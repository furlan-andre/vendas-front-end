import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Venda = () =>{
    const [vendas, vendasChange]= useState(null);

    useEffect(()=> {
        fetch('http://localhost:3001/Venda')
        .then((res) => res.json())
        .then(dados => {
            vendasChange(dados);
        })
        .catch(() => {
          console.log('serviço não disponível');
        });
    }, [])

    return (
        <div className="container">
        <div className="card">
            <div className="card-title">
            <h2>Listagem de Vendas</h2>    
            </div>
            <div className="mb-3">
                <Link to="/venda/novo" className="btn btn-primary">Adicionar</Link>

            </div>            
            <table className="table table-bordered">
                <thead className="bg-dark text-white">
                    <tr>                    
                    <th>Descrição</th>
                    <th>Valor</th>                    
                    <th>Cliente</th>
                    <th>Data</th>                    
                    </tr>
                </thead>
                <tbody>
                {
                    vendas &&
                    vendas.map((v) =>
                    <tr>
                        <td> {v.descricao} </td>                        
                        <td> {v.valor_total} </td>
                        <td> {v.cliente.nome} </td>
                        <td> {v.data_venda} </td>                        
                    </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    </div>
    )
}
export default Venda;