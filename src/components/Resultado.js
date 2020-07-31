import React from 'react'
import styled from 'styled-components';

const ResultadoStyled  = styled.div`
text-align: center;
padding-bottom: 50px;
  color: #fff;
  p{
      font-size: 18px;
      span{
          font-weight: bold;
      }
  }
  .precio{
      font-size: 30px ;
  }
`;


export default function Resultado({cotizacion}) {

    return (
        <ResultadoStyled>
              {cotizacion ? 
              <>
               <p className="precio">El precio es: <span>{cotizacion.PRICE}</span></p> 
               <p>Precio mas alto del dia: <span>{cotizacion.HIGHDAY}</span></p> 
               <p>Precio mas bajo del dia: <span>{cotizacion.LOWDAY}</span></p> 
               <p>Variazion ultimas 24 horas: <span>{cotizacion.CHANGEPCT24HOUR}</span></p> 
               <p>Ultima actualizacion: <span>{cotizacion.LASTUPDATE}</span></p> 
               
               </> 
               : null}
        </ResultadoStyled>
    )
}
