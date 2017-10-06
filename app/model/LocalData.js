/**
 * Modelo para el almacenamiento local de datos
 *
 *
 * @class app.model.LocalData
 * @module model
 * @package model
 * @author rbruno
 * @copyright Copyright (c) 2015 Soluciones Integrales GIS, C.A.
 */
Ext.define('app.model.LocalData', {
    
	extend: 'Ext.data.Model',
	
    config: {
    	identifier: 'uuid',
    	idProperty : 'uniqueid',
    	fields: [
			{name: 'lastIdentify'},
			{name: 'lastPosition'},
    	    {name: 'OAuth'},
    	    {name: 'OAuth_date'},
    	    {name: 'Usuario'},
    	    {name: 'Equipo'},
    	    {name: 'Lugares'},
    	    {name: 'vehiculos'},
    	    {name: 'notificaciones'},
    	    {name: 'notificaciones_sinleer'},
    	    {name: 'notificaciones_totalcount'},
    	    {name: 'equipo_lastupdate'},
    	    {name: 'showPanel'},
    	    {name: 'passwordSeguridad'},
    	    {name: 'Session_uuid'},
    	    {name: 'LastLogin'},
    	    {name: 'lang'} // idioma
    	    
    	    
            //TODO Aquí puede agregar los campos para almacenar de forma local
        ],
        
        proxy: {
            type: 'localstorage',
            id : 'gtrplusmobile-localstore'//puede cambiar el prefijo app por el de su aplicación
        }
    }
});