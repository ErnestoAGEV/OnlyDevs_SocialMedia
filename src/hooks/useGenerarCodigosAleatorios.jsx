import { useState, useEffect } from 'react';

export const useGenerarCodigosAleatorios = () => {
  const [codigo, setCodigo] = useState('');

  useEffect(() => {
    const generarCodigo = () => {
      const characters = "0123456789";
      const codeLenght = 8;
      let randomCode = "";
      
      for (let i = 0; i < codeLenght; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomCode += characters.charAt(randomIndex);
      }
      
      return `${randomCode}369`;
    };

    setCodigo(generarCodigo());
  }, []); // Se ejecuta solo una vez al montar el componente

  return codigo;
};