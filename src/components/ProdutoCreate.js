import { useState } from "react";
import Fetch from '../Fetch';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { InputLabel } from "@mui/material";
import { MenuItem, Select } from "@mui/base";

const ProdutoCreate = () => {

  const[nome, nomeChange]=useState("");  
  const[descricao, descricaoChange]=useState("");
  const[tipo, tipoChange]=useState("");
  const[valorDeVenda, valorDeVendaChange]=useState("");
  const navigate = useNavigate();

  const handleChange= (e) =>{

  }

  const handleSubmit = (e) => {
        const payload = {nome, descricao, tipo, valorDeVenda};
        fetch('http://localhost:3001/Produto', {
          method: 'POST',
          headers:{"content-type":"application/json"},
          body: JSON.stringify(payload)
        })       
        .then((res) => {              
            alert('Produto salvo com sucesso!');                  
        })        
        .catch((err) => {
           alert(err.message);
        })
        .finally(() => {
          alert('Acabou');
          navigate('/');          
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
                    <input value={tipo} onChange={e=>tipoChange(e.target.value)} className="form-control" ></input>
                    <label>Valor</label>
                    <input value={valorDeVenda} onChange={e=>valorDeVendaChange(e.target.value)} className="form-control" ></input>                    
                    <button className="btn btn-success" type="submit" onClick={handleSubmit}>Salvar</button>
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
