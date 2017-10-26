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
    		{name: 'current_route_id'},
			{name: 'current_route'},
			{name: 'current_route_start_timestamp'},
    	    {name: 'current_route_end_timestamp'},
    	    {name: 'current_route_coords'},
    	    {name: 'current_route_errors'},
    	    
    	    {name: 'usuario'},
    	    {name: 'saved_routes'},
    	    {name: 'lang'}
    	    
            //TODO Aquí puede agregar los campos para almacenar de forma local
        ],
        
        proxy: {
            type: 'localstorage',
            id : 'godrive360-localstore'
        }
    }
});