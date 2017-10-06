/**
 * 
 */
Ext.define('app.controller.User', {
	
	extend: 'Ext.app.Controller',
	
	requires: [
		'app.view.Main',
		'app.view.user.LoginPanel'
	],
	
	config: {
		
		refs: {
			main: '#main',
			loginBtn: '#loginBtn'
		},
		
		control: {
			
			loginBtn : {
				tap : 'onLoginBtnTap'
			}
		}
		
	},
	
	onLoginBtnTap : function(){
		
		Ext.Viewport.setMasked({	
    	    xtype: 'loadmask',
    	    message:  Config.LOADING_TEXT
    	});
		
		setTimeout(function(){
			App.showMainView();
			Ext.Viewport.setMasked(false);
		}, 2000);
	}
});