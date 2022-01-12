/**
	vistaprincipal.js Vista principal de la aplicación.
	@author Miguel Jaque <mjaque@migueljaque.com>
	@license GPL-3.0-or-later
*/

/**
	Vista principal de la aplicación.
	Construye el layout y crea las vistas secundarias (header, nav, main y footer)
*/

import {Vista} from './vista.js'
import {Menu} from './menu.js'
import {VistaCrear} from './vistacrear.js'
import {VistaListar} from './vistalistar.js'

export class VistaPrincipal extends Vista{
	/**
		Constructor de la vista principal.
		Declara a inicializa los atributos del objeto.
		@param controlador {Crudo} Controlador de la aplicación.
		@param base {HTMLElement} Elemento HTML en el que se creará la vista principal.
	*/
	constructor(controlador, base){
		super(controlador, base)

		//Referencias a Elementos HTML en la plantilla
		this.html = {
			'header' : null,
			'nav' : null,
			'main' : null,
			'footer' : null
		}
	}
	/**
	Registra las referencias de la vista a los elementos de la plantilla.
	Es necesario registrar antes de transferir los elementos de la plantilla al documento principal.
	@param docPlantilla {Document} Documento cargado desde la plantilla.
	*/
	registrar(docPlantilla){
		//Guardamos las referencias a los elementos del interfaz
		this.html.header = docPlantilla.getElementsByTagName('header')[0]
		this.html.nav = docPlantilla.getElementsByTagName('nav')[0]
		this.html.main = docPlantilla.getElementsByTagName('main')[0]
		this.html.footer = docPlantilla.getElementsByTagName('footer')[0]
	}
	/**
	Asocia los manejadores de eventos a los eventos del documento.
	**/
	asociar(){
		//this.header.onclick = this.clicar.bind(this)
	}
	/**
	Crea el menú como subvista.
	*/
	crearHijos(){
		//Subvistas. No se cargan hasta tener registradas las referencias a la plantilla.
		this.hijos = {
			'menu' : new Menu(this.controlador, this.html.nav),
			'vistaCrear': new VistaCrear(this.controlador, this.html.main),
			'vistaListar': new VistaListar(this.controlador, this.html.main)
		}
	}
	/**
	Muestra el formulario para dar de alta un nuevo Objetivo.
	*/
	verCrear(){
		this.ocultarSubvistasMain()
		this.hijos.vistaCrear.mostrar(true)
	}
	/**
	Oculta las subvistas de main
	*/
	ocultarSubvistasMain(){
		//Añadir el resto de subvistas de main
		this.hijos.vistaCrear.mostrar(false)
		this.hijos.vistaListar.mostrar(false)
	}
	/**
	Muestra la Vista listar
	*/
	verListar(){
		this.ocultarSubvistasMain()
		this.hijos.vistaListar.mostrar(true)
	}
}
