//Javascript

var path = window.location.pathname;
var page = path.split("/").pop();

{//setup info page
    if (page == 'info.html'){
        infoDivContainer = document.createElement('div');
        document.body.insertBefore(infoDivContainer, document.body.firstChild);
        infoNav = document.createElement('nav');
        infoHeader = document.createElement('header');
        document.body.firstChild.appendChild(infoHeader);
        document.body.firstChild.appendChild(infoNav);
        infoFooter = document.createElement('footer');
        document.body.appendChild(infoFooter);
    }
        
}

var head = document.getElementsByTagName('head')[0];
var body = document.getElementsByTagName('body')[0];
var header = document.getElementsByTagName('header')[0];
var footer = document.getElementsByTagName('footer')[0];
var nav = document.getElementsByTagName('nav')[0];

var path = window.location.pathname;
var page = path.split("/").pop();

//classes for info-page
    //movie (3: Erik)
    class movie {
        name;
        year;
        artistArray = [];
    }

    //artist (1: Mehrad)


        //director


        //writer 


        //actor


//menus (2: Lars)
    //header menu
    
    // all elements in the menu 

    const elementNames = ["body", "header", "footer", "aside", "articles", "section"]; 


    //footer menu



{//tooltip (3: Erik)
var tooltipArray = [];

class tooltipInfo {
    name;
    year;
    nodeArray = [];
    
    constructor(name, year){
        this.name = name;
        this.year = year;
    }
    addNodes(){
        var args = arguments;
        for(var i=0; i<args.length; i++){
            this.nodeArray.push(args[i]);
        
        }
    }
    inArray(){
        tooltipArray.push(this);
    }
}

{//add tooltip data
    //Martin Balsam
    const martin_balsam = new tooltipInfo("Martin Balsam", "1919 - 1996");
    martin_balsam.addNodes("All the President's Men (1976)","Psycho (1960)","A Thousand (1965)");
    martin_balsam.inArray();

    //John Fiedler
    const john_fiedler = new tooltipInfo("John Fiedler", "1925 - 2005");
    john_fiedler.addNodes("The Odd Couple (1965)","The Bob Newhart Show (1972)","Robin Hood (1973)");
    john_fiedler.inArray();

    //Lee J. Cobb
    const lee_j_cobb = new tooltipInfo("Lee J. Cobb", "1911 - 1976");
    lee_j_cobb.addNodes("On the Waterfront (1954)","Exodus (1960)","The Exorcist (1973)");
    lee_j_cobb.inArray();

    //E. G. marshall
    const e_g_marshall = new tooltipInfo("E. G. Marshall", "1914 - 1998");
    e_g_marshall.addNodes("Creepshow (1982)","National Lampoon's Cristmas Vacation (1989)","Nixon (1995)");
    e_g_marshall.inArray();

    //Jack Klugman
    const jack_klugman = new tooltipInfo("Jack Klugman", "1922 - 2012");
    jack_klugman.addNodes("The Odd Couple (1970)","Quincy M.E. (1976)","Days of Wine and Roses (1962)");
    jack_klugman.inArray();

    //Edward Binns
    const edward_binns = new tooltipInfo("Edward Binns", "1916-1990");
    edward_binns.addNodes("Patton (1970)","The Verdict (1982)","North by Northwest (1959)");
    edward_binns.inArray();

    //Jack Warden
    const jack_warden = new tooltipInfo("Jack Warden", "1920 - 2006");
    jack_warden.addNodes("... and justice for all (1979)","While You Where Sleeping (Saul)","Being There (1979)");
    jack_warden.inArray();

    //Henry Fonda
    const henry_fonda = new tooltipInfo("Henry Fonda", "1905 - 1982");
    henry_fonda.addNodes("On Golden Pond (1981)","The Grapes of Wrath (1940)","The Wrong Man (1956)");
    henry_fonda.inArray();

    //Joseph Sweedney
    const joseph_sweeney = new tooltipInfo("Joseph Sweeney", "1884 - 1963" );
    joseph_sweeney.addNodes("The United States Steel Hour (1954)","Armstrong Circle Theatre (1951)","The Defenders (1961)");
    joseph_sweeney.inArray();

    //Ed Begley
    const ed_begley = new tooltipInfo("Ed Begley", "1901 - 1970");
    ed_begley.addNodes("Sweet bird of Youth (1962)", "Hang 'Em High (1986)", "The Unsinkable Molly Brown (1964)");
    ed_begley.inArray();

    //George Voskovec
    const george_voskovec = new tooltipInfo("George Voskovec", "1905 - 1981");
    george_voskovec.addNodes("Somewhere in Time (1980)","The iceman Cometh (1973)","Penize nebo zivot (1932)");
    george_voskovec.inArray();

    //Robert Webber
    const robert_webber = new tooltipInfo("Robert Webber", "1924 - 1989");
    robert_webber.addNodes("The Dirty Dozen (1967)","Midway (1976)","Private Benjamin (1980)");
    robert_webber.inArray();

    //Rudy Bond
    const rudy_bond = new tooltipInfo("Rudy Bond");
    rudy_bond.addNodes("Tramlijn (1951)","On the Waterfront (1954)","The Godfather (1972)");
    rudy_bond.inArray();
}

var links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('mouseover', tooltipshow ,false);
    links[i].addEventListener('mouseout', tooltiphide ,false);
}

