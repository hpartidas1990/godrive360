/**
 * 
 */
Ext.define("app.view.pupils.Panel", {

	extend: 'Ext.Panel',
	
	xtype: 'pupils-panel',
	
	alias: 'pupils-panel',
	
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
			//console.log(me.getList());
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
		return '<div class="contact">{firstName} <strong>{lastName}</strong></div>';
	},
	
	getData : function(){
		
		return [
		       { firstName: 'Raúl',    lastName: 'Martinez'},
		       { firstName: 'Samuel',  lastName: 'Conran'  },
		       { firstName: 'Daniel',  lastName: 'Kaneda'  },
		       { firstName: 'Jacky',   lastName: 'Nguyen'  },
		       { firstName: 'Abraham', lastName: 'Elias'   },
		       { firstName: 'Josebas', lastName: 'Robinson'},
		       { firstName: 'Nigel',   lastName: 'White'   },
		       { firstName: 'Nico',    lastName: 'Ferrero' },
		       { firstName: 'Jesús',   lastName: 'Rocha'}
		   ];
	},
	
	getModel : function(){
		
		return Ext.define('Contact', {
		    extend: 'Ext.data.Model',
		    config: {
		        fields: ['firstName', 'lastName']
		    }
		});
	},
	
	getStore : function(){
		
		var me = this;
		var store = Ext.create('Ext.data.Store', {
			   model: me.getModel(),
			   sorters: 'lastName',

			   grouper: {
			       groupFn: function(record) {
			           return record.get('lastName')[0];
			       }
			   },

			   data: me.getData()
			});
	}
	
});