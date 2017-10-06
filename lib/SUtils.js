/**
 * Clase con utilidades comunes.
 * 
 * ej.:
 * 
 * 		SUtils.apply(function(){
 * 			alert("Hola");
 * 		},this);
 * 
 * @author rbruno <robert.bruno@sigis.com.ve>
 * @copyright (c) 2012 Copyright SIGIS Soluciones Integrales GIS, C.A.
 * @class SUtils
 * @module Lib
 */
SUtils = {

    /**
     * Crea una función que se ejcuta en el ámbito indicado.
     * Ej.:
     * 
     * 
     * 		SUtils.apply(function(){
     * 			alert("Hola");
     * 		},this);
     *  
     * @method apply
     * @param {function} action
     * @param {object} scope Si es null se retorna la misma function idicada por action
     * @return function
     */
    apply: function(action, scope) {

        if (typeof scope != undefined) {
            return function() {
                action.apply(scope, arguments);
            };
        }

        return action;
    },

    /**
     * Muestra un mensaje de ayuda en el contenedor indicado
     * 
     * @method showTooltip
     * @param {String} msg
     * @param {Object / String} container objecto del DOM o id del objeto
     * @param {Object} options opciones del tooltips<br/>
     * 		<br/>- autoclose	{boolean} Indica si se debe cerrar automáticamente el tooltips. (Default : true)
     * 		<br/>- closeOnClick	{boolean} Indica si se debe cerrar al hacer click sobre él. (Default : false)
     * 		<br/>- timeToClose	{boolean} Indica el tiempo en segundos que dura el tooltip en cerrarse en caso de ser "autoclose". (Default : 4)
     * 		<br/>- remplaces {object} Campos a remplazar en el texto del tootlips 
     *	
     *  		SUtils.showTooltip('hola {username}!', 'div', {
     *  			autoclose : true,
     *  			closeOnClick : true,
     *  			timeToClose : 6,
     *  			replace : { 
     *  				username : 'Robert Bruno'
     *  			}
     *  		});
     */
    showTooltip: function(msg, container, options) {
        var autoclose = !options ? true : typeof options.autoclose == 'undefined' ? true : options.autoclose;
        var closeOnClick = !options ? false : typeof options.closeOnClick == 'undefined' ? false : options.closeOnClick;
        var timeToClose = !options ? 4 : typeof options.timeToClose == 'undefined' ? 4 : options.timeToClose;

        if (this.tooltip) {
            this.hideTooltip(false, true);
        }

        if (!this.tooltip) {
            var tt = document.createElement('div');

            if (options) {
                var replaceFields = options.replace;
                if (replaceFields) {
                    for (var field in replaceFields) {
                        msg = msg.replace('{' + field + '}', replaceFields[field]);
                    }
                }
            }

            this.parentTootips = typeof(container) == "object" ? container : document.getElementById(container);
            tt.setAttribute('class', 'tootip');
            tt.innerHTML = msg;

            if (closeOnClick) {
                autoclose = false;
                tt.addEventListener('click', function() {
                    SUtils.hideTooltip(false, false);
                }, false);
            }

            this.parentTootips.appendChild(tt);
            this.tooltip = tt;

            if (autoclose) {

                if (this._showingTooltips) {
                    this._showingTooltips = window.clearTimeout(this._showingTooltips);
                }

                this._showingTooltips = window.setTimeout(SUtils.apply(
                    function() {
                        if (this._backTooltips) {
                            SUtils.showTooltip(this._backTooltips.msg, this._backTooltips.container, this._backTooltips.options);
                        } else {
                            SUtils.hideTooltip(true);
                        }
                    },
                    this), 1000 * timeToClose);

            } else if (autoclose == false) {
                this._backTooltips = { 'msg': msg, 'container': container, 'options': options };
            }
        }
    },

    /**
     * Esconde el mensaje de ayuda creado con el método showTooltip
     * 
     * @method hideTooltip
     */
    hideTooltip: function(byAutoClose, byRemplace) {
        if (this.tooltip) {
            this.parentTootips.removeChild(this.tooltip);
            delete this.tooltip;
        }

        if (this._backTooltips && !byAutoClose && !byRemplace) {
            this._backTooltips = null;
        }
    },

    /**
     * Reemplaza todas la ocurrencias por la cadena indicada
     * 
     * @method replaceAll 
     * @param {String} text
     * @param {String} busca
     * @param {String} reemplaza
     * @returns {String}
     */
    replaceAll: function(text, busca, reemplaza) {
        while (text.toString().indexOf(busca) != -1)
            text = text.toString().replace(busca, reemplaza);
        return text;
    },

    /**
     * Elimina los espacios en blaco antes y despues de la cadena indicada
     * 
     * @method trim
     * @param {String} cadena
     * @return {String} cadea sin espacios
     */
    trim: function(cadena) {
        return cadena.replace(/^\s+/g, '').replace(/\s+$/g, '');
    },

    /**
     * Retorna el texcto sin etiquetas html de un código html
     * 
     * @method getTextFromHtml
     * @param {string} html
     * @return string
     */
    getTextFromHtml: function(html) {
        var div = document.createElement("div");
        var result = null;

        div.innerHTML = html;
        result = div.textContent ? div.textContent : null;

        if (!result) {
            result = html.replace(/<[^>]*>/g, "");
        }

        result = SUtils.replaceAll(result, ".", " ");
        result = SUtils.replaceAll(result, ":", " ");
        return result;
    },

    /**
     * Filtra los datos de un array para retornar un array solocon los campos inicados
     * 
     * @method filterArray
     * @param {array} listado con los datos a procesar
     * @param {object} campos a procesar 
     * @param {function} función para analizar si se agrega un capo o no
     */
    filterArray: function(data, fields, validate) {
        var result = new Array();
        var isvalid = undefined;

        if (data.arrayData || data.fields) {
            fields = data.fields;
            validate = data.validate;
            data = data.arrayData;
        }

        isvalid = validate ? validate : isvalid;

        for (var i = 0; i < data.length; i++) {
            var obj = {};

            for (var f in fields) {
                if (isvalid == undefined || (isvalid && isvalid(data[i]))) {
                    if (typeof fields[f] == "function" || typeof fields[f] == "object") {
                        obj[f] = fields[f](data[i]);
                    } else if (data[i][fields[f]]) {
                        obj[f] = data[i][fields[f]];
                    } else {
                        obj[f] = fields[f];
                    }
                } else {
                    obj.dirty = true;
                }
            }

            if (!obj.dirty) {
                result.push(obj);
            }

        }

        return result;
    },

    /**
     * Retorna una array con todo los parámetors indicados, en caso de se array se hace un merge de los mismos
     * 
     * @method mergeArray 
     */
    mergeArray: function() {
        var result = new Array();

        if (arguments) {
            for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] != 'object') {
                    result.push(arguments[i]);
                } else {
                    for (var j = 0; j < arguments[i].length; j++) {
                        result.push(arguments[i][j]);
                    }
                }
            }
        }

        return result;
    },

    /**
     * OBtiene el offset del elemento indicado 
     * @method getOffset 
     */
    getOffset: function(el) {
        var _x = 0;
        var _y = 0;
        while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }
        return { top: _y, left: _x };
    },
    /**
     * Envia un log a la aplicación
     * 
     * @method log
     * @param {string} msg mensaje del log
     */
    log: function(msg, type) {
        var date = new Date();

        if (console) {
            if (!type) {
                type = "log";
            }

            try {
                msg = JSON.stringify(msg);
            } catch (e) {}

            if (typeof msg == "string") {
                console[type](date.toUTCString() + " " + msg);
            } else {
                console[type](msg);
            }

        }
    },
    /**
     * Suma x cantidad de metros a una coordenada.
     * 
     * @param {LatLng} latLng
     * @param  {Number} meters
     * @returns LatLng
     */
    moveCoordinatesByMeters: function(latLng, meters) {
        var m = [meters, meters];
        var pi = Math.PI;
        //RAdio de la tierra
        var R = 6378137;
        var lat = latLng[0] || latLng.lat;
        var lng = latLng[1] || latLng.lng;

        //Coordenadas a radiantes
        var dLat = m[0] / R;
        var dLng = m[1] / (R * Math.cos(pi * lat / 180));

        //a grados
        lat = lat + (dLat * 180 / pi);
        lng = lng + (dLng * 180 / pi);

        return [lat, lng];
    },

    /**
     * visualiza/oculta el boton superior de opciones para layer
     * este se visualiza en la view de mapas
     * 
     * @param {viewName} id de la vista en la cual esta cambiando la app
     * 
     */
    toggleOptionLayerBtn: function(viewName) {
        (viewName === 'map' || viewName === 'map_detail' ||
            viewName == "puntosInteresListaItemMap" || viewName == "onAAddPuntoBtnTapMap" ||
            viewName == "onNotificacionesListPanelItemTapMap") ?
        Ext.getCmp("btnOpenLayerOption").setHidden(false):
            Ext.getCmp("btnOpenLayerOption").setHidden(true)

    },

    /**
     * abre un dialogo y modifica el local storage con la opcion ya prevista
     * @param {funtion} callback(param) para hacer post operaciones luego de guardar las especificaciones
     *                           del nuevo tipo de layer en las configuraciones internas de la app y su parametro 
     *                           es el tipo de mapa pulsado en la ultimo evento del dialogo si es null este param 
     *                            que devuelvo por el callback se debe revisar ya que hubo un error;
     *                           La variable buttonIndex denota el boton pulsado en el dialogo para el tenemos
     *                              1 - Mapa sigis 
     *                              2 - Trafico
     */
    showDialogTypeMap: function(callback) {

        var options = {
            androidTheme: window.plugins.actionsheet.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT, // material
            title: App.extFn().t('change_type_layer_map'),
            buttonLabels: [App.extFn().t('map_sigis'), App.extFn().t('traffic')],
            addCancelButtonWithLabel: App.extFn().t('cancelar'),
            androidEnableCancelButton: true,
            destructiveButtonLast: true
        };
        window.plugins.actionsheet.show(options, function(buttonIndex) {

            var optionMap = null;
            // 1 para mapa sigis; 2 para trafico
            if (buttonIndex == 1) {
                optionMap = "sigis";
            } else if (buttonIndex == 2) {
                optionMap = "trafico";
            }
            App.extFn().setLocalData({ "map.layer": optionMap });
            window.plugins.actionsheet.hide();

            if (callback !== undefined && callback !== null && typeof callback === "function") {
                callback(optionMap);
            } else {
                console.warn("El callback para showDialogType map debe ser de tipo funtion");
            }

        });
    },

    /**
     * Cambia el layer del mapa en a aplicacion
     *  @method changeLayerMap
     *  @param {L.map} map referencia del mapa de la vista
     */
    changeLayerMap: function(map) {
        var me = this;
        var sigisLayer = null;

        //remuevo solo las layer de map  evito eliminar marcadores y cosas asi
        map.eachLayer(function(layer) {
            if (layer.options.layers !== undefined) {
                map.removeLayer(layer);
            }
        });

        if (App.extFn().getLocalData("map.layer") == 'trafico') {
            baseLayer = L.tileLayer.wms(Config.URL_GEOSERVER, {
                layers: 'BaseMap:BaseMapGray',
                format: 'image/png',
                uwm: 1,
                wmo: 2,
                ugs: 1,
                ci: 1,
                cil: 1,
                version: '1.1.1',
                cache: 1
            });

            trafficLayer = L.tileLayer.wms(Config.URL_TRAFFIC, {
                layers: 'anatra:trafico',
                format: 'image/png',
                transparent: true,
                format: 'image/png',
                version: '1.1.1'
            });

            map.addLayer(baseLayer);
            map.addLayer(trafficLayer);

        } else {

            var sigisLayer = L.tileLayer.wms(Config.URL_GEOSERVER, {
                //layers: 'BDEAS:SIGIS-WMS',
                layers: 'BaseMap:BaseMap',
                format: 'image/png'
            });

            map.addLayer(sigisLayer);
        }
    }
};
