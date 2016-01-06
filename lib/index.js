'use strict';

var Prs = require('promise'),
  moment = require('moment'),
  iconv = require('iconv-lite'),
	xml2js = require('xml2js'),
  parseString = xml2js.parseString,
	xmlBuilder = new xml2js.Builder(),
  http = require('http'),
	idioma = 'pt-BR',
	textos = {
		'pt-BR': {
			infoExtraErr: 'Não foi possível adicionar informações extras.',
			naoIdentificado: 'Não idendificado', 
			paisOrigem: 'país de origem',
			tipoEncomenda: 'tipo de encomenda',
			paises : {AE:"Emirados Árabes Unidos",AF:"Afeganistão",AG:"Antígua e Barbuda",AI:"Anguilla",AL:"Albânia",AM:"Armênia",AN:"Antilhas Holandesas",AO:"Angola",AQ:"Antártida",AR:"Argentina",AS:"Samoa Ocidental",AT:"Áustria",AU:"Austrália",AW:"Aruba",AZ:"Azerbaijão",BA:"Bósnia-Herzegóvina",BB:"Barbados",BD:"Bangladesh",BE:"Bélgica",BF:"Burkina Fasso",BG:"Bulgária",BH:"Bahrein",BI:"Burundi",BJ:"Benin",BM:"Bermudas",BN:"Brunei",BO:"Bolívia",BR:"Brasil",BS:"Bahamas",BT:"Butão",BV:"Ilha Bouvet (Território da Noruega)",BW:"Botsuana",BY:"Belarus",BZ:"Belize",CA:"Canadá",CC:"Ilhas Cocos",CF:"República Centro-Africana",CG:"Congo",CH:"Suíça",CI:"Costa do Marfim",CK:"Ilhas Cook",CL:"Chile",CM:"Camarões",CN:"China",CO:"Colômbia",CR:"Costa Rica",CS:"República Tcheca",CU:"Cuba",CV:"Cabo Verde",CX:"Ilha Natal",CY:"Chipre",CZ:"República Tcheca",DE:"Alemanha",DJ:"Djibuti",DK:"Dinamarca",DM:"Dominica",DO:"República Dominicana",DZ:"Algéria",EC:"Equador",EE:"Estônia",EG:"Egito",EH:"Saara Ocidental",ER:"Eritréia",ES:"Espanha",ET:"Etiópia",FI:"Finlândia",FJ:"Fiji",FK:"Ilhas Falkland (Malvinas)",FM:"Micronésia",FO:"Ilhas Faeroes",FR:"França",FX:"França Metropolitana",GA:"Gabão",GB:"Grã-Bretanha (Reino Unido, UK)",GD:"Granada",GE:"Geórgia",GF:"Guiana Francesa",GH:"Gana",GI:"Gibraltar",GL:"Groelândia",GM:"Gâmbia",GN:"Guiné",GP:"Guadalupe",GQ:"Guiné Equatorial",GR:"Grécia",GS:"Ilhas Geórgia do Sul e Sandwich do Sul",GT:"Guatemala",GU:"Guam (Território dos Estados Unidos)",GW:"Guiné-Bissau",GY:"Guiana",HK:"Hong Kong",HM:"Ilhas Heard e McDonald (Território da Austrália)",HN:"Honduras",HR:"Croácia (Hrvatska)",HT:"Haiti",HU:"Hungria",ID:"Indonésia",IE:"Irlanda",IL:"Israel",IN:"Índia",IO:"Território Britânico do Oceano Índico",IQ:"Iraque",IR:"Irã",IS:"Islândia",IT:"Itália",JM:"Jamaica",JO:"Jordânia",JP:"Japão",KE:"Kênia",KG:"Quirguistão",KH:"Camboja",KI:"Kiribati",KM:"Ilhas Comores",KN:"São Cristóvão e Névis",KP:"Coréia do Norte",KR:"Coréia do Sul",KW:"Kuait",KY:"Ilhas Cayman",KZ:"Cazaquistão",LA:"Laos",LB:"Líbano",LC:"Santa Lúcia",LI:"Liechtenstein",LK:"Sri Lanka",LR:"Libéria",LS:"Lesoto",LT:"Lituânia",LU:"Luxemburgo",LV:"Letônia",LY:"Líbia",MA:"Marrocos",MC:"Mônaco",MD:"Moldova",MG:"Madagascar",MH:"Ilhas Marshall",MK:"Macedônia",ML:"Mali",MM:"Myanma",MN:"Mongólia",MO:"Macau",MP:"Ilhas Marianas do Norte",MQ:"Martinica",MR:"Mauritânia",MS:"Montserrat",MT:"Malta",MU:"Maurício",MV:"Maldivas",MW:"Malaui",MY:"Malásia",MZ:"Moçambique",NA:"Namíbia",NC:"Nova Caledônia",NE:"Níger",NF:"Ilhas Norfolk",NG:"Nigéria",NI:"Nicarágua",NL:"Holanda",NO:"Noruega",NP:"Nepal",NR:"Nauru",NT:"Zona Neutra",NU:"Niue",NZ:"Nova Zelândia",OM:"Omã",PA:"Panamá",PE:"Peru",PF:"Polinésia Francesa",PG:"Papua-Nova Guiné",PH:"Filipinas",PK:"Paquistão",PL:"Polônia",PM:"St. Pierre and Miquelon",PN:"Ilha Pitcairn",PR:"Porto Rico",PW:"Palau",PY:"Paraguai",QA:"Qatar",RE:"Ilha Reunião",RO:"Romênia",RU:"Federação Russa",RW:"Ruanda",SA:"Arábia Saudita",SB:"Ilhas Solomão",SC:"Ilhas Seychelles",SD:"Sudão",SE:"Suécia",SG:"Cingapura",SH:"Santa Helena",SI:"Eslovênia",SJ:"Jan Mayen",SK:"Eslováquia",SL:"Serra Leoa",SM:"San Marino",SN:"Senegal",SO:"Somália",SR:"Suriname",ST:"São Tomé e Príncipe",SU:"União Soviética (antiga)",SV:"El Salvador",SY:"Síria",SZ:"Suazilândia",TC:"Ilhas Turks e Caicos",TD:"Chade",TF:"Territórios do Sul da França",TG:"Togo",TH:"Tailândia",TJ:"Tadjiquistão",TK:"Ilhas Tokelau",TM:"Turcomenistão",TN:"Tunísia",TO:"Tonga",TP:"Timor",TR:"Turquia",TT:"Trinidad and Tobago",TV:"Tuvalu",TW:"Taiwan",TZ:"Tanzânia",UA:"Ucrânia",UG:"Uganda",UK:"Reino Unido",UM:"Ilhas Menores dos Estados Unidos",US:"Estados Unidos",UY:"Uruguai",UZ:"Uzbequistão",VA:"Vaticano",VC:"Saint Vincente e Granadinas",VE:"Venezuela",VG:"Ilhas Virgens (Inglaterra)",VI:"Ilhas Virgens (Estados Unidos)",VN:"Vietnã",VU:"Vanuatu",WF:"Ilhas Wallis e Futuna",WS:"Samoa Ocidental",YE:"Iêmen",YT:"Mayotte",YU:"Iugoslávia",ZA:"África do Sul",ZM:"Zâmbia",ZR:"Zaire",ZW:"Zimbábue"},
			siglas : {AL:"Agentes de leitura",AR:"Avisos de recebimento",AS:"PAC - Ação Social",CA:"Encomenda Internacional - Colis",CB:"Encomenda Internacional - Colis",CC:"Encomenda Internacional - Colis",CD:"Encomenda Internacional - Colis",CE:"Encomenda Internacional - Colis",CF:"Encomenda Internacional - Colis",CG:"Encomenda Internacional - Colis",CH:"Encomenda Internacional - Colis",CI:"Encomenda Internacional - Colis",CJ:"Encomenda Internacional - Colis",CK:"Encomenda Internacional - Colis",CL:"Encomenda Internacional - Colis",CM:"Encomenda Internacional - Colis",CN:"Encomenda Internacional - Colis",CO:"Encomenda Internacional - Colis",CP:"Encomenda Internacional - Colis",CQ:"Encomenda Internacional - Colis",CR:"Carta registrada sem Valor Declarado",CS:"Encomenda Internacional - Colis",CT:"Encomenda Internacional - Colis",CU:"Encomenda internacional - Colis",CV:"Encomenda Internacional - Colis",CW:"Encomenda Internacional - Colis",CX:"Encomenda internacional - Colis ou Selo Lacre para Caixetas",CY:"Encomenda Internacional - Colis",CZ:"Encomenda Internacional - Colis",DA:"SEDEX ou Remessa Expressa com AR Digital",DB:"SEDEX ou Remessa Expressa com AR Digital (Bradesco)",DC:"Remessa Expressa CRLV/CRV/CNH e Notificações",DD:"Devolução de documentos",DE:"Remessa Expressa Talão/Cartão com AR",DF:"e-SEDEX",DG:"SEDEX",DI:"SEDEX ou Remessa Expressa com AR Digital (Itaú)",DJ:"SEDEX",DK:"PAC Extra Grande",DL:"SEDEX",DM:"e-SEDEX",DN:"SEDEX",DO:"SEDEX ou Remessa Expressa com AR Digital (Itaú)",DP:"SEDEX Pagamento na Entrega",DQ:"SEDEX ou Remessa Expressa com AR Digital (Santander)",DR:"Remessa Expressa com AR Digital (Santander)",DS:"SEDEX ou Remessa Expressa com AR Digital (Santander)",DT:"Remessa econômica com AR Digital (DETRAN)",DX:"SEDEX 10",EA:"Encomenda Internacional - EMS",EB:"Encomenda Internacional - EMS",EC:"PAC",ED:"Packet Express",EE:"Encomenda Internacional - EMS",EF:"Encomenda Internacional - EMS",EG:"Encomenda Internacional - EMS",EH:"Encomenda Internacional - EMS ou Encomenda com AR Digital",EI:"Encomenda Internacional - EMS",EJ:"Encomenda Internacional - EMS",EK:"Encomenda Internacional - EMS",EL:"Encomenda Internacional - EMS",EM:"SEDEX Mundi ou EMS",EN:"Encomenda Internacional - EMS",EP:"Encomenda Internacional - EMS",EQ:"Encomenda de serviço não expressa (ECT)",ER:"Objeto registrado",ES:"e-SEDEX ou EMS",EU:"Encomenda Internacional - EMS",EV:"Encomenda Internacional - EMS",EX:"Encomenda Internacional - EMS",EY:"Encomenda Internacional - EMS",EZ:"Encomenda Internacional - EMS",FA:"FAC registrado",FE:"Encomenda FNDE",FF:"Objeto registrado (DETRAN)",FH:"FAC registrado com AR Digital",FM:"FAC monitorado",FR:"FAC registrado",IA:"Logística Integrada (agendado / avulso)",IC:"Logística Integrada (a cobrar)",ID:"Logística Integrada (devolução de documento)",IE:"Logística Integrada (Especial)",IF:"CPF",II:"Logística Integrada (ECT)",IK:"Logística Integrada com Coleta Simultânea",IM:"Logística Integrada (Medicamentos)",IN:"Correspondência e EMS recebido do Exterior",IP:"Logística Integrada (Programada)",IR:"Impresso Registrado",IS:"Logística integrada standard (medicamentos)",IT:"Remessa Expressa Medicamentos / Logística Integrada Termolábil",IU:"Logística Integrada (urgente)",IX:"EDEI Expresso",JA:"Remessa econômica com AR Digital",JB:"Remessa econômica com AR Digital",JC:"Remessa econômica com AR Digital",JD:"Remessa econômica Talão/Cartão",JE:"Remessa econômica com AR Digital",JF:"Remessa econômica com AR Digital",JG:"Objeto registrado urgente/prioritário",JH:"Objeto registrado urgente / prioritário",JI:"Remessa econômica Talão/Cartão",JJ:"Objeto registrado (Justiça)",JK:"Remessa econômica Talão/Cartão",JL:"Objeto registrado",JM:"Mala Direta Postal Especial",JN:"Objeto registrado econômico",JO:"Objeto registrado urgente",JP:"Receita Federal",JQ:"Remessa econômica com AR Digital",JR:"Objeto registrado urgente / prioritário",JS:"Objeto registrado",JV:"Remessa Econômica (c/ AR DIGITAL)",LA:"SEDEX com Logística Reversa Simultânea em Agência",LB:"e-SEDEX com Logística Reversa Simultânea em Agência",LC:"Objeto Internacional (Prime)",LE:"Logística Reversa Econômica",LF:"Objeto Internacional (Prime)",LI:"Objeto Internacional (Prime)",LJ:"Objeto Internacional (Prime)",LK:"Objeto Internacional (Prime)",LM:"Objeto Internacional (Prime)",LN:"Objeto Internacional (Prime)",LP:"PAC com Logística Reversa Simultânea em Agência",LS:"SEDEX Logística Reversa",LV:"Logística Reversa Expressa",LX:"Packet Standard / Econômica",LZ:"Objeto Internacional (Prime)",MA:"Serviços adicionais do Telegrama",MB:"Telegrama (balcão)",MC:"Telegrama (Fonado)",MD:"SEDEX Mundi (Documento interno)",ME:"Telegrama",MF:"Telegrama (Fonado)",MK:"Telegrama (corporativo)",ML:"Fecha Malas (Rabicho)",MM:"Telegrama (Grandes clientes)",MP:"Telegrama (Pré-pago)",MR:"AR digital",MS:"Encomenda Saúde",MT:"Telegrama (Telemail)",MY:"Telegrama internacional (entrante)",MZ:"Telegrama (Correios Online)",NE:"Tele Sena resgatada",NX:"EDEI Econômico (não urgente)",PA:"Passaporte",PB:"PAC",PC:"PAC a Cobrar",PD:"PAC",PE:"PAC",PF:"Passaporte",PG:"PAC",PH:"PAC",PI:"PAC",PJ:"PAC",PK:"PAC Extra Grande",PR:"Reembolso Postal",QQ:"Objeto de teste (SIGEP Web)",RA:"Objeto registrado / prioritário",RB:"Carta registrada",RC:"Carta registrada com Valor Declarado",RD:"Remessa econômica ou objeto registrado (DETRAN)",RE:"Objeto registrado econômico",RF:"Receita Federal",RG:"Objeto registrado",RH:"Objeto registrado com AR Digital",RI:"Objeto registrado internacional prioritário",RJ:"Objeto registrado",RK:"Objeto registrado",RL:"Objeto registrado",RM:"Objeto registrado urgente",RN:"Objeto registrado (SIGEPWEB ou Agência)",RO:"Objeto registrado",RP:"Reembolso Postal",RQ:"Objeto registrado",RR:"Objeto registrado",RS:"Objeto registrado",RT:"Remessa econômica Talão/Cartão",RU:"Objeto registrado (ECT)",RV:"Remessa econômica CRLV/CRV/CNH e Notificações com AR Digital",RW:"Objeto internacional",RX:"Objeto internacional",RY:"Remessa econômica Talão/Cartão com AR Digital",RZ:"Objeto registrado",SA:"SEDEX",SB:"SEDEX 10",SC:"SEDEX a cobrar",SD:"SEDEX ou Remessa Expressa (DETRAN)",SE:"SEDEX",SF:"SEDEX",SG:"SEDEX",SH:"SEDEX com AR Digital / SEDEX ou AR Digital",SI:"SEDEX",SJ:"SEDEX Hoje",SK:"SEDEX",SL:"SEDEX",SM:"SEDEX 12",SN:"SEDEX",SO:"SEDEX",SP:"SEDEX Pré-franqueado",SQ:"SEDEX",SR:"SEDEX",SS:"SEDEX",ST:"Remessa Expressa Talão/Cartão",SU:"Encomenda de serviço expressa (ECT)",SV:"Remessa Expressa CRLV/CRV/CNH e Notificações com AR Digital",SW:"e-SEDEX",SX:"SEDEX 10",SY:"Remessa Expressa Talão/Cartão com AR Digital",SZ:"SEDEX",TC:"Objeto para treinamento",TE:"Objeto para treinamento",TS:"Objeto para treinamento",VA:"Encomendas com valor declarado",VC:"Encomendas",VD:"Encomendas com valor declarado",VE:"Encomendas",VF:"Encomendas com valor declarado",VV:"Objeto internacional",XA:"Aviso de chegada (internacional)",XM:"SEDEX Mundi",XR:"Encomenda SUR Postal Expresso",XX:"Encomenda SUR Postal 24 horas"}
		}
	};
	
	http.post = require('http-post');

	moment.locale(idioma);
	moment.locale(idioma, {
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

	/**
	* Adiciona as seguintes informações ao(s) objeto(s) consultado(s):
	* - paisOrigem: O nome do país em que foi feito o envio;
	* - tipoEncomenda: A descrição do tipo de encomenda. Por exemplo: PAC, E-Sedex, etc.
	*/
	function adicionarInformacoesExtras(arr){
		if(!arr || !Array.isArray(arr)){
			return;
		}
		
		try{
			for(var i in arr){
				var numero = arr[i].numero.toString(),
					pais = numero.substr(numero.length - 2, 2) || '',
					sufixo = numero.substr(0, 2) || '',
					textoPadrao = textos[idioma].naoIdentificado;
			
			arr[i].tipoEncomenda = textos[idioma].siglas[sufixo.toUpperCase()] || textoPadrao;
			arr[i].paisOrigem = textos[idioma].paises[pais.toUpperCase()] || textoPadrao;
		}
		}catch(err){
			console.error(textos[idioma].infoExtraErr);
		}
	}
		
  var prs = new Prs(function (resolve, reject) {

    http.post(url,
      {
        Usuario: 'ECT', Senha: 'SRO', Tipo: 'L', Resultado: opcoes.resultado, Objetos: objetos.join('').toUpperCase()
      },
      function (res) {
        res.setEncoding('iso-8859-1');

        res.on('end', function(){
				
				parseString(data, function (err, result) {
					if (err) {
						return reject(err);
					}
					
					adicionarInformacoesExtras(result.sroxml.objeto);
					
					if (opcoes.parse === 'xml'){
						resolve(xmlBuilder.buildObject(result));
					} else if ( opcoes.parse === 'json' ){
						resolve(JSON.stringify(result, null, 2).replace(/sroxml/g, 'srojson'));
					} else {
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
								eventos.push('\n', '  ', textos[idioma].paisOrigem, ': ', obj.paisOrigem);
								eventos.push('\n', '  ', textos[idioma].tipoEncomenda, ': ', obj.tipoEncomenda);

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
					}
				});
      });

      res.on('data', function(body) {
        data += body;
      });
    });
  });

  return prs;

};
