/**
	menu.js Menú de la aplicación.
	@author Miguel Jaque <mjaque@migueljaque.com>
	@license GPL-3.0-or-later
*/

/**
	Menú de operaciones de la aplicación.
*/

import {Vista} from './vista.js'

export class Menu extends Vista{
	/**
		Constructor del menú.
		Declara a inicializa los atributos del objeto.
		@param controlador {Crudo} Controlador de la aplicación.
		@param base {HTMLElement} Elemento HTML en el que se creará la vista principal.
	*/
	constructor(controlador, base){
		super(controlador, base)

		//Referencias a Elementos HTML en la plantilla
		this.html = {
			'aListar' : null,
			'aCrear' : null
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
		this.html.aListar = docPlantilla.getElementsByTagName('a')[0]
		this.html.aCrear = docPlantilla.getElementsByTagName('a')[1]
	}
	/**
	Asocia los manejadores de eventos a los eventos del documento.
	**/
	asociar(){
		this.html.aListar.onclick = this.controlador.listar.bind(this.controlador)
		this.html.aCrear.onclick = this.controlador.verCrear.bind(this.controlador)
	}
}
