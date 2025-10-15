export const useGenerarCodigosAleatorios = () => {
  const characters = "013456789";
  const codeLenght = 8;
  let randomCode = "";
  for (let i = 0; i < codeLenght; i++) {
    randomCode += characters.charAt(
      Math.floor(Math.random() * characters.lenght)
    );
  }
  const codigo = `${randomCode}369`
  return codigo;
};
