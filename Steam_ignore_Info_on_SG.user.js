// ==UserScript==
// @name         Steam ignore Info on Steamgifts
// @version      1.3
// @description  Show if the game is ignored on Steam
// @author       JulLeBarge
// @match        http://www.steamgifts.com/*
// @match        https://www.steamgifts.com/*
// @grant        GM_xmlhttpRequest
// @namespace    https://github.com/jullebarge/Steam-ignore-info-on-SG
// @downloadURL  https://github.com/jullebarge/Steam-ignore-info-on-SG/raw/master/Steam_ignore_Info_on_SG.user.js
// @updateURL    https://github.com/jullebarge/Steam-ignore-info-on-SG/raw/master/Steam_ignore_Info_on_SG.user.js
// ==/UserScript==

if((window.location.href=="https://www.steamgifts.com/") || (window.location.href.indexOf("steamgifts.com/group/")) || (window.location.href.indexOf("steamgifts.com/giveaways/") > 0))
{
	console.log("Steamgifts Main Page detected");
    var games = document.getElementsByTagName("h2");
    console.log("Nb de jeux sur la page: " + games.length);
	//for(var i=0;i<1;i++)
    for(var i=0;i<games.length;i++)
	{
        //console.log(games[i].querySelector('a').innerHTML);
        var LienTrouve = games[i].querySelectorAll('a')[1];
        //console.log(LienTrouve.href);
        (function (link_inside) {
            GM_xmlhttpRequest({
                method: "GET",
                url: link_inside.href,
                onload: function(xhr) {
                    //console.log(xhr.responseText);
                    if(xhr.responseText.indexOf('<div class="btnv6_blue_hoverfade  btn_medium queue_btn_active" data-panel="{&quot;focusable&quot;:true,&quot;clickOnActivate&quot;:true}" style="" data-tooltip-text="Les titres ignorés ne vous seront pas recommandés et n\'apparaitront pas dans les espaces d\'affichage.">') > 0)
                        //<div class="btnv6_blue_hoverfade  btn_medium queue_btn_active" data-panel="{&quot;focusable&quot;:true,&quot;clickOnActivate&quot;:true}" style="" data-tooltip-text="Les titres ignorés ne vous seront pas recommandés et n'apparaitront pas dans les espaces d'affichage.">
                    {
                        link_inside.style.color="red";
                        //link_inside.className = "";
                    }
                    else if ((xhr.responseText.indexOf("adult_content_age_gate") > 0) || (xhr.responseText.indexOf("agecheck") > 0) || (xhr.responseText.indexOf("package_header_container") > 0))
                    {
                        link_inside.style.color="orange";
                    }
                    else if (xhr.responseText.indexOf("<title>Bienvenue sur Steam</title>") > 0)
                    {
                        link_inside.style.color="navy";
                    }
                    else
                    {
                        link_inside.style.color="green";
                    }
                }
            });
        })(LienTrouve);
	}
	games = null;
	LienTrouve = null;
}
