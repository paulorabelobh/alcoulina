const express = require('express');
const bodyParser = require('body-parser'); // Importando o body-parser para pegar dados do form
const router = express.Router();
const titulo = 'AlcOuLina';
var resultado = 'Vamos ver qual será o resultado...'
var defConsumoAlcool = 11.2;
var defConsumoGasolina = 14.4;
var defPrecoAlcool = 3.80;
var defPrecoGasolina = 5.23;

// Adicionando o body-parser ao Express
router.use(bodyParser.urlencoded({ extended: true }));

function resRenderIndex(res) {
  res.render("index", {
    title: titulo,
    resultado: resultado,
    defConsumoAlcool: defConsumoAlcool,
    defConsumoGasolina: defConsumoGasolina,
    defPrecoAlcool: defPrecoAlcool,
    defPrecoGasolina: defPrecoGasolina
  })
}

/* GET home page. */
router.get('/', function(req, res, next) {
  resRenderIndex(res);
});

router.post('/calcular', (req, res) => {
  const dadosFormulario = req.body; // acessando dados do form
  // log dos dados do recebidos do form
  console.log('Dados recebidos:', dadosFormulario);
  defConsumoAlcool = dadosFormulario.consumoAlcool;
  defConsumoGasolina = dadosFormulario.consumoGasolina;
  defPrecoAlcool = dadosFormulario.precoAlcool;
  defPrecoGasolina = dadosFormulario.precoGasolina;  
  var custoKmAlcool = dadosFormulario.consumoAlcool / dadosFormulario.precoAlcool;
  var custoKmGasolina = dadosFormulario.consumoGasolina / dadosFormulario.precoGasolina;
  var combustivel = ''
  if      (custoKmAlcool > custoKmGasolina) { combustivel = 'gasolina' }
  else if (custoKmAlcool < custoKmGasolina) { combustivel = 'alcool' }
  else                                      { combustivel = 'qualquer um; alcool ou gasolina.' }
  resultado = 'Fica mais econômico abastecer com ' + combustivel;
  console.log(resultado);
  // retornando para a mesma página, mantendo os dados do form
  resRenderIndex(res);
});

module.exports = router;

