"use strict";(()=>{var g,a=[["First name","Last name","Email","Modular Product Name"],["Company name","Size","Industry"]],k={"First name":"Please fill your first name.","Last name":"Please fill your last name.",Email:"Please fill your email.","Company name":"Please fill your company name.",Industry:"Please select your industry."},u=["Next","Submit"],f="#formBtn";var c,r,i=0;function v(){document.querySelectorAll(".hs-form-field label span").forEach(e=>{a.forEach((t,s)=>{t.forEach(n=>{e.textContent.trim()===n&&e.closest(".hs-form-field").setAttribute("data-step",s)})})})}hbspt.forms.create({region:"na1",portalId:"24141518",formId:"456272d6-bcc6-477d-95bc-5efde20524fe",target:"#form-container",onFormReady:function(e){g=e,m(),$(f).on("click",function(){if(P())b()||i===a.length-1?p():x();else return}),$("input, select, :checkbox, :radio").not("[type=email]").on("input focus change",function(){let t=$(f);b()?(i>0&&m(),t.text(u[1])):i!==a.length-1&&t.text(u[0]),d($(this))}),$(".hs-form-checkbox").on("click",function(){$(this).find("input[type=checkbox]").is(":checked")?$(this).find("label").addClass("active"):$(this).find("label").removeClass("active")}),$(".hs-form-radio").on("change",function(){let t=$(this).find("input[type=radio]").attr("name");$('input[name="'+t.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&")).closest("label").removeClass("active"),$(this).find("input[type=radio]").is(":checked")&&$(this).find("label").addClass("active")}),$("select").niceSelect(),$(".nice-select li").on("click",function(){$(".nice-select .current").css("color","#020c13")})}});function m(){i=0,c=$(".hs-form-field"),v(),c.hide(),$(".sign-up_step-inner").animate({opacity:1},300),r=c.filter(`[data-step=${i}]`),r.fadeIn("slow")}function x(){let e=$(f);i+=1,r=c.filter(`[data-step=${i}]`),i===a.length-1?e.text(u[1]):e.text(u[0]),r.fadeIn("slow");let t=r.find("input").eq(0),s=t.offset().top,n=$(window).height(),o=s-n/2;$("html, body").animate({scrollTop:o},500),t.focus()}function p(){d(),g.find("input[type=submit]").trigger("click")}function C(e){let t=!0,s=$(e).val(),o=$(e).closest(".input").siblings("label").find("span").eq(0).text(),l=k[o]||`Error for ${o}`;return(s===""||s==null)&&(y(l,e),t=!1),t}function h(e){if(!e.length)return!0;let t=e.is(":checked"),n=e.first().closest(".inputs-list");return t?!0:(y("Please select at least one option.",n),!1)}var E=new Set;function b(){return $('.hs-input[type="checkbox"]').filter(":checked").length===1&&$('.hs-input[type="checkbox"]:checked[value="mojo"]').length===1}function y(e,t){let s=$(t).closest(".input");if(s.next().hasClass("hs-error-msgs"))return;let n=$("<label>",{class:"hs-error-msg hs-main-font-element",text:e}),o=$("<ul>",{class:"no-list hs-error-msgs inputs-list custom-error-msg",role:"alert"}),l=$("<li>");l.append(n),o.append(l),s.after(o),t.tagName==="INPUT"&&$(t).addClass("invalid error custom-error-class")}function d(e){let t=e?$(e).closest(".hs-form-field"):$(document.body),s=t.find(".custom-error-msg"),n=t.find(".custom-error-class");s.remove(),n.removeClass("invalid error custom-error-class")}function P(){let e=!0;d(),r.find(":input:visible,select").not("[type=email]").each(function(){e=C(this)&&e});let s=$("input[type=email]");s.get(0).focus(),s.get(0).blur();let n=r.find(":checkbox:visible"),o=r.find(":radio:visible");return e=h(n,"checkbox")&&e,e=h(o,"radio")&&e,E.add(i),e}})();
