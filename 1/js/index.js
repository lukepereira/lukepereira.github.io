var ewig = "";
var holder ="";
function permuter(word) {
    var ind=0;
    var gate=0;
    var next = 0;
    var permuda = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z" ];
    word = word.toLowerCase();
    var polygon = [];
    for (ind=0; ind<word.length;ind++) {
        polygon[ind] = word.charCodeAt(ind) - 97;
    }
    if (polygon[polygon.length-1]<25) {
        polygon[polygon.length-1]++;}
    else {
        polygon[polygon.length-1]=0;
        for (ind = polygon.length-2; ind>-1; ind--){
            if(polygon[ind]<25) {polygon[ind]++; gate++; break;}
            else {polygon[ind]=0;}
        }
        if (gate==0) {polygon.unshift(0);}
    }
    holder = permuda[polygon[0]].toUpperCase();
    for     (ind = 1; ind < polygon.length; ind++) {
        holder= holder + permuda[polygon[ind]];
    }
    return holder;
}

function permute(eyedee) {
    var word1=document.getElementById(eyedee).innerHTML;
    ewig = setInterval(function() {document.getElementById(eyedee).innerHTML = permuter(word1); word1=holder;}, 1);}
function unpermute(term,eyedee) {
    clearInterval(ewig);
    document.getElementById(eyedee).innerHTML = term;}

var linkArray= [
"",
"page_1.html",
//"embed.html",
"#Siteswap_3b_531.gif",
//"#TPS_RPM_example.gif",
//"#Poles_of_cerebral_hemispheres_animation.gif",
//"#Potential_rotating_charge.gif",
//"#Poles_of_cerebral_hemispheres_animation.gif",
//"#Fifth_metacarpal_bone_(left_hand)_-_animation02.gif",
//"#Trapezoid_bone_-_animation01.gif",
//"#Net_of_tesseract.gif",
"#Thoracic_vertebra_9_animation3.gif",
"#Platonic_Solids_Stereo_4_-_Dodecahedron.gif",
//"#Potential_flow_around_a_wing.gif",
"#Vite.gif"]; 

function mySequence (i) {
    /*if (i% 2 == 0){
          window.open ('/images/' + i + '.jpg' )
    } */ 
  window.open ('http://lukeplato.com/' + linkArray[i], '_self', false);  
  setTimeout(function () {
    if (--i) {             
          mySequence(i);  // Call the loop again
    }
  }, 9000);
}



