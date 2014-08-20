Olark Chat widget v0.1
==========================


Basic Setup

To start using CMS Affiliate Tools script , you need to include a short piece of JavaScript in your HTML. This script will load the form into your page and initialize it.

The script doesn't have any standalone files that need to be downloaded or installed.

1) insert script in your head tag

<script type="text/javascript" id="CMS_CHAT" src="http://static.api1.medicaladvisor.com/tools/chat_olark/js/cms_app_chat.js"></script>

2) You should insert it directly to the opening tag on each page you want to load it:

<script type='text/javascript'>
    (function(){
        var cms_param = {};

        cms_param.token = '116bb4ee5b4d0cea885aa019b05e687f5264131';
        cms_param.offerid = 66;
        cms_param.affiliateid = 1999;

        CMS_APP.paramLoader(cms_param);
    })();
</script>

This code will load and initialize  form in tag that you inserted it.

You must include your token. => cms_param = <your token>
You must include your offerid. => cms_param = <your offerid>
You must include your affiliateid. => cms_param = <your affiliateid>

variables that you can use to manipulate on chat

token
offerid
affiliateid
