(function () {

    function DropDown(options) {
        this.father = options.father;
        this.menuList = options.menuList;
        this.direction = options.direction || 'y';
        this.dropDownWidth = options.dropDownWidth;
        this.colWidth = options.colWidth;
        this.init = function () {
            this.createDom();
            this.initStyle();
            this.bindEvent();
        }
    }
    DropDown.prototype.bindEvent = function () {
        $('.my-dropdown dl dd', this.father).hover(function () {
            this.color = $(this).css('color');
            $('a', this).css({
                color: 'red',
            })
        }, function () {
            $('a', this).css({
                color: this.color,
            })
        });
        $(this.father).hover(function () {
            $(this).css({
                backgroundColor: '#fff'
            })
            $('.my-dropdown', this).show();
        }, function () {
            $('.my-dropdown', this).hide();
            $(this).css({
                backgroundColor: 'transparent'
            })
        })
    }
    DropDown.prototype.createDom = function () {
        var oDiv = $('<div class="my-dropdown"></div>');
        this.menuList.forEach(function (menu) {
            var oDl = $('<dl></dl>');
            var self = this;
            if (menu.title) {
                $('<dt>' + menu.title + '</dt>').appendTo(oDl);
            }
            menu.items.forEach(function (item) {
                $('<dd> <a href="' + item.href + '">' + item.name + '</a></dd>').appendTo(oDl);
            });
            if(menu.itemWidth){
                oDl.css({
                    width:menu.itemWidth,
                });
            }
            if(menu.colWidth){
                $('dd',oDl).css({
                    width:menu.colWidth,
                })
            }
            oDiv.append(oDl);
        });
        $(this.father).append(oDiv);
    }

    DropDown.prototype.initStyle = function () {
        $(this.father).css({
            position: 'relative',
        }).find('.my-dropdown').css({
            width: this.dropDownWidth,
            backgroundColor: '#fff',
            position: 'absolute',
            border: '1px solid #ccc',
            borderTop:'none',
            display: 'none',
            left:0,
        }).find('dl').css({
            padding: '10px 0 10px 15px',
            borderBottom: '1px solid #ccc',
            overflow: 'hidden',
        }).find('dt').css({
            fontWeight:'bold'
        }).end().find('dd').css({
            width: this.colWidth,
            float: 'left',
            whiteSpace:'nowrap'
        });
        if(this.direction=='x'){
            $('.my-dropdown',this.father).css({
                position:'absolute',
                right:-73,
                left:'auto',
                padding:'15px 0',
            }).find('dl').css({
                float:'left',
                borderRight:'1ps solid #ccc',
                borderBottom:'none',
            })
        }
    }

    $.fn.extend({
        addDropdown: function (options) {
            //保存下拉列表添加到的位置
            options.father = this;
            //创建一个下拉列表对象
            var obj = new DropDown(options);
            obj.init();
        }
    })
}());