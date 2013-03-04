if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/gallery-introtour-ui/gallery-introtour-ui.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-introtour-ui/gallery-introtour-ui.js",
    code: []
};
_yuitest_coverage["build/gallery-introtour-ui/gallery-introtour-ui.js"].code=["YUI.add('gallery-introtour-ui', function (Y, NAME) {","","/*******************************************/","/*","YUI Gallery Intro Tour module","Set up step by step intro tours on your page.","Usage:","	YUI().use(\"gallery-introtour-ui\",function(Y){","		var tour_cards = [{'title':'Welcome','position':'pagecenter','content':},","							{'title':'Click here to start','target':'#clickhere','position':'right','width':'30'},","							{'title':'Next click here to cont..','target':'#continue','position':'top',height:'20'},","							{'title':'That's it!','position':'pagecenter'}];","		Y.Introtour.init(tour_cards);","	});","","IMPORTANT:","1. The div ID you pass cannot be hidden at the time of calling the init function.","2. The div ID you pass needs to have an ancestor which has position:relative.","*/","/*******************************************/","YUI.add('gallery-introtour-ui', function(Y) {","	Y.namespace('Introtour');","	var privateVars={},","	findpos = function (obj){","		var curleft =0,","		curtop = 0;","			if (obj.offsetParent) {","				do {","					curleft += obj.offsetLeft;","					curtop += obj.offsetTop;","				} while (obj == obj.offsetParent);","			}","		return [curleft,curtop];","	},","	ATTRS = {","		'cardstyle':{'button':'#61399d','buttontext':'#000','title':'#fff','content':'#fff','cardborder':'#61399d'},","		'carddimension':{'height':'300px','width':'300px'},","		'initcardpos':{'marginleft':'-150px'},","		'buttonwelcome':{'content':'Start Tour','buttonid':'yui-galleryintrotourui-buttonwelcome-id'},","		'buttontourend':{'content':'Close','buttonid':'yui-galleryintrotourui-buttontourend-id'},","		'buttonnav':{'content':'Next','buttonid':'yui-galleryintrotourui-buttonnav-'}","		","	},","	setcardstyle = function(cardstyle){","		if(!cardstyle){","			cardstyle = ATTRS.cardstyle;","		}else{","			var defAttrs = ATTRS.cardstyle;","			if(!cardstyle.button){cardstyle.button = defAttrs.button;}","			if(!cardstyle.buttontext){cardstyle.buttontext = defAttrs.buttontext;}","			if(!cardstyle.title){cardstyle.title = defAttrs.title;}","			if(!cardstyle.content){cardstyle.content = defAttrs.content;}","			if(!cardstyle.cardborder){cardstyle.border = defAttrs.border;}","		}","		return cardstyle;","	},","	slideTemplate = function(ci,button,seqid,index){","		var buttonid = button.buttonid,","		html = \"\",","		arrowclass = \"\";","		if(!ci.title){ci.title=\"\";}","		if(!ci.content){ci.content=\"\";}","		if(index > 0){buttonid = buttonid+index;}","		if(ci.position === \"right\"){arrowclass=\"right\";}","		else if(ci.position === \"left\"){arrowclass=\"left\";}","		else if(ci.position === \"top\"){arrowclass=\"top\";}","		else if(ci.position === \"bottom\"){arrowclass=\"bottom\";}","		if(arrowclass){html = \"<div class='yui-galleryintrotourui-card-arrow \"+arrowclass+\"'></div>\";}","		html += \"<div class='yui-galleryintrotourui-card-container'>\"+","						\"<div class='yui-galleryintrotourui-card-closebutton'>x</div><div class='yui-galleryintrotourui-clearfix'></div>\"+","						\"<div class='yui-galleryintrotourui-card-text'>\"+","							\"<div class='yui-galleyintroui-card-title'>\"+ci.title+\"</div>\"+","							\"<div class='yui-galleryintrotourui-card-content'>\"+ci.content+\"</div>\"+","						\"</div>\"+","						\"<div class='yui-galleryintrotourui-card-nav'>\"+","							\"<button data-seqid='\"+seqid+\"' id='\"+buttonid+\"' class='yui-galleryintrotourui-card-next yui3-button notice'>\"+button.content+\"</button>\"+","						\"</div>\"+","					\"</div>\";","		return html;","	},","	generateSlideDom = function(toppos,leftpos,ci,id,type,seqid,index){","		var button = {},","		html;","		if(!type){button = ATTRS.buttonnav;}","		else if(type === \"welcome\"){button=ATTRS.buttonwelcome;seqid=\"welcome\";}","		else if(type === \"end\"){button=ATTRS.buttontourend;seqid=\"end\";}","		html = slideTemplate(ci,button,seqid,index),","		node = new Y.Node(document.createElement('div'));","		node.addClass('yui-galleryintrotourui-card');","		node.setAttribute('id',id);","		node.setStyle('width',ATTRS.carddimension.width);","		node.setStyle('top',toppos);","		node.setStyle('left',leftpos);","		node.set('innerHTML',html);","		if(type === \"welcome\" || type === \"end\"){","			node.setStyle(\"marginLeft\",ATTRS.initcardpos.marginleft);","		}","		Y.one('body').appendChild(node);","	},","	getCardPos = function(ci,pos){","		var toppos = 0,","		leftpos = 0;","		if((ci.position === 'left' || ci.position === 'right') && ci.width === 'undefined'){","			ci.width = 0;","		}","		if((ci.position === 'top' || ci.position === 'bottom') && ci.height === 'undefined'){","			ci.width = 0;","		}","		pos[0] = parseInt(pos[0],10);","		pos[1] = parseInt(pos[1],10);","		ci.width = parseInt(ci.width,10);","		ci.height = parseInt(ci.height,10);","		switch(ci.position){","			case \"right\":","				toppos = pos[1];","				leftpos = pos[0]+ci.width;","			break;","			case \"left\":","				toppos = pos[1];","				leftpos = pos[0]-ci.width-300;","			break;","			case \"top\":","				toppos = pos[1]-ci.height;","				leftpos = pos[0];","			break;","			case \"bottom\":","				toppos = pos[1]+ci.height;","				leftpos = pos[0];","			break;","			default:","				toppos = pos[1];","				leftpos = pos[0]+50;","			break;","		}","		pos[1] = toppos;","		pos[0] = leftpos;","		return pos;","	},","	closeIntro = function(){","		document.activeElement.blur();","		window.scrollTo(privateVars.hscroll,privateVars.vscroll);","		Y.all(\".yui-galleryintrotourui-card\").setStyle(\"display\",\"none\");","		privateVars.prevActiveElement.focus();","	};","	Y.Introtour.init = function(cardinfo,cardstyle){","		privateVars.hscroll = (document.all ? document.scrollLeft : window.pageXOffset),","		privateVars.vscroll = (document.all ? document.scrollTop : window.pageYOffset);","		privateVars.prevActiveElement = document.activeElement;","","		cardstyle = setcardstyle(cardstyle);","		generateSlideDom(\"60px\",\"50%\",cardinfo[0],'galleryintrotourui-card-welcome','welcome',0);","		for(var i=1;i<cardinfo.length;i++){","			var ci = cardinfo[i],","			elem = document.getElementById(ci.target),","			pos,","			index=i;","			if(elem){","				pos = findpos(elem),","				id='galleryintrotourui-card-'+i;","				pos = getCardPos(ci,pos);","				pos[1] = pos[1]+\"px\";","				pos[0] = pos[0]+\"px\";","				if(i===cardinfo.length-2){i=\"end\";}","				generateSlideDom(pos[1],pos[0],ci,id,'',i,index);","			}","		}","		generateSlideDom(\"60px\",\"50%\",cardinfo[cardinfo.length-1],'galleryintrotourui-card-endtour','end',0);","		window.scrollTo(0,0);","		Y.one('#galleryintrotourui-card-welcome').setStyle('display','block');","		Y.one(\"#yui-galleryintrotourui-buttonwelcome-id\").focus();","		Y.on(\"click\",function(){","			var seqid = this.getAttribute(\"data-seqid\"),","			carddivid = \"\",","			buttondivid = \"\";//\"#yui-galleryintrotourui-buttonnav-\"+seqid;","			this.blur();","			Y.all(\".yui-galleryintrotourui-card\").setStyle(\"display\",\"none\");","			if(seqid === \"welcome\"){","				carddivid = \"#galleryintrotourui-card-1\";","				buttondivid = \"#yui-galleryintrotourui-buttonnav-1\";","			}else if(seqid === \"end\"){","				carddivid = \"#galleryintrotourui-card-endtour\";","				buttondivid = \"#yui-galleryintrotourui-buttontourend-id\";","			}else{","				seqid++;","				carddivid = '#galleryintrotourui-card-'+seqid;","				buttondivid = '#yui-galleryintrotourui-buttonnav-'+seqid;","			}","			if(this.getAttribute(\"id\") === \"yui-galleryintrotourui-buttontourend-id\"){","				Y.all(\".yui-galleryintrotourui-card\").setStyle(\"display\",\"none\");","			}else{","				Y.one(carddivid).setStyle('display','block');","				Y.one(buttondivid).focus();","				if(seqid !== \"end\"){","					var toppos = Y.one(carddivid).getStyle('top'),","					leftpos = Y.one(carddivid).getStyle('left');","					toppos = toppos.split(\"px\");","					leftpos = leftpos.split(\"px\");","					window.scrollTo(leftpos[0],toppos[0]);","				}else{","					window.scrollTo(0,0);","				}","			}","		},\".yui-galleryintrotourui-card-next\");","		Y.on(\"click\",closeIntro,\".yui-galleryintrotourui-card-closebutton\");","		Y.one('body').on('key',closeIntro,'esc');","	};","}, '0.1.1',{requires: ['node','event']});","","","}, '@VERSION@', {\"use\": [\"yui-base\", \"yui3\", \"node\", \"event\"], \"requires\": [\"yui-base\"]});"];
_yuitest_coverage["build/gallery-introtour-ui/gallery-introtour-ui.js"].lines = {"1":0,"21":0,"22":0,"23":0,"25":0,"27":0,"28":0,"29":0,"30":0,"33":0,"45":0,"46":0,"48":0,"49":0,"50":0,"51":0,"52":0,"53":0,"55":0,"58":0,"61":0,"62":0,"63":0,"64":0,"65":0,"66":0,"67":0,"68":0,"69":0,"79":0,"82":0,"84":0,"85":0,"86":0,"87":0,"89":0,"90":0,"91":0,"92":0,"93":0,"94":0,"95":0,"96":0,"98":0,"101":0,"103":0,"104":0,"106":0,"107":0,"109":0,"110":0,"111":0,"112":0,"113":0,"115":0,"116":0,"117":0,"119":0,"120":0,"121":0,"123":0,"124":0,"125":0,"127":0,"128":0,"129":0,"131":0,"132":0,"133":0,"135":0,"136":0,"137":0,"140":0,"141":0,"142":0,"143":0,"145":0,"146":0,"148":0,"150":0,"151":0,"152":0,"153":0,"157":0,"158":0,"160":0,"161":0,"162":0,"163":0,"164":0,"167":0,"168":0,"169":0,"170":0,"171":0,"172":0,"175":0,"176":0,"177":0,"178":0,"179":0,"180":0,"181":0,"182":0,"184":0,"185":0,"186":0,"188":0,"189":0,"191":0,"192":0,"193":0,"194":0,"196":0,"197":0,"198":0,"200":0,"204":0,"205":0};
_yuitest_coverage["build/gallery-introtour-ui/gallery-introtour-ui.js"].functions = {"findpos:24":0,"setcardstyle:44":0,"slideTemplate:57":0,"generateSlideDom:81":0,"getCardPos:100":0,"closeIntro:139":0,"(anonymous 3):171":0,"init:145":0,"(anonymous 2):21":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-introtour-ui/gallery-introtour-ui.js"].coveredLines = 119;
_yuitest_coverage["build/gallery-introtour-ui/gallery-introtour-ui.js"].coveredFunctions = 10;
_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 1);
YUI.add('gallery-introtour-ui', function (Y, NAME) {

/*******************************************/
/*
YUI Gallery Intro Tour module
Set up step by step intro tours on your page.
Usage:
	YUI().use("gallery-introtour-ui",function(Y){
		var tour_cards = [{'title':'Welcome','position':'pagecenter','content':},
							{'title':'Click here to start','target':'#clickhere','position':'right','width':'30'},
							{'title':'Next click here to cont..','target':'#continue','position':'top',height:'20'},
							{'title':'That's it!','position':'pagecenter'}];
		Y.Introtour.init(tour_cards);
	});

IMPORTANT:
1. The div ID you pass cannot be hidden at the time of calling the init function.
2. The div ID you pass needs to have an ancestor which has position:relative.
*/
/*******************************************/
_yuitest_coverfunc("build/gallery-introtour-ui/gallery-introtour-ui.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 21);
YUI.add('gallery-introtour-ui', function(Y) {
	_yuitest_coverfunc("build/gallery-introtour-ui/gallery-introtour-ui.js", "(anonymous 2)", 21);
_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 22);
Y.namespace('Introtour');
	_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 23);
var privateVars={},
	findpos = function (obj){
		_yuitest_coverfunc("build/gallery-introtour-ui/gallery-introtour-ui.js", "findpos", 24);
_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 25);
var curleft =0,
		curtop = 0;
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 27);
if (obj.offsetParent) {
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 28);
do {
					_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 29);
curleft += obj.offsetLeft;
					_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 30);
curtop += obj.offsetTop;
				}while (obj == obj.offsetParent);
			}
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 33);
return [curleft,curtop];
	},
	ATTRS = {
		'cardstyle':{'button':'#61399d','buttontext':'#000','title':'#fff','content':'#fff','cardborder':'#61399d'},
		'carddimension':{'height':'300px','width':'300px'},
		'initcardpos':{'marginleft':'-150px'},
		'buttonwelcome':{'content':'Start Tour','buttonid':'yui-galleryintrotourui-buttonwelcome-id'},
		'buttontourend':{'content':'Close','buttonid':'yui-galleryintrotourui-buttontourend-id'},
		'buttonnav':{'content':'Next','buttonid':'yui-galleryintrotourui-buttonnav-'}
		
	},
	setcardstyle = function(cardstyle){
		_yuitest_coverfunc("build/gallery-introtour-ui/gallery-introtour-ui.js", "setcardstyle", 44);
_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 45);
if(!cardstyle){
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 46);
cardstyle = ATTRS.cardstyle;
		}else{
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 48);
var defAttrs = ATTRS.cardstyle;
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 49);
if(!cardstyle.button){cardstyle.button = defAttrs.button;}
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 50);
if(!cardstyle.buttontext){cardstyle.buttontext = defAttrs.buttontext;}
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 51);
if(!cardstyle.title){cardstyle.title = defAttrs.title;}
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 52);
if(!cardstyle.content){cardstyle.content = defAttrs.content;}
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 53);
if(!cardstyle.cardborder){cardstyle.border = defAttrs.border;}
		}
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 55);
return cardstyle;
	},
	slideTemplate = function(ci,button,seqid,index){
		_yuitest_coverfunc("build/gallery-introtour-ui/gallery-introtour-ui.js", "slideTemplate", 57);
_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 58);
var buttonid = button.buttonid,
		html = "",
		arrowclass = "";
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 61);
if(!ci.title){ci.title="";}
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 62);
if(!ci.content){ci.content="";}
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 63);
if(index > 0){buttonid = buttonid+index;}
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 64);
if(ci.position === "right"){arrowclass="right";}
		else {_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 65);
