//Javascript

const path = window.location.pathname;
const page = path.split("/").pop(); console.log('page ='+ page);
let tooltipArray = [];


{//setup info page main elements
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

const head = document.getElementsByTagName('head')[0];
const body = document.getElementsByTagName('body')[0];
const header = document.getElementsByTagName('header')[0];
const footer = document.getElementsByTagName('footer')[0];
const nav = document.getElementsByTagName('nav')[0];


{//repeating elements
    let head_lines = [];
    let header_lines = [];
    let nav_lines = [];
    let footer_lines = [];
    
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
        '<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&family=Roboto&display=swap" rel="stylesheet">'
    );
    
    header_lines.push(
        '<a href="index.html">',
        '<img src="../files/images/film-frame.png" alt="This is an image of a film frame sticker from twitter" class="film-frame"></a>'
    );
    
    if (page == 'index.html' || page == ''){
        head_lines.push('<title>12 ANGRY MEN | HOME</title>');
        header_lines.push('<h1 class="h1--position h1--text-attributes">12 Angry Men</h1>');
    } else {
        head_lines.push('<title>12 ANGRY MEN | ' + page.split("-")[0].split(".")[0].toUpperCase() + '</title>');
        header_lines.push('<h1 class="h1--position h1--text-attributes">12 Angry Men - ' + page.split("-")[0].split(".")[0].charAt(0).toUpperCase() + page.split("-")[0].split(".")[0].slice(1) + '</h1>');
    }
    
    nav_lines.push(
        '<div class="nav__field">',
        '<a href="index.html" class="link">Home</a>',
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
    
    let head_string = '', header_string = '', nav_string = '', footer_string = '';
    for (let i = 0; i < head_lines.length; i++) head_string += head_lines[i]; head.innerHTML = head_string;
    for (let i = 0; i < header_lines.length; i++) header_string += header_lines[i]; header.innerHTML = header_string;
    for (let i = 0; i < nav_lines.length; i++) nav_string += nav_lines[i];  nav.innerHTML = nav_string;
    for (let i = 0; i < footer_lines.length; i++) footer_string += footer_lines[i];  footer.innerHTML = footer_string;
    
    body.setAttribute('class', 'body--fit-content body--background-color body--text-font');
    body.children[0].setAttribute('class', 'body__container');
    nav.setAttribute('class', 'nav');
    header.setAttribute('class', 'header--fit-content header--background-colour');
    footer.setAttribute('class', 'footer--positioning footer--fit-content footer--background-colour');
}

//classes for info-page
    //movie
    class Movie {
        name;
        year;
        artistArray = [];
    }

    //artist
    class Artists {
        role;
        name;
        yearBirth;
        yearDeath;
        infoArray = [];
        link;
        
        constructor(name, yearBirth, yearDeath, link){
            this.name = name;
            this.yearBirth = yearBirth;
            this.yearDeath = yearDeath;
            this.link = link;
        }
        addNodes(){
            const args = arguments;
            for(let i=0; i<args.length; i++){
                this.infoArray.push(args[i]);
            
            }
        }
        toTooltip(){
            let nodeArray = [];
            for(let i = 0; i < 3; i++){
                nodeArray.push(this.infoArray[i]);
            }
            tooltipArray.push({name: this.name, yearBirth: this.yearBirth, yearDeath: this.yearDeath, nodeArray: nodeArray});
        }
    }

    //director
    class Director extends Artists{
        constructor (name, yearBirth, yearDeath){
            super(name, yearBirth, yearDeath);
            this.role = "Director";
        } 
    }

    //writer 
    class Writer extends Artists{
        constructor (name, yearBirth, yearDeath){
            super(name, yearBirth, yearDeath);
            this.role = "Writer";
        }
    }

    //actor
    class Actors extends Artists{
        constructor (name, yearBirth, yearDeath){
            super(name, yearBirth, yearDeath);
            this.role = "Artists";
        }
    }

{//add artist data
    //Martin Balsam
    const martin_balsam = new Actors(
        "Martin Balsam",
         1919,
         1996, 
         "https://en.wikipedia.org/wiki/Martin_Balsam");
    martin_balsam.addNodes("All the President's Men (1976)","Psycho (1960)","A Thousand (1965)");
    martin_balsam.toTooltip();

    //John Fiedler
    const john_fiedler = new Actors(
        "John Fiedler", 
        1925, 
        2005, 
        "https://nl.wikipedia.org/wiki/John_Fiedler");
    john_fiedler.addNodes("The Odd Couple (1965)","The Bob Newhart Show (1972)","Robin Hood (1973)");
    john_fiedler.toTooltip();

    //Lee J. Cobb
    const lee_j_cobb = new Actors(
        "Lee J. Cobb", 
        1911, 
        1976, 
        "https://en.wikipedia.org/wiki/Lee_J._Cobb");
    lee_j_cobb.addNodes("On the Waterfront (1954)","Exodus (1960)","The Exorcist (1973)");
    lee_j_cobb.toTooltip();

    //E. G. marshall
    const e_g_marshall = new Actors(
        "E. G. Marshall", 
        1914, 
        1998, 
        "https://en.wikipedia.org/wiki/E._G._Marshall");
    e_g_marshall.addNodes("Creepshow (1982)","National Lampoon's Cristmas Vacation (1989)","Nixon (1995)");
    e_g_marshall.toTooltip();

    //Jack Klugman
    const jack_klugman = new Actors(
        "Jack Klugman", 
        1922, 
        2012, 
        "https://en.wikipedia.org/wiki/Jack_Klugman");
    jack_klugman.addNodes("The Odd Couple (1970)","Quincy M.E. (1976)","Days of Wine and Roses (1962)");
    jack_klugman.toTooltip();

    //Edward Binns
    const edward_binns = new Actors(
        "Edward Binns", 
        1916, 
        1990, 
        "https://en.wikipedia.org/wiki/Edward_Binns");
    edward_binns.addNodes("Patton (1970)","The Verdict (1982)","North by Northwest (1959)");
    edward_binns.toTooltip();

    //Jack Warden
    const jack_warden = new Actors(
        "Jack Warden", 
        1920, 
        2006, 
        "https://en.wikipedia.org/wiki/Jack_Warden");
    jack_warden.addNodes("... and justice for all (1979)","While You Where Sleeping (Saul)","Being There (1979)");
    jack_warden.toTooltip();

    //Henry Fonda
    const henry_fonda = new Actors(
        "Henry Fonda", 
        1905, 
        1982,
        "https://en.wikipedia.org/wiki/Henry_Fonda");
    henry_fonda.addNodes("On Golden Pond (1981)","The Grapes of Wrath (1940)","The Wrong Man (1956)");
    henry_fonda.toTooltip();

    //Joseph Sweedney
    const joseph_sweeney = new Actors(
        "Joseph Sweeney", 
        1884, 
        1963, 
        "https://en.wikipedia.org/wiki/Joseph_Sweeney_(actor)");
    joseph_sweeney.addNodes("The United States Steel Hour (1954)","Armstrong Circle Theatre (1951)","The Defenders (1961)");
    joseph_sweeney.toTooltip();

    //Ed Begley
    const ed_begley = new Actors("Ed Begley", 
    1901, 
    1970, 
    "https://en.wikipedia.org/wiki/Ed_Begley");
    ed_begley.addNodes("Sweet bird of Youth (1962)", "Hang 'Em High (1986)", "The Unsinkable Molly Brown (1964)");
    ed_begley.toTooltip();

    //George Voskovec
    const george_voskovec = new Actors(
        "George Voskovec", 
        1905, 
        1981, 
        "https://en.wikipedia.org/wiki/George_Voskovec");
    george_voskovec.addNodes("Somewhere in Time (1980)","The iceman Cometh (1973)","Penize nebo zivot (1932)");
    george_voskovec.toTooltip();

    //Robert Webber
    const robert_webber = new Actors(
        "Robert Webber", 
        1924, 
        1989, 
        "https://en.wikipedia.org/wiki/Robert_Webber");
    robert_webber.addNodes("The Dirty Dozen (1967)","Midway (1976)","Private Benjamin (1980)");
    robert_webber.toTooltip();

    //Rudy Bond
    const rudy_bond = new Actors(
        "Rudy Bond", 
        1912, 
        1982, 
        "https://en.wikipedia.org/wiki/Rudy_Bond");
    rudy_bond.addNodes("Tramlijn (1951)","On the Waterfront (1954)","The Godfather (1972)");
    rudy_bond.toTooltip();
}

//menus


const SelectFooter = document.querySelector('footer');
const SelectHeader = document.querySelector('header');

const elementDropdown = document.createElement('select');
const styleDropdown = document.createElement('select');
const fontSizeInput = document.createElement('input');
const colorInput = document.createElement('input');

colorInput.type = 'color';

footer.appendChild(elementDropdown);
footer.appendChild(styleDropdown);

//Element menu 
// get all elements from DOM
const elements = document.querySelectorAll('body, header, footer, aside, article, section');

elements.forEach((element) => {
    // get type of elemnt
    const elementType = element.nodeName.toLowerCase();
    
    const option = document.createElement('option');
    option.text = elementType;
    elementDropdown.add(option);
  });
  
  
// font and size menu

const styleOptions = [
    { name: 'Font Size (px)', property: 'font-size' },
    { name: 'Color', property: 'color' },
  ];
  
  styleOptions.forEach((option) => {
    const styleOption = document.createElement('option');
    styleOption.text = option.name;
    styleOption.value = option.property;
    styleDropdown.add(styleOption);
  });


// Logic for switching the color or font size input  
if (styleDropdown.value === 'font-size') {
    footer.appendChild(fontSizeInput);
} else {
    footer.appendChild(colorInput);
}

styleDropdown.addEventListener('change', (event) => {
    if (event.target.value === 'font-size') {
        footer.removeChild(colorInput);
        footer.appendChild(fontSizeInput);
    } else {
        footer.removeChild(fontSizeInput);
        footer.appendChild(colorInput);
    }
});

// font and size menu font input
fontSizeInput.addEventListener('input', (event) => {
    if (event.target.value < 8 || event.target.value > 24) {
        return;
    }
    const element = document.querySelector(elementDropdown.value);
    // find all children of element
    const children = element.querySelectorAll('*');
    // add font size to all children
    children.forEach((child) => {
        child.style.fontSize = event.target.value + 'px';
    });
});

// font and size menu color input
colorInput.addEventListener('change', (event) => {
    const element = document.querySelector(elementDropdown.value);
    // find all children of element
    const children = element.querySelectorAll('*');
    // add color to all children
    children.forEach((child) => {
        child.style.color = event.target.value;
    });
});
{//tooltip

const links = document.getElementsByTagName('a');
for (let i = 0; i < links.length; i++) {
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
        let yearBirthTemp = null;
        let yearDeathTemp = null;
        let urlTemp = event.target.parentElement.getAttribute("href");
        
        let result = tooltipArray.find(obj => {
            return obj.name.replace(/\s*|\t|\r|\n/gm, "") === event.target.textContent.replace(/\s*|\t|\r|\n/gm, "")
        })
        if (result != undefined){
            nameTemp = result.name; 
            nodesTemp = result.nodeArray; 
            yearBirthTemp = result.yearBirth;
            yearDeathTemp = result.yearDeath;
        }

        let text;
        
        if (nameTemp == null){
            text = document.createTextNode("Go to: " + urlTemp);
            container.append(text);
        } else{
            text1 = nameTemp + " (" + yearBirthTemp;
            if (yearDeathTemp != null) text1 += ' - ' + yearDeathTemp;
            text1 += ") is also known for:";
            document.createTextNode(text1)
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
    container.style.left = (15 + event.pageX) + "px";
    container.style.top = (10 + event.pageY) + "px";
    container.style.borderRadius = "15px";
    container.style.border = "solid 2px"
}

function tooltiphide(event){
    let body = document.getElementsByTagName('body')[0];
    if (body.children[0].getAttribute("name") == "tooltip")
    {
        body.children[0].remove();
    }
}
}

