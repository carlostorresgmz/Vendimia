(function () {
    angular.module("fnc", ['session.settings'])
    //.factory("fnc", ["$rootScope", "$http","layout", function($rootScope, $http, layout){
    .factory("fnc", ["$rootScope", "$http", "$location", "layout", "session", function ($rootScope, $http, $location, layout, session) {

        $rootScope.__httpStack = [];        

        var fnc =
		{
		    component:{
			    config: {			    	
			        loading: true			        
			    },
			    error: function (title, error, status, headers, config)
			    {
			        $rootScope.__httpStack.pop();                    

			        if (fnc.component.message) 
			        {
			            if (!title || !error)
			            {
			                title = "Error desconocido";
			                error = "Error desconocido"
			            }
                        
			            fnc.component.message(title, error);
                    }
			        else {
			        	fnc.component.message('Aviso', 'Error en componente');
			        }
			    },			    
			    php: function (controller, action, parameters, next, callback)
			    {		        		        
			        var url = session.url_path + "/backend/controladores/proxy.php?hash" + (new Date()).getTime();
			        var snError = false;
			        
			        var config = {
			            component: controller,
			            func: action,
			            data: parameters || {}
			        };                 

			        if (fnc.component.config.loading) {
			            $rootScope.__httpStack.push(1);
			        }

			        $http.post(url, config)
                    .then(function (response)
                    {
                    	if (!response.data.error)
                        {
                            if (next) next(response.data.data);                            
                        }
                        else
                        {
                            snError = true;
                            if (fnc.component.showDetail) {
                                fnc.component.error(response.data.errorTitle, response.data.errorDetail, response.status, response.headers, response.config);
                            } else {
                                fnc.component.error(response.data.errorTitle, response.data.error, response.status, response.headers, response.config);
                            }
                        }

                        fnc.component.config.loading = true;
                        $rootScope.__httpStack.pop();

                        if (callback) callback(snError);
                    }, function (response)
                    {
                    	fnc.component.error("Error en el servidor", "Intente de nuevo", null, null, null);

                        fnc.component.config.loading = true;
                        $rootScope.__httpStack.pop();
                        if (callback) callback(true);
                    });
			    },
			    message: function (title, error)
			    {
			        layout.message.error(title, error);
			    },
			    showDetail: false,
			},
		    redirectPost: function (location, args, isBlank)
		    {
		   		var form = $('<form id="formsubmit"/>');
		   		form.attr('method', 'post');
		   		form.attr('action', location);
                                
		   		if (isBlank){
		   		    form.attr('target', '_blank');
		   		}

		        if (args && args != null) {
		            $.each(args, function (key, value) {
		                var input = $('<input/>');
		                input.attr('type', 'hidden');
		                input.attr('name', key);
		                input.attr('id', key);
		                input.attr('value', value);
		                form.append(input);
		            });
		        }

		        form.appendTo('body').submit();
		    },
		    index: function (arrayObject) {
		        for (var i = 0; i < arrayObject.length; i++) {
		            arrayObject[i].index = i;
		        };
		        return arrayObject;
		    },
		    date: {
		        format: function( date, format ){
		            var formated;
		            switch( format ){
		                case "DD/MM/YYYY":
		                    var DD = fnc.string.right( "0", date.getDate(), 2 );
		                    var MM = fnc.string.right( "0", date.getMonth() + 1, 2 );
		                    var YY = date.getFullYear();
		                    formated = DD + "/" + MM + "/" + YY;							
		                    break;
		                case "MM-DD-YYYY":
		                    var DD = fnc.string.right( "0", date.getDate(), 2 );
		                    var MM = fnc.string.right( "0", date.getMonth() + 1, 2 );
		                    var YY = date.getFullYear();
		                    formated = [MM, DD, YY].join('-');
		                    break;
		                case "YYYY-MM-DD":
		                    var DD = fnc.string.right( "0", date.getDate(), 2 );
		                    var MM = fnc.string.right( "0", date.getMonth() + 1, 2 );
		                    var YY = date.getFullYear();
		                    formated = [YY, MM, DD].join('-');
		                    break;
		                default:
		                    formated = date;
		                    break;
		            }
		            return formated;
		        },
		        weekNumber: function( date ){
		            var d = new Date(+date);
		            d.setHours(0,0,0);
		            d.setDate(d.getDate()+4-(d.getDay()||7));
		            return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
		        },
		        weekRange: function( date ){
		            // Obtener el numero de la semana
		            var weekNumber = this.weekNumber(date);
		            // Calcular el prime dia de la semana
		            var first = date.getDate() - (date.getDay() -1); // First day is the day of the month - the day of the week
		            // Calcular el ultimo día de la semana
		            var last = first + 6; // last day is the first day + 6
		            // Generar primer fecha de la semana
		            var firstDay = new Date(date.setDate(first));
		            // Generar ultima fecha de la semana
		            var lastDay = new Date(date.setDate(last));
					
		            return {
		                weekNumber: weekNumber,
		                firstDay: firstDay,
		                lastDay: lastDay
		            };
		        },
		        daydiff: function(date1, date2){
		            return Math.round((date2-date1)/(1000*60*60*24));
		        }
		    },
		    time: {
		        cronometro: function(strtime)
		        {
		            var data;
		            var hours = strtime.substring(0, 2)
		                , minutes = strtime.substring(3,5)
		                , seconds = strtime.substring(6, 8);

		            seconds = parseInt(seconds) + 1;

		            if (seconds > 59)
		            {
		                seconds = "00";
		                minutes = parseInt(minutes) + 1;
		            }
		            else if (seconds < 10){
		                
		            }

		            if (minutes > 59) {
		                minutes = "00";
		                hours = parseInt(hours) + 1;
		            }

		            seconds = parseInt(seconds) < 10 ? "0" + parseInt(seconds) : seconds;
		            minutes = parseInt(minutes) < 10 ? "0" + parseInt(minutes) : minutes;
		            hours = parseInt(hours) < 10 ? "0" + parseInt(hours) : hours;
		          
		            data = hours + ":" + minutes + ":" + seconds;                     
		            return data;
		        },

		        format: function(datetime, format, sn24)
		        {
		            if (!sn24){
		                sn24 = true;
		            }

		            var data;
		            switch (format)
		            {
		                case "hh:mm:ss tt":
		                    
		                    var seconds = datetime.getSeconds()
		                        , minutes = datetime.getMinutes()
		                        , hours = datetime.getHours();

		                    var ampm = (hours > 11) ? "PM" : "AM";
		                    if (sn24 && hours > 12){
		                        hours = hours - 12;
		                    }

		                    hours = (hours < 10) ? "0" + hours : hours;
		                    minutes = (minutes < 10) ? "0" + minutes : minutes;
		                    seconds = (seconds < 10) ? "0" + seconds : seconds;                            
                            		                    
		                    data = hours + ":" + minutes + ":" + seconds + " " + ampm;
		                    break;
		            }

		            return data;
		        },
		        timediff: function(time1, time2, format)
		        {
		            var data;
		            switch(format)
		            {
		                case "hh:mm:ss":
		                    duration = time1 - time2;

		                    var  seconds = parseInt((duration / 1000) % 60)
                                , minutes = parseInt((duration / (1000 * 60)) % 60)
                                , hours = parseInt((duration / (1000 * 60 * 60)) % 24);

		                    hours = (hours < 10) ? "0" + hours : hours;
		                    minutes = (minutes < 10) ? "0" + minutes : minutes;
		                    seconds = (seconds < 10) ? "0" + seconds : seconds;

		                    data = hours + ":" + minutes + ":" + seconds;
		                    break;
		            }

		            return data;
		        }
		    },
		    local: {
		        clear: function (key) {
		            localStorage.removeItem(key);
		        },
		        get: function (key) {
		            if (localStorage[key]) {
		                return JSON.parse(localStorage.getItem(key));		                
		            }
		            else {
		                return undefined;
		            }
		        },
		        getObject: function (key) {
		            if (localStorage[key]) {
		                return JSON.parse(localStorage.getItem(key));
		            }
		            else {
		                return undefined;
		            }
		        },
		        set: function (key, value) {
		            localStorage.setItem(key, value);
		        },
		        setObject: function (key, object) {
		            localStorage.setItem(key, JSON.stringify(object));
		        }
		    },
		    isNull: function (value, tipo, validateEmpty)
		    {
		        if (!validateEmpty) {
		            validateEmpty = true;
		        }
		        if (!tipo) {
		            tipo = "string";
		        }

		        switch(tipo)
		        {
		            case "string": return typeof value == undefined || value == 'undefined' || value == null || (validateEmpty && value.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, '').replace(/\s+/g, ' ') == '');
		            case "array": return typeof value == undefined || value == 'undefined' || value == null || (validateEmpty && value.length == 0);
		            case "object": return typeof value == undefined || value == 'undefined' || value == null || (validateEmpty && Object.keys(value).length == 0);
		        }	        
		        
		    },
		    string: {
		        right: function( left, string, counter ){
		            string = (left + string);
		            return string.substring( string.length - counter, string.length);
		        }
		    },
		    rfcValido: function (rfc, aceptarGenerico) {
		        var rfcValido = false;
		        if (!aceptarGenerico) aceptarGenerico = true;
                
		        // patron del RFC, persona moral
		        const _rfc_pattern_pm = "^(([A-ZÑ&]{3})([0-9]{2})([0][13578]|[1][02])(([0][1-9]|[12][\\d])|[3][01])([A-Z0-9]{3}))|" +
                                  "(([A-ZÑ&]{3})([0-9]{2})([0][13456789]|[1][012])(([0][1-9]|[12][\\d])|[3][0])([A-Z0-9]{3}))|" +
                                  "(([A-ZÑ&]{3})([02468][048]|[13579][26])[0][2]([0][1-9]|[12][\\d])([A-Z0-9]{3}))|" +
                                  "(([A-ZÑ&]{3})([0-9]{2})[0][2]([0][1-9]|[1][0-9]|[2][0-8])([A-Z0-9]{3}))$";

		        // patron del RFC, persona fisica
		        const _rfc_pattern_pf = "^(([A-ZÑ&]{4})([0-9]{2})([0][13578]|[1][02])(([0][1-9]|[12][\\d])|[3][01])([A-Z0-9]{3}))|" +
                                      "(([A-ZÑ&]{4})([0-9]{2})([0][13456789]|[1][012])(([0][1-9]|[12][\\d])|[3][0])([A-Z0-9]{3}))|" +
                                      "(([A-ZÑ&]{4})([02468][048]|[13579][26])[0][2]([0][1-9]|[12][\\d])([A-Z0-9]{3}))|" +
                                      "(([A-ZÑ&]{4})([0-9]{2})[0][2]([0][1-9]|[1][0-9]|[2][0-8])([A-Z0-9]{3}))$";

                if (rfc.match(_rfc_pattern_pm) || rfc.match(_rfc_pattern_pf)) {
		            rfcValido = true;
		        }

		        // Es un RFC Genérico (ventas a público general)?
		        if (aceptarGenerico) {
		            var rfcGenerico_PublicoGeneral = 'XAXX010101000';
		            var rfcGenerico_ClienteExtranjero = 'XEXX010101000';
		            if (rfc == rfcGenerico_PublicoGeneral || rfc == rfcGenerico_ClienteExtranjero)
		                rfcValido = true;
		        }
		        
		        return rfcValido;
		    },
		    datetime: {
		        format: function(mask)
		        {
		            var currentTime = new Date();		            
		            switch(mask)
		            {
		                case 'HH:mm':
		                    return currentTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
		                    break;

		                case 'hh:mm':
		                    return currentTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false });
		                    break;
		            }
		        }
		    },
		    formatNumber: function (num, places, symbol, thousand, decimal) 
		    {
		    	places = !isNaN(places = Math.abs(places)) ? places : 2;
		        symbol = symbol !== undefined ? symbol : "$";
		        thousand = (thousand === undefined) ? "" : thousand;
		        decimal = decimal || ".";

		        var number = num;
		        var negative = number < 0 ? "-" : "";
		        var i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "";		        
		        var j = (j = i.length) > 3 ? j % 3 : 0;
			        return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");

		    	/*places = !isNaN(places = Math.abs(places)) ? places : 2;
		        symbol = symbol !== undefined ? symbol : "$";
		        thousand = (thousand === undefined) ? "" : thousand;
		        decimal = decimal || ".";

		        var number = num;
		        var negative = number < 0 ? "-" : "";
		        
		        var i = "";
		        if(recalculate)
		        {
		        	i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "";
		        }
		        else
		        {
		        	i = number + "";
		        	arrNumber = i.split(".");

		        	if(arrNumber.length > 1)
		        	{
		        		partDecimals =  i.split(".")[1];
			        	if(partDecimals < 10){
			        		i = number.toFixed(2) + "";
			        	}
		        	}
		        	else{
		        		i = number.toFixed(2) + "";
		        	}
		        }		        
		        
		        var j = (j = i.length) > 3 ? j % 3 : 0;
		        return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");*/
		    },
		    pad: function(value, max)
		    {
		    	var  value = value.toString();
			    while(value.length < max){
			    	value = "0" + value;
			    }

			    return value;
		    }
		};

        return fnc;
    }]);
    /*}]).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
	}]);*/
}());