"use strict";(()=>{window.addEventListener("load",function(){let o=["Europe/Vienna","Europe/Brussels","Europe/Sofia","Europe/Zagreb","Asia/Famagusta","Asia/Nicosia","Europe/Prague","Europe/Copenhagen","Europe/Tallinn","Europe/Helsinki","Europe/Paris","Europe/Berlin","Europe/Busingen","Europe/Athens","Europe/Budapest","Europe/Dublin","Europe/Rome","Europe/Riga","Europe/Vilnius","Europe/Luxembourg","Europe/Malta","Europe/Amsterdam","Europe/Warsaw","Atlantic/Azores","Atlantic/Madeira","Europe/Lisbon","Europe/Bucharest","Europe/Bratislava","Europe/Ljubljana","Africa/Ceuta","Atlantic/Canary","Europe/Madrid","Europe/Stockholm"],a=Intl.DateTimeFormat().resolvedOptions().timeZone;if(o.includes(a)){var t=initCookieConsent();t.run({current_lang:"en",autoclear_cookies:!0,page_scripts:!0,onFirstAction:function(e,i){},onAccept:function(e){},onChange:function(e,i){},languages:{en:{consent_modal:{title:"Please accept our cookies",description:'We use cookies to track visitor traffic so we can learn to improve the website and documentation. <a aria-label="Cookie policy" class="cc-link" data-cc="c-settings">Read more</a>',primary_btn:{text:"Accept",role:"accept_all"},secondary_btn:{text:"Reject",role:"accept_necessary"}},settings_modal:{title:"Cookie preferences",save_settings_btn:"Save settings",accept_all_btn:"Accept all",reject_all_btn:"Reject all",close_btn_label:"Close",cookie_table_headers:[{col1:"Name"},{col2:"Domain"},{col3:"Expiration"},{col4:"Description"}],blocks:[{title:"Cookie usage",description:'The Modular Docs website uses browser cookies only to track website traffic with Google Analytics. For more details about how we handle sensitive data, please read our <a href="https://www.modular.com/privacy" class="cc-link">privacy policy</a>.'},{title:"Google Analytics cookies",description:"These cookies track website usage and are unique to this website.",toggle:{value:"analytics",enabled:!1,readonly:!1},cookie_table:[{col1:"^_ga",col2:"google.com",col3:"2 years",col4:"Google Analytics",is_regex:!0}]}]}}}})}});})();
