/**
 * Created by Roman Kredentser on 6/10/14.
 *
 * used libphonenumber
 * https://code.google.com/p/libphonenumber/
 * https://github.com/albeebe/phoneformat.js
 * validation with Google's phone number handling library
 * compressed into just one file with some easy to use helper functions
 *
 */

(function ($) {
    Drupal.behaviors.clickToCallForm = {
        attach: function (context, settings) {
            $('#hmc-call-now-wrapper', context).once('clickToCallForm', function() {
                //CMS.initTracking();

                var c2c_position_win = settings.clickToCallForm.position;

                console.log(c2c_position_win);

                var width_window = '-336px';

                $('#hmc-call-now-validate').hide();

                $('#hmc-call-now-wrapper').css(c2c_position_win, width_window);
                $('#hmc-call-now-section').css('float', c2c_position_win);
                $('#hmc-call-now-btn').css('float', c2c_position_win);

                $('#hmc-call-now-btn').click(function() {
                    if($('#hmc-call-now-wrapper').css(c2c_position_win) == '0px'){
                        $('#hmc-call-now-wrapper').css('');
                        $('#hmc-call-now-wrapper').animate((c2c_position_win == 'left' ? {left:width_window} : {right:width_window}), 'linear');
                    }
                    else{
                        $('#hmc-call-now-wrapper').css('');
                        $('#hmc-call-now-wrapper').animate((c2c_position_win == 'left' ? {left:'0px'} : {right:'0px'}), 'linear');
                    }
                });

                /*$('#hmc-call-now-wrapper').click(function(){
                    $('#hmc-call-now-wrapper').css('');
                    $('#hmc-call-now-wrapper').animate((c2c_position_win == 'left' ? {left:'-310px'} : {right:'-310px'}), 'linear');
                });*/

                /*validation*/

                $("#hmc-call-now-close").click(function() {
                    $('#hmc-call-now-wrapper').animate((c2c_position_win == 'left' ? {left:width_window} : {right:width_window}), 'linear');
                });

                $('#hmc-call-now-form').submit(function(e){
                    e.preventDefault();
                    var user_phone = $('#user_phone').val();
                    var tid = CMS.readCookie('ho_tid');
                    user_phone = user_phone.charAt(0) === '+' ? (user_phone.charAt(1) === '8' ? user_phone.split('+')[1] : user_phone) : (user_phone.charAt(0) === '8' ? user_phone : '+' + user_phone);
                    //user_phone = user_phone.replace(/\D|-| +?/g, '');
                    //user_phone = user_phone.charAt(0) === '8' ? user_phone[0] = '7' : user_phone;

                    //user_phone.length > 1 && user_phone.match(/^((375|380|7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,12}$/)
                    //isValidNumber(user_phone, countryForE164Number(user_phone)
                    if(user_phone.length > 1){

                        $('#hmc-call-now-validate').hide();

                        var call_lead = {"call":{"phone": user_phone, "tid": tid}};
                        var token = "116b57f8c7ca3b646d56f6a142691b4ee5b4d0cea885aa019b05e687f5264131";

                        $.ajax({
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
                                //$('#hmc-call-now-wrapper').animate({'left':'-310px'}, 'linear');
                                $('#hmc-call-now-validate').hide();
                                $('#user_phone').val('');
                                $('#hmc-call-now-thankyou').show();
                                setTimeout(function(){
                                    $('#hmc-call-now-wrapper').animate((c2c_position_win == 'left' ? {left:width_window} : {right:width_window}), 'linear');
                                    $('#hmc-call-now-thankyou').hide();
                                },3000);
                            },
                            error : function (xhr, ajaxOptions, thrownError){
                                $('#hmc-call-now-validate').show();
                            }
                        });
                    }else{
                        $('#hmc-call-now-validate').show();
                    }
                });
            });
        }
    }
}(jQuery));