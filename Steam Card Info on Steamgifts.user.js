// ==UserScript==
// @name         Steam Card Info on Steamgifts
// @namespace    https://github.com/jullebarge/SteamGifts_Cards
// @version      1.7.1
// @description  Show cards available for games on Steamgifts
// @author       Jullebarge
// @match        http://www.steamgifts.com/*
// @match        https://www.steamgifts.com/*
// @grant         GM_xmlhttpRequest
// ==/UserScript==

if((window.location.href=="https://www.steamgifts.com/") || (window.location.href.indexOf("steamgifts.com/group/")) || (window.location.href.indexOf("steamgifts.com/giveaways/") > 0)) //I'm on a Steamgifts page
{
	console.log("Steamgifts Main Page detected");
    var games = document.getElementsByTagName("h2");
	for(var i=0;i<games.length;i++)
	{
		var classe =games[i].getAttribute("class");
			if(classe=="giveaway__heading")
			{
				var links = games[i].getElementsByTagName("a");
				for(var j=0;j<links.length;j++)
				{
                    var LienTrouve = links[j];
					if (LienTrouve.getAttribute("class")=="giveaway__icon" && LienTrouve.getAttribute("href").substring(0,9)!="/giveaway")
                    {
                        (function (link_inside) {
                            GM_xmlhttpRequest({
                                method: "GET",
                                url: link_inside.href,
                                onload: function(xhr) {
                                    if(xhr.responseText.indexOf("ico_cards.png") > 0)
                                    {
                                        link_inside.style.color="green";
                                        link_inside.className = "";
                                    }
                                    else if ((xhr.responseText.indexOf("adult_content_age_gate") > 0) || (xhr.responseText.indexOf("agecheck") > 0))
                                    {
                                        link_inside.style.color="orange";
                                    }
                                    else
                                    {
                                        link_inside.style.color="red";
                                    }
                                }
                            });
                        })(LienTrouve);

                    }
				}
			}
	}
	games = null;
	classe = null;
	links = null;
	LienTrouve = null;
}
else if(window.location.href.indexOf("steamgifts.com/giveaway/") > 0) //I'm on Steamgifts giveaway page
{
	console.log("Steamgifts Giveaway Page detected");
    var games = document.getElementsByClassName("featured__outer-wrap featured__outer-wrap--giveaway");
	for(var i=0;i<games.length;i++)
	{
		var links = games[i].getElementsByTagName("img");
		for(var j=0;j<links.length;j++)
		{
			var LienTrouve = links[j];
            var Steamlink =LienTrouve.parentElement.href;
            console.log("Lien Steam du jeu : " + Steamlink);
			if (Steamlink.indexOf("store.steampowered.com/app") > 0)
			{
				(function (link_inside) {
					GM_xmlhttpRequest({
						method: "GET",
						url: Steamlink,
						onload: function(xhr) {
							if(xhr.responseText.indexOf("ico_cards.png") > 0)
							{
								link_inside.parentNode.parentNode.parentNode.style.backgroundColor="green";
							}
							else if (xhr.responseText.indexOf("Veuillez indiquer votre date de naissance pour continuer") > 0)
							{
								link_inside.parentNode.parentNode.parentNode.style.backgroundColor="orange";
							}
							else
							{
								link_inside.parentNode.parentNode.parentNode.style.backgroundColor="red";
							}
						}
					});
				})(LienTrouve);
			}
		}
	}
	games = null;
	links = null;
	LienTrouve = null;
    Steamlink = null;
}
