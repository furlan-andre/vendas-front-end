import { useEffect, useState } from "react";
import React from 'react';
import { useNavigate } from "react-router-dom";

const ProdutoCreate = () => {

  const[nome, nomeChange]=useState("");  
  const[descricao, descricaoChange]=useState("");
  const[tipo, tipoChange]=useState("Simples");  
  const[valorDeVenda, valorDeVendaChange]=useState("");
  const[linkParaDownload, linkParaDownloadChange]=useState("");

  const[caracteristicas, caracteristicasChange]=useState([]);
  const[configuracaoNome, configuracaoNomeChange]=useState("");
  const[configuracaoValor, configuracaoValorChange]=useState("");

  const[agrupamentoLista, agrupamentoChange]=useState([])

  const navigate = useNavigate();

  const [produtos, produtoChange]= useState([]);

    useEffect(()=> {
        fetch('http://localhost:3001/Produto')
        .then((res) => res.json())
        .then(dados => {
            if(dados){
              console.log(dados);
              const produtosFiltrados = dados.filter(x => x.Tipo === 'Simples' && !x.Agrupado);
              produtoChange(produtosFiltrados);
            }
        })
        .catch(() => {
          console.log('serviço não disponível');
        });
    }, [])
  

  const handlerAdicionarConfiguracao = (e) => {    
    if(configuracaoNome && configuracaoValor) {
      const caracteristica = { 'nome': configuracaoNome, 'valor': configuracaoValor };

      caracteristicasChange((caracteristicas) => {
        return [...caracteristicas, caracteristica]
      });

      configuracaoNomeChange('');
      configuracaoValorChange('');
    }
    else{
       alert('Informe o nome e o valor para a configuração');
    }    
  }

  const handlerAdicionarAgrupado = (e) => {    
      agrupamentoChange((agrupamento) => {
        return[...agrupamento, e];
      });
      
      const index = produtos.findIndex(x => x.Id === e.Id);
      if(+index >= 0)
        produtos.splice(+index, 1);

      console.log(produtos);
  }

  const handleSubmit = (e) => {
        e.preventDefault();
        
        const agrupamento = agrupamentoLista.map(x => x.Id);
        const payload = {nome, descricao, tipo, valorDeVenda, linkParaDownload, caracteristicas, agrupamento};

        fetch('http://localhost:3001/Produto', {
          method: 'POST',
          headers:{"content-type":"application/json"},
          body: JSON.stringify(payload)
        })       
        .then((res) => {  
            if(res.ok)            
              alert('Produto salvo com sucesso!');                  
            else
              alert('Houve um erro ao salvar o produto!')
        })        
        .catch((err) => {
           alert(err.message);
        })
        .finally(() => {          
          navigate('/produto');          
        });    
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
                    <label>Nome</label>
                    <input value={nome} onChange={e=>nomeChange(e.target.value)} className="form-control" ></input>
                    <label>Descrição</label>
                    <input value={descricao} onChange={e=>descricaoChange(e.target.value)} className="form-control" ></input>
                    <label>Tipo</label>
                    <select value={tipo} onChange={e=>tipoChange(e.target.value)} className="form-control">
                      <option>Simples</option>
                      <option>Digital</option>
                      <option>Configuravel</option>
                      <option>Agrupado</option>
                    </select>
                    <label>Valor</label>
                    <input value={valorDeVenda} onChange={e=>valorDeVendaChange(e.target.value)} className="form-control" ></input>                    
                    {
                    tipo === 'Digital' &&
                      (
                        <>
                        <label>Link para download</label>
                        <input value={linkParaDownload} onChange={e=>linkParaDownloadChange(e.target.value)} className="form-control" ></input>
                        </>
                      )
                    }                    
                    {
                    tipo === 'Configuravel' &&
                      (
                        <>
                        <h2> Configurações </h2>
                        <label>Nome</label>
                        <input value={configuracaoNome} onChange={e=>configuracaoNomeChange(e.target.value)} className="form-control" ></input>
                        <label>Valor</label>
                        <input value={configuracaoValor} onChange={e=>configuracaoValorChange(e.target.value)} className="form-control" ></input>

                        <div className="card-body">                          
                          <button className="btn btn-primary" type="button" onClick={handlerAdicionarConfiguracao}>
                            Adicionar configuração
                            </button>                          
                        </div>

                        <table className="table table-bordered">
                            <thead className="bg-dark text-white">
                                <tr>
                                <th>Nome</th>
                                <th>Valor</th>                                
                                </tr>
                            </thead>
                            <tbody>
                            {
                                caracteristicas &&
                                caracteristicas.map((c) =>
                                <tr>
                                    <td> {c.nome} </td>
                                    <td> {c.valor} </td>                                                                        
                                </tr>
                                )
                            }
                            </tbody>
                        </table>   
                        </>
                      )
                    }                    
                    {
                    tipo === 'Agrupado' &&
                      (
                        <>
                        <h4> Produtos agrupados </h4>                        

                        <table className="table table-bordered">
                            <thead className="bg-dark text-white">
                            <tr>
                              <th>Id</th>
                              <th>Nome</th>
                              <th>Descrição</th>
                              <th>Tipo</th>
                              <th>Valor</th>                              
                            </tr>
                            </thead>
                            <tbody>
                            {
                                agrupamentoLista &&
                                agrupamentoLista.map((p) =>
                                <tr>
                                <td> {p.Id} </td>
                                <td> {p.Nome} </td>
                                <td> {p.Descricao} </td>
                                <td> {p.Tipo} </td>
                                <td> {p.ValorDeVenda} </td>                                
                            </tr>
                                )
                            }
                            </tbody>
                        </table>   

                        <h4> Produtos disponíveis agrupar </h4>                        

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
                                produtos &&
                                produtos.map((p) =>
                                <tr>
                                <td> {p.Id} </td>
                                <td> {p.Nome} </td>
                                <td> {p.Descricao} </td>
                                <td> {p.Tipo} </td>
                                <td> {p.ValorDeVenda} </td>
                                <td> <button type="button" className="btn btn-dark" onClick={() => handlerAdicionarAgrupado(p)}>Agrupar</button></td>
                            </tr>
                                )
                            }
                            </tbody>
                        </table>   
                        </>
                      )
                    }  
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
export default ProdutoCreate;

