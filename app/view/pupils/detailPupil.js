/**
 * 
 */
Ext.define("app.view.pupils.detailPupil", {

	extend: 'Ext.Panel',
	
	xtype: 'detai-pupil-panel',
	
	alias: 'detai-pupil-panel',
	
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
		
		
		me.add({
			html : ["<div class='pupil-detail-photo-container'><img src='resources/images/imagen_bg_usuario300.jpg' class='pupil-detail-photo' /></div>"].join()
		});
		
		me.add({
		    xtype: 'label',
		    cls: 'label-text',
		    html: '<div class="pupil-name">' + data.firstName + ' ' + data.lastName + '</div>'
		});
		me.add(me.getInfoBlock());
	},
  	
  	getInfoBlock : function(){
  		
  		return {
  			html : 	'<div class="pupil-info-note bottom-shadow">' +
  					' Lorem ipsum dolor sit amet, consectetur adipiscing elit' +
  					'</div>'
  		}
  		
  		
  	}
	
});