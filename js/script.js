var publicKey = '816659fb8a1838538f301d44032d69ce';
var privateKey = '7a42da973f35ba60433d96ec6e882109d8180496';

var ts = new Date().getTime();
var hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
var buscarPersonaje;
var buscarComic;

/* Ejecutamos la serie de comandos al iniciar la página web */
$(document).ready(function() {
	$('#spinnerUI').hide()
	$('#busqueda').hide()
	$('#volver').hide()
	$('<div id="resultados"></div>').insertAfter('.cuerpo')
});

/* Función a ejecutar al pulsar el botón (onPersonajes) */
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

/* Función a ejecutar al pulsar el botón (onComics) */
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
				if (comics[key].description === null){
					comicNuevo.append(`<p>--------------</p>`)
					comicNuevo.append(`<p>Sin descripción</p>`)
				}
				else {
					comicNuevo.append(`<p>--------------</p>`)
					/* Función con efecto leer más texto de las descripciones */
					mostrarMas()
					var descripcion = comics[key].description
      				var textoResumido = descripcion.substring(0, 50)
     				var textoCompleto = `<a class='leerMas' href='#'>Leer más</a><span id="leerMenos" style="display: none;">${descripcion} <a class='leerMenos' href=""> Leer menos</a></span> `
					comicNuevo.append(`${textoResumido}${textoCompleto}`)
					
				}
				comicNuevo.append(`<img src="${comics[key].thumbnail.path}.${comics[key].thumbnail.extension}" style="width: 150px; height: 150px;"></img>`)
			});
		},
		complete: function() {
		  $("#spinnerUI").hide();
		}
	});
});

/* Filtro de búsqueda que se ejecutará a la vez que el usuario teclea un nombre de comic/personaje */
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
						elementosNuevos.append(`<p>--------------</p>`)
						elementosNuevos.append(`<p>Sin descripción</p>`)
					}
					else {
						elementosNuevos.append(`<p>--------------</p>`)
						/* Función con efecto leer más texto de las descripciones */
						mostrarMas()
						var descripcion = busqueda[key].description
      						var textoResumido = descripcion.substring(0, 50)
     						var textoCompleto = `<a class='leerMas' href='#'>Leer más</a><span id="leerMenos" style="display: none;">${descripcion} <a class='leerMenos' href=""> Leer menos</a></span> `
						elementosNuevos.append(`${textoResumido}${textoCompleto}`)
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


/* La funcionalidad no está del todo correcta, ya que al clickear "Leer más" no se oculta
el texto anterior que se muestra en un comienzo para el usuario */
function mostrarMas() {
	$(".leerMas").click(function(e) {
		e.preventDefault()
		$(e.target).hide()
		$(e.target).prev().hide()
		$(e.target).nextAll().show()
		$(e.target).nextAll().children().show()
	});
	$(".leerMenos").click(function(e) {
		e.preventDefault()
		$(e.target).hide()
		$(e.target).parent().hide()
		$(e.target).parent().prevAll().show()
	});
}
