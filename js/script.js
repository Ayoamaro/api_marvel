var publicKey = '816659fb8a1838538f301d44032d69ce';
var privateKey = '7a42da973f35ba60433d96ec6e882109d8180496';

var ts = new Date().getTime();
var hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
var buscarPersonaje;
var buscarComic;
$('#spinnerUI').hide()
$('#busqueda').hide()
$('#volver').hide()
$('<div id="resultados"></div>').insertAfter('.cuerpo')


$('#onPersonajes').click(function() {
	$("#spinnerUI").show();
	$('#busqueda').show()
	$('#volver').show()
	$('.cuerpo').hide()
	var contenedorResultados = $('#resultados')
	buscarPersonaje = true;
	$.ajax({
		url: `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`,
		type: "GET",
		data: {
			limit: 10
		},
		success: function(response) {
			var personajes = response.data.results;
			$.each(personajes, function(key) {
				var personajeNuevo = $('<div class="divPersonajes">')
				contenedorResultados.append(personajeNuevo)
				personajeNuevo.append(`<p>${personajes[key].name}</p>`)
				personajeNuevo.append(`<img src="${personajes[key].thumbnail.path}.${personajes[key].thumbnail.extension}" style="width: 150px; height: 150px;"></img>`)
			});
		},
		complete: function() {
	$("#spinnerUI").hide();
		}
	});
});


$('#onComics').click(function() {
	$("#spinnerUI").show()
	$('#busqueda').show()
	$('#volver').show()
	$('.cuerpo').hide()
	var contenedorResultados = $('#resultados')
	buscarComic = true;
	$.ajax({
		url: `https://gateway.marvel.com:443/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`,
		type: "GET",
		data: {
			limit: 10
		},
		success: function(response) {
			var comics = response.data.results;
			$.each(comics, function(key) {
				var comicNuevo = $('<div class="divComics">')
				contenedorResultados.append(comicNuevo)
				comicNuevo.append(`<p>${comics[key].title}</p>`)
				comicNuevo.append(`<img src="${comics[key].thumbnail.path}.${comics[key].thumbnail.extension}" style="width: 150px; height: 150px;"></img>`)
				comicNuevo.append(`<p>${comics[key].description}</p>`)
			});
		},
		complete: function() {
		  $("#spinnerUI").hide();
		}
	});
});


$("#busqueda").keyup(function() {
	$("#spinnerUI").show();
	$('#resultados').empty();
	var busquedaUsuario = $("#busqueda").val();
	var contenedorResultados = $('#resultados')
	var busquedaFinal, tipoBusqueda = "";
	if (buscarComic === true) {
	  busquedaFinal = `&titleStartsWith=${busquedaUsuario}`;
	  tipoBusqueda = "comics";
	} else if (buscarPersonaje == true) {
	  busquedaFinal = `&nameStartsWith=${busquedaUsuario}`;
	  tipoBusqueda = "characters";
	}
	$.ajax({
	  url: `https://gateway.marvel.com:443/v1/public/${tipoBusqueda}?ts=${ts}&apikey=${publicKey}&hash=${hash}${busquedaFinal}`,
	  method: "GET",
	  data: {
		limit: 10
	  },
	  success: function(response) {
			var busqueda = response.data.results;
			$.each(busqueda, function(key) {
				var elementosNuevos = $('<div class="divBusqueda">')
				contenedorResultados.append(elementosNuevos)
				if (buscarComic === true) {
					elementosNuevos.append(`<p>${busqueda[key].title}</p>`)
					if (busqueda[key].description === null){
						elementosNuevos.append(`<article><p>--------------</p></article>`);
						elementosNuevos.append(`<article><p>Sin descripción</p></article>`);
					}
					else {
						elementosNuevos.append(`<article><p>--------------</p></article>`);
						var descripcion = busqueda[key].description;
						var caracteresMax = 50;
						if (descripcion.length > caracteresMax) {
							var resumen = descripcion.substr(0, caracteresMax);
							var todo = descripcion.substr(caracteresMax, descripcion.length - caracteresMax);	
							
							elementosNuevos.append(`<article><p>${resumen}</p><a href="#" class="elemento">Leer más...</a></article>`);
							$('.elemento').click(function(e) {
								e.preventDefault();
								$(this).text(`<article><p>${todo}</p><a href="#" class="elemento">Leer menos...</a></article>`).show();
							});
						}
					}
				} else {
					elementosNuevos.append(`<p>${busqueda[key].name}</p>`)
				}
				
				elementosNuevos.append(`<img src="${busqueda[key].thumbnail.path}.${busqueda[key].thumbnail.extension}" style="width: 150px; height: 150px;"></img>`)
			});
	  },
	  complete: function() {
		$("#spinnerUI").hide();
	  }
	});
  });


