var domain = location.protocol + '//api.topproio.com';


$(function(){
    var mySwiper = new Swiper('.swiper-container', {
        direction : 'vertical',
    })
    registerInit();
})



function registerInit(){
    var SMSbtnFlag = false
    $('#SMSbtn').on('click',function(){
        if(SMSbtnFlag){
            return
        }
        var btn = $('#SMSbtn');
        if(!verifyPhone()){
            return
        }
        var data = {'type':1,'phone': $('#phone').val()}
        $.post(domain + '/api/sms/send',JSON.stringify(data),function(res){
            if(res.code == '200'){
                SMSbtnFlag = true
                // alert(res.message)
                var _time = 60;
                $(btn).text('(' + (--_time) + ')秒重新发送').addClass('color_gray')
                $(btn).text('获取验证码').removeClass('color_gray')
                var smsIntval = setInterval(function(){
                    $(btn).text('(' + (--_time) + ')秒重新发送').addClass('color_gray')
                    if(_time < 0){
                        $(btn).text('获取验证码').removeClass('color_gray')
                        SMSbtnFlag = false
                        clearInterval(smsIntval)
                    }
                },1000)
            }else{
                alert(res.message)
                SMSbtnFlag = false
            }
        })
    })
    $('#sendData').on('click',function(){
        sendData();
    })
    $('#phone').blur(function(){
        verifyPhone();
    })
}
function sendData(){
    var canSend = true
    !verifyPhone() && (canSend = false)
    !verifyPassword() && (canSend = false)
    !verifyChecked() && (canSend = false)
    !verifyCode() && (canSend = false)
    if(!canSend){
        return
    }
    var data = {
        type: '1',
        phone: $('#phone').val(),
        smscode: $('#code').val(),
        password: $('#password').val()
    }

    $.post({
        url: domain + '/api/register',
        data: JSON.stringify(data),
        xhrFields: {
            withCredentials: true
        },
        success: function(res){
            if(res.code == 200){
                // alert(res.message)
                location.href = './talents_h5_success.html'
            }else{
                alert(res.message)
            }
        }
    })
}
function verifyPhone(){
    var phoneBtn = $('#phone')
    var phone = phoneBtn.val()
    if(/^1[3456789]\d{9}$/.test(phone)){
        phoneBtn.parents('.dashed_border').find('.info').hide()
        phoneBtn.parents('.dashed_border').css({'border':'1px solid #9cead0'})
        return true;
    }else{
        phoneBtn.parents('.dashed_border').find('.info').show()
        phoneBtn.parents('.dashed_border').css({'border':'1px solid #ffbfa2'})
        return false
    }
}

function verifyPassword(){
    var passwordBtn = $('#password')
    var verifypasswordBtn = $('#verifypassword')
    var passwordVal = passwordBtn.val()
    var verifypasswordVal = verifypasswordBtn.val()

    if(passwordVal === ''){
        passwordBtn.parents('.dashed_border').find('.info').show()
        passwordBtn.parents('.dashed_border').css({'border':'1px solid #ffbfa2'})
        verifypasswordBtn.parents('.dashed_border').find('.info').show()
        verifypasswordBtn.parents('.dashed_border').css({'border':'1px solid #ffbfa2'})
        return false
    }else if(passwordVal === verifypasswordVal){
        passwordBtn.parents('.dashed_border').find('.info').hide()
        passwordBtn.parents('.dashed_border').css({'border':'1px solid #9cead0'})
        verifypasswordBtn.parents('.dashed_border').find('.info').hide()
        verifypasswordBtn.parents('.dashed_border').css({'border':'1px solid #9cead0'})
        return true
    }else{
        passwordBtn.parents('.dashed_border').css({'border':'1px solid #ffbfa2'})
        verifypasswordBtn.parents('.dashed_border').find('.info').show()
        verifypasswordBtn.parents('.dashed_border').css({'border':'1px solid #ffbfa2'})
        return false
    }
}

function verifyChecked(){
    var checkBtn = $('#agree')
    var checkVal = checkBtn.prop('checked')
    if(checkVal){
        return true
    }else{
        alert('请同意《Toppro人才入驻服务协议》')
        return false
    }
}

function verifyCode(){
    var codeBtn = $('#code')
    var codeVal = codeBtn.val()
    if(codeVal.length !== 6){
        codeBtn.parents('.dashed_border').css({'border':'1px solid #ffbfa2'})
        codeBtn.parents('.dashed_border').find('.info').show()
        return false
    }else{
        codeBtn.parents('.dashed_border').css({'border':'1px solid #9cead0'})
        codeBtn.parents('.dashed_border').find('.info').hide()
        return true
    }
}

