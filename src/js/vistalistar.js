/**
	vistalisar.js Vista que muestra la lista de Jesuitas.
	@author Miguel Jaque <mjaque@migueljaque.com>
	@license GPL-3.0-or-later
*/

/**
	Vista que muestra la lista de Jesuitas.
*/

import {Vista} from './vista.js'
import {Jesuita} from './jesuita.js'

export class VistaListar extends Vista{
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
			'div' : null,
			'tabla' : null
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
		this.html.div = docPlantilla.getElementsByTagName('div')[0]
		this.html.tabla = docPlantilla.getElementsByTagName('table')[0]
	}
	/**
	Asocia los manejadores de eventos a los eventos del documento.
	**/
	asociar(){
	}
}
