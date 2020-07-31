import React from 'react';
import img from './imagenes/cryptomonedas.png'
import styled from 'styled-components';
import Formulario from './components/Formulario'
const AppStyled = styled.div`
  margin: auto;
 display: grid;
 width: 70%; 
 grid-template-columns: repeat(2,1fr);
 column-gap: 2rem;
 margin-top: 5rem;
 @media (max-width: 764px )
 {
  width: 80%;
  display: flex;
  flex-direction: column;

   text-align: center;
 }
 .imagen img{
  width: 100%;
    object-fit: cover; 
   
 }

`;



function App() {
  return (
    <AppStyled >  
      <div className="imagen"><img src={img} alt="none"/> </div>
       <div> <Formulario/>  </div>
       
        
         </AppStyled>
  );
}

export default App;
