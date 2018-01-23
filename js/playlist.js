(function($,root){
    var $scope = $(document.body);
    var controlmanager;
    var $playList = $(`<div class="list-wrapper">
        <div class="list-header">播放列表</div>
        <ul class="play-list"></ul>
        <div class="close-btn">关闭</div>
    </div>`);
    function renderList(data){
        var html = '';
        var len = data.length;
        for(var i = 0;i< len ; i++){
            html += "<li><h3>"+data[i].song+"--<span>"+data[i].singer+"</span>"+"</h3></li>"
        }
        $playList.find('ul').html(html);
        $scope.append($playList);
        bindEvent();
    }
    function show(control){
        controlmanager = control;
        $playList.addClass('show');
        var index = controlmanager.index;
        signRed(index);
    }
    function bindEvent(){
        $playList.find('.close-btn').on("click",function(){
            $playList.removeClass('show');
        })
        $playList.find('li').on("click",function(){
            var index = $(this).index();
            signRed(index);
            controlmanager.index = index;
            $scope.trigger("play:change",[index,true]);
            $scope.find(".play-btn").addClass('playing');
            setTimeout(function() {
                $playList.removeClass('show');
            }, (500));
        })
    }
    function signRed(index){
        $playList.find('li').removeClass('showList');
        $playList.find('li').eq(index).addClass('showList');
    }
    
    root.playList = {
        renderList : renderList,
        show : show
    }
}(window.Zepto,window.player))