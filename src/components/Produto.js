import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Produto = () =>{
    const [produto, produtoChange]= useState(null);

    useEffect(()=> {
        fetch('http://localhost:3001/Produto')
        .then((res) => res.json())
        .then(dados => {
            produtoChange(dados);
        })
        .catch(() => {
          console.log('serviço não disponível');
        });
    }, [])

    return (
        <div className="container">
        <div className="card">
            <div className="card-title">
            <h2>Listagem de Produtos</h2>    
            </div>
            <div className="mb-3">
                <Link to="/produto/novo" className="btn btn-primary">Adicionar</Link>

            </div>            
            <table className="table table-bordered">
                <thead className="bg-dark text-white">
                    <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Tipo</th>
                    <th>Valor</th>
                    <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                {
                    produto &&
                    produto.map((p) =>
                    <tr>
                        <td> {p.Id} </td>
                        <td> {p.Nome} </td>
                        <td> {p.Descricao} </td>
                        <td> {p.Tipo} </td>
                        <td> {p.ValorDeVenda} </td>
                        <td> <Link to={`/produto/editar/${p.Id}`} className="btn btn-warning">Editar</Link></td>
                    </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    </div>
    )
}
export default Produto;