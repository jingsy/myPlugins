# myPlugins
## 封装的一些插件
## swiper 轮播图插件
## dropdown 下拉菜单插件

### swiper使用
`$('.demo').swiper({
            imgList : ['../img/pic1.jpg','../img/pic2.jpg','../img/3.jpg'],
            animateType : 'fade',
            changeBtn : true,
            showPointBtn : true,
            isAuto:false,
        });
        $('.wrapper').swiper({
            imgList : ['../img/pic1.jpg','../img/pic2.jpg','../img/3.jpg'],
            animateType : 'animate',
            changeBtn : true,
            showPointBtn : true,
            isAuto:true,
        });`
 
### dropdown使用
 `$('#procurement').addDropdown({
    title: '企业采购',
    colWidth: 56,
    dropDownWidth:140,
    menuList: [{
        title: '',
        items: [{
            href: '',
            name: '企业购'
        }, {
            href: '',
            name: '商用场景馆'
        }, {
            href: '',
            name: '工业品'
        }, {
            href: '',
            name: '礼品卡'
        }]
    }]
});`
