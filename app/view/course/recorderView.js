/**
 * 
 */
Ext.define("app.view.course.recorderView", {

	extend: 'Ext.Panel',
	xtype: 'recorder-view-panel',
	alias: 'recorder-view-panel',
	
	requires: [
          'Ext.Panel',
          'Ext.Label'
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
			
		var main = App.getController('Course').getMainView();
			main.setMasked(false);
		
		var errorBtn = Ext.create('Ext.Button', {
		    iconCls: 'new-error',
		    ui: 'round',
		    id: 'errorBtn',
		    style: 'font-size: 1em; margin: 0 10px 10px 0; position: absolute; bottom: 0; left: 10px;'
		});
		
		var stopBtn = Ext.create('Ext.Button', {
		    iconCls: 'stop2',
		    ui: 'round',
		    id: 'stopRecordBtn',
		    style: 'font-size: 1em; margin: 0 0 10px 10px; position: absolute; bottom: 0; right: 10px;'
		});
		
		me.add(errorBtn);
		me.add(stopBtn);
	}
});