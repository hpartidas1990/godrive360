/**
 * Crea un componente con una imagen, que funciona como botón
 * 
 * @class app.view.common.ImageButtom
 * @module view
 * @extends Ext.Panel
 * @author rbruno	<robert.bruno@sigis.com.ve>
 * @copyright Copyright (c) 2013 Soluciones Integrales GIS, C.A.
 */
Ext.define('app.view.common.ImageButton', {
    
	extend: 'Ext.Component',
	
    xtype: 'image-button',
    
    alias: 'image-button',
    
    config: {
	    minHeight : '2em',
	    
	    minWidth : '2em',
	    /**
	     * Texto del botón
	     * 
	     * @property {String} text
	     * @default null
	     */
	    text : '',
	    /**
	     * Estilo de texto que se mostrará en el botón
	     * 
	     * @property {String} textStyle 
	     * @default 'width: 100%; text-aling: center;'
	     */
	    textStyle : 'width: 100%; text-align: center; font-size: 0.8em;',
	    /**
	     * Imagen a usar en el botón
	     * 
	     * @property {String} image
	     */
	    image : '',
	    /**
	     * Url de la imagen que se usará cuando el boton esté deshabilitado.
	     * 
	     * @property {String} image
	     * @default null
	     */
	    disableImage : '',
	    /**
	     * Define el estilo de la aimgen
	     * 
	     * @property {String} imageStyle 
	     */
	    imageStyle : "height: 2em; margin: 5px 5px 5px 5px;",
	    /**
	     * Obliga a no mostrar el texto del botón
	     * 
	     * @property withoutText 
	     */
	    withoutText : false,
	    /**
	     * Estilo del botón al ser presionado
	     * 
	     * @property selectedCls
	     * @default null
	     */
	    selectedCls : ''
	},	
	/**
	 * Inicializa el componente
	 * 
	 * @method  initialize
	 */
	initialize: function() {
		
		this.callParent(arguments);
		
		Ext.applyIf(this,this.config);
		
		this._inicialize = true;
		
        if(this.image){
        	this.setImage(this.image);
        }
        
        if(this.text){
        	this.setText(this.text);
        }
        
        this.element.on({
        	scope      : this,
            touchstart        : function(){
            	if(this.selectedCls && ! this.isDisabled() ){
            		this._backcls = this.getCls();
            		this.removeCls(this._backcls);
            		this.addCls(this.selectedCls);
            		this.getBubbleTarget().fireEvent('Render');
            	}
            }
        });
        
        this.element.on({
        	scope      : this,
            touchend        : function(){
				if( this.selectedCls && this._backcls ){
					this.removeCls(this.selectedCls);
					this.addCls(this._backcls);
					this.getBubbleTarget().fireEvent('Render');
				}
            }
        });
        
        this.element.on({
        	scope      : this,
            tap        : function(e){
            	if( ! this.isDisabled()){
            		e.stopEvent();
            		this.fireEvent('tap', this, e);
            	}
            }
        });
        
        this.on({
        	scope      : this,
        	disabledchange : function( component, value, oldValue, eOpts ){
        		
        		if( this.disableImage ){
        			
        			if(value){
        				this.setImage(this.disableImage);
        				if( this.getDisabledCls() ){
        					this._backEnabledcls = this.getCls();
                    		this.removeCls(this._backEnabledcls);
                    		this.addCls(this.getDisabledCls());
        				}
        				
        				
        			}else{
        				this.setImage(this.image);
        				
        				if(this._backEnabledcls){
        					if( this.getDisabledCls() ) this.removeCls(this.getDisabledCls());
                    		this.addCls(this._backEnabledcls);
        				}
        			}
        			
        			this.fireEvent('Render');
        		}
            }
        });
        
        if(this.isDisabled()){
        	this.fireEvent('disabledchange');
        }
    },
    /**
     * Establece la imagen del botón
     * 
     * @method setImage
     * @param {string} image
     */
    setImage : function(image){
    	this.image = image;
    	this.renderButtom();
    },
    /**
     * Establece el texto del botón
     * 
     * @method setText 
     * @param {String} text
     */
    setText : function(text){
    	this.text = text;
    	this.renderButtom();
    },
    /**
     * Forza a no mostrar el texto del botón
     * 
     * @method setWithoutText
     */
    setWithoutText : function(withoutText){
    	this.withoutText = withoutText;
    },
    
    /**
     * Estabelce el contenido html del botón 
     * 
     * @method renderButtom 
     */
    renderButtom : function(){
    	if(this._inicialize){
    		var html = '<div style="text-align: center; height: 100%; width: 100%;">';
        		html +='<img src="'+this.image+'" style="'+this.imageStyle+'" />';
        	
        	if( this.text && this.withoutText == false){
        		html += '<div style="'+this.textStyle+'">'+this.text+'</div>';
        	}
        	
        	html += '</div>';
        	//console.log(html);
        	this.setHtml( html, false);
    	}
    }
});
