'use strict';

var Prs = require('promise'),
  moment = require('moment'),
  iconv = require('iconv-lite'),
  parseString = require('xml2js').parseString,
  http = require('http');
  http.post = require('http-post');

moment.locale('pt-BR');
moment.locale('pt-BR', {
  calendar: {
    lastDay: '[ontem às] LT',
    sameDay: '[hoje às] LT',
    nextDay: '[amanhã às] LT',
    lastWeek: '[último(a)] dddd [às] LT',
    nextWeek: 'dddd [às] LT',
    sameElse: 'L HH:mm'
  }
});

iconv.extendNodeEncodings();

module.exports = function (objetos, opcoes) {
  var url = 'http://websro.correios.com.br/sro_bin/sroii_xml.eventos',
    data = '';

  var prs = new Prs(function (resolve, reject) {

    http.post(url,
      {
        Usuario: 'ECT', Senha: 'SRO', Tipo: 'L', Resultado: opcoes.resultado, Objetos: objetos.join('').toUpperCase()
      },
      function (res) {
        res.setEncoding('iso-8859-1');

        res.on('end', function(){

          if (opcoes.parse === 'xml') {
            resolve(data);

          } else if (opcoes.parse === 'json') {
              parseString(data, function (err, result) {
                if (err) {
                  return reject(err);
                }
                resolve(JSON.stringify(result, null, 2)
                  .replace(/sroxml/g, 'srojson'));
              });

          } else {
            parseString(data, function (err, result) {
              if (err) {
                return reject(err);
              }
              var eventos = [];

              if (result.sroxml.error) {
                eventos = ['\n', '> ', result.sroxml.error];
                return resolve(eventos.join(''));
              }

              var i = result.sroxml.objeto.length,
                retn = [];

              while(i--){

                var obj = result.sroxml.objeto[i];

                eventos.push('\n', '> ', obj.numero);

                for (var j = 0; j < obj.evento.length; j++) {
                  var evento = obj.evento[j];
                  eventos.push('\n\n', '  ');
                  eventos.push(evento.descricao.toString().replace(/objeto /ig, ''));
                  eventos.push(', ');
                  var dia = moment(
                    evento.data.toString() + evento.hora.toString(),
                    'DD/MM/YYYYHH:mm')
                  .calendar();

                  eventos.push(dia, '\n  ');
                  eventos.push(evento.local);
                  if (evento.cidade.toString()) {
                    eventos.push(' - ', evento.cidade, '/', evento.uf);
                  }

                  if(evento.destino && evento.destino[0].local.toString() && evento.destino[0].cidade.toString()){
                    eventos.push(' para ');
                    eventos.push(evento.destino[0].local, ' - ', evento.destino[0].cidade, '/', evento.destino[0].uf);
                  }
                }

                retn.push(eventos.join(''));
              }

              resolve(retn.join('\n'));
            });
          }
      });

      res.on('data', function(body) {
        data += body;
      });
    });
  });

  return prs;

};
