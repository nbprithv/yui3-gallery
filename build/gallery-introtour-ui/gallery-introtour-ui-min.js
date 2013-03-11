YUI.add("gallery-introtour-ui",function(b,a){YUI.add("gallery-introtour-ui",function(d){d.namespace("Introtour");var c={},h=function(m){var n=0,l=0;if(m.offsetParent){do{n+=m.offsetLeft;l+=m.offsetTop;}while(m==m.offsetParent);}return[n,l];},g={"cardstyle":{"button":"#61399d","buttontext":"#000","title":"#fff","content":"#fff","cardborder":"#61399d"},"carddimension":{"height":"300px","width":"300px"},"initcardpos":{"marginleft":"-150px"},"buttonwelcome":{"content":"Start Tour","buttonid":"yui-galleryintrotourui-buttonwelcome-id"},"buttontourend":{"content":"Close","buttonid":"yui-galleryintrotourui-buttontourend-id"},"buttonnav":{"content":"Next","buttonid":"yui-galleryintrotourui-buttonnav-"}},j=function(m){if(!m){m=g.cardstyle;}else{var l=g.cardstyle;if(!m.button){m.button=l.button;}if(!m.buttontext){m.buttontext=l.buttontext;}if(!m.title){m.title=l.title;}if(!m.content){m.content=l.content;}if(!m.cardborder){m.border=l.border;}}return m;},f=function(q,p,l,n){var m=p.buttonid,o="",r="";if(!q.title){q.title="";}if(!q.content){q.content="";}if(n>0){m=m+n;}if(q.position==="right"){r="right";}else{if(q.position==="left"){r="left";}else{if(q.position==="top"){r="top";}else{if(q.position==="bottom"){r="bottom";}}}}if(r){o="<div class='yui-galleryintrotourui-card-arrow "+r+"'></div>";}o+="<div class='yui-galleryintrotourui-card-container'>"+"<div class='yui-galleryintrotourui-card-closebutton'>x</div><div class='yui-galleryintrotourui-clearfix'></div>"+"<div class='yui-galleryintrotourui-card-text'>"+"<div class='yui-galleyintroui-card-title'>"+q.title+"</div>"+"<div class='yui-galleryintrotourui-card-content'>"+q.content+"</div>"+"</div>"+"<div class='yui-galleryintrotourui-card-nav'>"+"<button data-seqid='"+l+"' id='"+m+"' class='yui-galleryintrotourui-card-next yui3-button notice'>"+p.content+"</button>"+"</div>"+"</div>";return o;},e=function(o,m,t,l,s,n,r){var q={},p;if(!s){q=g.buttonnav;}else{if(s==="welcome"){q=g.buttonwelcome;n="welcome";}else{if(s==="end"){q=g.buttontourend;n="end";}}}p=f(t,q,n,r),node=new d.Node(document.createElement("div"));node.addClass("yui-galleryintrotourui-card");node.setAttribute("id",l);node.setStyle("width",g.carddimension.width);node.setStyle("top",o);node.setStyle("left",m);node.set("innerHTML",p);if(s==="welcome"||s==="end"){node.setStyle("marginLeft",g.initcardpos.marginleft);}d.one("body").appendChild(node);},k=function(l,o){var m=0,n=0;if((l.position==="left"||l.position==="right")&&l.width==="undefined"){l.width=0;}if((l.position==="top"||l.position==="bottom")&&l.height==="undefined"){l.width=0;}o[0]=parseInt(o[0],10);o[1]=parseInt(o[1],10);l.width=parseInt(l.width,10);l.height=parseInt(l.height,10);switch(l.position){case"right":m=o[1];n=o[0]+l.width;break;case"left":m=o[1];n=o[0]-l.width-300;break;case"top":m=o[1]-l.height;n=o[0];break;case"bottom":m=o[1]+l.height;n=o[0];break;default:m=o[1];n=o[0]+50;break;}o[1]=m;o[0]=n;return o;},i=function(){document.activeElement.blur();window.scrollTo(c.hscroll,c.vscroll);d.all(".yui-galleryintrotourui-card").setStyle("display","none");c.prevActiveElement.focus();};d.Introtour.init=function(q,m){c.hscroll=(document.all?document.scrollLeft:window.pageXOffset),c.vscroll=(document.all?document.scrollTop:window.pageYOffset);c.prevActiveElement=document.activeElement;m=j(m);e("60px","50%",q[0],"galleryintrotourui-card-welcome","welcome",0);for(var o=1;o<q.length;o++){var n=q[o],p=document.getElementById(n.target),r,l=o;if(p){r=h(p),id="galleryintrotourui-card-"+o;r=k(n,r);r[1]=r[1]+"px";r[0]=r[0]+"px";if(o===q.length-2){o="end";}e(r[1],r[0],n,id,"",o,l);}}e("60px","50%",q[q.length-1],"galleryintrotourui-card-endtour","end",0);window.scrollTo(0,0);d.one("#galleryintrotourui-card-welcome").setStyle("display","block");d.one("#yui-galleryintrotourui-buttonwelcome-id").focus();d.on("click",function(){var s=this.getAttribute("data-seqid"),v="",w="";this.blur();d.all(".yui-galleryintrotourui-card").setStyle("display","none");if(s==="welcome"){v="#galleryintrotourui-card-1";w="#yui-galleryintrotourui-buttonnav-1";}else{if(s==="end"){v="#galleryintrotourui-card-endtour";w="#yui-galleryintrotourui-buttontourend-id";}else{s++;v="#galleryintrotourui-card-"+s;w="#yui-galleryintrotourui-buttonnav-"+s;}}if(this.getAttribute("id")==="yui-galleryintrotourui-buttontourend-id"){d.all(".yui-galleryintrotourui-card").setStyle("display","none");}else{d.one(v).setStyle("display","block");d.one(w).focus();if(s!=="end"){var t=d.one(v).getStyle("top"),u=d.one(v).getStyle("left");t=t.split("px");u=u.split("px");window.scrollTo(u[0],t[0]);}else{window.scrollTo(0,0);}}},".yui-galleryintrotourui-card-next");d.on("click",i,".yui-galleryintrotourui-card-closebutton");d.one("body").on("key",i,"esc");};},"0.1.1",{requires:["node","event"]});},"@VERSION@",{"use":["yui-base","yui3","node","event"],"requires":["yui-base"]});