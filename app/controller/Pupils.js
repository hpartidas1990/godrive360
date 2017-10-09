/**
 * 
 * 
 */
Ext.define('app.controller.Pupils', {
	
	extend: 'Ext.app.Controller',
	
	requires: [
		'app.view.pupils.Panel'
	],
	
	config: {
		
		refs: {
			mainView: '#main',
			pupilsList: 'pupils-panel list'
		},
		
		control: {
			pupilsList : {
				itemtap : 'onPupilsListItemTap'
			}
		}
	},
	
	onPupilsListItemTap : function(list, index, target, record, e, eOpts){
		console.log(record.getData());
	} 
	
	
});



