(function () {
    //创建轮播图对象的构造函数
    function Swiper(options) {
        this.isAuto = options.isAuto;
        //wrap是轮播图插入的位置
        this.wrap = options.wrap || $('body');
        //轮播的图片列表
        this.imgList = options.imgList;
        //轮播的动画类型
        this.animateType = options.animateType || 'fade';
        //是否展示左右切换按钮
        this.changeBtn = options.changeBtn;
        //是否展示小圆点
        this.showPointBtn = options.showPointBtn;
        this.imgWidth = options.imgWidth || $(this.wrap).width();
        this.imgHeight = options.imgHeight || $(this.wrap).height();
        this.imgNum = options.imgList.length;
        this.nowIndex = 0;
        this.lock = true;
        //初始化函数
        this.init = function () {
            //创建轮播图结构
            this.createDom();
            //初始化样式
            this.initStyle();
            //绑定事件
            this.bindEvent();
            //自动轮播
            if (this.isAuto) {
                this.autoChange();
            }
        }
    }

    Swiper.prototype.bindEvent = function () {
        var self = this;
        $('.left-btn', this.wrap).click(function () {
            if (!self.lock) {
                return false;
            }
            if (self.nowIndex == 0) {
                if (self.animateType == 'animate') {
                    $('.swiper-wrap', self.wrap).css({
                        left: -self.imgWidth * self.imgNum
                    });
                }
                self.nowIndex = self.imgNum - 1;
            } else {
                self.nowIndex --;
            }
            self.changeImage()
        });
        $('.right-btn', this.wrap).click(function () {
            if (!self.lock) {
                return false;
            }
            if (self.animateType == 'fade' && self.nowIndex == self.imgNum - 1) {
                self.nowIndex = 0;
            } else if (self.animateType == 'animate' && self.nowIndex == self.imgNum) {
                $('.swiper-wrap', self.wrap).css({
                    left: 0
                });
                self.nowIndex = 1;
            }else {
                self.nowIndex ++;
            }
            self.changeImage()
        });
        $('.spot > span', this.wrap).click(function () {
            if (!self.lock) {
                return false;
            }
            self.nowIndex = $(this).index();
            self.changeImage();
        });
        $(this.wrap).mouseenter(function () {
            clearTimeout(self.timer);
        }).mouseleave(function () {
            if (self.isAuto){
                self.autoChange()
            }
        })
    }

    Swiper.prototype.autoChange = function () {
        var self =this;
        this.timer = setInterval(function(){
            //定时器的this指向的是window
            $('.right-btn',self.wrap).trigger('click');
        },2000);
    }
    Swiper.prototype.changeImage = function () {
        this.lock = false;
        var self = this;
        if (this.animateType == 'fade') {
            $('.swiper-wrap >li', this.wrap).fadeOut().eq(this.nowIndex).fadeIn(function () {
                self.lock = true;
            });
        } else {
            $('.swiper-wrap',this.wrap).animate({
                left: -this.nowIndex * this.imgWidth,
            }, function () {
                self.lock = true;
            })
        }
        $('.spot>span', this.wrap).css({
            backgroundColor: '#fff',
        }).eq(this.nowIndex % this.imgNum).css({
            backgroundColor: 'red',
        })
    }
    Swiper.prototype.createDom = function () {
        var oUl = $('<ul class="swiper-wrap"></ul>');
        var spotDiv = $('<div class="spot"></div>');
        this.imgList.forEach(function (item) {
            $('<li><a href="#"><img src="' + item + '"/></a></li>').appendTo(oUl);
            $('<span></span>').appendTo(spotDiv);
        });

        //如果是 animate 最后插入一张新的图片
        if (this.animateType == 'animate') {
            $('<li><a href="#"><img src="' + this.imgList[0] + '"/></a></li>').appendTo(oUl);
        }
        var leftBtn = $('<div class="btn left-btn">&lt;</div>');
        var rightBtn = $('<div class="btn right-btn">&gt;</div>');

        $(this.wrap).append(oUl)
        if (this.changeBtn) {
            $(this.wrap).append(leftBtn).append(rightBtn);
        }
        if (this.showPointBtn) {
            $(this.wrap).append(spotDiv);
        }
    }

    Swiper.prototype.initStyle = function () {
        $('*', this.wrap).css({
            listStyle: "none",
            textDecoration: "none",
            padding: 0,
            margin: 0,
        }).find('a').css({
            width: "100%",
            height: "100%",
            display: 'inline-block'
        });
        $(this.wrap).css({
            position: 'relative',
            overflow: 'hidden'
        });
        $('img', this.wrap).css({
            width: "100%",
            height: "100%",
        });
        if (this.animateType == 'animate') {
            $('.swiper-wrap', this.wrap).css({
                width: this.imgWidth * (this.imgNum + 1),
                height: this.imgHeight,
                position: 'absolute',
                overflow: 'hidden',

            }).find('li').css({
                width: this.imgWidth,
                height: this.imgHeight,
                float: "left",
            });
        } else if (this.animateType == 'fade') {
            $('.swiper-wrap', this.wrap).css({
                position: 'relative'
            }).find('li').css({
                width: this.imgWidth,
                height: this.imgHeight,
                position: 'absolute',
                left: 0,
                top: 0,
                display: 'none',
            }).eq(this.nowIndex).css({
                display: 'block',
            })
        }

        $('.btn', this.wrap).css({
            width: 50,
            height: 30,
            //jq的lineHeight要加单位 不加单位代表倍数
            lineHeight: '30px',
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: "#fff",
            textAlign: 'center',
            position: 'absolute',
            top: '50%',
            marginTop: -15,
            cursor: 'pointer',

        }).filter('.right-btn').css({
            right: 0,
        });
        $('.spot').css({
            position: 'absolute',
            bottom: 10,
            width: '100%',
            textAlign: 'center'
        })
        $('.spot>span', this.wrap).css({
            display: 'inline-block',
            width: 10,
            height: 10,
            margin: '0 5px',
            borderRadius: "50%",
            backgroundColor: '#fff',
            cursor: 'pointer',
        }).eq(this.nowIndex).css({
            backgroundColor: 'red'
        })
    }

    $.fn.extend({
        swiper: function (options) {
            options.wrap = this;
            var obj = new Swiper(options);
            obj.init();
        }
    })

}())

