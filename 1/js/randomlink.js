importScript("User:GregU/randomlink.js");

addOnloadHook( function()
{
  // Other special cases are "Special:RecentChangesLinked" and "Special:Contributions"
  addPortletLink('p-navigation', 'javascript:randomLink("Special:WhatLinksHere")',
                 'Random back-link', 'n-randomback', 'Random page that links here');

  addPortletLink('p-navigation', 'javascript:randomLink("Special:AllPages",4)',
                 'Random page', 'n-randompage2', 'Load a random article, the slow way');

  // Ignore most of the top and bottom meta links on WP:FA
  randomlink_exclude = /^Wikipedia:|^Portal:|^(Lists?|Outline|Library) of|^(Deaths in )?20\d\d$/;
 
  addPortletLink('p-navigation', 'javascript:randomLink("Wikipedia:Featured articles")',
                 'Featured article', 'n-randomfa', 'Pick a random featured article');

  vgcats = "Top|High|Mid|Low|Low|Low|Low|Low|Low|Low|NA|Unknown";
  vgcats = vgcats.replace(/\w+/g, "Category:$&-importance video game articles");

  addPortletLink('p-navigation', 'javascript:randomlink_paged=1;randomLink(vgcats)',
                 'Video game article', 'n-randomvg', 'Random article in WikiProject Video games');

  // WhatLinksHere is probably a better way to find all articles in a WikiProject
  bblist = "Special:WhatLinksHere/Template:WikiProject_Baseball?namespace=1&hidelinks=1&limit=250";

  addPortletLink('p-navigation', 'javascript:randomlink_paged=1;randomlink_maxfrom=24000000;randomLink(bblist)',
                 'Baseball article', 'n-randombb', 'Random article in WikiProject Baseball');
});