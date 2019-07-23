var domain = location.protocol + '//api.topproio.com';

$(function(){
    init();
})
function init(){
    isMobile();
    processInit();
    storyInit();
    registerInit();
}

function isMobile() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {

        window.location.href="./m/talents_h5.html";
    }
}

function processInit(){
    var selection = $('.talents_process .selection');
    var index = 0
    var mouseoveFlag = false;
    for(var i=0;i<selection.length;i++){
        (function (i) {
            $(selection).eq(i).on('mouseover',function(){
                index = i
                mouseoveFlag = true
                showSelectionByIndex(i);
            })
            $(selection).eq(i).on('mouseleave', function(){
                mouseoveFlag = false
            })
        })(i)
    }
    $('.talents_process .content').on('mouseover', function(){
        mouseoveFlag = true
    }).on('mouseleave',function(){
        mouseoveFlag = false
    })
    setInterval(function () {
        if(mouseoveFlag){
            return
        }
        var next = index+1>selection.length-1?0:(index+1)
        index = next
        showSelectionByIndex(next)
    }, 2000)
}

function showSelectionByIndex(i){
    var selection = $('.talents_process .selection');
    var content = $('.talents_process .content-container')
    $(selection).removeClass('index')
    $(selection).eq(i).addClass('index')
    $(selection).find('.words').css({'opacity':'.5'})
    $(selection).eq(i).find('.words').css({'opacity':'1'})
    $(content).hide()
    $(content).eq(i).show()
}


function storyInit(){
    var preBtn = $('.talents_story .controller .pre');
    var nextBtn = $('.talents_story .controller .next');
    var persons = $('.talents_story .person');
    var index = 0;
    var loopNextStopFlag = false;
    var loopStopFlag = false;
    preBtn.on('click', function(){
        loopNextStopFlag = true
        var pre = index-1<0?(persons.length-1):(index-1)
        index = pre
        choosePersonAndShowByIndex(pre)
    })
    nextBtn.on('click', function(){
        loopNextStopFlag = true
        var next = index+1>persons.length-1?0:(index+1)
        index = next
        choosePersonAndShowByIndex(next)
    })
    $('.talents_story .info').on('mouseover', function(){
        loopStopFlag = true
    }).on('mouseleave', function(){
        loopStopFlag = false
    })
    setInterval(function () {
        if(loopStopFlag||loopNextStopFlag){
            loopNextStopFlag = false
            return
        }
        var next = index+1>persons.length-1?0:(index+1)
        index = next
        choosePersonAndShowByIndex(next);
    }, 3000)
}

function loopPersons(){

}
function choosePersonAndShowByIndex(i){
    var persons = $('.talents_story .person');
    persons.hide();
    persons.eq(i).show();
}

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
                toastr.success(res.message)
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
                toastr.error(res.message)
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
                toastr.success(res.message)
                location.href = '//my.topproio.com'
            }else{
                toastr.error(res.message)
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
        toastr.error('请同意《Toppro人才入驻服务协议》')
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