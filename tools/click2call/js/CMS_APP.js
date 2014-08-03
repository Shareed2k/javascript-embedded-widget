/**
 * Created by Roman Kredentser on 7/9/14.
 */

var CMS_APP = window.CMS_APP || {};

CMS_APP.heredoc = function(func) {
    var hd = func.toString();

    // remove { /* using a regular expression
    hd = hd.replace(/(^.*\{\s*\/\*\s*)/g, '');

    // remove */ } using a regular expression
    hd = hd.replace(/(\s*\*\/\s*\}.*)$/g, '');

    return hd;
};

CMS_APP.fileExist = function(path){
    if(path){
        var xhr;

        if(typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();
        else{
            var versions = [
                "MSXML2.XmlHttp.5.0",
                "MSXML2.XmlHttp.4.0",
                "MSXML2.XmlHttp.3.0",
                "MSXML2.XmlHttp.2.0",
                "Microsoft.XmlHttp"
            ];

            for(var i = 0, len = versions.length; i < len; i++){
                try{
                    xhr = new ActiveXObject(versions[i]);
                    break;
                }catch(e){}
            }
        }

        xhr.open('HEAD', path, false);
        xhr.send(null);

        if(xhr.status !== 200) return false;

        return true;
    }

    return false;
};

CMS_APP.loadUserParams = function(){
    if(typeof cms_param === 'undefined' || cms_param === null || !cms_param.token){
        alert('token key is missed.');
        return;
    }
    //console.log(cms_param);

    CMS_APP.param = {};

    /*default position if user is not defined it*/
    CMS_APP.param.position = 'left';
    CMS_APP.param.stylesheet = 'hmc';
    CMS_APP.param.host = CMS_APP.getLocation(CMS_APP.curScript.src).host;
    CMS_APP.param.cssPath = "http://"+CMS_APP.param.host+"/tools/click2call/css/"+CMS_APP.param.stylesheet+"/style.css";

    if(cms_param.stylesheet){
        CMS_APP.param.cssPath = "http://"+CMS_APP.param.host+"/tools/click2call/css/"+cms_param.stylesheet+"/style.css";

        if(CMS_APP.fileExist(CMS_APP.param.cssPath)){
            CMS_APP.param.stylesheet = cms_param.stylesheet;
            CMS_APP.loadCSSFile();
        }else{
            alert('style file is not exist.');
            return;
        }
    }

    if(cms_param.position){
        switch (cms_param.position){
            case 'left':
                CMS_APP.param.position = cms_param.position;
                break;
            case 'right':
                CMS_APP.param.position = cms_param.position;
                break;
        }
    }

    if (typeof CMS == 'undefined') {
        CMS_APP.loadModule('tools/click2call/js/cms.js', function(){
            CMS.initTracking();
        });
    }else{
        CMS.initTracking();
    }

    CMS_APP.checkIfJqueryLoaded();
}

CMS_APP.checkIfJqueryLoaded = function(){
    if (typeof window.jQuery === 'undefined' || window.jQuery.fn.jquery !== '2.1.1') {// || window.jQuery.fn.jquery !== '2.1.1'
        var script = document.createElement('script');
        script.type = "text/javascript";

        if (script.readyState) {
            script.onreadystatechange = function () { // For old versions of IE
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                    CMS_APP.scriptLoadHandler();
                }
            };
        } else { // Other browsers
            script.onload = function(){
                CMS_APP.scriptLoadHandler();
            }
        }

        script.src = "//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js";
        (document.getElementsByTagName('head')[0] || document.documentElement).appendChild(script);
    }else{
        CMS_APP.jQuery = window.jQuery;
        CMS_APP.main();
    }
};

CMS_APP.main = function(){
    CMS_APP.jQuery(document).ready(function() {
        CMS_APP.createForm();
        CMS_APP.manipulateForm();
    });
};

CMS_APP.scriptLoadHandler = function() {
    // Restore $ and window.jQuery to their previous values and store the
    // new jQuery in our local jQuery variable
    CMS_APP.jQuery = window.jQuery.noConflict(true);
    // Call our main function
    CMS_APP.main();
};