if(ci.position === "left"){arrowclass="left";}
		else {_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 66);
if(ci.position === "top"){arrowclass="top";}
		else {_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 67);
if(ci.position === "bottom"){arrowclass="bottom";}}}}
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 68);
if(arrowclass){html = "<div class='yui-galleryintrotourui-card-arrow "+arrowclass+"'></div>";}
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 69);
html += "<div class='yui-galleryintrotourui-card-container'>"+
						"<div class='yui-galleryintrotourui-card-closebutton'>x</div><div class='yui-galleryintrotourui-clearfix'></div>"+
						"<div class='yui-galleryintrotourui-card-text'>"+
							"<div class='yui-galleyintroui-card-title'>"+ci.title+"</div>"+
							"<div class='yui-galleryintrotourui-card-content'>"+ci.content+"</div>"+
						"</div>"+
						"<div class='yui-galleryintrotourui-card-nav'>"+
							"<button data-seqid='"+seqid+"' id='"+buttonid+"' class='yui-galleryintrotourui-card-next yui3-button notice'>"+button.content+"</button>"+
						"</div>"+
					"</div>";
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 79);
return html;
	},
	generateSlideDom = function(toppos,leftpos,ci,id,type,seqid,index){
		_yuitest_coverfunc("build/gallery-introtour-ui/gallery-introtour-ui.js", "generateSlideDom", 81);
_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 82);
var button = {},
		html;
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 84);
if(!type){button = ATTRS.buttonnav;}
		else {_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 85);
