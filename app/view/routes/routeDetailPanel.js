/**
 * 
 */
Ext.define("app.view.routes.routeDetailPanel", {

	extend: 'Ext.Panel',
	
	xtype: 'route-detail-panel',
	
	alias: 'route-detail-panel',
	
	requires: [
          'Ext.Panel',
          'Ext.Img'
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
		var data = me.getData();
			me.callParent(arguments);
			
			console.log(data);
		
		me.add({
		    xtype: 'label',
		    cls: 'label-text',
		    html: '<div class="pupil-name">' + data.route_title + '</div>'
		});
		
		me.add(me.getBotonera());
		
		//me.add(me.getInfoBlock());
	},
	
	getBotonera : function(){
		
		return Ext.create('Ext.Panel', {
			layout: 'vbox',
			flex: 1,
			margin: '12% 8%',
			padding: '5%',
			style: 'background-color: #fff;',
			items : [
			/*{
				html: '<div style=".8em; text-align: center; margin-bottom: 8%;">¿Qué acción desea realizar ahora?</div>',
			},*/
			{
				xtype: 'button',
				id: '',
				text: 'Ver Ruta en el Mapa',
				style: 'margin-top:5%',
				cls: 'button_1'
			},
			{
				xtype: 'button',
				id: '',
				text: 'Ver Vídeos',
				style: 'margin-top:5%',
				cls: 'button_1'
			},
			{
				xtype: 'button',
				id: '',
				text: 'Ver Errores',
				style: 'margin-top:5%',
				cls: 'button_1'
			}]
		});
		
	},
  	
  	getInfoBlock : function(){
  		
  		return {
  			html : 	'<div class="pupil-info-note bottom-shadow">' +
  					' Lorem ipsum dolor sit amet, consectetur adipiscing elit' +
  					'</div>'
  		}
  		
  		
  	}
	
});