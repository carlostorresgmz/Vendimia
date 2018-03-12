+function ($)
{
    var colorError = 'mdc-text-red-900';
    var colorErrorBg = 'mdc-bg-red-50';
    var colorErrorIcons = 'mdc-bg-red-900 text-white';

    $.extend(
    {
        initFormsDirectivas: function()
        {
            $('form input, textarea').each(function (index)
            {
                var item = $(this);
                if (item.is('input:text'))
                {
                    var isNumeric = item.attr("numeric");
                    var isUpper = item.attr("upper");
                    if (typeof isNumeric !== typeof undefined && isNumeric !== false && isNumeric !== null)
                    {
                        item.on("keypress", function (evt) {
                            var charCode = (evt.which) ? evt.which : evt.keyCode
                            return !(charCode > 31 && (charCode < 48 || charCode > 57));
                        });
                    }
                    else if (typeof isUpper !== typeof undefined && isUpper !== false && isUpper !== null)
                    {
                        item.css("text-transform","uppercase");
                        item.on("keyup", function (evt) {
                            item.val(item.val().toUpperCase());
                        });
                    }
                }
            });
        },
        validateFormLoginDashboard: function(options)
        {
            $("#" + options.idForm).on('submit', function (e)
            {
                var msjeError = '';

                $('#' + options.idForm + ' input, select, textarea').each(function (index)
                {                    
                    var item = $(this);
                    var isRequired = item.attr("isrequired");

                    if (item.parent().css('display') != 'none' && typeof isRequired !== typeof undefined && isRequired !== false && isRequired !== null)
                    {
                        //SELECTS
                        /*if (item.is('select'))
                        {
                            var value = item.val();
                            if (typeof value == typeof undefined || value === null || value === '')
                            {                                
                                
                            }
                        }
                        //INPUT TEXT
                        else*/
                        if (item.is('input:text'))
                        {
                            var value = item.val();
                            if (typeof value == typeof undefined || value === null || value === '')
                            {
                                msjeError = msjeError + '- ' + item.prev().text() + '<br/>'
                            }
                            else
                            {
                                var formatvalidate = item.attr("formatvalidate");
                                if (typeof formatvalidate !== typeof undefined && formatvalidate !== false && formatvalidate !== null)
                                {
                                    var resultValidation = $.validarExpresion(formatvalidate, item.val());
                                    if (!resultValidation)
                                    {                                        
                                        var msje = item.attr("validatemsje");
                                        if (typeof msje == typeof undefined || msje === null || msje == false) {
                                            var msje = "El formato es incorrecto";
                                        }

                                        msjeError = msjeError + '- ' + msje + '<br/>';
                                    }
                                }
                            }
                        }
                        //INPUT PASSWORD
                        else if (item.is('input:password'))
                        {
                            var value = item.val();
                            if (typeof value == typeof undefined || value === null || value === '')
                            {
                                msjeError = msjeError + '- ' + item.prev().text() + '<br/>'
                            }
                            else
                            {
                                var compareValue = item.attr("compareValue");
                                if (typeof compareValue !== typeof undefined && compareValue !== false && compareValue !== null)
                                {
                                    var valueAux = $("#" + compareValue).val();
                                    if(valueAux != value)
                                    {
                                        var msje = item.attr("validatemsje");
                                        if (typeof msje == typeof undefined || msje === null || msje == false) {
                                            var msje = "El valor no coincide";
                                        }
                                        msjeError = msjeError + '- ' + msje + '<br/>'
                                    }
                                }
                            }
                        }
                    }
                });

                if (msjeError == '')
                {
                    if (typeof options.callback != undefined && options.callback != 'undefined' && options.callback != null)
                    {
                        options.callback();
                        return false;
                    }
                    else {
                        //$("*", "#" + options.idForm).prop('disabled', true);
                        return true;
                    }
                }
                else
                {
                    toastr.options = {
                        "closeButton": true,
                        "positionClass": "toast-bottom-right",
                        "preventDuplicates": true,
                        "timeOut": msjeError.length * 140,
                        "hideDuration": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    };

                    toastr.options.onShown = function () {
                        $(".toast-error").css('opacity', '1.0')
                    }

                    toastr["error"](msjeError, "Campos requeridos:");
                    return false;
                }
            });
        },
        validateForm: function (options)
        {
            if (typeof options.snMsje === typeof undefined) {
                options.snMsje = true;
            }
            if (typeof options.bgColor !== typeof undefined && options.bgColor == false) {
                colorErrorBg = '';                
            }

            $("#" + options.idForm).on('submit', function (e)
            {
                e.preventDefault();
                var resultado = true;
                $('#' + options.idForm + ' input, select, textarea').each(function (index)
                {
                    var item = $(this);
                    var isRequired = item.attr("isrequired");
                    var ifRequired = item.attr("if-required");
                                        
                    if ((typeof isRequired !== typeof undefined && isRequired !== false && isRequired !== null) || typeof ifRequired != undefined && ifRequired != null && eval(ifRequired))
                    {
                        //REMOVEMOS ERRORES
                        $.eliminarErroresItemFormulario(item);

                        //SELECTS
                        if (item.is('select'))
                        {
                            var value = item.val();
                            if (typeof value == typeof undefined || value === null || value === '' || value=="undefined:undefined")
                            {    
                                var divParent = item.closest('.form-group');

                                var label = divParent.find("label");
                                if (typeof label !== typeof undefined) {
                                    label.addClass(colorError);
                                }

                                var iconAddon = divParent.find(".input-group-addon");
                                if (typeof iconAddon !== typeof undefined) {
                                    iconAddon.addClass(colorErrorIcons);
                                }

                                item.addClass("is-invalid " + colorErrorBg);
                                if (options.snMsje) {
                                    divParent.append('<label class="' + colorError + ' bold msgErrorSize-sm text-left msjeError" style="margin-left:5px; margin-right:5px;">Campo requerido</label>');
                                }
                                resultado = false;
                            }
                        }
                        //INPUT TEXT
                        else if (item.is('input:text'))
                        {
                            var value = item.val();
                        
                            if (typeof value == typeof undefined || value === null || value === '')
                            {
                                var divParent = item.closest('.form-group');

                                //LABEL
                                var label = divParent.find("label");
                                if (typeof label !== typeof undefined) {
                                    label.addClass(colorError);
                                }

                                var iconBtn = divParent.find(".input-group-btn");
                                var iconAddon = divParent.find(".input-group-addon");

                                //INPUT BUTTONS
                                if (typeof iconBtn !== typeof undefined && iconBtn.length > 0)
                                {
                                    iconBtn.find('button').each(function () {
                                        $(this).addClass(colorErrorIcons);
                                    });
                                }
                                else if (typeof iconAddon !== typeof undefined && iconAddon.length)
                                {
                                    iconAddon.addClass(colorErrorIcons);
                                }                                

                                //INPUT
                                item.addClass("is-invalid " + colorErrorBg);                                

                                if (options.snMsje){
                                    divParent.append('<label class="' + colorError + ' bold msgErrorSize-sm text-left msjeError" style="margin-left:5px; margin-right:5px;">Campo requerido</label>');
                                }
                                resultado = false;
                            }
                            else
                            {
                                var formatvalidate = item.attr("formatvalidate");
                                if (typeof formatvalidate !== typeof undefined && formatvalidate !== false && formatvalidate !== null)
                                {
                                    var resultValidation = $.validarExpresion(formatvalidate, item.val());
                                    if (!resultValidation)
                                    {
                                        var msje = item.attr("validatemsje");
                                        if (typeof msje == typeof undefined || msje === null || msje == false) {
                                            var msje = "El formato es incorrecto";
                                        }

                                        var divParent = item.closest('.form-group');

                                        var label = divParent.find("label");
                                        if (typeof label !== typeof undefined) {
                                            label.addClass(colorError);
                                        }

                                        var iconAddon = divParent.find(".input-group-addon");
                                        if (typeof iconAddon !== typeof undefined) {
                                            iconAddon.addClass(colorErrorIcons);
                                        }

                                        item.addClass("is-invalid " + colorErrorBg);

                                        divParent.append('<div class="' + colorError + ' bold msgErrorSize-sm text-left msjeError" style="margin-left:5px; margin-right:5px;">' + msje + '</div>');
                                        resultado = false;
                                    }

                                    /*var resultValidation = $.validarExpresion(formatvalidate, item.val());
                                    if (resultValidation)
                                    {
                                        var msje = item.attr("validatemsje");
                                        if (typeof msje == typeof undefined || msje === null || msje == false) {
                                            var msje = "El formato es incorrecto";
                                        }

                                        var divParent = item.closest('.form-group');

                                        var label = divParent.find("label");
                                        if (typeof label !== typeof undefined) {
                                            label.addClass(colorError);
                                        }

                                        var iconAddon = divParent.find(".input-group-addon");
                                        if (typeof iconAddon !== typeof undefined) {
                                            iconAddon.addClass(colorErrorIcons);
                                        }

                                        item.addClass("is-invalid " + colorErrorBg);

                                        divParent.append('<div class="' + colorError + ' bold msgErrorSize-sm text-left msjeError" style="margin-left:5px; margin-right:5px;">' + msje + '</div>');
                                        resultado = false;
                                    }*/
                                }
                            }

                        }
                        //INPUT PASSWORD
                        else if (item.is('input:password'))
                        {
                            var value = item.val();
                            if (typeof value == typeof undefined || value === null || value === '')
                            {
                                var divParent = item.closest('.form-group');

                                var label = divParent.find("label");
                                if (typeof label !== typeof undefined) {
                                    label.addClass(colorError);
                                }

                                var iconAddon = divParent.find(".input-group-addon");
                                if (typeof iconAddon !== typeof undefined) {
                                    iconAddon.addClass(colorErrorIcons);
                                }

                                item.addClass("is-invalid " + colorErrorBg);
                                if (options.snMsje) {
                                    divParent.append('<div class="' + colorError + ' bold msgErrorSize-sm text-left msjeError" style="margin-left:5px; margin-right:5px;">Campo requerido</div>');
                                }
                                resultado = false;
                            }
                        }
                    }
                });

                //SI NO HAY ERRORES HACEMOS SUBMIT
                if (resultado)
                {
                    if (options.callback) {
                        options.callback();
                    }
                    else {
                        $(this).off('submit').submit();
                    }                    
                }
            });

            //FOR EACH PARA ASIGNAR EVENTO ON CHANGE
            $('#' + options.idForm + ' input, select, textarea').each(function (index)
            {
                var item = $(this);
                var isRequired = item.attr("isrequired");
                var ifRequired = item.attr("if-required");

                if ((typeof isRequired !== typeof undefined && isRequired !== false && isRequired !== null) || (typeof ifRequired != undefined && ifRequired !== false && ifRequired != null))
                {
                    if (item.is('select'))
                    {
                        item.on('change', function ()
                        {
                            var value = item.val();
                            if (typeof value !== typeof undefined && value !== null && value !== '') {
                                $.eliminarErroresItemFormulario(item);
                            }                            
                        });
                    }
                    else if (item.is('input:text'))
                    {
                        item.on('keyup', function ()
                        {
                            var value = item.val();
                            if (typeof value !== typeof undefined && value !== null && value !== '') {
                                $.eliminarErroresItemFormulario(item);
                            }
                        });
                        item.on('change', function ()
                        {
                            var value = item.val();
                            if (typeof value !== typeof undefined && value !== null && value !== '') {
                                $.eliminarErroresItemFormulario(item);
                            }
                        });
                    }
                    else if (item.is('input:password'))
                    {
                        item.on('keyup', function()
                        {
                            var value = item.val();
                            if (typeof value !== typeof undefined && value !== null && value !== '') {
                                $.eliminarErroresItemFormulario(item);
                            }
                        });
                        item.on('change', function () {
                            var value = item.val();
                            if (typeof value !== typeof undefined && value !== null && value !== '') {
                                $.eliminarErroresItemFormulario(item);
                            }
                        });
                    }                    
                }
            });
        },
        eliminarErroresTodoFormulario: function(idForm)
        {
            $('#' + idForm + ' input, select, textarea').each(function (index)
            {
                var item = $(this);
                var value = item.val();                                 
                var isRequired = item.attr("isrequired");
                var ifRequired = item.attr("if-required");
                
                if (((typeof isRequired !== typeof undefined && isRequired !== false && isRequired !== null) || (typeof ifRequired != undefined && ifRequired != null && eval(ifRequired))) && (typeof value == typeof undefined || value === null || value === ''))
                {
                    $.eliminarErroresItemFormulario($(this));
                }
                
            });
        },
        eliminarErroresItemFormulario: function (item)
        {
            var divParent = item.closest('.form-group');

            var label = divParent.find("label");
            if (typeof label !== typeof undefined) {
                label.removeClass(colorError);
            }

            var iconBtn = divParent.find(".input-group-btn");
            var iconAddon = divParent.find(".input-group-addon");

            //INPUT BUTTONS
            if (typeof iconBtn !== typeof undefined && iconBtn.length > 0) {
                iconBtn.find('button').each(function () {
                    $(this).removeClass(colorErrorIcons);
                });
            }
            else if (typeof iconAddon !== typeof undefined && iconAddon.length) {
                iconAddon.removeClass(colorErrorIcons);
            }
            
            item.removeClass("is-invalid " + colorError);
            item.removeClass("is-invalid "+ colorErrorBg);

            var msje_error = divParent.find('.msjeError')[0];
            if (typeof msje_error !== typeof undefined) {
                msje_error.remove();
            }
        },
        validarExpresion: function (formato, value)
        {
            switch (formato)
            {
                case 'rfc':
                    return $.rfcValido(value);

                case 'email':
                    return $.emailValido(value);

                default: return false;
            }
        },
        rfcValido: function(rfc, aceptarGenerico) 
        {
            rfc = rfc.toUpperCase();
            if (!aceptarGenerico) aceptarGenerico = true;
            //Función para validar un RFC
            // Devuelve el RFC sin espacios ni guiones si es correcto
            // Devuelve false si es inválido
            // (debe estar en mayúsculas, guiones y espacios intermedios opcionales)
            const re = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
            var validado = rfc.match(re);

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
        },
        emailValido: function (email)
        {
            var reg = /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
            var regOficial = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                        
            if (reg.test(email) && regOficial.test(email)) {
                return true;
            } else if (reg.test(email)) {
                return true
            } else {
                return false;
            }
        }
    });

}(jQuery);
