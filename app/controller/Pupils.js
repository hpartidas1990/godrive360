/**
 * 
 * 
 */
Ext.define('app.controller.Pupils', {
	
	extend: 'Ext.app.Controller',
	
	requires: [
		'app.view.pupils.Panel',
		'app.view.pupils.detailPupil'
	],
	
	config: {
		
		refs: {
			mainView: '#main',
			pupilsList: 'pupils-panel list',
			detailPupil: 'detai-pupil-panel'
		},
		
		control: {
			pupilsList : {
				itemtap : 'onPupilsListItemTap'
			}
		}
	},
	
	onPupilsListItemTap : function(list, index, target, record, e, eOpts){
		var me = this;
		var data = record.getData();
			me.showPupilDetail(data);
	},
	
	showPupilDetail : function(data){
	
		var me = this;
		var main = me.getMainView();
			main.push(Ext.create('detai-pupil-panel', {
				data : data
			}))
	}
	
	
});



