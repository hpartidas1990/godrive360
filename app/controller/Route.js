/**
 * 
 * 
 */
Ext.define('app.controller.Route', {
	
	extend: 'Ext.app.Controller',
	
	requires: [
		"app.view.routes.Panel",
		"app.view.routes.routeDetailPanel"
	],
	
	config: {
		
		refs: {
			mainView: '#main',
			routePanel: 'routes-panel',
			routeList: 'routes-panel list'
		},
		
		control: {
			routeList : {
				itemtap : 'onRouteListItemTap'
			}
		}
	},
	
	onRouteListItemTap : function(list, index, target, record, e, eOpts){
		var me = this;
			me.goToRouteDetail(record.getData());
	},
	
	goToRouteDetail : function(data){
		
		var me = this;
		var main = me.getMainView();
		
			main.push(Ext.create('route-detail-panel', {
				title : data.route_title,
				data : data
			}));
		
	}
	
	
});



