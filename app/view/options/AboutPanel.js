/**
 * Panel para gestionar los creditos de la aplicación
 * 
 * @class app.view.options.AboutPanel
 * @module view
 * @extends Ext.Panel
 * @author rbruno	<robert.bruno@sigis.com.ve>
 * @author hpartidas
 * @copyright Copyright (c) 2015 Soluciones Integrales GIS, C.A.
 */
Ext.define("app.view.options.AboutPanel", {

	extend: 'Ext.Panel',
	xtype: 'about-panel',
	alias: 'about-panel',
	
	requires: [
          'Ext.Panel'
    ],

    config : {
    	  cls  : 'aboutPanel',
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
		
		me.add({
			html : "<div style='width: 100%; text-align: center;'><img src='resources/images/goDriveLogo.png' style='width: 75%; margin: 5%;' /></div>" 
				+ "<br/><div style='margin-left: 10px; margin-right: 10px; margin-top: 10px; '> " 
				+ " <b>" + Config.APP_NAME + "</b><br/>"
				+ " Versión " + Config.VERSION + " <br/><br/>"
				+ " -- Aqui va el text --"
				 
		});
	}
});
