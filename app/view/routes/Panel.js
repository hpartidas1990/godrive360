/**
 * 
 */
Ext.define("app.view.routes.Panel", {

	extend: 'Ext.Panel',
	
	xtype: 'routes-panel',
	
	alias: 'routes-panel',
	
	requires: [
          'Ext.Panel',
          'Ext.List',
          'Ext.data.Store',
          'Ext.data.Model'
    ],

    config : {
    	  cls  : 'fondito',
    	  layout : 'vbox',
          scrollable : {
        	    direction: 'vertical'
          }
  	},

  	/**
  	 * 
  	 * @method  initialize
  	 */
	initialize: function(){
		var me = this;
			me.callParent(arguments);
			me.add(me.getList());
	},
	
	getList : function(){
		
		var me = this;
		return Ext.create('Ext.List', {
		    flex: 1,
		    itemTpl: me.getTpl(),
		    data: me.getData(),
		    disableSelection: true
		});
	},
	
	getTpl : function(){
		return '<div class="route-item">{route_title}</div>';
	},
	
	getData : function(){
		
		return App.extFn().getLocalData('saved_routes');
	},
	
	getModel : function(){
		
		return Ext.define('Contact', {
		    extend: 'Ext.data.Model',
		    config: {
		        fields: ['id', 'pupil', 'route_title', 'route_coords', 
		        		 'route_end_timestamp', 'route_errors', 
		        		 'route_files', 'route_start_timestamp']
		    }
		});
	}
	
});