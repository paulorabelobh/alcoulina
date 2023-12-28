const express = require('express');
const bodyParser = require('body-parser'); // Importando o body-parser para pegar dados do form
const router = express.Router();
const titulo = 'AlcOuLina';
var resultado = 'Vamos ver qual será o resultado...'
var defConsumoAlcool = 11.2;
var defConsumoGasolina = 14.4;
var defPrecoAlcool = 3.80;
var defPrecoGasolina = 5.23;
var erros = [];
var rota = '';

// Adicionando o body-parser ao Express
router.use(bodyParser.urlencoded({ extended: true }));

// renderiza a pagina index
function resRenderIndex(res) {
  res.render("index", {
    title: titulo,
    resultado: resultado,
    defConsumoAlcool: defConsumoAlcool,
    defConsumoGasolina: defConsumoGasolina,
    defPrecoAlcool: defPrecoAlcool,
    defPrecoGasolina: defPrecoGasolina,
    erros: erros
  })
}

/* GET home page. */
router.get('/', function(req, res, next) {
  resRenderIndex(res); // renderiza a pagina index
});

router.post('/calcular', (req, res) => {
  rota = 'calcular';
  consistirEEfetuarCalculos(req);
  resRenderIndex(res); // renderiza a pagina index
});

router.post('/cadastrar', (req, res) => {
  rota = 'cadastrar';
  consistirEEfetuarCalculos(req);
  resRenderIndex(res); // renderiza a pagina index
});

function consistirEEfetuarCalculos(req) {
  const dadosFormulario = req.body; // acessando dados do form
  // log dos dados do recebidos do form
  console.log('Dados recebidos:', dadosFormulario);
  defConsumoAlcool = parseFloat(dadosFormulario.consumoAlcool);
  defConsumoGasolina = parseFloat(dadosFormulario.consumoGasolina);
  defPrecoAlcool = parseFloat(dadosFormulario.precoAlcool);
  defPrecoGasolina = parseFloat(dadosFormulario.precoGasolina);
  erros = [];
  // Verifica se os valores são números e se são diferentes de zero
  const saoNumerosNaoZeros = [defConsumoAlcool, defConsumoGasolina, defPrecoAlcool, defPrecoGasolina]
       .every(valor => !isNaN(valor) && valor !== 0);
  if (!saoNumerosNaoZeros) {
    resultado = '';
    erros.push('Nenhum dos valores consumo e/ou preço pode ser zero!'); // <p> pois se tiver mais erros cada um fica em uma linha
  } else { // efetua os calculos
    var custoKmAlcool = dadosFormulario.precoAlcool / dadosFormulario.consumoAlcool;
    var custoKmGasolina = dadosFormulario.precoGasolina / dadosFormulario.consumoGasolina;
    var combustivel = ''
    if      (custoKmAlcool > custoKmGasolina) { combustivel = 'gasolina' }
    else if (custoKmAlcool < custoKmGasolina) { combustivel = 'alcool' }
    else                                      { combustivel = 'qualquer um; alcool ou gasolina.' }
    resultado = 'Fica mais econômico abastecer com ' + combustivel;    
  }
  if (rota == 'cadastrar' && dadosFormulario.veiculo == '') {
    erros.push('Veículo não pode ficar em branco!');
  }
  console.log(resultado);
}

module.exports = router;

