import { useEffect, useState } from "react";
import React from 'react';
import { useNavigate } from "react-router-dom";

const VendaCreate = () => {

  const[descricao, descricaoChange]=useState("");  
  const[nomeCliente, nomeClienteChange]=useState("");
  const[cpfCliente, cpfClienteChange]=useState("");
  const[emailCliente, emailClienteChange]=useState("");

  const navigate = useNavigate();

  const [produto, produtoChange]= useState(null);
  const [carrinho, carrinhoChange]= useState([]);

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

  const handlerAdicionarCarrinho = (e) => {    
    carrinhoChange((chart) => {
      return[...chart, e];
    });
    
    const index = produto.findIndex(x => x.Id === e.Id);
    if(+index >= 0)
      produto.splice(+index, 1);
  }

  const handleSubmit = (e) => {
        e.preventDefault();

        const cliente = { 'nome': nomeCliente, 'cpf' :cpfCliente, 'email': emailCliente };
        
        const itens = montarItens();
        const payload = { descricao, cliente, itens };
        
        fetch('http://localhost:3001/Venda', {
          method: 'POST',
          headers:{"content-type":"application/json"},
          body: JSON.stringify(payload)
        })       
        .then((res) => {              
            if(res.ok)
              alert('Produto salvo com sucesso!');                  
            else
              alert('Houve um problema ao salvar!');
        })        
        .catch((err) => {
           alert(err.message);
        })
        .finally(() => {          
          navigate('/');          
        });    
  }

  const montarItens= ()=> {
    
      const mapeado = carrinho.map(x => { return { 'produtoId': x.Id, 'quantidade': 1} });

      return mapeado;
  } 

  return (
    <div>
    <div className="row">
      <div className="offset-lg-3 col-lg-6">
        <form className="container">        
          <div className="card">
            <div className="card-title">
              <h2>Cadastro de Produto</h2>
            </div>
            <div className="card-body">
              <div className="form-group">                  
                  <label>Descrição</label>
                  <input value={descricao} onChange={e=>descricaoChange(e.target.value)} className="form-control" ></input>
                  <label>Nome do Cliente</label>
                  <input value={nomeCliente} onChange={e=>nomeClienteChange(e.target.value)} className="form-control" ></input>
                  <label>Nome do Cliente</label>
                  <input value={cpfCliente} onChange={e=>cpfClienteChange(e.target.value)} className="form-control" ></input>
                  <label>Nome do Cliente</label>
                  <input value={emailCliente} onChange={e=>emailClienteChange(e.target.value)} className="form-control" ></input>   
                  
                  <h3>Carrinho</h3>
                  <table className="table table-bordered">
                      <thead className="bg-dark text-white">
                          <tr>
                          <th>Id</th>
                          <th>Nome</th>
                          <th>Quantidade</th>
                          <th>Valor</th>                          
                          </tr>
                      </thead>
                      <tbody>
                      {
                          carrinho &&
                          carrinho.map((p) =>
                          <tr>
                              <td> {p.Id} </td>
                              <td> {p.Nome} </td>
                              <td> {1} </td>
                              <td> {p.ValorDeVenda} </td>                              
                          </tr>
                          )
                      }
                      </tbody>
                  </table>

                  <h3>Produtos</h3>
                  <table className="table table-bordered">
                      <thead className="bg-dark text-white">
                          <tr>
                          <th>Id</th>
                          <th>Nome</th>
                          <th>Descrição</th>
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
                              <td> {p.ValorDeVenda} </td>
                              <td> <a className="btn btn-primary"  onClick={() => handlerAdicionarCarrinho(p)} >Adicionar</a></td>
                          </tr>
                          )
                      }
                      </tbody>
                  </table>
                  <div className="card-body">
                    <button className="btn btn-success" type="submit" onClick={handleSubmit}>Salvar</button>
                  </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};
export default VendaCreate;