CMS_APP.loadModule = function(url, callback){
    var script = document.createElement('script');
    script.type = "text/javascript";

    if (script.readyState) {
        script.onreadystatechange = function () { // For old versions of IE
            if (this.readyState == 'complete' || this.readyState == 'loaded') {
                callback();
            }
        };
    } else { // Other browsers
        script.onload = function(){
            callback();
        }
    }

    script.src = url;
    (document.getElementsByTagName('head')[0] || document.documentElement).appendChild(script);
};

CMS_APP.loadCSSFile = function(){
    var css = document.createElement('link');
    var host = CMS_APP.param.host;

    css.type = "text/css";
    css.rel = "stylesheet";
    css.href = "http://"+host+"/tools/click2call/css/"+CMS_APP.param.stylesheet+"/style.css";
    (document.getElementsByTagName('head')[0] || document.documentElement).appendChild(css);
};

CMS_APP.formTemplate = function(){
    /*
     <div id="hmc-call-now-wrapper">
     <div id="hmc-call-now-section">
     <p class="hmc-call-now-maintitle">Бесплатный звонок из больницы!<img src="http://{{host}}/tools/click2call/css/x.png" id="hmc-call-now-close" title="Close"></p>
     <form id="hmc-call-now-form">
     <input id="user_phone" type="text" placeholder="Номер"><button id="hmc-call-submit-btn" type="button" >ПОЗВОНИТЕ МНЕ!</button>
     </form>
     <div id="hmc-call-now-validate">Неправильно указан номер телефона</div>
     <div id="hmc-call-now-thankyou">Спасибо! Ждите звонка</div>
     <p class="hmc-call-now-help">Примеры заполнения номера</p>
     <ul class="hmc-call-now-ul">
     <li><span class="hmc-call-now-blue">РОССИЯ:</span> +7 - код города - номер абонента</li>
     <li><span class="hmc-call-now-blue">УКРАИНА:</span> +380 - код города - номер абонента</li>
     <li><span class="hmc-call-now-blue">БЕЛАРУСЬ:</span> +375 - код города - номер абонента</li>
     <li><span class="hmc-call-now-blue">КАЗАХСТАН:</span> +7 - код города - номер абонента</li>
     </ul>
     </div>

     <div id="hmc-call-now-btn">
     <a>
     <img id="hmc-call-now-img"
     alt="Звонок с сайта"
     onmouseover="this.src = 'http://{{host}}/tools/click2call/css/{{style}}/{{position}}2.gif'"
     onmouseout="this.src = 'http://{{host}}/tools/click2call/css/{{style}}/{{position}}.gif'"
     src="http://{{host}}/tools/click2call/css/{{style}}/{{position}}.gif"
     >
     </a>
     </div>
     </div>
     */
};

CMS_APP.curScript = window.currentScript || function(){
    var scripts = window.document.getElementsByTagName('script');
    var path = '';
    if(scripts && scripts.length > 0){
        for(var i in scripts){
            if(scripts[i].src && scripts[i].src.match(/\/CMS_APP\.js($|\?.*$)/)){
                path = scripts[i];
                break;
            }
        }
    }
    return path;
}();

