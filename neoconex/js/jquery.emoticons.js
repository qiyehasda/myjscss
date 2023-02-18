/**
 * jQuery's jqfaceedit Plugin
 *
 * @author cdm
 * @version 0.2
 * @copyright Copyright(c) 2012.
 * @date 2012-08-09
 */
(function($) {
    var em = [
                {'id':1,'phrase':'{:11:}','url':'ulemoji_1.png'},
				{'id':2,'phrase':'{:12:}','url':'ulemoji_2.png'},
                {'id':3,'phrase':'{:13:}','url':'ulemoji_3.png'},
				{'id':4,'phrase':'{:14:}','url':'ulemoji_4.png'},
				{'id':5,'phrase':'{:15:}','url':'ulemoji_5.png'},
				{'id':6,'phrase':'{:16:}','url':'ulemoji_6.png'},
				{'id':7,'phrase':'{:17:}','url':'ulemoji_7.png'},
				{'id':8,'phrase':'{:18:}','url':'ulemoji_8.png'},
				{'id':9,'phrase':'{:19:}','url':'ulemoji_9.png'},
				{'id':10,'phrase':'{:20:}','url':'ulemoji_10.png'},
				{'id':11,'phrase':'{:21:}','url':'ulemoji_11.png'},
				{'id':12,'phrase':'{:22:}','url':'ulemoji_12.png'},
				{'id':13,'phrase':'{:23:}:','url':'ulemoji_13.png'},
				{'id':14,'phrase':'{:24:}','url':'ulemoji_14.png'},
				{'id':15,'phrase':'{:25:}','url':'ulemoji_15.png'},
				{'id':16,'phrase':'{:26:}','url':'ulemoji_16.png'},
				{'id':17,'phrase':'{:27:}','url':'ulemoji_17.png'},
				{'id':18,'phrase':'{:28:}','url':'ulemoji_18.png'},
				{'id':19,'phrase':'{:29:}','url':'ulemoji_19.png'},
				{'id':20,'phrase':'{:30:}','url':'ulemoji_20.png'},
				{'id':21,'phrase':'{:31:}','url':'ulemoji_21.png'},
				{'id':22,'phrase':'{:32:}','url':'ulemoji_22.png'},
				{'id':23,'phrase':'{:33:}','url':'ulemoji_23.png'},
				{'id':24,'phrase':'{:34:}','url':'ulemoji_24.png'},
				{'id':25,'phrase':'{:35:}','url':'ulemoji_25.png'},
				{'id':26,'phrase':'{:36:}','url':'ulemoji_26.png'},
				{'id':27,'phrase':'{:37:}','url':'ulemoji_27.png'},
				{'id':28,'phrase':'{:38:}','url':'ulemoji_28.png'},
				{'id':29,'phrase':'{:39:}','url':'ulemoji_29.png'},
				{'id':30,'phrase':'{:40:}','url':'ulemoji_30.png'},
				{'id':31,'phrase':'{:41:}','url':'ulemoji_31.png'},
				{'id':32,'phrase':'{:42:}','url':'ulemoji_32.png'},
				{'id':33,'phrase':'{:43:}','url':'ulemoji_33.png'},
				{'id':34,'phrase':'{:44:}','url':'ulemoji_34.png'},
				{'id':35,'phrase':'{:45:}','url':'ulemoji_35.png'},
				{'id':36,'phrase':'{:46:}','url':'ulemoji_36.png'},
				{'id':37,'phrase':'{:47:}','url':'ulemoji_37.png'},
				{'id':38,'phrase':'{:48:}','url':'ulemoji_38.png'},
				{'id':39,'phrase':'{:49:}','url':'ulemoji_39.png'},
				{'id':40,'phrase':'{:50:}','url':'ulemoji_40.png'},
				{'id':41,'phrase':'{:51:}','url':'ulemoji_41.png'},
            ];
    //textarea设置光标位置
    function setCursorPosition(ctrl, pos) {
        if(ctrl.setSelectionRange) {
            ctrl.focus();
            ctrl.setSelectionRange(pos, pos);
        } else if(ctrl.createTextRange) {// IE Support
            var range = ctrl.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }

    //获取多行文本框光标位置
    function getPositionForTextArea(obj)
    {
        var Sel = document.selection.createRange();
        var Sel2 = Sel.duplicate();
        Sel2.moveToElementText(obj);
        var CaretPos = -1;
        while(Sel2.inRange(Sel)) {
            Sel2.moveStart('character');
            CaretPos++;
        }
       return CaretPos ;

    }

    $.fn.extend({
        jqfaceedit : function(options) {
            var defaults = {
                txtAreaObj : '', //TextArea对象
                containerObj : '', //表情框父对象
                textareaid: 'needmessage',//textarea元素的id
                popName : '', //iframe弹出框名称,containerObj为父窗体时使用
                emotions : em, //表情信息json格式，id表情排序号 phrase表情使用的替代短语url表情文件名
                top : 0, //相对偏移
                left : 0 //相对偏移
            };
            
            var options = $.extend(defaults, options);
            var cpos=0;//光标位置，支持从光标处插入数据
            var textareaid = options.textareaid;
            
            return this.each(function() {
                var Obj = $(this);
                var container = options.containerObj;
                if ( document.selection ) {//ie
                    options.txtAreaObj.bind("click keyup",function(e){//点击或键盘动作时设置光标值
                        e.stopPropagation();
                        cpos = getPositionForTextArea(document.getElementById(textareaid)?document.getElementById(textareaid):window.frames[options.popName].document.getElementById(textareaid));
                    });
                }
                $(Obj).bind("click", function(e) {
                    e.stopPropagation();
                    var faceHtml = '<div id="nex_emoji_box">';
                    faceHtml += '<div id="nex_emoji_inner">';
                    faceHtml += '<div id="nex_emoji_items" class="nex_emoji_inner clearfix"><ul>';

                    for( i = 0; i < options.emotions.length; i++) {
                        faceHtml += '<li text=' + options.emotions[i].phrase + ' type=' + i + '><img title=' + options.emotions[i].phrase + ' src="template/nex_mmanga_181107/neoconex/nex_emoji/'+ options.emotions[i].url + '"  style="cursor:pointer; position:relative;"   /></li>';
                    }
                    faceHtml += '</ul></div>';
                    faceHtml += '</div><div class="arrow arrow_t"></div></div>';

                    container.find('#nex_emoji_box').remove();
                    container.append(faceHtml);
                    
                    container.find("#nex_emoji_items ul li").bind("click", function(e) {
                        var txt = $(this).attr("text");
                        var faceText = txt;

                        //options.txtAreaObj.val(options.txtAreaObj.val() + faceText);
                        var tclen = options.txtAreaObj.val().length;
                        
                        var tc = document.getElementById(textareaid);
                        if ( options.popName ) {
                            tc = window.frames[options.popName].document.getElementById(textareaid);
                        }
                        var pos = 0;
                        if( typeof document.selection != "undefined") {//IE
                            options.txtAreaObj.focus();
                            setCursorPosition(tc, cpos);//设置焦点
                            document.selection.createRange().text = faceText;
                            //计算光标位置
                            pos = getPositionForTextArea(tc); 
                        } else {//火狐
                            //计算光标位置
                            pos = tc.selectionStart + faceText.length;
                            options.txtAreaObj.val(options.txtAreaObj.val().substr(0, tc.selectionStart) + faceText + options.txtAreaObj.val().substring(tc.selectionStart, tclen));
                        }
                        cpos = pos;
                        setCursorPosition(tc, pos);//设置焦点
                        container.find("#nex_emoji_box").remove();

                    });
                    //处理js事件冒泡问题
                    $('body').bind("click", function(e) {
                        e.stopPropagation();
                        container.find('#nex_emoji_box').remove();
                        $(this).unbind('click');
                    });
                    if(options.popName != '') {
                        $(window.frames[options.popName].document).find('body').bind("click", function(e) {
                            e.stopPropagation();
                            container.find('#nex_emoji_box').remove();
                        });
                    }
                    container.find('#nex_emoji_box').bind("click", function(e) {
                        e.stopPropagation();
                    });
                    var offset = $(e.target).offset();
                    offset.top += options.top;
                    offset.left += options.left;
                    container.find("#nex_emoji_box").css(offset).show();
                });
            });
        },
    })
})(jQuery);



