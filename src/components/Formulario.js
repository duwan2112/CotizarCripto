import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Resultado from './Resultado'
import Spinner from './Spinner'


const FormularioStyled = styled.div`
text-align: center;
min-height: 600px;
  form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .enviar {
    margin-bottom: 20px;
    color: #fff;
    font-weight: 700;
    width: 60%;
    height: 40px;
    background: #265a66;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 5px 20px rgba(255, 255, 255, 0.3);
    &:focus {
      outline: none;
    }
    &:hover {
      background: #3a8b9e;
    }
  }
  select {
    width: 70%;
    -webkit-appearance: none;
    border-radius: 5px;
    padding: 10px;

    &:focus {
      outline: none;
    }
  }

  h1 {
    text-align: center;
    font-weight: 200;
    font-size: 40px;
    color: #fff;
    margin-top: 10px;
    margin-bottom: 10px;
    line-height: 45px;
    &::after {
      content: "";
      text-align: center;
      margin: 20px auto;
      width: 100px;
      height: 6px;
      background-color: #66a2fe;
      display: block;
    }
  }

  .criptomoneda,
  .moneda {
    height: 200px;
    text-align: center;

    color: #fff;
    font-weight: 700;
    font-size: 20px;
    letter-spacing: 0.2px;
    width: 50%;
    span {
      display: block;

      margin: 30px;
    }
  }
`;

export default function Formulario() {
  const [cripto, setCripto] = useState([]);
 const [ select,setSelect] = useState({
     criptomoneda: '',
     moneda: ''
 })
  const [cotizacion,setCotizacion] = useState(undefined)

  const Monedas = [
    { id: 1, codigo: "USD", nombre: "Dolar Estado Unidense" },
    { id: 2, codigo: "MXN", nombre: "Peso Mexicano" },
    { id: 3, codigo: "EUR", nombre: "Euro" },
    { id: 4, codigo: "GBP", nombre: "Libra Esterlina" },
 ];

  const [spinner,setSpinner] = useState(false) 

  useEffect(() => {
    fetch(
      "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
    )
      .then((result) => result.json())
      .then((respuesta) => setCripto(respuesta.Data));
  }, []);

  const handleButton = (e) => {
    e.preventDefault();
   if(select.criptomoneda && select.moneda){
          fetch(
      `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${select.criptomoneda}&tsyms=${select.moneda}`
    )
      .then((result) => result.json())
      .then((respuesta) => setCotizacion(respuesta.DISPLAY[select.criptomoneda][select.moneda])); 
      setSpinner(true)
      setTimeout(()=>{
      setSpinner(false)
      },2000)
           
   }

  };
 
   const Change = e => {
      setSelect({...select,  [e.target.name]: e.target.value })
   }
  return (
    <FormularioStyled>
      <h1>COTIZA CRIPTOMONEDAS AL INSTANTE</h1>
      <form onSubmit={handleButton}>

        <div className="criptomoneda">
          <span> Elige una CriptoMoneda </span>
          <select onChange={Change} name="criptomoneda">
            <option value="selection"> --SELECTION-- </option>
            {cripto
              ? cripto.map((type) => (
                  <option key={type.CoinInfo.Id} value={type.CoinInfo.Internal}>
                    {" "}
                    {type.CoinInfo.FullName}{" "}
                  </option>
                ))
              : null}
          </select>
        </div>
        <div className="moneda">
          <span> Elige una Moneda </span>
          <select onChange={Change} name="moneda">
            <option value="selection"> --SELECTION-- </option>
            {Monedas.map((moneda) => (
              <option key={moneda.id} value={moneda.codigo}>
                {" "}
                {moneda.nombre}{" "}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleButton} className="enviar" type="submit">
          {" "}
          COTIZAR{" "}
        </button>
      </form>
      
      {spinner ? <Spinner/> : <Resultado cotizacion={cotizacion}/>  }
     
   
    </FormularioStyled>
  );
}
