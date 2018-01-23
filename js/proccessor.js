(function($,root){
    var $scope  = $(document.body);
    var curDuration;
    var frameId;
    var lastPercent = 0;
    var startTime;

    function formateTime(duration){
        duration = Math.round(duration);
        var minute = Math.floor(duration / 60);
        var second = duration % 60;
        if(minute < 10){
            minute = "0" + minute;
        }
        if(second < 10){
            second = "0" + second;
        }
        return minute + ":" + second;
    }
    function renderAllTime(duration){
        lastPercent = 0;
        curDuration = duration;
        var allTime = formateTime(duration);
        $scope.find(".all-time").html(allTime);
    }
    function renderPro(percent){
        var percentage =(percent - 1) * 100 + "%";
        $scope.find(".pro-top").css({
            transform : "translateX("+ percentage +")"
        })
    }
    function update(percent){
        var curTime = percent * curDuration;
        curTime = formateTime(curTime);
        $scope.find(".cur-time").html(curTime);
        renderPro(percent);
    
    }
    function startPro(percentage){
        percentage ? lastPercent = percentage : lastPercent;
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();
        function frame(){
            var curTime = new Date().getTime();
            var percent = lastPercent + (curTime-startTime) / (curDuration * 1000);
            if(percent < 1){
                frameId = requestAnimationFrame(frame);
                update(percent);
            }else{
                cancelAnimationFrame(frameId);
            }
        }
        frame();
    }
    function stopPro(){
        var stopTime = new Date().getTime();
        lastPercent = lastPercent + (stopTime - startTime) / (1000 * curDuration);
        cancelAnimationFrame(frameId);
    }
    root.proccessor = {
        renderAllTime : renderAllTime,
        startPro :startPro,
        stopPro : stopPro,
        update :　update
    }
}(window.Zepto,window.player))