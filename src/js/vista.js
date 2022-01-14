/**
	vista.js Clase superior de las vistas de la aplicación.
	@author Miguel Jaque <mjaque@migueljaque.com>
	@license GPL-3.0-or-later
*/

/**
	Clase superior de las vistas de la aplicación..
*/
export class Vista {
  /**
  	Constructor de la vista.
  	Declara a inicializa los atributos del objeto.
  	@param controlador {Crudo} Controlador de la aplicación.
  	@param base {HTMLElement} Elemento HTML en el que se creará la vista principal.
  */
  constructor(controlador, base) {
    this.controlador = controlador
    this.base = base

    //Los parámetros de configuración deben ser "inyectados"
    this.dirHTML = Vista.dirHTML
    this.dirCSS = Vista.dirCSS

    this.html = {} //Referencias a Elementos HTML en la plantilla
    this.hijos = {} //Referencias a Subvistas
  }
  /**
  	Carga asíncronamente la plantilla de la vista.
  	Después de cargar la plantilla, llama a registrar, asociar, transferir, cargarCSS, crea las vistas hijas y finalmente las carga.
  	@param plantilla {string} URL de la plantilla a cargar.
  	@param base {HTMLElement) Elemento HTML del documento principal en el que se cargarán los elementos de la plantilla de la vista.
  	@return {Promise}
  */
  cargar(plantilla, base = this.base) {
    if (!plantilla) //nombre por defecto
      plantilla = `${this.dirHTML}/${this.constructor.name.toLowerCase()}.html`
    return new Promise(resolve => {
      fetch(plantilla)
        .then(respuesta => {
          respuesta.text().then(texto => {
              const parser = new DOMParser()
              let doc = parser.parseFromString(texto, "text/html")
              this.registrar(doc)
              this.asociar()
              this.transferir(base, doc.body)	//De lo contrario, cargamos todo el doc (con html, head, body...)
              this.cargarCSS(`${this.dirCSS}/${this.constructor.name.toLowerCase()}.css`)
              this.crearHijos()
							const promesas = [] //Creamos un array de promesas
              for (let hijo in this.hijos)
                promesas.push(this.hijos[hijo].cargar())
              return Promise.all(promesas).then(() => {
				console.log(`Cargado ${this.constructor.name.toLowerCase()}`)
				resolve(true)
				})
		})
       })
        .catch(error => {
          throw error
        })
    })
  }
  /**
  	Carga un fichero de CSS en la cabecera del documento.
  */
  cargarCSS(css) {
    let link = document.createElement('link')
    link.href = css
    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.media = 'screen'
    link.onload = function() {
      //console.log('css cargado')
    }
    document.getElementsByTagName('head')[0].appendChild(link)
  }
  /**
  Registra las referencias de la vista a los elementos de la plantilla.
  Es necesario registrar antes de transferir los elementos de la plantilla al documento principal.
  @param docPlantilla {Document} Documento cargado desde la plantilla.
  */
  registrar(docPlantilla) {
    //Guardamos las referencias a los elementos del interfaz
    //Este método debe ser sobreescrito por las clases derivadas.
  }
  /**
  Asocia los manejadores de eventos a los eventos del documento.
  **/
  asociar() {
    //Este método debe ser sobreescrito por las clases derivadas.
    //this.header.onclick = this.clicar.bind(this)
  }
  /**
  Transfiere los elementos de la plantilla al documento principal, insertándolos en el elemento base en el mismo orden en el que figuran en la plantilla.
  @param base {HTMLElmement} Elemento del documento principal que será padre de los elementos transferidos.
  @param doc {Document} Documento HTML de la plantilla que contiene los elemenetos a transferir.
  */
  transferir(base, doc) {
    while(doc.children.length > 0)
      base.appendChild(doc.children.item(0))
  }
	/**
	Crea las subvistas de la vista (hijos)
	*/
  crearHijos() {
		//Este método debe ser sobreescrito por la clase derivada.
	}
	/**
	Muestra o oculta la vista
	@param mostrar {Boolean} true para mostrar la vista, false para ocultarla
	*/
	mostrar(mostrar){
		if (mostrar)
			this.html.div.style.display = 'block'
		else
			this.html.div.style.display = 'none'
	}
}
