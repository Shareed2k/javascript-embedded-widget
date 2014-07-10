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

CMS_APP.checkIfJqueryLoaded = function(){
    if (typeof window.jQuery === 'undefined' || window.jQuery.fn.jquery !== '2.1.0') {// || window.jQuery.fn.jquery !== '2.1.1'
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

        script.src = "//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js";
        (document.getElementsByTagName('head')[0] || document.documentElement).appendChild(script);
    }else{
        CMS_APP.jQuery = window.jQuery;
        CMS_APP.main();
    }
};

CMS_APP.main = function(){
    CMS_APP.jQuery(document).ready(function() {
        CMS_APP.url_queries = CMS_APP.queryParser(CMS_APP.getLocation(CMS_APP.curScript.src).search);
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
    var host = CMS_APP.getLocation(CMS_APP.curScript.src).host;

    css.type = "text/css";
    css.rel = "stylesheet";
    css.href = "http://"+host+"/css/hmc_call_now_style.css";
    (document.getElementsByTagName('head')[0] || document.documentElement).appendChild(css);
};

CMS_APP.formTemplate = function(){
    /*
    <div id="hmc-call-now-wrapper">
        <div id="hmc-call-now-section">
            <p class="hmc-call-now-maintitle">Бесплатный звонок из больницы!<img src="http://{{host}}/css/x.png" id="hmc-call-now-close" title="Close"></p>
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
                onmouseover="this.src = 'http://{{host}}/css/{{position}}2.gif'"
                onmouseout="this.src = 'http://{{host}}/css/{{position}}.gif'"
                src="http://{{host}}/css/{{position}}.gif"
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
    var c2c_position_win = 'left';
    var width_window = '-336px';

    if(CMS_APP.url_queries['position'] !== 'undefined'){
        c2c_position_win = CMS_APP.url_queries['position'];
    }

    wrapper.css(c2c_position_win, width_window);
    section.css('float', c2c_position_win);
    btn.css('float', c2c_position_win);

    btn.click(function() {
        if(wrapper.css(c2c_position_win) == '0px'){
            wrapper.animate((c2c_position_win == 'left' ? {left:width_window} : {right:width_window}), 'linear');
        }
        else{
            wrapper.animate((c2c_position_win == 'left' ? {left:'0px'} : {right:'0px'}), 'linear');
        }
    });

    c_btn.click(function() {
        wrapper.animate((c2c_position_win == 'left' ? {left:width_window} : {right:width_window}), 'linear');
    });

    submit_form_btn.click(function(e){
        e.preventDefault();

        var user_phone = phone_input.val();
        var tid = CMS.readCookie('ho_tid');
        user_phone = user_phone.charAt(0) === '+' ? (user_phone.charAt(1) === '8' ? user_phone.split('+')[1] : user_phone) : (user_phone.charAt(0) === '8' ? user_phone : '+' + user_phone);

        if(user_phone.length > 5){

            var call_lead = {"call":{"phone": user_phone, "tid": tid}};
            var token = url_queries['token'];

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
                    CMS_APP.jQuery('#hmc-call-now-thankyou').show();
                    setTimeout(function(){
                        wrapper.animate((c2c_position_win == 'left' ? {left:width_window} : {right:width_window}), 'linear');
                        CMS_APP.jQuery('#hmc-call-now-thankyou').hide();
                    },3000);
                },
                error : function (xhr, ajaxOptions, thrownError){
                    validate_div.show();
                }
            });
        }else{
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
    var position = 'left';

    if(CMS_APP.url_queries['position'] !== 'undefined'){
        position = CMS_APP.url_queries['position'];
    }

    var data = {
        host: host,
        position: position
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

CMS_APP.loadCSSFile();

if (typeof CMS == 'undefined') {
    CMS_APP.loadModule('js/cms.js', function(){
        CMS.initTracking();
    });
}else{
    CMS.initTracking();
}

CMS_APP.checkIfJqueryLoaded();

