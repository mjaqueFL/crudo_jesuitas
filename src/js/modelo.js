/**
	modelo.js Modelo de la aplicación.
	@author Miguel Jaque <mjaque@migueljaque.com>
	@license GPL-3.0-or-later
*/

/**
	Modelo de la aplicación.
	Guarda la información en el almacenamiento local (IndexedDB)
	Utiliza llamadas asíncronas.
*/
export class Modelo{
	//Atributos
	#bd	//Conexión con la base de datos
	#OS1 = 'Objeto'	//ObjectStore (como la "tabla")

	/**
		Constructor de Modelo
		@param bdNombre {String} Nombre de la base de datos.
		@param bdVersion {Number} Número de la versión de la base de datos.
	*/
	constructor(bdNombre, bdVersion){
		this.bdNombre = bdNombre
		this.bdVersion = bdVersion
		this.conectar()
	}
	/**	Abre la conexión con la base de datos.
		<p>La conexión queda en this.bd.</p>
	**/
	conectar(){
		if (!window.indexedDB) throw 'Su navegador no soporta una versión estable de indexedDB. CRUDO puede no funcionar.'
    	
    	//Abrimos la base de datos
    	console.log('Abriendo la conexión a la base de datos...')
		var peticion = window.indexedDB.open(this.bdNombre, this.bdVersion)
		peticion.onerror = this.error.bind(this)
		peticion.onsuccess = function(evento){
			this.bd = peticion.result
			this.bd.onerror = this.error.bind(this.bd)
			console.log('Abierta la conexión a la base de datos')
		}.bind(this)
		peticion.onupgradeneeded = this.actualizarBD.bind(this)
	}
	/**	Actualiza el Modelo a una nueva versión. 
		<p>Si no existe el ObjectStore lo crea.</p>
		@param {Event} evento - Evento de actualización de BD.
		@returns {boolean} True si la actualización tuvo éxito y se ejecutará onsuccess o false en caso contrario.
	**/
	actualizarBD(evento){
		this.bd = evento.target.result;
		console.log('Actualizando la base de datos...')
		console.log(`Creando el ObjectStore de "${this.#OS1}"...`)
		// Crea un almacén de objetos (objectStore) para esta base de datos
		let os1 = this.bd.createObjectStore(this.#OS1, { autoIncrement : true })
		//var objectStore = this.bd.createObjectStore("name", { keyPath: "myKey" });
		
		os1.transaction.oncomplete = function(evento) {
			console.log(`Creación del ObjectStore de ${this.#OS1} terminada.`)
		}.bind(this)
		console.log('Base de datos actualizada.')
		
		return true;
	}	
	/**
		Gestor de errores de la clase
		@param evento {Event} Evento que generó el error.
	*/
	error(evento){
		console.error(evento)
		console.error(evento,target,errorCode)
		throw 'Error del Modelo'
	}
	/**	Crea una transacción sobre la base de datos y devuelve un ObjectStore sobre ella.
		@param {String} tipo - Tipo de transacción ("readwrite" o "readonly")
		@returns {ObjectStore} ObjectStore de la transacción creada.
	**/
	getTransaccionOS(tipo){
		let transaccion = this.bd.transaction(this.#OS1, tipo)
		return transaccion.objectStore(this.#OS1)	//OS para la transacción
	}
	/**	Inserta un objeto en la base de datos
		@param {Clase} objeto - objeto a insertar.
		@param {Function} callback - Función de callback que se llamará al completar la operación.
	**/
	insertar(objeto, callback){
		let peticion = this.getTransaccionOS('readwrite').add(objeto)
		peticion.onsuccess = callback
	}
	/**	Devuelve la lista de objetos de la base de datos.
		@param {Function} callback - Función de callback que se llamará al completar la operación y que recibirá el resultado.
	**/
	listar(callback){
		let resultado = []
		
		//Creamos la transacción y obtenemos su OS
		let os = this.getTransaccionOS("readonly")
		os.openCursor().onsuccess = function(evento) {
			let cursor = evento.target.result
			if (cursor) {
				let objeto = cursor.value
				objeto.clave = cursor.primaryKey
				resultado.push(objeto)
				cursor.continue()
 			}
			else
 				callback(resultado)
		}
	}	
}
