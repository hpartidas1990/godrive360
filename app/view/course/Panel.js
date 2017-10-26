/**
 * 
 */
Ext.define("app.view.course.Panel", {

	extend: 'Ext.Panel',
	
	xtype: 'course-panel',
	
	alias: 'course-panel',
	
	requires: [
          'Ext.Panel',
          'Ext.Label',
          'Ext.Button'
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
		
		var button = Ext.create('Ext.Button', {
		    iconCls: 'car',
		    iconAlign:'center',
		    padding: 0,
		    ui: 'action',
		    iconAlign:'center',
		    id: 'recordBtn',
		    style: 'width: 60%; min-height: 164px; font-size: 2.8em; margin: 18% auto 5% auto; color: #ae0653;'
		});
		
		me.add(button);
		me.add({
		    xtype: 'label',
		    cls: 'label-text'
		});
		me.add(me.getInfoBlock());
	},
  	
  	getInfoBlock : function(){
  		
  		return {
  			html : 	'<div class="info-note bottom-shadow">' +
  					'	Toca el botón para iniciar el registro de vídeo y recorrido.' +
  					'</div>'
  		}
  		
  		
  	}
	
});