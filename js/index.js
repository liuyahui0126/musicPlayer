var $ =  window.Zepto;
var root = window.player;
var render = root.render;
var $scope = $(document.body);
var index = 0;
var songList;
var controlmanager;
var audiomanager = new root.audioManager();
var proccessor = root.proccessor;
var playList = root.playList;


function bindTouch(){
    var $sliderPoint = $scope.find(".slider-point");
    var offset = $scope.find(".pro-wrapper").offset();
    var left = offset.left;
    var width = offset.width;
    $sliderPoint.on("touchstart",function(){
        proccessor.stopPro();
    }).on("touchmove",function(e){
        var x = e.changedTouches[0].clientX;
        var percent = (x - left) / width;
        if(percent > 1 || percent < 0){
            percent = 0;
        }
        proccessor.update(percent);
    }).on("touchend",function(e){
        var x = e.changedTouches[0].clientX;
        var percent = (x - left) / width;
        proccessor.startPro(percent);
        var time  = percent * songList[controlmanager.index].duration;
        audiomanager.jumpToPlay(time);
        $scope.find(".play-btn").addClass("playing ");
    })
}
//FastClick 去掉点击300ms延迟
function bindClick(){
    $scope.on("play:change",function(event,index,flag){
        var song = songList[index];
        render(song);
        audiomanager.setAudioSourse(song.audio);
        if(audiomanager.status == "play" || flag){
            audiomanager.play();
            proccessor.startPro();
        }
        proccessor.renderAllTime(song.duration);
        proccessor.update(0);
    })
    $scope.find(".prev-btn").on("click",function(){
        index = controlmanager.prev();
        $scope.trigger("play:change",[index]);
    })
    $scope.find(".next-btn").on("click",function(){
        index = controlmanager.next();
        $scope.trigger("play:change",[index]);
    })
    $scope.find(".list-btn").on("click",function(){
        playList.show(controlmanager);
    })
    $scope.find(".play-btn").on("click",function(){
        if(audiomanager.status == "pause"){
            audiomanager.play();
            proccessor.startPro();
        }else{
            audiomanager.pause();
            proccessor.stopPro();
        }
        $(this).toggleClass("playing");
    })
}
function successFn(data){
    songList = data;
    playList.renderList(data);
    bindClick();
    bindTouch();
    $scope.trigger("play:change",[0]);
    controlmanager = new root.controlManager(data.length);
}
function getData(url){
    $.ajax({ 
        type : 'GET',
        url : url,
        success : successFn
    })
}

getData('/mock/data.json');