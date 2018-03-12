(function () {
    angular.module('layout', [])
	.factory('layout', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
	    $rootScope.__confirm = {};
	    
	    //return {	        
	    var layoutParent = {
	        message:
            {
                config: {
                    infinite: false,
                    timeout: 140
                },
                clear: function(){
                    toastr.clear();
                },
	            success: function (title, msje)
	            {
	                toastr.options = {
	                    "closeButton": true,
	                    "positionClass": "toast-bottom-right",
	                    "preventDuplicates": true,	                    
	                    "hideDuration": "1000",
	                    "showEasing": "swing",
	                    "hideEasing": "linear",
	                    "showMethod": "fadeIn",
	                    "hideMethod": "fadeOut"
	                };

	                if(layoutParent.message.config.infinite)
	                {
	                    toastr.options.timeOut = 0;
	                    toastr.options.extendedTimeOut = 0;
	                }
                    else
	                {
	                    toastr.options.timeOut = msje.length * layoutParent.message.config.timeout;
	                }	                                                    

	                toastr.options.onShown = function () {
	                    $(".toast-success").css('opacity', '1.0')
	                }

	                toastr.success(msje, title);
	                layoutParent.message.config.infinite = false;
	            },
	            error:  function (title, msje)
	            {
	                toastr.options = {
	                    "closeButton": true,
	                    "positionClass": "toast-bottom-right",
	                    "preventDuplicates": true,	                    
	                    "hideDuration": "1000",
	                    "showEasing": "swing",
	                    "hideEasing": "linear",
	                    "showMethod": "fadeIn",
	                    "hideMethod": "fadeOut"
	                };

	                if(layoutParent.message.config.infinite)
	                {
	                    toastr.options.timeOut = 0;
	                    toastr.options.extendedTimeOut = 0;
	                }
	                else
	                {
	                    toastr.options.timeOut = msje.length * layoutParent.message.config.timeout;
	                }	                                                    

	                toastr.options.onShown = function () {
	                    $(".toast-error").css('opacity', '1.0')
	                }

	                toastr.error(msje, title);
	                layoutParent.message.config.infinite = false;
	            },
	            info: function (title, msje) {
	                toastr.options = {
	                    "closeButton": true,
	                    "positionClass": "toast-bottom-right",
	                    "preventDuplicates": true,
	                    "hideDuration": "1000",
	                    "showEasing": "swing",
	                    "hideEasing": "linear",
	                    "showMethod": "fadeIn",
	                    "hideMethod": "fadeOut"
	                };

	                if (layoutParent.message.config.infinite) {
	                    toastr.options.timeOut = 0;
	                    toastr.options.extendedTimeOut = 0;
	                }
	                else {
	                    toastr.options.timeOut = msje.length * layoutParent.message.config.timeout;
	                }

	                toastr.options.onShown = function () {
	                    $(".toast-info").css('opacity', '1.0')
	                }

	                toastr.info(msje, title);
	                layoutParent.message.config.infinite = false;
	            },
	            warning: function (title, msje) {
	                toastr.options = {
	                    "closeButton": true,
	                    "positionClass": "toast-bottom-right",
	                    "preventDuplicates": true,
	                    "hideDuration": "1000",
	                    "showEasing": "swing",
	                    "hideEasing": "linear",
	                    "showMethod": "fadeIn",
	                    "hideMethod": "fadeOut"
	                };

	                if (layoutParent.message.config.infinite) {
	                    toastr.options.timeOut = 0;
	                    toastr.options.extendedTimeOut = 0;
	                }
	                else {
	                    toastr.options.timeOut = msje.length * layoutParent.message.config.timeout;
	                }

	                toastr.options.onShown = function () {
	                    $(".toast-warning").css('opacity', '1.0')
	                }

	                toastr.warning(msje, title);
	                layoutParent.message.config.infinite = false;
	            },
	            confirm: {
	                cancelCallback: function (callback) {
	                    $rootScope.__confirm.cancelCallback = function () {
	                        $('#modalConfirmacion').remove();
	                        if (callback) {
	                            callback();
	                        }
	                    };
	                    return this;
	                },
	              /*  close: function () {
	                    $('.modalConfirmacion').remove();

	                    if (this.cancelCallback)
	                        this.cancelCallback();
	                },*/
	                description: function (description) {
	                    $rootScope.__confirm.description = description;
	                    return this;
	                },
	                icon: function (icon) {
	                    $rootScope.__confirm.icon = icon;
	                    return this;
	                },
	                snCancel: function (bandera) {
	                    $rootScope.__confirm.snCancel = bandera;
	                    return this;
	                },
	                descriptionConfirmAction: function (str) {
	                    $rootScope.__confirm.descokconfirm = str;
	                    return this;
	                },
	                next: function (next) {
	                    $rootScope.__confirm.next = function () {
	                        $('.modalConfirmacion').remove();
	                        next();
	                    };
	                    return this;
	                },
	                open: function (icon, title, description, next, cancelCallback) {
	                    this.icon(icon);
	                    this.title(title);
	                    this.description(description);
	                    this.snCancel(true);
	                    this.descriptionConfirmAction('Si');
	                    this.next(next);
	                    this.cancelCallback(cancelCallback);
	                    this.show();
	                },
	                openOnlyAceptar: function (icon, title, description, next) {
	                    this.icon(icon);
	                    this.title(title);
	                    this.description(description);
	                    this.snCancel(false);
	                    this.descriptionConfirmAction('Aceptar');
	                    this.next(next);
	                    this.show();
	                },
	                show: function () {
	                    $rootScope.__confirm.close = this.close;
	                    
	                    $('body').append('<div id="modalConfirmacion" class="modalConfirmacion"><div class="center modalConfirmacionContenido text-white">' +
                            '<i class="icon ' + $rootScope.__confirm.icon + ' icon-huge"></i><p class="h4">' + $rootScope.__confirm.title + '</p>' +
                            '<p class="h6 mt-4">' + $rootScope.__confirm.description + '</p><div class="text-right mt-5">' +
                            '<button type="button" class="btn btn-outline-danger cancelModalConfirm" style="cursor: pointer;"><i class="icon ion-android-close mr-3"></i>No</button>' +
                            '<button type="button" class="btn btn-outline-success ml-3 successModalConfirm" style="cursor: pointer;"><i class="icon ion-android-done mr-3"></i>Si</button>' +
                            '</div></div></div>').hide().fadeIn(400);

	                    $('.successModalConfirm').bind('click', $rootScope.__confirm.next);
	                    $('.cancelModalConfirm').bind('click', $rootScope.__confirm.cancelCallback);
	                },
	                title: function (title) {
	                    $rootScope.__confirm.title = title;
	                    return this;
	                }
	            }
	        },
	        Administrativo:
            {
                /*handlerLimpiarErroresFormulario: function (selector)
                {
                    var colorItem = '#ced4da';
                    var colorLabel = '#212529';
                    var colorItemBG = "#fff";

                    $('#' + selector + ' input, select, textarea').each(function (index)
                    {
                        var item = $(this);
                        var isRequired = item.attr("isrequired");
                        var ifRequired = item.attr("if-required");

                        if ((typeof isRequired !== typeof undefined && isRequired !== false && isRequired !== null) || typeof ifRequired != undefined && ifRequired != null)//&& eval(ifRequired)
                        {
                            var parent = item.closest('.form-group');
                            var labels = (typeof parent == undefined || parent == null) ? null : parent.find('label');

                            if (item.is('select'))
                            {
                                item.on('change', function ()
                                {
                                    var value = item.val();
                                    if (typeof value != typeof undefined && value != 'undefined' && value != 'undefined:undefined' && value != null && value != '') {
                                        layoutParent.Administrativo.setColorsItemFormulario(labels, colorLabel, item, colorItem, colorItemBG);
                                    }
                                });
                            }
                            else if (item.is('input:text'))
                            {
                                item.on('keyup', function ()
                                {
                                    var value = item.val();
                                    if (typeof value !== typeof undefined && value !== null && value !== '') {
                                        layoutParent.Administrativo.setColorsItemFormulario(labels, colorLabel, item, colorItem, colorItemBG);
                                    }
                                });
                                item.on('change', function ()
                                {
                                    var value = item.val();
                                    if (typeof value !== typeof undefined && value !== null && value !== '') {
                                        layoutParent.Administrativo.setColorsItemFormulario(labels, colorLabel, item, colorItem, colorItemBG);
                                    }
                                });
                            }
                            else if (item.is('input:password'))
                            {
                                item.on('keyup', function ()
                                {
                                    var value = item.val();
                                    if (typeof value !== typeof undefined && value !== null && value !== '') {
                                        layoutParent.Administrativo.setColorsItemFormulario(labels, colorLabel, item, colorItem, colorItemBG);
                                    }
                                });
                                item.on('change', function ()
                                {
                                    var value = item.val();
                                    if (typeof value !== typeof undefined && value !== null && value !== '') {
                                        layoutParent.Administrativo.setColorsItemFormulario(labels, colorLabel, item, colorItem, colorItemBG);
                                    }
                                });
                            }
                        }
                    });
                },
                setColorsItemFormulario: function (labels, labelcolor, item, itemcolor, itemColorBG)
                {
                    if (typeof labels != undefined && labels != null && labels.length > 0)
                    {
                        labels[0].style.color = labelcolor;

                        if (typeof $(".msjeErrorFormat") != undefined && $(".msjeErrorFormat") != 'undefined' && $(".msjeErrorFormat") != null) {
                            $(".msjeErrorFormat").remove();
                        }
                    }

                    $(item).css('border', '1px solid ' + itemcolor);
                    $(item).css('color', "#212121");
                    $(item).css('background', itemColorBG);
                },
                eliminarErroresTodoFormulario: function (idFormulario)
                {
                    setTimeout(function ()
                    {
                        var colorItem = '#212121';
                        var colorLabel = '#212529';
                        var colorItemBG = '#fff';

                        $('#' + idFormulario + ' input, select, textarea').each(function (index)
                        {
                            var item = $(this);
                            var isRequired = item.attr("isrequired");
                            var ifRequired = item.attr("if-required");

                            if ((typeof isRequired != typeof undefined && isRequired != false && isRequired != null) || typeof ifRequired != undefined && ifRequired != null)
                            {
                                var parent = item.closest('.form-group');
                                var labels = (typeof parent == undefined || parent == null) ? null : parent.find('label');

                                var value = item.val();
                                if (typeof value != typeof undefined && value != 'undefined' && value != 'undefined:undefined' && value != null && value != '') {
                                    layoutParent.Dashboard.setColorsItemFormulario(labels, colorLabel, item, colorItem, colorItemBG);
                                }
                            }
                        });
                    }, 100);
                },*/
                validarFormulario: function (idFormulario)
                {
                    /*var colorError = '#b71c1c';
                    var colorErrorBG = '#ffcdd2';*/
                    var resultadoBandera = true;

                    $('#' + idFormulario + ' input, select, textarea').each(function (index)
                    {
                        var item = $(this);
                        var isRequired = item.attr("isrequired");
                        var ifRequired = item.attr("if-required");
                        
                        if ((typeof isRequired !== typeof undefined && isRequired !== false && isRequired !== null) || typeof ifRequired != undefined && ifRequired != null && eval(ifRequired))
                        {
                            var parent = item.closest('.form-group');
                            var labels = (typeof parent == undefined || parent == null) ? null : parent.find('label');
                            
                            if (item.is('select'))
                            {
                                var value = item.val();
                                if (typeof value == undefined || value == 'undefined' || value == 'undefined:undefined' || value == null || value == '')
                                {
                                    //layoutParent.Administrativo.setColorsItemFormulario(labels, colorError, item, colorError, colorErrorBG);
                                    layoutParent.message.error('No es posible continuar', 'El campo "' + labels.text() + '" es obligatorio');
                                    resultadoBandera = false;
                                    return false;
                                }
                            }
                            else if (item.is('input:text'))
                            {
                                var value = item.val();
                                if (typeof value == undefined || value == 'undefined' || value == null || value == '')
                                {
                                    //layoutParent.Administrativo.setColorsItemFormulario(labels, colorError, item, colorError, colorErrorBG);
                                    layoutParent.message.error('No es posible continuar', 'El campo "' + labels.text() + '" es obligatorio');
                                    resultadoBandera = false;
                                    return false;
                                }
                                else
                                {
                                    var formatvalidate = item.attr("formatvalidate");
                                    if (typeof formatvalidate != typeof undefined && formatvalidate != 'undefined' && formatvalidate != false && formatvalidate != null)
                                    {                                    	
                                        var resultValidation = layoutParent.validarFormato(formatvalidate, item.val());
                                        if (!resultValidation)
                                        {
                                            var msje = item.attr("validatemsje");
                                            if (typeof msje == typeof undefined || msje == 'undefined' || msje === null || msje == false) {
                                                var msje = 'El formato del campo "' + labels.text()+ '" es incorrecto';
                                            }

                                            layoutParent.message.error('No es posible continuar', msje);

                                            /*layoutParent.Administrativo.setColorsItemFormulario(labels, colorError, item, colorError, colorErrorBG);
                                            setTimeout(function () {
                                                parent.append('<label class="bold mt-2 mdc-text-red-900 msjeErrorFormat">' + msje + '</label>');
                                            }, 0);*/
                                            
                                            resultadoBandera = false;
                                            return false;
                                        }
                                    }
                                }
                            }
                            else if (item.is('input:password'))
                            {
                                var value = item.val();
                                if (typeof value == undefined || value == 'undefined' || value == null || value == '')
                                {
                                    //layoutParent.Administrativo.setColorsItemFormulario(labels, colorError, item, colorError, colorErrorBG);
                                    layoutParent.message.error('No es posible continuar', 'El campo "' + labels.text() + '" es obligatorio');
                                    resultadoBandera = false;
                                    return false;
                                }
                                else
                                {
                                    var compareValue = item.attr("compareValue");
                                    if (typeof compareValue != typeof undefined && compareValue != 'undefined' && compareValue != false && compareValue != null)
                                    {
                                        var valueAux = $("#" + compareValue).val();
                                        if (valueAux != value)
                                        {
                                            var msje = item.attr("validatemsje");
                                            if (typeof msje == typeof undefined || msje == 'undefined' || msje === null || msje == false) {
                                                var msje = "El valor no coincide";
                                            }
                                            
                                            /*layoutParent.Administrativo.setColorsItemFormulario(labels, colorError, item, colorError, colorErrorBG);
                                            setTimeout(function () {
                                                parent.append('<label class="bold mt-2 mdc-text-red-900 msjeErrorFormat">' + msje + '</label>');
                                            }, 0);*/
                                            resultadoBandera = false;
                                            return false;
                                        }
                                    }
                                }
                            }
                        }
                    });

                    return resultadoBandera;
                },
                modal:
                {
                    handlerLimpiarErroresModal: function (selector)
                    {
                        var contenido = document.getElementById(selector).getElementsByClassName('contenidomodal');

                        //VALIDAMOS EL DIV CONTENT DEL MODAL
                        if (contenido == undefined || contenido == 'undefined' || contenido == null || contenido.length == 0) {
                            contenido = document.getElementById(selector).getElementsByClassName('content');
                            if (contenido == undefined || contenido == 'undefined' || contenido == null || contenido.length == 0) {
                                console.log('contenido indefinido dentro del modal');
                                return;
                            }
                        }

                        var colorItem = '#ced4da';
                        var colorLabel = '#212529';
                        var colorItemBG = "#fff";

                        $('#' + selector + ' input, select, textarea').each(function (index) {
                            var item = $(this);
                            var required = item.attr("required");

                            if ((typeof required !== typeof undefined && required !== false && required !== null))//|| (typeof ifRequired != undefined && ifRequired !== false && ifRequired != null)
                            {
                                var parent = item.closest('.form-group');
                                var labels = (typeof parent == undefined || parent == null) ? null : parent.find('label');

                                if (item.is('select')) {
                                    item.on('change', function ()
                                    {
                                        var value = item.val();
                                        if (typeof value != typeof undefined && value != 'undefined' && value != 'undefined:undefined' && value != null && value != '') {
                                            layoutParent.Administrativo.modal.setColorsItemModalFormulario(labels, colorLabel, item, colorItem, colorItemBG);
                                        }
                                    });
                                }
                               /* else if (item.is('input:text')) {
                                    item.on('keyup', function () {
                                        var value = item.val();
                                        if (typeof value !== typeof undefined && value !== null && value !== '') {
                                            layoutParent.modal.setColorsItemModalFormulario(labels, colorLabel, item, colorItem);
                                        }
                                    });
                                    item.on('change', function () {
                                        var value = item.val();
                                        if (typeof value !== typeof undefined && value !== null && value !== '') {
                                            layoutParent.modal.setColorsItemModalFormulario(labels, colorLabel, item, colorItem);
                                        }
                                    });
                                }
                                else if (item.is('input:password')) {
                                    item.on('keyup', function () {
                                        var value = item.val();
                                        if (typeof value !== typeof undefined && value !== null && value !== '') {
                                            layoutParent.modal.setColorsItemModalFormulario(labels, colorLabel, item, colorItem);
                                        }
                                    });
                                    item.on('change', function () {
                                        var value = item.val();
                                        if (typeof value !== typeof undefined && value !== null && value !== '') {
                                            layoutParent.modal.setColorsItemModalFormulario(labels, colorLabel, item, colorItem);
                                        }
                                    });
                                }*/
                            }
                        });
                    },
                    setColorsItemModalFormulario: function (labels, labelcolor, item, itemcolor, itemColorBG)
                    {
                        if (typeof labels != undefined && labels != null && labels.length > 0)
                        {
                            labels[0].style.color = labelcolor;
                            if (typeof $(".msjeErrorFormat") != undefined && $(".msjeErrorFormat") != 'undefined' && $(".msjeErrorFormat") != null) {
                                $(".msjeErrorFormat").remove();
                            }
                        }

                        $(item).css('border', '1px solid ' + itemcolor);
                        $(item).css('color', "#212121");
                        $(item).css('background', itemColorBG);
                    },
                    validarModal: function (selector, msjeError, scopeItem)
                    {
                        var resultadoBandera = true;
                        var contenido = $("#" + selector).find('.contenidomodal');

                        //VALIDAMOS EL DIV CONTENT DEL MODAL
                        if (contenido == undefined || contenido == 'undefined' || contenido == null || contenido.length == 0) {
                            contenido = document.getElementById(selector).getElementsByClassName('content');
                            if (contenido == undefined || contenido == 'undefined' || contenido == null || contenido.length == 0) {
                                console.log('contenido indefinido dentro del modal');
                                return false;
                            }
                        }

                        //SI NO VIENE EL PARAMETRO, PONEMOS MENSAJE DEFAULT					
                        if (msjeError == undefined || msjeError == null) {
                            msjeError = 'Campo requerido';
                        }

                        var colorError = '#b71c1c';
                        var colorErrorBG = '#ffcdd2';
                        var resultadoBandera = true;

                        contenido.find('input, select, textarea').each(function (index)
                        {
                            var item = $(this);
                            var required = item.attr("required");
                            var disabled = item.attr('disabled');

                            if ((typeof required !== typeof undefined && required !== false && required !== null) && disabled == null)//|| (typeof ifRequired != undefined && ifRequired !== false && ifRequired != null)
                            {
                                var parent = item.closest('.form-group');
                                var labels = (typeof parent == undefined || parent == null) ? null : parent.find('label');

                                if (item.is('select'))
                                {
                                    var value = item.val();
                                    if (typeof value == undefined || value == 'undefined' || value == 'undefined:undefined' || value == null || value == '')
                                    {
                                        layoutParent.Administrativo.modal.setColorsItemModalFormulario(labels, colorError, item, colorError, colorErrorBG);
                                        resultadoBandera = false;
                                    }
                                }
                                /*else if (item.is('input:text')) {
                                    var value = item.val();
                                    if (typeof value == undefined || value == 'undefined' || value == null || value == '') {
                                        layoutParent.modal.setColorsItemModalFormulario(labels, colorError, item, colorError);
                                        resultadoBandera = false;
                                    }
                                    else {
                                        var formatvalidate = item.attr("formatvalidate");
                                        if (typeof formatvalidate != typeof undefined && formatvalidate != 'undefined' && formatvalidate != false && formatvalidate != null) {
                                            var resultValidation = layoutParent.validarFormato(formatvalidate, item.val());
                                            if (!resultValidation) {
                                                var msje = item.attr("validatemsje");
                                                if (typeof msje == typeof undefined || msje === null || msje == false) {
                                                    var msje = "El Formato es incorrecto";
                                                }

                                                layoutParent.modal.setColorsItemModalFormulario(labels, colorError, item, colorError);
                                                setTimeout(function () {
                                                    parent.append('<label class="bold mt-2 mdc-text-red-900 msjeErrorFormat">' + msje + '</label>');
                                                }, 0);
                                                resultadoBandera = false;
                                            }
                                        }
                                    }
                                }
                                else if (item.is('input:password')) {
                                    var value = item.val();
                                    if (typeof value == undefined || value == 'undefined' || value == null || value == '') {
                                        layoutParent.setColorsItemModalFormulario(labels, colorError, item, colorError);
                                        resultadoBandera = false;
                                    }
                                }*/
                            }
                        });

                        return resultadoBandera;
                    }
                }
            },	       
	        modal: 
            {
                handlerLimpiarErroresModal: function (selector)
                {
                    var contenido = document.getElementById(selector).getElementsByClassName('contenidomodal');

                    //VALIDAMOS EL DIV CONTENT DEL MODAL
                    if (contenido == undefined || contenido == 'undefined' || contenido == null || contenido.length == 0)
                    {
                        contenido = document.getElementById(selector).getElementsByClassName('content');
                        if (contenido == undefined || contenido == 'undefined' || contenido == null || contenido.length == 0)
                        {
                            console.log('contenido indefinido dentro del modal');
                            return;
                        }
                    }

                    var colorItem = '#212121';
                    var colorLabel = '#212529';

                    $('#' + selector + ' input, select, textarea').each(function (index)
                    {
                        var item = $(this);
                        var required = item.attr("required");

                        if ((typeof required !== typeof undefined && required !== false && required !== null))//|| (typeof ifRequired != undefined && ifRequired !== false && ifRequired != null)
                        {
                            var parent = item.closest('.form-group');
                            var labels = (typeof parent == undefined || parent == null) ? null : parent.find('label');

                            if (item.is('select'))
                            {
                                item.on('change', function ()
                                {
                                    var value = item.val();
                                    if (typeof value !== typeof undefined && value !== null && value !== '') {                                        
                                        layoutParent.modal.setColorsItemModalFormulario(labels, colorLabel, item, colorItem);
                                    }
                                });
                            }
                            else if (item.is('input:text'))
                            {
                                item.on('keyup', function ()
                                {
                                    var value = item.val();
                                    if (typeof value !== typeof undefined && value !== null && value !== '') {
                                        layoutParent.modal.setColorsItemModalFormulario(labels, colorLabel, item, colorItem);
                                    }
                                });
                                item.on('change', function ()
                                {
                                    var value = item.val();
                                    if (typeof value !== typeof undefined && value !== null && value !== '') {
                                        layoutParent.modal.setColorsItemModalFormulario(labels, colorLabel, item, colorItem);
                                    }
                                });
                            }
                            else if (item.is('input:password'))
                            {
                                item.on('keyup', function () {
                                    var value = item.val();
                                    if (typeof value !== typeof undefined && value !== null && value !== '') {
                                        layoutParent.modal.setColorsItemModalFormulario(labels, colorLabel, item, colorItem);
                                    }
                                });
                                item.on('change', function ()
                                {
                                    var value = item.val();
                                    if (typeof value !== typeof undefined && value !== null && value !== '') {
                                        layoutParent.modal.setColorsItemModalFormulario(labels, colorLabel, item, colorItem);
                                    }
                                });
                            }
                        }
                    });
                },
                setColorsItemModalFormulario: function (labels, labelcolor, item, itemcolor)
                {
                    if (typeof labels != undefined && labels != null && labels.length > 0) 
                    {
                        labels[0].style.color = labelcolor;

                        if (typeof $(".msjeErrorFormat") != undefined && $(".msjeErrorFormat") != 'undefined' && $(".msjeErrorFormat") != null)
                        {
                            $(".msjeErrorFormat").remove();
                        }
                    }

                    $(item).css('border', '1px solid ' + itemcolor);
                    $(item).css('color', itemcolor);
                    $(item).css('background', 'transparent');
                },
	            validarModal: function (selector, msjeError, scopeItem)
	            {
	                var resultadoBandera = true;
	                var contenido = $("#"+selector).find('.contenidomodal');
                    
	                //VALIDAMOS EL DIV CONTENT DEL MODAL
	                if (contenido == undefined || contenido == 'undefined' || contenido == null || contenido.length == 0)
                    {
	                    contenido = document.getElementById(selector).getElementsByClassName('content');
	                    if (contenido == undefined || contenido == 'undefined' || contenido == null || contenido.length == 0)
	                    {
	                        console.log('contenido indefinido dentro del modal');
	                        return false;
	                    }
	                }

	                //SI NO VIENE EL PARAMETRO, PONEMOS MENSAJE DEFAULT					
	                if (msjeError == undefined || msjeError == null) {
	                    msjeError = 'Campo requerido';
	                }
                    
	                var colorError = '#b71c1c';
	                contenido.find('input, select, textarea').each(function (index)
	                {
	                    var item = $(this);
	                    var required = item.attr("required");
	                    var disabled = item.attr('disabled');
                        
	                    if ((typeof required !== typeof undefined && required !== false && required !== null) && disabled == null)//|| (typeof ifRequired != undefined && ifRequired !== false && ifRequired != null)
	                    {	                        
	                        var parent = item.closest('.form-group');
	                        var labels = (typeof parent == undefined || parent == null) ? null : parent.find('label');

	                        if (item.is('select'))
	                        {
	                            var value = item.val();
	                            if (typeof value == undefined || value == 'undefined' || value == null || value == '')
	                            {	                                
	                                layoutParent.modal.setColorsItemModalFormulario(labels, colorError, item, colorError);
	                                resultadoBandera = false;
	                            }
	                        }
	                        else if (item.is('input:text'))
	                        {
	                            var value = item.val();
	                            if (typeof value == undefined || value == 'undefined' || value == null || value == '')
	                            {
	                                layoutParent.modal.setColorsItemModalFormulario(labels, colorError, item, colorError);
	                                resultadoBandera = false;
	                            }
	                            else
	                            {
	                                var formatvalidate = item.attr("formatvalidate");
	                                if (typeof formatvalidate != typeof undefined && formatvalidate != 'undefined' && formatvalidate != false && formatvalidate != null)
	                                {
	                                    var resultValidation = layoutParent.validarFormato(formatvalidate, item.val());
	                                    if (!resultValidation)
	                                    {
	                                        var msje = item.attr("validatemsje");
	                                        if (typeof msje == typeof undefined || msje === null || msje == false) {
	                                            var msje = "El Formato es incorrecto";
	                                        }
	                                        
	                                        layoutParent.modal.setColorsItemModalFormulario(labels, colorError, item, colorError);
	                                        setTimeout(function () {
	                                            parent.append('<label class="bold mt-2 mdc-text-red-900 msjeErrorFormat">' + msje + '</label>');
	                                        }, 0);	                                        
	                                        resultadoBandera = false;
	                                    }
	                                }
	                            }
	                        }
	                        else if (item.is('input:password'))
	                        {
	                            var value = item.val();
	                            if (typeof value == undefined || value == 'undefined' || value == null || value == '')
	                            {
	                                layoutParent.setColorsItemModalFormulario(labels, colorError, item, colorError);
	                                resultadoBandera = false;
	                            }
	                        }               
	                    }
	                });
                    	
                    return resultadoBandera;
	            }
            },
	        pikaday:
			{
			    setDate: function(ObjPikaday, strFecha)
			    {
			        var arrFecha = strFecha.split('-');//Convertimos fecha en arreglo
			        arrFecha[2] = arrFecha[2].replace(/^0+/, '');//Eliminamos el cero a la izquierda del día de la fecha
			        ObjPikaday.setDate(new Date(arrFecha));
			    }
			},
	        validarFormato: function (formato, value)
	        {
	            switch (formato)
	            {
	                case 'email':
	                    var reg = /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
	                    var regOficial = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

	                    if (reg.test(value) && regOficial.test(value)) {
	                        return true;
	                    } else if (reg.test(value)) {
	                        return true
	                    } else {
	                        return false;
	                    }                        

	                case 'rfc':
	                    value = value.toUpperCase();
	                    aceptarGenerico = true;
	                    //Función para validar un RFC
	                    // Devuelve el RFC sin espacios ni guiones si es correcto
	                    // Devuelve false si es inválido
	                    // (debe estar en mayúsculas, guiones y espacios intermedios opcionales)
	                    const re = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
	                    var validado = value.match(re);

	                    if (!validado)  //Coincide con el formato general del regex?
	                        return false;

	                    //Separar el dígito verificador del resto del RFC
	                    const digitoVerificador = validado.pop(),
                              rfcSinDigito = validado.slice(1).join(''),
                              len = rfcSinDigito.length,

                        //Obtener el digito esperado
                              diccionario = "0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ",
                              indice = len + 1;
	                    var suma,
                              digitoEsperado;

	                    if (len == 12) suma = 0
	                    else suma = 481; //Ajuste para persona moral

	                    for (var i = 0; i < len; i++)
	                        suma += diccionario.indexOf(rfcSinDigito.charAt(i)) * (indice - i);
	                    digitoEsperado = 11 - suma % 11;
	                    if (digitoEsperado == 11) digitoEsperado = 0;
	                    else if (digitoEsperado == 10) digitoEsperado = "A";

	                    //El dígito verificador coincide con el esperado?
	                    // o es un RFC Genérico (ventas a público general)?
	                    if ((digitoVerificador != digitoEsperado)
                         && (!aceptarGenerico || rfcSinDigito + digitoVerificador != "XAXX010101000"))
	                        return false;
	                    else if (!aceptarGenerico && rfcSinDigito + digitoVerificador == "XEXX010101000")
	                        return false;
	                    return rfcSinDigito + digitoVerificador;
	                    break;

	                default: return false;
	            }
	        },
            validaEmail: function (email) {
	            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	            return re.test(email);
            },
            notificarVentanaNavegador: function (oldTitle, msg) {
                var timeoutId = false;

                var blink = function () {
                    document.title = document.title == msg ? oldTitle : msg;//Modify Title in case a popup
                    if (document.hasFocus())//Stop blinking and restore the Application Title
                    {
                        document.title = oldTitle;
                        clearInterval(timeoutId);
                    }
                };

                if (!timeoutId) {
                    timeoutId = setInterval(blink, 500);//Initiate the Blink Call
                };//Blink logic 
            },
            playSound: function (url)
            {
	            var audio = document.createElement('audio');
	            audio.style.display = "none";
	            audio.src = url;
	            audio.autoplay = true;
	            audio.onended = function(){
	                audio.remove() //Remove when played.
	            };
	            document.body.appendChild(audio);
	        }
	    };

	    return layoutParent;
	}])
        	
	.directive('allowPattern', function () {
	    //ALPHA ONLY <input type="text" allow-pattern="[a-z]" />
	    //NUMBER ONLY <input type="text" allow-pattern="\d" />
	    //ALPHANUMERIC ONLY <input type="text" allow-pattern="(\d|[a-z])" />
	    //WHITESPACE CHARACTERS ONLY <input type="text" allow-pattern="\W" />
	    return {
	        restrict: "A",
	        compile: function (tElement, tAttrs) {
	            return function (scope, element, attrs) {
	                // I handle key events
	                element.bind("keypress", function (event) {
	                    var keyCode = event.which || event.keyCode; // I safely get the keyCode pressed from the event.
	                    var keyCodeChar = String.fromCharCode(keyCode); // I determine the char from the keyCode.

	                    // If the keyCode char does not match the allowed Regex Pattern, then don't allow the input into the field.
	                    if (!keyCodeChar.match(new RegExp(attrs.allowPattern, "i"))) {
	                        event.preventDefault();
	                        return false;
	                    }

	                });
	            };
	        }
	    };
	})

	.directive('numeric', function () {
	    return {
	        restrict: 'A',
	        require: 'ngModel',
	        link: function ($scope, elem, attrs, ngModelCtrl) {

	            $scope.fromUsers = function (text) {
	                if (text) {
	                    var transformedInput = text.replace(/[^0-9]/g, '');

	                    if (transformedInput !== text) {
	                        ngModelCtrl.$setViewValue(transformedInput);
	                        ngModelCtrl.$render();
	                    }
	                    return transformedInput;
	                }
	                return undefined;
	            };
	            ngModelCtrl.$parsers.push($scope.fromUsers);
	        }
	    }
	})

	.directive('autoFocus', function ($timeout) {
	    return {
	        restrict: 'AC',
	        link: function (_scope, _element) {
	            $timeout(function () {
	                _element[0].focus();
	            }, 0);
	        }
	    };
	})

	.directive('capitalize', function () {
	    return {
	        require: 'ngModel',
	        link: function (scope, element, attrs, modelCtrl) {
	            if (!modelCtrl) {
	                return;
	            }

	            var capitalize = function (inputValue) {
	                if (inputValue == undefined) inputValue = '';
	                //var capitalized = inputValue.replace(/\b\w/g, l => l.toUpperCase());
	                var capitalized = inputValue.toLowerCase().replace(/(^|\s)[a-z\u00E0-\u00FC]/g, a => a.toUpperCase());
	                

	                if (capitalized !== inputValue) {
	                    modelCtrl.$setViewValue(capitalized);
	                    modelCtrl.$render();
	                }

	                return capitalized;
	            }

	            modelCtrl.$parsers.push(capitalize);
	            capitalize(scope[attrs.ngModel]); // capitalize initial value
	            element.css("text-transform", "capitalize");
	        }
	    };
	})

	.directive('upper', function () {
	    return {
	        require: 'ngModel',
	        link: function (scope, element, attrs, modelCtrl)
	        {
	            /*modelCtrl.$parsers.push(function (input)
	            {
	                if (input)	                
	                {
	                    var newText = input.replace(/[`~!@#$%^&*()|+\=÷¿?'´"<>\{\}\[\]\\\/]/gi, '');
	                    console.log(newText);
	                    return newText.toUpperCase();
	                }
	                else {
	                    return "";
	                }
	            });

	            element.css("text-transform", "uppercase");*/

	            if (!modelCtrl) {
	                return;
	            }

	            var capitalize = function (inputValue)
	            {

	                if (inputValue == undefined) inputValue = '';

	                //var newText = inputValue.replace(/[`~!@#$%^&*()|+\=÷¿?'´"<>\{\}\[\]\\\/]/gi, '');
	                var capitalized = inputValue.toUpperCase();
		
	                if (capitalized !== inputValue) {
	                    modelCtrl.$setViewValue(capitalized);
	                    modelCtrl.$render();
	                }

	                return capitalized;
	            }

	            modelCtrl.$parsers.push(capitalize);
	            capitalize(scope[attrs.ngModel]);
	            element.css("text-transform", "uppercase");
	        }
	    };
	})

	.directive('decimal', function () {
	    return {
	        restrict: 'A',
	        require: 'ngModel',
	        link: function (scope, elem, attr, ngModel) {
	            if (attr.nudecimales == undefined || attr.nudecimales == null || attr.nudecimales == '') {
	                attr.nudecimales = 2;
	            }

	            ngModel.$parsers.push(function (inputValue) {
	                if (typeof inputValue === 'undefined' || inputValue === '') {
	                    return '';
	                }
	                else {
	                    // Break when is empty
	                    //inputValue = inputValue.replace(/\./,"#").replace(/\./g,"").replace(/#/,".");
	                    if (inputValue == undefined || inputValue == '') return '';
	                    var lastChar = inputValue[inputValue.length - 1];
	                    var newValue = inputValue;

	                    if (isNaN(lastChar) && lastChar != '.') {
	                        newValue = inputValue.slice(0, -1);
	                    }
	                    else if (inputValue.indexOf('.') != -1) {
	                        if (lastChar == '.' && inputValue.split('.').length > parseInt(attr.nudecimales))
	                            newValue = inputValue.slice(0, -1);
	                        else if (inputValue.split('.')[0].length == 0) {
	                            newValue = '0' + inputValue;
	                        } else {
	                            var position = attr.float != '' && !isNaN(attr.float) ? attr.float : attr.nudecimales;
	                            if (inputValue.split('.')[1].length > position)
	                                newValue = inputValue.slice(0, -1);
	                        }
	                    }

	                    if (newValue != inputValue) {
	                        ngModel.$setViewValue(newValue);
	                        ngModel.$render();
	                    }

	                    if (newValue.match(/^-?\d+(\.\d+)?$/)) {
	                        return newValue;
	                    }
	                    else {
	                        newValue = newValue.replace(/\./, "#").replace(/\./g, "").replace(/#/, ".");
	                        return newValue;
	                    }
	                }
	            });
	        }
	    };
	})

	//This directive allows us to pass a function in on an enter key to do what we want.
	.directive('ngEnter', function () {
	    return function (scope, element, attrs) {
	        element.bind("keydown keypress", function (event) {
	            if (event.which === 13) {
	                scope.$apply(function () {
	                    scope.$eval(attrs.ngEnter);
	                });

	                event.preventDefault();
	            }
	        });
	    };
	});
})();
