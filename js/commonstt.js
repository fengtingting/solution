if (!Function.prototype.bind) { 
        Function.prototype.bind = function (oThis) { 
        if (typeof this !== "function") {       
        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable"); 
        } 
        var aArgs = Array.prototype.slice.call(arguments, 1), 
        fToBind = this, 
        fNOP = function () {}, 
        fBound = function () { 
        return fToBind.apply(this instanceof fNOP && oThis 
        ? this 
        : oThis, 
        aArgs.concat(Array.prototype.slice.call(arguments))); 
        }; 
        fNOP.prototype = this.prototype; 
        fBound.prototype = new fNOP(); 
        return fBound; 
        }; 
} 
var tt = {
    //轮播图，无缝滚动

    carousel:function (option) {
        var defaultOpt = {
            interval: 5000,
            ishover: true,//鼠标移动上去停止
            el: '.banner',//区域
            item: '.item',//轮播图 数量*2
            icon: '.banner-icon',// 图标
            selClass: 'act',//当前图片样式
            left: 'left',// 移动css 
            num: 2
        }
        option = $.extend(defaultOpt, option);
        var el = $(option.el);
        var index = 0;
        var Interval = null;
        var itemCount, par, itemWid, icons;
        var _carousel;

        var exec = {
            prev: function(complete) {
                index -- ;
                exec.animate();
                exec.load();
                //complete(index);
            },
            next: function(complete) {
                index ++ ;
                exec.animate();
                exec.load();
                //complete(index);
            },
            animate: function(oper) {
                oper = oper || {};
                var currleft = par.css(option.left).replace('px','') || 0;
                var left = itemWid * index * -1;
                var leftend = left;
                var maxindex = items.length / option.num - 1;
                if(index > maxindex) {
                    index = 0;
                    leftend = 0;
                }
                else if(index < 0) {
                    index = maxindex;
                    currleft = itemWid * (index + 1) * -1;
                    leftend = left = itemWid * index * -1;
                }
                icons.eq(index).addClass(option.selClass).siblings().removeClass(option.selClass);
                var op = {};
                op[option.left] =  left;
                par.css(option.left, currleft + 'px').stop().animate(op, 500, function() {
                    if(leftend != left) {
                        par.css(option.left, leftend + 'px');
                    }
                    _carousel._change();
                });
            },
            index: function() {
                index ++ ;
                exec.animate({ state: -1 });
                
            },
            load: function() {

                if(Interval) {
                    clearInterval(Interval);
                }
                Interval = setInterval(exec.index, option.interval);
            },
            click: function(e) {
              var currindex = icons.index(e.target);
              if(currindex == index) {
                return;
              }

              index = currindex;
              exec.animate();
              exec.load();
            },
            mouseover: function() {
                if(Interval) {
                    clearInterval(Interval);
                }
            },
            mouseout: function() {
                exec.load()
            },
            start:function() {
              index = 0;
                exec.animate();
                exec.load();
            }
        }
        
        if(el.length > 0) {
           items = el.find(defaultOpt.item);
           icons = el.find(option.icon);
           if(items.length > 0 ) {
                if(option.ishover) {
                    items.hover(exec.mouseover.bind(exec), exec.mouseout.bind(exec))
                }
                icons.click(exec.click.bind(exec)).eq(0).addClass(option.selClass);
                par = items.eq(0).parent();
                itemWid = items.eq(0).width();
                exec.load();
           }
        }
        _carousel = { 
            _change: function() {
                if( typeof _carousel.change === 'function') {
                    _carousel.change(index, items[index]);
                }
            },
            prev:function() {
                exec.prev();
            },
            next: function() {
                exec.next();
            },
            start:function(){
                exec.start();
            }

        }
        return _carousel;
    },
    carouselLR: function(option) {
        var defaultOpt = {
            el: '.banner',
            item: '.item',
            iconl: '.l',
            iconr: '.r',
            num: '4',
            gray: 'gray',
            left: 'margin-left',
            count : 1
        }
        option = $.extend(defaultOpt, option);
        var el = $(option.el);
        var par, items, iconl, iconr, itemWid;
        var index = 0;
        var exec = {
            clickL : function(e) {
                
                if( $(e.currentTarget).hasClass(option.gray) ) {
                    return;
                }
                var currleft = par.css(option.left).replace('px','') * 1;
                if(index == option.count) {
                    iconl.addClass(option.gray);
                }
                index -= option.count;
                iconr.removeClass(option.gray);
                exec.animate();

            },
            clickR: function(e) {
               
                if( $(e.currentTarget).hasClass(option.gray) ) {
                    return;
                }
                if(index + option.count >= items.length - option.num) {
                    iconr.addClass(option.gray);
                }
                 index += option.count;
                iconl.removeClass(option.gray);
                exec.animate();

            },
            animate:function() {
                var left = itemWid * index * -1;
                var op = {};
                op[option.left] =  left;
                par.stop().animate(op, 500);
            }

        }
        if(el.length > 0) {
            items = el.find(option.item);
            iconl = el.find(option.iconl);
            iconr = el.find(option.iconr);
            iconl.addClass(option.gray);
            if(items.length > 0) {
                par = items.eq(0).parent();
                itemWid = items.eq(0).outerWidth();
            }
            if(items.length > option.num) {

            }
            else {
                iconr.addClass(option.gray);
            }

            iconl.click(exec.clickL);
            iconr.click(exec.clickR);

        }

    }

}
//返回顶部
$('a[href^=#]').each(function(index,item){
    $(item).data('href',$(item).attr('href'));
    $(item).attr('href','javascript:void(0)');
    $(item).click(function(){
        var item = $(this);
        $("html,body").animate({scrollTop:$(item.data('href')).offset().top-90},500);
    })
})