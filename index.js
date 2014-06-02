'use strict';
var request = require('./lib/index');

module.exports = function(objetos, opcoes){
  opcoes = opcoes || {};
  opcoes.resultado = opcoes.resultado || 'T';
  opcoes.parse = opcoes.parse || 'humanize';

  if (!Array.isArray(objetos)) {
    throw new TypeError('Esperado um array como primeiro argumento');
  }

  return request(objetos, opcoes);
};
