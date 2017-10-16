/**
 * 
 */
Ext.define("app.view.course.saveCourseView", {

	extend: 'Ext.Panel',
	
	xtype: 'save-course-panel',
	
	alias: 'save-course-panel',
	
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
		var main = Ext.getCmp('main');
			
			me.callParent(arguments);
			me.add(me.getOptionPanel());
			
			main.getNavigationBar().addBeforeListener('back',me.beforeBack,me);
	},
	
	getOptionPanel : function(){
		
		return Ext.create('Ext.Panel', {
			layout: 'vbox',
			flex: 1,
			margin: '12% 8%',
			padding: '5%',
			style: 'background-color: #fff;',
			items : [
			{
				html: '<div style=".8em; text-align: center; margin-bottom: 8%;">¿Qué acción desea realizar ahora?</div>',
			},
			{
				xtype: 'button',
				text: 'Marcar Error',
				id: 'markErrorBtn',
				style: 'margin-top:5%',
				cls: 'button_1'
			},
			{
				xtype: 'button',
				text: 'Reanudar Recorrido',
				id: 'resumeCourseBtn',
				style: 'margin-top:5%',
				cls: 'button_1'
			},
			{
				xtype: 'button',
				id: 'endRecordingBtn',
				text: 'Finalizar Recorrido',
				style: 'margin-top:25%',
				cls: 'button_2'
			}]
		});
	},
	
	 /**
     * Evento que se dispara antes del back
     * @method beforeBack
     */
    beforeBack: function(){
        
        var me = this;
        var main = Ext.getCmp('main');
        var geo = App.getController("Geolocation");
        var course = App.getController("Course");

        if(main.getActiveItem().getXTypes().indexOf('save-course-panel') >= 0){
            App.extFn().confirm('Los datos del recorrido se perderán. ¿Ésta seguro que desea ir atrás?',function(){
                main.onBackButtonTap();
                main.getNavigationBar().removeBeforeListener('back',me.beforeBack,me);
            });
        }else{
        	App.extFn().setLocalData({'current_route_end_timestamp': moment().format()});
        	course._captureActive = true;
			geo.stopPositionCapture();
            main.pop();
        }

        return false;
    }
	
});
