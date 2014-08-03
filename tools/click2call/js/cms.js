/* 
 * CMS cookie tracking library
 */
var CMS = CMS || {};

CMS.createCookie = function(name,value,days) {
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires="+date.toGMTString();
    }
    else {
    }
    document.cookie = name+"="+value+expires+"; path=/";
};

CMS.readCookie = function(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)===' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ)=== 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
};

CMS.eraseCookie = function(name) {
    CMS.createCookie(name,"",-1);
};

CMS.getUrlVars = function() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
};


CMS.initTracking = function() {
    var t = CMS.getUrlVars();
    if( t['tid'] ) {
        CMS.createCookie('ho_tid', t['tid'], 30 );
    }
};
/*
var hasoffers_aff_id = getUrlVars()["aff_id"];
var hasoffers_offer_id = getUrlVars()["offer_id"];
var hasoffers_source = getUrlVars()["source"];
var hasoffers_aff_sub = getUrlVars()["aff_sub"];
var hasoffers_aff_sub2 = getUrlVars()["aff_sub2"];
var hasoffers_aff_sub3 = getUrlVars()["aff_sub3"];
var hasoffers_aff_sub4 = getUrlVars()["aff_sub4"];
var hasoffers_aff_sub5 = getUrlVars()["aff_sub5"];
var hasoffers_aff_ref = getUrlVars()["aff_ref"];

if( ((typeof (hasoffers_aff_id) != "undefined" && hasoffers_aff_id !== undefined) || ( typeof (hasoffers_aff_ref) != "undefined" && hasoffers_aff_ref !== undefined )) && (typeof (hasoffers_offer_id) != "undefined" && hasoffers_offer_id !== undefined) ) {

	var hasoffers_click = "";
	
	if (typeof (hasoffers_aff_id) != "undefined" && hasoffers_aff_id !== undefined && IsNumeric(hasoffers_aff_id)) {
		hasoffers_click = hasoffers_domain+"/aff_c?offer_id="+hasoffers_offer_id+"&aff_id="+hasoffers_aff_id;
	}else if (typeof (hasoffers_aff_ref) != "undefined" && hasoffers_aff_ref !== undefined) {
		hasoffers_click = hasoffers_domain+"/aff_c?offer_id="+hasoffers_offer_id+"&aff_ref="+hasoffers_aff_ref;
	}
		
	if(typeof (hasoffers_source) != "undefined" && hasoffers_source !== undefined ) {
		hasoffers_click = hasoffers_click+"&source="+hasoffers_source;
	}
	if(typeof (hasoffers_aff_sub) != "undefined" && hasoffers_aff_sub !== undefined ) {
		hasoffers_click = hasoffers_click+"&aff_sub="+hasoffers_aff_sub;
	}
	if(typeof (hasoffers_aff_sub2) != "undefined" && hasoffers_aff_sub2 !== undefined ) {
		hasoffers_click = hasoffers_click+"&aff_sub2="+hasoffers_aff_sub2;
	}
	if(typeof (hasoffers_aff_sub3) != "undefined" && hasoffers_aff_sub3 !== undefined ) {
		hasoffers_click = hasoffers_click+"&aff_sub3="+hasoffers_aff_sub3;
	}
	if(typeof (hasoffers_aff_sub4) != "undefined" && hasoffers_aff_sub4 !== undefined ) {
		hasoffers_click = hasoffers_click+"&aff_sub4="+hasoffers_aff_sub4;
	}
	if(typeof (hasoffers_aff_sub5) != "undefined" && hasoffers_aff_sub5 !== undefined ) {
		hasoffers_click = hasoffers_click+"&aff_sub5="+hasoffers_aff_sub5;
	}

	if(typeof (hasoffers_click) != "undefined" && hasoffers_click != "" ) {
		document.write('<img src="'+hasoffers_click+'" width="1" height="1" border="0" />');
	}
}

function IsNumeric(input)
{
    return (input - 0) == input && input.length > 0;
}


*/