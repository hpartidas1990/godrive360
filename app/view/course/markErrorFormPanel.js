/**
 * 
 */
Ext.define("app.view.course.markErrorFormPanel", {

	extend: 'Ext.Panel',
	
	xtype: 'markerror-form-panel',
	
	alias: 'markerror-form-panel',
	
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
			me.add(me.getFormPanel());
			
			Ext.getCmp("btnSendError").setHidden(false);
	},
	
	getFormPanel : function(){
		
		return Ext.create('Ext.form.Panel', {
		    flex: 1,
		    items: [
		        {
		            xtype: 'fieldset',
		            items: [
		                {
		                    xtype: 'textareafield',
		                    placeHolder: 'Describa a continuación el error cometido por el alumno...',
		                    maxRows: 8,
		                    name: 'error_desc'
		                }
		            ]
		        }
		    ]
		});
		
	}
	
});