function tooltipshow(event){
    let container = document.createElement("div");
    container.setAttribute("name", "tooltip");

    if (!header.contains(event.target) && !footer.contains(event.target) && !nav.contains(event.target)){
        body.insertBefore(container, body.firstChild);

        let nodesTemp = [];
        let nameTemp = null;
        let yearTemp = null;
        let urlTemp = event.target.parentElement.getAttribute("href");
        
        var result = tooltipArray.find(obj => {
            return obj.name.replace(/\s*|\t|\r|\n/gm, "") === event.target.textContent.replace(/\s*|\t|\r|\n/gm, "")
        })

        if (result != undefined){nameTemp = result.name; nodesTemp = result.nodeArray; yearTemp = result.year}

        let text;
        
        if (nameTemp == null){
            text = document.createTextNode("Go to: " + urlTemp);
            container.append(text);
        } else{
            text1 = document.createTextNode(nameTemp + " (" + yearTemp + ") is also known for:");
            container.append(text1);
            list = document.createElement("ul");
            container.append(list);
            for (var i = 0; i < nodesTemp.length; i++){
                let newNode = document.createElement("li");
                list.append(newNode);
                let textTemp = document.createTextNode(nodesTemp[i]);
                newNode.append(textTemp);
            }
            text3 = document.createTextNode("Click to read more about " + nameTemp + ".");
            container.append(text3);
        }
    }

    //tooltip style
    container.style.position = "absolute";
    container.style.background = "#AECDD0";
    container.style.padding = "15px";
    container.style.zIndex= "100";
    container.style.left = (10 + event.pageX) + "px";
    container.style.top = (10 + event.pageY) + "px";
    container.style.borderRadius = "15px";
    container.style.border = "solid 2px"
}

function tooltiphide(event){
    let body = document.getElementsByTagName('body')[0];
    if (body.firstChild.getAttribute("name") == "tooltip")
    {
        body.firstChild.remove();
    }
}
}

//repeating elements
var head_lines = [];
var header_lines = [];
var nav_lines = [];
var footer_lines = [];

head_lines.push( 
    '<meta charset="UTF-8">',
    '<meta name="description" content="Main webpage of The 12 Angry Men">', 
    '<meta name="author" content="UTRECHT UNIVERSITY WEB TECHNOLOGY COURSE">', 
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">', 
    /* Adding Favicon */ 
    '<link rel="icon" href="../files/icon/icon.ico">', 
    '<link rel="stylesheet" href="../css/style.css">',
    /* Font Embedding */ 
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&family=Roboto&display=swap" rel="stylesheet">',
    '<title>12 ANGRY MEN | ' + page.split("-")[0].split(".")[0].toUpperCase() + '</title>'
);

header_lines.push(
    '<a href="home.html">',
    '<img src="../files/images/film-frame.png" alt="This is an image of a film frame sticker from twitter" class="film-frame"></a>',
    '<h1 class="h1--position h1--text-attributes">12 Angry Men - ' + page.split("-")[0].split(".")[0].charAt(0).toUpperCase() + page.split("-")[0].split(".")[0].slice(1) + '</h1>'
);

nav_lines.push(
    '<div class="nav__field">',
    '<a href="home.html" class="link">Home</a>',
    '</div>',
    '<div class="nav__field">',
    '<a href="transcripts.html" class="link">Transcript</a>',
    '</div>',
    '<div class="nav__field">',
    '<a href="cast-members.html" class="link">Cast</a>',
    '</div>',
    '<div class="nav__field">',
    '<a href="awards.html" class="link">Awards</a>',
    '</div>',
    '<div class="nav__field">',
    '<a href="adaptations-and-parodies.html" class="link">Adaptations</a>',
    '</div>',
    '<div class="nav__field">',
    '<a href="reviews.html" class="link">Reviews</a>',
    '</div> <div class="nav__field">',
    '<a href="contact.html" class="link">Contact</a>',
    '</div>',
    '<div class="nav__field">',
    '<a href="info.html" class="link">Info</a>',
    '</div>'
);

footer_lines.push(
    '<p class="footer__paragraph">This website has been created as part of the Web Technology course at Utrecht University.',
    '<br>This work has been carried out by three students, namely, Bogaert, L.P. van den (Lars), Riel, E.P.M. van (Erik), Haghshenas, M. (Mehrad).',
    '<br> Should you have any enquiries please <a href="contact.html" class="footer__contact-link--no-colour-change">contact us.</a>',
    '</p>',
    '<span class="footer__jump-top--position-absolute"><a href="#" class="footer__jump-top--no-colour-change">',
    'Click here to scroll to the top of the page.</a>',
    '</span>'
);

var head_string = '', header_string = '', nav_string = '', footer_string = '';
for (var i = 0; i < head_lines.length; i++) head_string += head_lines[i]; head.innerHTML = head_string;
for (var i = 0; i < header_lines.length; i++) header_string += header_lines[i]; header.innerHTML = header_string;
for (var i = 0; i < nav_lines.length; i++) nav_string += nav_lines[i];  nav.innerHTML = nav_string;
for (var i = 0; i < footer_lines.length; i++) footer_string += footer_lines[i];  footer.innerHTML = footer_string;

body.setAttribute('class', 'body--fit-content body--background-color body--text-font');
body.children[0].setAttribute('class', 'body__container');
nav.setAttribute('class', 'nav');
header.setAttribute('class', 'header--fit-content header--background-colour');
footer.setAttribute('class', 'footer--positioning footer--fit-content footer--background-colour');