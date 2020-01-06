
// Define text and declare variables
// var sourceText = "The Hitchhiker's Guide to the Galaxy. The Hitchhiker's Guide to the Galaxy (or H.H.G.G) is a science fiction comedy radio series written by Douglas Adams (with some material in the first series provided by John Lloyd).[1] It was originally broadcast in the United Kingdom by BBC Radio 4 in 1978, and afterwards the BBC World Service, National Public Radio in the US and CBC Radio in Canada. The series was the first radio comedy programme to be produced in stereo, and was innovative in its use of music and sound effects, winning a number of awards.[2] The series follows the adventures of hapless Englishman Arthur Dent and his friend Ford Prefect, an alien who writes for The Hitchhiker's Guide to the Galaxy, a pan-galactic encyclopaedia and travel guide. After Earth is destroyed in the first episode, Arthur and Ford find themselves aboard a stolen spaceship piloted by Zaphod Beeblebrox (Ford's semi-cousin and Galactic President), depressed robot Marvin, and Trillian, the only other human survivor of Earth's destruction.";
// var sourceText2 = "The Hitchhiker's Guide to the Galaxy is a science fiction comedy radio series written by Douglas Adams (with some material in the first series provided by John Lloyd).[1] It was originally broadcast in the United Kingdom by BBC Radio 4 in 1978, and afterwards the BBC World Service, National Public Radio in the US and CBC Radio in Canada. The series was the first radio comedy programme to be produced in stereo, and was innovative in its use of music and sound effects, winning a number of awards.[2] The series follows the adventures of hapless Englishman Arthur Dent and his friend Ford Prefect, an alien who writes for The Hitchhiker's Guide to the Galaxy, a pan-galactic encyclopaedia and travel guide. After Earth is destroyed in the first episode, Arthur and Ford find themselves aboard a stolen spaceship piloted by Zaphod Beeblebrox (Ford's semi-cousin and Galactic President), depressed robot Marvin, and Trillian, the only other human survivor of Earth's destruction.";
var searchQuery = "";
var requestText = "";
var queryText = "";
var sampleText = "";
var letterCount = 0;
var letter = "";
var letterWhite = "";
var lineSoFar = "";
var textSoFarPlusWhite = "";
var charactersOnLine = 0;
var delay = 40;
var textSize = "12pt";
var musicStatus = true;
var textBoxHeight = 0;
var maxLineLength = 60;
var textBoxYPosition = 0;
var textBoxBaseLine = 0;
var textBoxYInteger = 0;
var textBoxStartPosition=455;
var scrollSpeed=3;

// Beep Once
function beep(){
  document.getElementById("beep").play();
}

// Main loop
function mainLoop(){

  
  // Update div size
  // boxScrollHeight=document.getElementById('textArea').scrollHeight;
  // document.getElementById('textArea').style.height=boxScrollHeight+"px";

  // Determine new letter
  // letter=sampleText.charAt(letterCount);

 

  // sampleTextAfter = sampleText.substring (letterCount,sampleText.length);
  // sampleTextAfter = "";

  // Determine current letter
  letterWhite=sampleText.charAt(letterCount);
  

  
  // If character is "<", increase count until the next ">"
  if (letterWhite == "<") {
    do { 
      letterCount++;
      letterWhite=sampleText.charAt(letterCount);
      } while (letterWhite!=">");
      letterWhite = " ";
    
    };

  // Check for full stops
  if (letterWhite == ".") {
    letterWhite = ".<p>"
  }
  
  // Update sampleText up to current count
  lineSoFar = lineSoFar+letterWhite;
      
  // Update line div
  document.getElementById('textArea').innerHTML = lineSoFar;
  
  // Increase letter count
  //charactersOnLine++;
  letterCount++;

  // Exit loop when done
  if (letterCount>sampleText.length){
    document.getElementById("readout").pause();
    return;
  };

  // Calculate baseline position
  textBoxHeight = document.getElementById("textArea").scrollHeight;
  textBoxYPosition = document.getElementById("textArea").style.top;
  textBoxYInteger = parseInt(textBoxYPosition);
  textBoxBaseLine = textBoxYInteger + textBoxHeight;
  
  // Crawl box up if too low
  if (textBoxBaseLine>=textBoxStartPosition+15){
    textBoxYInteger-=scrollSpeed;
    textBoxYPosition = textBoxYInteger+"px";
    document.getElementById("textArea").style.top=textBoxYPosition;
    };

 };