if(type === "welcome"){button=ATTRS.buttonwelcome;seqid="welcome";}
		else {_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 86);
if(type === "end"){button=ATTRS.buttontourend;seqid="end";}}}
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 87);
html = slideTemplate(ci,button,seqid,index),
		node = new Y.Node(document.createElement('div'));
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 89);
node.addClass('yui-galleryintrotourui-card');
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 90);
node.setAttribute('id',id);
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 91);
node.setStyle('width',ATTRS.carddimension.width);
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 92);
node.setStyle('top',toppos);
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 93);
node.setStyle('left',leftpos);
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 94);
node.set('innerHTML',html);
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 95);
if(type === "welcome" || type === "end"){
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 96);
node.setStyle("marginLeft",ATTRS.initcardpos.marginleft);
		}
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 98);
Y.one('body').appendChild(node);
	},
	getCardPos = function(ci,pos){
		_yuitest_coverfunc("build/gallery-introtour-ui/gallery-introtour-ui.js", "getCardPos", 100);
_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 101);
var toppos = 0,
		leftpos = 0;
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 103);
if((ci.position === 'left' || ci.position === 'right') && ci.width === 'undefined'){
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 104);
ci.width = 0;
		}
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 106);
if((ci.position === 'top' || ci.position === 'bottom') && ci.height === 'undefined'){
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 107);
ci.width = 0;
		}
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 109);
pos[0] = parseInt(pos[0],10);
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 110);
pos[1] = parseInt(pos[1],10);
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 111);
ci.width = parseInt(ci.width,10);
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 112);
ci.height = parseInt(ci.height,10);
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 113);
switch(ci.position){
			case "right":
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 115);
toppos = pos[1];
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 116);
leftpos = pos[0]+ci.width;
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 117);
break;
			case "left":
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 119);
toppos = pos[1];
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 120);
leftpos = pos[0]-ci.width-300;
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 121);
break;
			case "top":
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 123);
toppos = pos[1]-ci.height;
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 124);
leftpos = pos[0];
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 125);
break;
			case "bottom":
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 127);
toppos = pos[1]+ci.height;
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 128);
leftpos = pos[0];
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 129);
break;
			default:
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 131);
toppos = pos[1];
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 132);
leftpos = pos[0]+50;
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 133);
break;
		}
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 135);
pos[1] = toppos;
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 136);
pos[0] = leftpos;
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 137);
return pos;
	},
	closeIntro = function(){
		_yuitest_coverfunc("build/gallery-introtour-ui/gallery-introtour-ui.js", "closeIntro", 139);
_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 140);
document.activeElement.blur();
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 141);
window.scrollTo(privateVars.hscroll,privateVars.vscroll);
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 142);
Y.all(".yui-galleryintrotourui-card").setStyle("display","none");
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 143);
privateVars.prevActiveElement.focus();
	};
	_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 145);
