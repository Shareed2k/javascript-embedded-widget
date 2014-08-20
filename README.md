**Form widget v2.1**
==========================

**Basic Setup**
---------------
To start using CMS Affiliate Tools script , you need to include a short piece of JavaScript in your HTML. This script will load the form into your page and initialize it.

The script doesn't have any standalone files that need to be downloaded or installed.

***1) insert script in your head tag***

```javascript
<script type="text/javascript" id="CMS_FORM_V2" src="http://static.api1.medicaladvisor.com/tools/contact_form_v2/js/CMS_IFRAME.js"></script>
```

***2) You should insert it directly to the opening tag on each page you want to load it, and specify id of the tag: like here id of the element div is geg3***

```javascript
<div id="geg3">
    <script type="text/javascript">
        (function(){
            var cms_param = {};

            cms_param.token = '116b57f8c7ca3b646d56f6a142691b4ee5b4d0cea885aa019b05e687f5264131';
            //cms_param.width = '1180';
            //cms_param.height = '330';
            cms_param.offerid = '200';
            cms_param.affiliateid = '300';

            CMS_APP.createIframe('geg3', cms_param);
        })();

    </script>
</div>
```

This code will load and initialize  form in tag that you inserted it.

* You must include your token. => cms_param = ***your token***
* You must include your offerid. => cms_param = ***your offerid***
* You must include your affiliateid. => cms_param = ***your affiliateid***

variables that you can use to manipulate on form

* **width**
* **stylesheet** - if you want to make your custom stylesheet, you must pass full path to your css file here 
* **height**
* **token**
* **offerid**
* **affiliateid**