CMS_APP.manipulateForm = function(){
    console.log(CMS_APP.jQuery.fn.jquery);

    var wrapper = CMS_APP.jQuery('#hmc-call-now-wrapper');
    var section = CMS_APP.jQuery('#hmc-call-now-section');
    var validate_div = CMS_APP.jQuery('#hmc-call-now-validate');
    var btn = CMS_APP.jQuery('#hmc-call-now-btn');
    var submit_form_btn = CMS_APP.jQuery('#hmc-call-submit-btn');
    var c_btn = CMS_APP.jQuery("#hmc-call-now-close");
    var form = CMS_APP.jQuery('#hmc-call-now-form');
    var phone_input = CMS_APP.jQuery('#user_phone');
    var width_window = '-336px';

    wrapper.css(CMS_APP.param.position, width_window);
    section.css('float', CMS_APP.param.position);
    btn.css('float', CMS_APP.param.position);

    btn.click(function() {
        if(wrapper.css(CMS_APP.param.position) == '0px'){
            wrapper.animate((CMS_APP.param.position == 'left' ? {left:width_window} : {right:width_window}), 'linear');
        }
        else{
            wrapper.animate((CMS_APP.param.position == 'left' ? {left:'0px'} : {right:'0px'}), 'linear');
        }
    });

    c_btn.click(function() {
        wrapper.animate((CMS_APP.param.position == 'left' ? {left:width_window} : {right:width_window}), 'linear');
    });

    submit_form_btn.click(function(e){
        e.preventDefault();

        var user_phone = phone_input.val();
        var tid = CMS.readCookie('ho_tid');
        user_phone = user_phone.charAt(0) === '+' ? (user_phone.charAt(1) === '8' ? user_phone.split('+')[1] : user_phone) : (user_phone.charAt(0) === '8' ? user_phone : '+' + user_phone);

        if(user_phone.length > 5){

            var call_lead = {"call":{"phone": user_phone, "tid": tid}};
            var token = cms_param.token;

            CMS_APP.jQuery.ajax({
                url: "http://api1.medicaladvisor.com/api/v1/creates/calls",
                data: call_lead,
                type: 'POST',
                crossDomain: true,
                async: false,
                dataType: "text",
                headers: {
                    "apiKey" : token
                },
                success : function (xhr, ajaxOptions, thrownError){
                    submit_form_btn.prop('disabled', true);
                    validate_div.hide();
                    phone_input.val('');
                    CMS.eraseCookie('ho_tid');
                    CMS_APP.jQuery('#hmc-call-now-thankyou').show();
                    setTimeout(function(){
                        wrapper.animate((CMS_APP.param.position == 'left' ? {left:width_window} : {right:width_window}), 'linear');
                        form.clear();
                        CMS_APP.jQuery('#hmc-call-now-thankyou').hide();
                    },3000);
                },
                error : function (xhr, ajaxOptions, thrownError){
                    phone_input.focus();
                    validate_div.show();
                }
            });
        }else{
            phone_input.focus();
            validate_div.show();
        }
    });
};

CMS_APP.getLocation = function(url) {

    /*
     parser.href = "http://example.com:3000/pathname/?search=test#hash";

     parser.protocol; // => "http:"
     parser.host;     // => "example.com:3000"
     parser.hostname; // => "example.com"
     parser.port;     // => "3000"
     parser.pathname; // => "/pathname/"
     parser.hash;     // => "#hash"
     parser.search;   // => "?search=test"
     */

    var l = document.createElement("a");
    l.href = url;
    return l;
};

CMS_APP.queryParser = function (url){
    var params = {}, queries, temp, i, l;

    url = url.substring(url.indexOf('?')+1);

    queries = url.split("&");

    for ( i = 0, l = queries.length; i < l; i++ ) {
        temp = queries[i].split('=');
        params[temp[0]] = temp[1];
    }

    return params;
};

CMS_APP.createForm = function(){
    var host = CMS_APP.getLocation(CMS_APP.curScript.src).host;

    var data = {
        'host': host,
        'position': CMS_APP.param.position,
        'style': CMS_APP.param.stylesheet
    };

    //console.log(CMS_APP.getLocation(CMS_APP.curScript.src).search.split('?')[1]);
    //console.log(CMS_APP.queryParser(CMS_APP.getLocation(CMS_APP.curScript.src).search));

    var heredocString = CMS_APP.heredoc(CMS_APP.formTemplate);
    heredocString = heredocString.replace(/\{\{(.*?)\}\}/g, function(i, match) {
        return data[match];
    });

    var script_position = CMS_APP.curScript;
    var script_parent = script_position.parentNode;

    script_parent.innerHTML = heredocString + script_parent.innerHTML;
    //document.body.innerHTML += heredocString;
};

/* ==== main app ==== */

CMS_APP.loadUserParams();