Y.Introtour.init = function(cardinfo,cardstyle){
		_yuitest_coverfunc("build/gallery-introtour-ui/gallery-introtour-ui.js", "init", 145);
_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 146);
privateVars.hscroll = (document.all ? document.scrollLeft : window.pageXOffset),
		privateVars.vscroll = (document.all ? document.scrollTop : window.pageYOffset);
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 148);
privateVars.prevActiveElement = document.activeElement;

		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 150);
cardstyle = setcardstyle(cardstyle);
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 151);
generateSlideDom("60px","50%",cardinfo[0],'galleryintrotourui-card-welcome','welcome',0);
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 152);
for(var i=1;i<cardinfo.length;i++){
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 153);
var ci = cardinfo[i],
			elem = document.getElementById(ci.target),
			pos,
			index=i;
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 157);
if(elem){
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 158);
pos = findpos(elem),
				id='galleryintrotourui-card-'+i;
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 160);
pos = getCardPos(ci,pos);
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 161);
pos[1] = pos[1]+"px";
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 162);
pos[0] = pos[0]+"px";
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 163);
if(i===cardinfo.length-2){i="end";}
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 164);
generateSlideDom(pos[1],pos[0],ci,id,'',i,index);
			}
		}
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 167);
generateSlideDom("60px","50%",cardinfo[cardinfo.length-1],'galleryintrotourui-card-endtour','end',0);
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 168);
window.scrollTo(0,0);
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 169);
Y.one('#galleryintrotourui-card-welcome').setStyle('display','block');
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 170);
Y.one("#yui-galleryintrotourui-buttonwelcome-id").focus();
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 171);
Y.on("click",function(){
			_yuitest_coverfunc("build/gallery-introtour-ui/gallery-introtour-ui.js", "(anonymous 3)", 171);
_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 172);
var seqid = this.getAttribute("data-seqid"),
			carddivid = "",
			buttondivid = "";//"#yui-galleryintrotourui-buttonnav-"+seqid;
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 175);
this.blur();
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 176);
Y.all(".yui-galleryintrotourui-card").setStyle("display","none");
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 177);
if(seqid === "welcome"){
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 178);
carddivid = "#galleryintrotourui-card-1";
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 179);
buttondivid = "#yui-galleryintrotourui-buttonnav-1";
			}else {_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 180);
