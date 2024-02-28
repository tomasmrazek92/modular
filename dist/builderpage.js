"use strict";(()=>{var E=n=>{let a=t=>{if(t.nodeType===Node.TEXT_NODE){if(!t.parentNode.classList.contains("letter")){let s=t.textContent,d=document.createDocumentFragment();for(let i=0;i<s.length;i++){let l=document.createElement("span");l.className="letter",l.textContent=s[i],d.appendChild(l)}t.parentNode.replaceChild(d,t)}}else t.nodeType===Node.ELEMENT_NODE&&t.tagName!=="BR"&&Array.from(t.childNodes).forEach(a)};$(n).contents().each(function(){a(this)})},k=(n,a)=>{let t=gsap.timeline(),s=0;return $(n).each((d,i)=>{let l=$(i).find(".letter").not(".line-numbers-row .code-letter"),e=$(i).find(".word-highlight");if(l.each((r,c)=>{t.fromTo(c,{visibility:"hidden"},{visibility:"initial"},s*a,"<"),s++}),e.length){let r=e[0],c=window.getComputedStyle(r).getPropertyValue("background-color"),p=window.getComputedStyle(r).getPropertyValue("box-shadow"),o=(g,h)=>{let[C,T,_]=g.match(/\w\w/g).map(N=>parseInt(N,16));return`rgba(${C}, ${T}, ${_}, ${h})`},m=g=>{let h=g.replace(/^rgba?\(/,"").replace(/\)$/,"").split(",");return`rgba(${h[0]}, ${h[1]}, ${h[2]}, 0)`},u=g=>/^#(?:[0-9a-f]{3}){1,2}$/i.test(g),y=u(c)?o(c,0):m(c),v=p.replace(/rgba?\([^)]+\)/g,g=>u(g)?o(g,0):m(g));Array.from(e).forEach(g=>{g.style.backgroundColor=y,g.style.boxShadow=v}),t.to(e,{backgroundColor:c,boxShadow:p,duration:.35},"<")}}),t};var f=n=>{let a=$(n).find("code"),t=a.find(".line-numbers-rows").eq(0).clone();return a.find(".line-numbers-rows").remove(),E(a),a.prepend(t),k(a,.01)},b=(n,a)=>{let t=gsap.timeline();return t.to(n,{text:{value:a,ease:"none",speed:1}},"<"),t};function w({tabs:n,cards:a,onCardLeave:t,onTabLeave:s,onCardShow:d,onTabShow:i}){if(n.length!==a.length)throw new Error(`Cards length: ${a.length} did not match tabs length: ${n.length}`);let l=!1,e=0;async function r(o){let m=o===0?a.length-1:o-1;await Promise.all([t(a.eq(m)),s(n.eq(m))]),await Promise.all([d(a.eq(o)),i(n.eq(o))])}async function c(){for(;!l;)await r(e),e+=1,e===a.length&&(e=0)}n.each((o,m)=>{m.onclick=()=>{t(a.eq(e)),s(n.eq(e)),d(a.eq(o)),i(n.eq(o)),l=!0,e=o}});let p=new IntersectionObserver(o=>{o[0].intersectionRatio<=0||(c(),p.unobserve(n[0]))},{threshold:1});p.observe(n[0])}function x({animateOnSlide:n,sliderSelector:a,onInit:t,duration:s}){function d({activeIndex:i,slides:l}){l.length!==0&&n($(l[i]))}new Swiper(a,{slidesPerView:1,spaceBetween:24,speed:250,autoplay:{delay:s},observer:!0,on:{init:i=>{t(),d(i)},transitionEnd:i=>{d(i)}},pagination:{el:".swiper-navigation",type:"bullets",clickable:!0,bulletActiveClass:"w-active",bulletClass:"w-slider-dot"}})}$(document).ready(function(){function n(){let e=gsap.timeline({}),r=$(".headerb_visual img"),c=r.length,p=2,o=.75,m=p+o,u=m*(c-1)+o;gsap.set(".headerb_visual",{autoAlpha:1}),e.from(r,{duration:p,opacity:0,stagger:{each:m,repeat:-1,repeatDelay:u}}).to(r,{duration:p,opacity:0,stagger:{each:m,repeat:-1,repeatDelay:u}},m)}n(),animation.pause(imgDuration),gsap.delayedCall(1,()=>animation.play());let a="tab-active",t=".tabs_block-progress-line",s=".dashboard_head-filename",d=gsap.timeline({imgPaused:!0}),i=4e3;function l(e){return new Promise(r=>{e.show();let c=e.find(".file-name").text(),p=e.parent().parent().find(s);p.text("");let o=gsap.timeline();o.add(b(p,c)),d.add(f(e)).add(o,"<"),d.play(),d.then(r)})}w({tabs:$(".tabs").eq(0).find(".tabs_block-link-menu .tabs_block-link"),cards:$(".tabs").eq(0).find(".cardb_visual .dashboard_code-block"),onCardLeave:e=>{e.hide()},onTabLeave:e=>{e.removeClass(a),e.find(t).stop(),e.find(t).css("width","0")},onCardShow:l,onTabShow:e=>new Promise(r=>{e.addClass(a),e.find(t).animate({width:"100%"},i,r)})}),x({sliderSelector:".tabs_slider._1",animateOnSlide(e){e.find(t).stop(!0,!0).css("width","0").animate({width:"100%"},i);let r=e.find(".dashboard_code-block");r&&!r.hasClass("animated")&&(l(r),r.addClass("animated"))},onInit(){let e=$(".tabs_slider").eq(0).find(".cardb_visual .dashboard_code-block");$(e).hide()},duration:i})});})();