// Switch music on and off
function audioButton(){
  if (musicStatus == true){
    document.getElementById("music").pause();
    beep ();
    musicStatus = false;
    document.getElementById("playPause").innerHTML="Switch on music";
  }
  else {
    document.getElementById("music").play();
    beep ();
    musicStatus = true;
    document.getElementById("playPause").innerHTML="Switch off music";
    };
};




// Beginning of code:

// Get sample text
var queryText=document.getElementById("searchTerm").value;

// Compose query for Wikipedia

// Fetch data
$(document).ready(function(){
 
    $.ajax({
        type:         "GET",
        url:          "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=Jimi_Hendrix&callback=?",
        contentType:  "application/json; charset=utf-8",
        async:        false,
        dataType:     "json",
        success: function (data, textStatus, jqXHR) {
            var markup = data.parse.text["*"];
            sampleText = (markup);
           
            
        },
        error: function (errorMessage) {
        }
    });
});


// Find article text from JSon





// Begin main loop
function launchText(){
  
  //beep();
  beep();

  // Play Readout Sound and music
  document.getElementById("readout").volume=0.10;
  document.getElementById("readout").play();
  document.getElementById("music").play();

  // Set text box position
  document.getElementById("textArea").style.top = textBoxStartPosition+"px";

  // Start loop
  setInterval(mainLoop, delay);

}

  console.log ("done");


 /* Sample page text included for reference:

 <div class="mw-parser-output"><div role="note" class="hatnote navigation-not-searchable">This article is about the guitarist. For the band, see <a href="/wiki/The_Jimi_Hendrix_Experience" title="The Jimi Hendrix Experience">the Jimi Hendrix Experience</a>.</div>
<div role="note" class="hatnote navigation-not-searchable">"Hendrix" redirects here. For other uses of Hendrix, see <a href="/wiki/Hendrix_(disambiguation)" class="mw-disambig" title="Hendrix (disambiguation)">Hendrix (disambiguation)</a>.</div>
<p class="mw-empty-elt">
</p>
<div class="shortdescription nomobile noexcerpt noprint searchaux" style="display:none">American guitarist, singer and songwriter</div>
<p class="mw-empty-elt">

</p>
<table class="infobox vcard plainlist" style="width:22em"><tbody><tr><th colspan="2" style="text-align:center;font-size:125%;font-weight:bold;background-color: #f0e68c">Jimi Hendrix</th></tr><tr><td colspan="2" style="text-align:center"><a href="/wiki/File:Jimi_Hendrix_1967.png" class="image"><img alt="Jimi Hendrix 1967.png" src="//upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Jimi_Hendrix_1967.png/220px-Jimi_Hendrix_1967.png" decoding="async" width="220" height="397" srcset="//upload.wikimedia.org/wikipedia/commons/a/ae/Jimi_Hendrix_1967.png 1.5x" data-file-width="235" data-file-height="424" /></a><div>Hendrix performing on the Dutch television show <i><a href="/wiki/Hoepla" title="Hoepla">Hoepla</a></i> in 1967</div></td></tr><tr><th colspan="2" style="text-align:center;background-color: #f0e68c">Background information</th></tr><tr><th scope="row"><span class="nowrap">Birth name</span></th><td class="nickname">Johnny Allen Hendrix</td></tr><tr><th scope="row">Born</th><td><span style="display:none">(<span class="bday">1942-11-27</span>)</span>November 27, 1942<br /><a href="/wiki/Seattle,_Washington" class="mw-redirect" title="Seattle, Washington">Seattle, Washington</a>, US</td></tr><tr><th scope="row">Died</th><td>September 18, 1970<span style="display:none">(1970-09-18)</span> (aged&#160;27)<br /><a href="/wiki/Kensington,_London" class="mw-redirect" title="Kensington, London">Kensington, London</a>, UK</td></tr><tr><th scope="row">Genres</th><td><div class="hlist hlist-separated"><ul><li>Rock</li><li>psychedelic rock</li><li>hard rock</li><li>blues</li><li>R&amp;B</li></ul></div></td></tr><tr><th scope="row"><span class="nowrap">Occupation(s)</span></th><td class="role"><div class="hlist hlist-separated"><ul><li>Musician</li><li>songwriter</li><li>producer</li></ul></div></td></tr><tr><th scope="row">Instruments</th><td class="note"><div class="hlist hlist-separated"><ul><li>Guitar</li><li>vocals</li></ul></div></td></tr><tr><th scope="row"><span class="nowrap">Years active</span></th><td>1963–1970</td></tr><tr><th scope="row">Labels</th><td><div class="hlist hlist-separated"><ul><li><a href="/wiki/Track_Records" title="Track Records">Track</a></li><li><a href="/wiki/Barclay_Records" class="mw-redirect" title="Barclay Records">Barclay</a></li><li><a href="/wiki/Polydor_Records" title="Polydor Records">Polydor</a></li><li><a href="/wiki/Reprise_Records" title="Reprise Records">Reprise</a></li><li><a href="/wiki/Capitol_Records" title="Capitol Records">Capitol</a></li></ul></div></td></tr><tr><th scope="row"><span class="nowrap">Associated acts</span></th><td><div class="hlist hlist-separated"><ul><li><a href="/wiki/Curtis_Knight_and_the_Squires" title="Curtis Knight and the Squires">Curtis Knight and the Squires</a></li><li><a href="/wiki/Jimmy_James_and_the_Blue_Flames" title="Jimmy James and the Blue Flames">Jimmy James and the Blue Flames</a></li><li><a href="/wiki/The_Jimi_Hendrix_Experience" title="The Jimi Hendrix Experience">The Jimi Hendrix Experience</a></li><li><a href="/wiki/Band_of_Gypsys" title="Band of Gypsys">Band of Gypsys</a></li></ul></div></td></tr><tr><th scope="row">Website</th><td><span class="url"><a rel="nofollow" class="external text" href="http://jimihendrix.com">jimihendrix<wbr />.com</a></span></td></tr></tbody></table>
<p><b>James Marshall</b> "<b>Jimi</b>" <b>Hendrix</b> (born <b>Johnny Allen Hendrix</b>; November 27, 1942 – September 18, 1970) was an American rock guitarist, singer, and songwriter. His mainstream career lasted only four years, but he is widely regarded as one of the most influential guitarists in history and one of the most celebrated musicians of the 20th century. The <a href="/wiki/Rock_and_Roll_Hall_of_Fame" title="Rock and Roll Hall of Fame">Rock and Roll Hall of Fame</a> describes him as "the greatest instrumentalist in the history of rock music".<sup id="cite_ref-R&amp;RHOFB_1-0" class="reference"><a href="#cite_note-R&amp;RHOFB-1">&#91;1&#93;</a></sup>
</p><p>Born in <a href="/wiki/Seattle,_Washington" class="mw-redirect" title="Seattle, Washington">Seattle, Washington</a>, Hendrix began playing guitar at age 15. In 1961, he enlisted in the US Army and trained as a paratrooper in the <a href="/wiki/101st_Airborne_Division" title="101st Airborne Division">101st Airborne Division</a>, but he was discharged the following year. He moved to <a href="/wiki/Clarksville,_Tennessee" title="Clarksville, Tennessee">Clarksville, Tennessee</a> soon after and began playing gigs on the <a href="/wiki/Chitlin%27_Circuit" title="Chitlin&#39; Circuit">Chitlin' Circuit</a>, earning a place in <a href="/wiki/The_Isley_Brothers" title="The Isley Brothers">the Isley Brothers</a>' backing band and later with <a href="/wiki/Little_Richard" title="Little Richard">Little Richard</a>, with whom he continued to work through mid-1965. He played with <a href="/wiki/Curtis_Knight" title="Curtis Knight">Curtis Knight</a> and the Squires before moving to England in late 1966 after being discovered by <a href="/wiki/Linda_Keith_(model)" title="Linda Keith (model)">Linda Keith</a>, who interested bassist <a href="/wiki/Chas_Chandler" title="Chas Chandler">Chas Chandler</a> of <a href="/wiki/The_Animals" title="The Animals">the Animals</a> in becoming his first manager.<sup id="cite_ref-hendrix2017_2-0" class="reference"><a href="#cite_note-hendrix2017-2">&#91;2&#93;</a></sup> Within months, Hendrix earned three UK top ten hits with <a href="/wiki/The_Jimi_Hendrix_Experience" title="The Jimi Hendrix Experience">the Jimi Hendrix Experience</a>: "<a href="/wiki/Hey_Joe" title="Hey Joe">Hey Joe</a>", "<a href="/wiki/Purple_Haze" title="Purple Haze">Purple Haze</a>", and "<a href="/wiki/The_Wind_Cries_Mary" title="The Wind Cries Mary">The Wind Cries Mary</a>". He achieved fame in the US after his performance at the <a href="/wiki/Monterey_Pop_Festival" title="Monterey Pop Festival">Monterey Pop Festival</a> in 1967, and his third and final studio album <i><a href="/wiki/Electric_Ladyland" title="Electric Ladyland">Electric Ladyland</a></i> reached number one in the US in 1968; it was Hendrix's most commercially successful release and his only number-one album. He was the world's highest-paid performer, and he headlined the <a href="/wiki/Woodstock" title="Woodstock">Woodstock</a> Festival in 1969 and the <a href="/wiki/Isle_of_Wight_Festival_1970" title="Isle of Wight Festival 1970">Isle of Wight Festival</a> in 1970. He <a href="/wiki/Death_of_Jimi_Hendrix" title="Death of Jimi Hendrix">died</a> from barbiturate-related <a href="/wiki/Asphyxia" title="Asphyxia">asphyxia</a> on September 18, 1970, at age 27.
</p><p>Hendrix was inspired by American rock and roll and electric blues. He favored <a href="/wiki/Distortion_(music)" title="Distortion (music)">overdriven</a> amplifiers with high volume and gain, and he was instrumental in popularizing the previously undesirable sounds caused by guitar amplifier <a href="/wiki/Audio_feedback" title="Audio feedback">feedback</a>. He was also one of the first guitarists to make extensive use of tone-altering <a href="/wiki/Effects_units" class="mw-redirect" title="Effects units">effects units</a> in mainstream rock, such as fuzz tone, <a href="/wiki/Octavia_(effects_pedal)" title="Octavia (effects pedal)">Octavia</a>, <a href="/wiki/Wah-wah_pedal" title="Wah-wah pedal">wah-wah</a>, and <a href="/wiki/Uni-Vibe" title="Uni-Vibe">Uni-Vibe</a>. He was the first musician to use stereophonic <a href="/wiki/Phaser_(effect)" title="Phaser (effect)">phasing</a> effects in recordings. Holly George-Warren of <i><a href="/wiki/Rolling_Stone" title="Rolling Stone">Rolling Stone</a></i> writes: "Hendrix pioneered the use of the instrument as an electronic sound source. Players before him had experimented with feedback and distortion, but Hendrix turned those effects and others into a controlled, fluid vocabulary every bit as personal as the blues with which he began."<sup id="cite_ref-FOOTNOTEGeorge-Warren2001428_3-0" class="reference"><a href="#cite_note-FOOTNOTEGeorge-Warren2001428-3">&#91;3&#93;</a></sup>
</p><p>
In 1967, readers of <i><a href="/wiki/Melody_Maker" title="Melody Maker">Melody Maker</a></i> voted Hendrix the Pop Musician of the Year, and <i>Rolling Stone</i> declared him the Performer of the Year in 1968. <i><a href="/wiki/Disc_and_Music_Echo" class="mw-redirect" title="Disc and Music Echo">Disc and Music Echo</a></i> magazine honored him with the World Top Musician of 1969, and <i><a href="/wiki/Guitar_Player" title="Guitar Player">Guitar Player</a></i> named him the Rock Guitarist of the Year in 1970. The Jimi Hendrix Experience was inducted into the Rock and Roll Hall of Fame in 1992 and the <a href="/wiki/UK_Music_Hall_of_Fame" title="UK Music Hall of Fame">UK Music Hall of Fame</a> in 2005. <i>Rolling Stone</i> ranked the band's three studio albums among the <a href="/wiki/Rolling_Stone%27s_500_Greatest_Albums_of_All_Time" title="Rolling Stone&#39;s 500 Greatest Albums of All Time">100 greatest albums of all time</a>, and ranked Hendrix the greatest guitarist and the sixth greatest artist of all time.</p><div class="mw-references-wrap"><ol class="references">
<li id="cite_note-R&amp;RHOFB-1"><span class="mw-cite-backlink"><b><a href="#cite_ref-R&amp;RHOFB_1-0">^</a></b></span> <span class="reference-text"><cite class="citation web"><a rel="nofollow" class="external text" href="http://rockhall.com/inductees/the-jimi-hendrix-experience/bio/">"Biography of the Jimi Hendrix Experience"</a>. Rock and Roll Hall of Fame<span class="reference-accessdate">. Retrieved <span class="nowrap">February 25,</span> 2013</span>.</cite><span title="ctx_ver=Z39.88-2004&amp;rft_val_fmt=info%3Aofi%2Ffmt%3Akev%3Amtx%3Abook&amp;rft.genre=unknown&amp;rft.btitle=Biography+of+the+Jimi+Hendrix+Experience&amp;rft.pub=Rock+and+Roll+Hall+of+Fame&amp;rft_id=http%3A%2F%2Frockhall.com%2Finductees%2Fthe-jimi-hendrix-experience%2Fbio%2F&amp;rfr_id=info%3Asid%2Fen.wikipedia.org%3AJimi+Hendrix" class="Z3988"></span><style data-mw-deduplicate="TemplateStyles:r886058088">.mw-parser-output cite.citation{font-style:inherit}.mw-parser-output .citation q{quotes:"\"""\"""'""'"}.mw-parser-output .citation .cs1-lock-free a{background:url("//upload.wikimedia.org/wikipedia/commons/thumb/6/65/Lock-green.svg/9px-Lock-green.svg.png")no-repeat;background-position:right .1em center}.mw-parser-output .citation .cs1-lock-limited a,.mw-parser-output .citation .cs1-lock-registration a{background:url("//upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Lock-gray-alt-2.svg/9px-Lock-gray-alt-2.svg.png")no-repeat;background-position:right .1em center}.mw-parser-output .citation .cs1-lock-subscription a{background:url("//upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Lock-red-alt-2.svg/9px-Lock-red-alt-2.svg.png")no-repeat;background-position:right .1em center}.mw-parser-output .cs1-subscription,.mw-parser-output .cs1-registration{color:#555}.mw-parser-output .cs1-subscription span,.mw-parser-output .cs1-registration span{border-bottom:1px dotted;cursor:help}.mw-parser-output .cs1-ws-icon a{background:url("//upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Wikisource-logo.svg/12px-Wikisource-logo.svg.png")no-repeat;background-position:right .1em center}.mw-parser-output code.cs1-code{color:inherit;background:inherit;border:inherit;padding:inherit}.mw-parser-output .cs1-hidden-error{display:none;font-size:100%}.mw-parser-output .cs1-visible-error{font-size:100%}.mw-parser-output .cs1-maint{display:none;color:#33aa33;margin-left:0.3em}.mw-parser-output .cs1-subscription,.mw-parser-output .cs1-registration,.mw-parser-output .cs1-format{font-size:95%}.mw-parser-output .cs1-kern-left,.mw-parser-output .cs1-kern-wl-left{padding-left:0.2em}.mw-parser-output .cs1-kern-right,.mw-parser-output .cs1-kern-wl-right{padding-right:0.2em}</style></span>
</li>
<li id="cite_note-hendrix2017-2"><span class="mw-cite-backlink"><b><a href="#cite_ref-hendrix2017_2-0">^</a></b></span> <span class="error mw-ext-cite-error" lang="en" dir="ltr">Cite error: The named reference <code>hendrix2017</code> was invoked but never defined (see the <a href="/wiki/Help:Cite_errors/Cite_error_references_no_text" title="Help:Cite errors/Cite error references no text">help page</a>).
</span></li>
<li id="cite_note-FOOTNOTEGeorge-Warren2001428-3"><span class="mw-cite-backlink"><b><a href="#cite_ref-FOOTNOTEGeorge-Warren2001428_3-0">^</a></b></span> <span class="reference-text"><a href="#CITEREFGeorge-Warren2001">George-Warren 2001</a>, p.&#160;428.</span>
</li>
</ol></div>
<!-- 
NewPP limit report
Parsed by mw1233
Cached time: 20191010002622
Cache expiry: 86400
Dynamic content: true
Complications: [vary‐revision‐sha1]
CPU time usage: 0.400 seconds
Real time usage: 0.676 seconds
Preprocessor visited node count: 1029/1000000
Preprocessor generated node count: 0/1500000
Post‐expand include size: 15829/2097152 bytes
Template argument size: 2682/2097152 bytes
Highest expansion depth: 18/40
Expensive parser function count: 7/500
Unstrip recursion depth: 0/20
Unstrip post‐expand size: 2233/5000000 bytes
Number of Wikibase entities loaded: 0/400
Lua time usage: 0.232/10.000 seconds
Lua memory usage: 5.41 MB/50 MB
-->
<!--
Transclusion expansion time report (%,ms,calls,template)
100.00%  656.171      1 -total
 51.93%  340.765      1 Template:Infobox_musical_artist
 49.27%  323.303      1 Template:Infobox
 39.79%  261.105      2 Template:Br_separated_entries
 35.17%  230.746      1 Template:Birth_date
 12.06%   79.134      1 Template:Cite_web
  8.64%   56.663      1 Template:About
  7.81%   51.218      1 Template:Pp-semi-protected
  3.84%   25.169      1 Template:Use_American_English
  3.53%   23.163      2 Template:Broken_ref
-->
</div>

*/