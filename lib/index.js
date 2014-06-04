'use strict';
var Prs = require('promise'),
    moment = require('moment'),
    parseString = require('xml2js').parseString,
    http = require('http');
    http.post = require('http-post');

moment.lang('pt-BR');
moment.lang('pt-BR', {
  calendar : {
      lastDay : '[Ontem às] LT',
      sameDay : '[Hoje às] LT',
      nextDay : '[Amanhã às] LT',
      lastWeek : '[Última] dddd [às] LT',
      nextWeek : 'dddd [às] LT',
      sameElse : 'L HH:mm'
  }
});

module.exports = function (objetos, opcoes) {
  var url = 'http://websro.correios.com.br/sro_bin/sroii_xml.eventos';

  return new Prs(function (resolve, reject) {

    http.post(url,
      /*data*/
      {
        Usuario:'ECT', Senha:'SRO', Tipo:'L', Resultado:opcoes.resultado, Objetos:objetos.join('')
      },
      function (res) {
        res.setEncoding('utf8');

        res.on('data', function(body) {
          if (opcoes.parse === 'json') {
            parseString(body, function (err, result) {
              resolve(JSON.stringify(result, null, 2)
                .replace(/sroxml/g, 'srojson'));
            });

          } else if(opcoes.parse === 'humanize'){

            parseString(body, function (err, result) {
              var i = result.sroxml.objeto.length,
                  retn = [];

              while(i--){

                var obj = result.sroxml.objeto[i],
                eventos = [
                  '',
                  '> ' + obj.numero,
                ];
                for (var j = 0; j < obj.evento.length; j++) {
                  var evento = obj.evento[j];
                  eventos.push('\n\n');
                  eventos.push('  ');
                  eventos.push(evento.descricao.toString().replace(/objeto /ig, ''));
                  eventos.push(', ');
                  var data = moment(
                    evento.data.toString() +
                    evento.hora.toString(), 'DD/MM/YYYYHH:mm').calendar();
                  eventos.push(data);
                  eventos.push('\n  ');
                  eventos.push(evento.local.toString() + ' - ' + evento.cidade.toString());

                  if(evento.destino){
                    eventos.push(' para '+
                      evento.destino[0].local + ' - ' +
                      evento.destino[0].cidade);
                  }
                }

                retn.push(eventos.join(''));
              }

              resolve(retn.join('\n'));
            });
          } else {
            // xml
            resolve(body);
          }
        });
    });
  });
};
