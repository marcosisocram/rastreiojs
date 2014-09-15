# rastreiojs  
[![NPM](https://nodei.co/npm/rastreiojs.png)](https://nodei.co/npm/rastreiojs/)
---

## CLI

```sh
$ npm install --global rastreiojs
```

```sh
$ rastreiojs --help

Uso:
  $ rastreiojs <arg> <arg> ... [--resultado <resultado>] [--parse <parse>]

Exemplos:
  $ rastreiojs AA123456789BB --parse xml
  $ rastreiojs AA123456789BB CC123456789DD --parse json
  $ cat rastreios.txt | rastreiojs

```


## API

```sh
$ npm install --save rastreiojs
```

```js
var rastreiojs = require('rastreiojs');

rastreiojs(['AA123456789BB'], {parse: 'json'})
.then(function(data){
  console.log(data);
}, function(err){});
```
```json
{
  "versao": "1.0",
  "qtd": "2",
  "TipoPesquisa": "Lista de Objetos",
  "TipoResultado": "Todos os eventos",
  "objeto": {
    "numero": "AA123456789BB",
    "evento": [
      {
        "tipo": "BDE",
        "status": "01",
        "data": "05/07/2004",
        "hora": "11:56",
        "descricao": "Entregue",
        "local": "CDD ALVORADA",
        "codigo": "94800971",
        "cidade": "ALVORADA",
        "uf": "RS"
      },
      {
        "tipo": "OEC",
        "status": "01",
        "data": "05/07/2004",
        "hora": "09:04",
        "descricao": "Saiu para entrega",
        "local": "CDD ALVORADA",
        "codigo": "94800971",
        "cidade": "ALVORADA",
        "uf": "RS"
      }
    ]
  }
}
```

### rastreiojs(objetos, opcoes)


#### objetos

*Obrigatorio*  
Tipo: `array`

Lista com os códigos de rastreio.

#### opcoes.resultado

Tipo: `string`  
Padrão: `t`  
Opções:  
- t: serão retornados todos os eventos do objeto;  
- u: será retornado apenas o último evento do objeto.

#### opcoes.parse

Tipo: `string`  
Padrão: `humanize`  
Opções:  
- json: retorna um json;
- xml: retorna um xml;
- humanize: retorna os dados de uma forma mais "humana".  

## Licença

[MIT](http://mp.mit-license.org/) - Marcos Paulo
