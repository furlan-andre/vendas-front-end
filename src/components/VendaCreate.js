import { useState } from "react";
import React from 'react';
import { useNavigate } from "react-router-dom";

const VendaCreate = () => {

  const[descricao, descricaoChange]=useState("");  
  const[nomeCliente, nomeClienteChange]=useState("");
  const[cpfCliente, cpfClienteChange]=useState("");
  const[emailCliente, emailClienteChange]=useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
        const cliente = { nomeCliente, cpfCliente, emailCliente };

        const payload = { descricao, cliente };

        fetch('http://localhost:3001/Venda', {
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
export default VendaCreate;
