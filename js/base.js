! function(e) {
            e.fn.extend({
                hqTabs: function(t, n) {
                    var r = t,
                        i = n || !1,
                        o = e(this).find(".tab-content"),
                        a = e(this).find(".tab-content > .tab-c");
                    e(this).find(".tab-t").each(function(t) {
                        e(this).on(r, function() {
                                e(this).addClass("active").siblings().removeClass("active"),
                                    o.addClass("active"),
                                    a.removeClass("active").eq(t).addClass("active")
                            })
                            // i && e(".category-menu").on("mouseleave", function() {
                            //     e(".category-menu .tab-t").removeClass("active"),
                            //         o.removeClass("active"),
                            //         a.removeClass("active")
                            // })
                    })
                }
            })
        }(jQuery);

 // 放假通知、顶部广告关闭
        $('#topNotice_close').click(function() {
            $('#topNotice').hide()
        })
        $('#J_topBanner .close').click(function() {
                $('#J_topBanner').hide();
            })
            //弹窗
        var _btn = $("#webimclosebutton");
        _btn.click(function() {
            var _fixed = document.getElementById("webim");
            _fixed.style.display = "none";
        })

        $("#J_categoryTab").hqTabs("mouseover", !0)
        $("#J_inquirySuperBuyer").hqTabs("mouseover")
        $("#WisdomCity").hqTabs("mouseover")
        $("#J_serviceTab").hqTabs("mouseover")
        $("#solutionTab").hqTabs("mouseover")
        $("#search").hqTabs("click")
        $(function() {
            // var uislider = $('.uislider').unslider({
            //     speed: 500, //  The speed to animate each slide (in milliseconds)
            //     delay: 3000, //  The delay between slide animations (in milliseconds)
            //     complete: function() {}, //  A function that gets called after every slide animation
            //     keys: true, //  Enable keyboard (left, right) arrow shortcuts
            //     dots: true, //  Display dot navigation
            //     fluid: false //  Support responsive design. May break non-responsive designs
            // });
            $(".uislider").slide({
                mainCell: ".uislider-content",
                effect: "leftLoop",
                autoPlay: true,
                interTime: 4000,
                trigger: "click",
                delayTime: 700,
                titOnClassName: 'active',
                titCell: '.dots .dot'
            });
        })

        $('.select li').click(function(event){
            var target = $(event.target);
           var value = target.text();
           target.parents('.select').addClass('ihide').prev()[0].innerText=value;
           setTimeout(function(){
                target.parents('.select').removeClass('ihide');
           })

        })
        $('#J_inquirySuperBuyer .tab-c').each(function(index, item) {
            var lr = new tt.carouselLR({
                el: item,
                item: 'li',
                iconl: '.czleftbut',
                iconr: '.czrightbut'
            })
        })
         var left=$('.container').eq(0).offset().left-46;
        $("#elevator").css('left',left);
        var floorSet = new Array();
       
        for (var i = 0; i < 7; i++) {
            floorSet[i] = $($(".floorflag").get(i)).offset().top - 70;
        }
        
        $(window).scroll(function() {
            var Top = $(window).scrollTop();
            if (Top < floorSet[0] - 200) {
                $("#elevator").fadeOut(200);
            } else {
                $("#elevator").fadeIn(200);
            }
            if (Top < floorSet[1]) {
                $("#elevator li").removeClass("current");
                $($("#elevator li").get(0)).addClass("current");
            } else if (Top >= floorSet[1] && Top < floorSet[2]) {
                $("#elevator li").removeClass("current");
                $($("#elevator li").get(1)).addClass("current");
            } else if (Top >= floorSet[2] && Top < floorSet[3]) {
                $("#elevator li").removeClass("current");
                $($("#elevator li").get(2)).addClass("current");
            } else if (Top >= floorSet[3] && Top < floorSet[4]) {
                $("#elevator li").removeClass("current");
                $($("#elevator li").get(3)).addClass("current");
            } else if (Top >= floorSet[4] && Top < floorSet[5]) {
                $("#elevator li").removeClass("current");
                $($("#elevator li").get(4)).addClass("current");
            } else if (Top >= floorSet[5] && Top < floorSet[6]) {
                $("#elevator li").removeClass("current");
                $($("#elevator li").get(5)).addClass("current");
            } else if (Top >= floorSet[6] && Top < floorSet[7]) {
                $("#elevator li").removeClass("current");
                $($("#elevator li").get(6)).addClass("current");
            } else {
                $("#elevator li").removeClass("current");
                $($("#elevator li").get(6)).addClass("current");
            }
        });
        $("#elevator li").click(function(){
            var $this = $(this);
            var $thisfnum = $this.attr("floornums");
            $('html,body').animate({scrollTop: $(".floorflag[floornums='"+$thisfnum+"']").offset().top}, 200)
        })
        //ie8的placeholder属性
         $(function() {
             if( !('placeholder' in document.createElement('input')) ){   

            $('input[placeholder],textarea[placeholder]').each(function(){    
              var that = $(this),    
              text= that.attr('placeholder');    
              if(that.val()===""){    
                that.val(text).addClass('placeholder');    
              }    
              that.focus(function(){    
                if(that.val()===text){    
                  that.val("").removeClass('placeholder');    
                }    
              })    
              .blur(function(){    
                if(that.val()===""){    
                  that.val(text).addClass('placeholder');    
                }    
              })    
              .closest('form').submit(function(){    
                if(that.val() === text){    
                  that.val('');    
                }    
              });    
            });    
          }   
   })
    function restore(c_x){
    if(c_x){
        var numc_x = parseInt(c_x);
        var $par = $(".floorflag[floornums='"+numc_x+"']");
        // $par.children(".tits").children("h2").children("i").text("TOP");
        $(".mnfloor li[floornums='"+(numc_x)+"']").addClass("current");
    }else{
        $($(".mnfloor li").get(0)).addClass("current"); 
    }
}