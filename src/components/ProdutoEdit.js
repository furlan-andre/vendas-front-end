import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProdutoEdit = () => {
  const {id} = useParams();
  const [values, setValues]=useState({
    id: id,
    nome: '',
    descricao: '',
    tipo: '',
    valorDeVenda: '',
    linkParaDownload: ''
  })

  const[caracteristicas, caracteristicasChange]=useState([]);
  const[configuracaoNome, configuracaoNomeChange]=useState("");
  const[configuracaoValor, configuracaoValorChange]=useState("");
  const[produtos, produtoChange]= useState([]);
  const[agrupamentoLista, agrupamentoChange]=useState([])
  const navigate = useNavigate();

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


  useEffect(()=> {
    fetch('http://localhost:3001/Produto/' + id )
    .then((res) => res.json())
    .then(dados => {
        console.log(dados);
        setValues({...values, nome: dados.Nome, descricao: dados.Descricao, 
            tipo: dados.Tipo, valorDeVenda: dados.ValorDeVenda, linkParaDownload: dados.LinkParaDownload});
        
        if(dados.Caracteristicas)
            caracteristicasChange(dados.Caracteristicas);

        if(dados.Agrupamento)
            agrupamentoChange(dados.Agrupamento);
    })
    .catch(() => {
      console.log('serviço não disponível');
    });
    }, [])

    const handlerAdicionarConfiguracao = (e) => {    
        if(configuracaoNome && configuracaoValor) {
          const caracteristica = { 'Nome': configuracaoNome, 'Valor': configuracaoValor };
    
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
        
        const {nome, descricao, tipo, valorDeVenda, linkParaDownload }= values;

        const agrupamento = agrupamentoLista.map(x => x.Id);

        const payload = { nome, descricao, tipo, valorDeVenda, linkParaDownload, caracteristicas, agrupamento};

        fetch('http://localhost:3001/Produto/' + id, {
          method: 'PATCH',
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
                    <input value={values.nome} onChange={e => setValues({...values, nome: e.target.value})} className="form-control" ></input>
                    <label>Descrição</label>
                    <input value={values.descricao} onChange={e => setValues({...values, descricao: e.target.value})} className="form-control" ></input>
                    <label>Tipo</label>
                    <select value={values.tipo} onChange={e => setValues({...values, tipo: e.target.value})} className="form-control">
                      <option>Simples</option>
                      <option>Digital</option>
                      <option>Configuravel</option>
                      <option>Agrupado</option>
                    </select>
                    <label>Valor</label>
                    <input value={values.valorDeVenda} onChange={e => setValues({...values, valorDeVenda: e.target.value})} className="form-control" ></input>                                   
                    {
                    values.tipo === 'Digital' &&
                      (
                        <>
                        <label>Link para download</label>
                        <input value={values.linkParaDownload} onChange={e => setValues({...values, linkParaDownload: e.target.value})} className="form-control" ></input>
                        </>
                      )
                    }  
                    {
                    values.tipo === 'Configuravel' &&
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
                                    <td> {c.Nome} </td>
                                    <td> {c.Valor} </td>                                                                        
                                </tr>
                                )
                            }
                            </tbody>
                        </table>   
                        </>
                      )
                    }  
                     {
                    values.tipo === 'Agrupado' &&
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

                        <h4> Produtos disponíveis para agrupar </h4>                        

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
                      <button className="btn btn-success" type="submit" onClick={handleSubmit} >Salvar</button>
                    </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};
export default ProdutoEdit;

