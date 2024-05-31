import { useState } from 'react';
import './App.css';

function FrmCalculadora() {
 
    // Estados inciais das variáveis do formulário
    const [valorA, setValorA] = useState(0);
    const [operacao, setOperacao] = useState('adicao');
    const [valorB, setValorB] = useState(0);
    const [resposta, setResposta] = useState({a: 0, b: 0, operador: '?', resultado: 0});
  
    // Submissão do formulário.
    const handleSubmit = (event) => {
      // Impede o recarregamento da página
      event.preventDefault();      
      //Endereço da API + operação + valorA + valorB
      fetch(`https://calculadora-nodejs-vercel.vercel.app/${operacao}/${valorA}/${valorB}`)
        .then((response) => response.json()) //Converte a resposta para JSON
        .then((data) => setResposta({a: data.a, b : data.b, operador: data.operador, resultado: data.resultado})); //Atribui a resposta as variáveis
    }

    // Limpa os campos do formulário.     
    const limpar = () => { 
      setValorA(0);
      setOperacao('adicao');
      setValorB(0);
      setResposta({a: 0, b : 0, operador: '?', resultado: 0});
    }
  
    // Renderiza o formulário
    return (      
      <form name="FrmCalculadora" method="get" onSubmit={handleSubmit}>
        <label><h1>Formulário Calculadora</h1> </label>
        <label>Valor A: 
        <input type="text" name="valorA" value={valorA} onChange={(event) => setValorA(event.target.value)}/>
        </label><br/>
        <label>Opera&ccedil;&atilde;o:
          <select name="operacao" value={operacao} onChange={(event) => setOperacao(event.target.value)} >
            <option value="adicao">Adi&ccedil;&atilde;o</option>
            <option value="subtracao">Subtra&ccedil;&atilde;o</option>
            <option value="multiplicacao">Multiplica&ccedil;&atilde;o</option>
            <option value="divisao">Divis&atilde;o</option>
          </select></label><br/>
        <label>Valor B: 
        <input type="text" id="valorB" name="valorB" value={valorB} onChange={(event) => setValorB(event.target.value)} /></label><br/><br/>
        <input type="button" name="Limpar" value="Limpar" onClick={limpar} />
        <input type="submit" name="Calcular" value="Calcular"/><br/><br/>
        <label>Resultado: </label> <br/>
        <label> {resposta.a} {resposta.operador} {resposta.b} = {resposta.resultado} </label> <br/>
    </form>
    )
  }
  
  export default FrmCalculadora;