if(seqid === "end"){
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 181);
carddivid = "#galleryintrotourui-card-endtour";
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 182);
buttondivid = "#yui-galleryintrotourui-buttontourend-id";
			}else{
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 184);
seqid++;
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 185);
carddivid = '#galleryintrotourui-card-'+seqid;
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 186);
buttondivid = '#yui-galleryintrotourui-buttonnav-'+seqid;
			}}
			_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 188);
if(this.getAttribute("id") === "yui-galleryintrotourui-buttontourend-id"){
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 189);
Y.all(".yui-galleryintrotourui-card").setStyle("display","none");
			}else{
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 191);
Y.one(carddivid).setStyle('display','block');
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 192);
Y.one(buttondivid).focus();
				_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 193);
if(seqid !== "end"){
					_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 194);
var toppos = Y.one(carddivid).getStyle('top'),
					leftpos = Y.one(carddivid).getStyle('left');
					_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 196);
toppos = toppos.split("px");
					_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 197);
leftpos = leftpos.split("px");
					_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 198);
window.scrollTo(leftpos[0],toppos[0]);
				}else{
					_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 200);
window.scrollTo(0,0);
				}
			}
		},".yui-galleryintrotourui-card-next");
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 204);
Y.on("click",closeIntro,".yui-galleryintrotourui-card-closebutton");
		_yuitest_coverline("build/gallery-introtour-ui/gallery-introtour-ui.js", 205);
Y.one('body').on('key',closeIntro,'esc');
	};
}, '0.1.1',{requires: ['node','event']});


}, '@VERSION@', {"use": ["yui-base", "yui3", "node", "event"], "requires": ["yui-base"]});
