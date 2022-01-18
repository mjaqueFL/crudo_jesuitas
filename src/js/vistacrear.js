/**
	vistacrear.js Vista de Formulario para la creación de objetivos.
	@author Miguel Jaque <mjaque@migueljaque.com>
	@license GPL-3.0-or-later
*/

/**
	Vista de Formulario para la creación de objetivos.
*/

import {Vista} from './vista.js'
import {Jesuita} from './jesuita.js'

export class VistaCrear extends Vista{
	/**
		Constructor de la vista.
		Declara a inicializa los atributos del objeto.
		@param controlador {Crudo} Controlador de la aplicación.
		@param base {HTMLElement} Elemento HTML en el que se creará la vista principal.
	*/
	constructor(controlador, base){
		super(controlador, base)

		//Referencias a Elementos HTML en la plantilla
		this.html = {
			'div': null,
			'iNombre' : null,
			'btnAceptar' : null
		}

		//Subvistas. No se cargan hasta tener registradas las referencias a la plantilla.
		this.hijos = {
		}

	}
	/**
	Registra las referencias de la vista a los elementos de la plantilla.
	Es necesario registrar antes de transferir los elementos de la plantilla al documento principal.
	@param docPlantilla {Document} Documento cargado desde la plantilla.
	*/
	registrar(docPlantilla){
		//Guardamos las referencias a los elementos del interfaz
		this.html.div = $('div',docPlantilla)
		this.html.iNombre = $('input',docPlantilla)
		this.html.btnAceptar = $('button',docPlantilla)
	}
	/**
	Asocia los manejadores de eventos a los eventos del documento.
	**/
	asociar(){
		$(this.html.btnAceptar).click(this.aceptar.bind(this))
	}
	/**
	Atención al botón Aceptar
	*/
	aceptar(){
		//Aquí se haría la validación de datos.
		let nombre = this.html.iNombre.value
		//Construimos el objeto de negocio
		let jesuita = new Jesuita(nombre)
		this.controlador.aceptarCrear(jesuita)
		this.limpiar()
	}
	/**
		Borra los campos del formulario.
	*/
	limpiar(){
		this.html.iNombre = ''
	}
	/**
	Muestra o oculta la vista
	@param mostrar {Boolean} true para mostrar la vista, false para ocultarla
	*/
	mostrar(mostrar){
		if (mostrar)
			$(this.html.div).show() 
		else
			$(this.html.div).hide()
	}
	
}
