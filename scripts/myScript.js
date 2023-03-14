//Javascript

const path = window.location.pathname;
const page = path.split("/").pop();
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
        '<a href="home.html">',
        '<img src="../files/images/film-frame.png" alt="This is an image of a film frame sticker from twitter" class="film-frame"></a>'
    );
    
    if (page == 'home.html' || page == ''){
        head_lines.push('<title>12 ANGRY MEN | HOME</title>');
        header_lines.push('<h1 class="h1--position h1--text-attributes">12 Angry Men</h1>');
    } else {
        head_lines.push('<title>12 ANGRY MEN | ' + page.split("-")[0].split(".")[0].toUpperCase() + '</title>');
        header_lines.push('<h1 class="h1--position h1--text-attributes">12 Angry Men - ' + page.split("-")[0].split(".")[0].charAt(0).toUpperCase() + page.split("-")[0].split(".")[0].slice(1) + '</h1>');
    }
    
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
        movieName = "placeholderName";
        movieYear = "placeholderYear";
        movieLink = "https://en.wikipedia.org/wiki/Main_Page";
        movieAbout = "placeholderAbout";
        artistArray = [];

        constructor (name, year){
            this.movieName = name;
            this.movieYear = year;
        }
        
        addAllToPage(page){
            const container = document.getElementsByClassName("body__container")[0];
            const article = document.createElement("article");
            container.appendChild(article);
            article.setAttribute("class", "article-block");
            const heading = document.createElement("h2");
            article.appendChild(heading);
            heading.setAttribute("class", "h2--position h2--text-attributes");
            const headingText = document.createTextNode("Information");
            heading.append(headingText);  
            const about = document.createElement("p");
            article.appendChild(about);
            const strongLink = document.createElement('STRONG');
            about.appendChild(strongLink);
            const link = document.createElement('a');
            link.setAttribute("class", "link--decoration");
            link.setAttribute("href", this.movieLink);
            link.setAttribute("target", "_blank");
            strongLink.appendChild(link);
            link.innerHTML = this.movieName;
            const aboutText = document.createTextNode(" is a movie from the year " + this.movieYear + ". " + this.movieAbout);
            about.append(aboutText);
            const para = document.createElement('p');
            article.appendChild(para);
            para.innerHTML = "Extended information about the artists that participated in this movie is listed below.";

            const artistsSection = document.createElement('section');
            article.appendChild(artistsSection);

            const headingDirector = document.createElement("h3");
            headingDirector.setAttribute('class', 'h3--position h3--attributes')
            artistsSection.appendChild(headingDirector);
            const hrDir = document.createElement('hr');
            hrDir.setAttribute('class', 'hr--decoration');
            headingDirector.innerHTML = 'Director(s)';
            artistsSection.appendChild(hrDir);

            for (let i=0; i< this.artistArray.length; i++){
                if (this.artistArray[i].role == "director"){
                    this.artistArray[i].createArtistInfo(this.artistArray[i], artistsSection);
                }
            }

            const headingWriter = document.createElement("h3");
            headingWriter.setAttribute('class', 'h3--position h3--attributes')
            artistsSection.appendChild(headingWriter);
            headingWriter.innerHTML = 'Writer(s)';
            const hrWri = document.createElement('hr');
            hrWri.setAttribute('class', 'hr--decoration');
            artistsSection.appendChild(hrWri);

            for (let i=0; i< this.artistArray.length; i++){
                if (this.artistArray[i].role == "writer"){
                    this.artistArray[i].createArtistInfo(this.artistArray[i], artistsSection);
                }
            }

            const headingActor = document.createElement("h3");
            headingActor.setAttribute('class', 'h3--position h3--attributes')
            artistsSection.appendChild(headingActor);
            headingActor.innerHTML = 'Actor(s)';
            const hrAct = document.createElement('hr');
            hrAct.setAttribute('class', 'hr--decoration');
            artistsSection.appendChild(hrAct);

            for (let i=0; i< this.artistArray.length; i++){
                if (this.artistArray[i].role == "actor"){
                    this.artistArray[i].createArtistInfo(this.artistArray[i], artistsSection);
                }
            }
            
        }

    }

    //artist
    class Artists {
        role;
        name;
        yearBirth;
        yearDeath;
        infoArray = [];
        link;
        info = "placeholderInfo";
        
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

        addToMovie(movie){
            movie.artistArray.push(this);
        }

        createArtistInfo(item, section, aboutText){
            let container = document.createElement('article');
            container.setAttribute('class', 'container');
            section.appendChild(container);

            let strongTemp = document.createElement('STRONG');
            container.appendChild(strongTemp);
            let linkTemp = document.createElement('a');
            linkTemp.setAttribute("class", "link--decoration");
            linkTemp.setAttribute("href", item.link);
            linkTemp.setAttribute("target", "_blank");
            strongTemp.appendChild(linkTemp);
            linkTemp.innerHTML = item.name;
            let aboutTemp = document.createElement('p');
            container.appendChild(aboutTemp);
            aboutText = item.name + " is a";
            if (item.role == 'actor') aboutText += "n";
            aboutText += " " + item.role + " born in " + item.yearBirth;
            if (item.yearDeath != null) aboutText += " and sadly passed away in " + item.yearDeath;
            aboutText += ". " + item.info + " Some other projects of " + item.name + " are ";
            for (let i = 0; i < item.infoArray.length - 1; i++){
                aboutText += item.infoArray[i] + ", ";
            } 
            aboutText += item.infoArray[item.infoArray.length -1] + ".";
            aboutTemp.append(document.createTextNode(aboutText));
        }
    }

    //director
    class Director extends Artists{
        constructor (name, yearBirth, yearDeath, link){
            super(name, yearBirth, yearDeath, link);
            this.role = "director";
        } 
    }

    //writer 
    class Writer extends Artists{
        constructor (name, yearBirth, yearDeath, link){
            super(name, yearBirth, yearDeath, link);
            this.role = "writer";
        }
    }

    //actor
    class Actors extends Artists{
        constructor (name, yearBirth, yearDeath, link){
            super(name, yearBirth, yearDeath, link);
            this.role = "actor";
        }

        createArtistInfo(item, section, aboutText){
            super.createArtistInfo(item, section);

        }
    }

//add artist data
    //Movie 12 Angry Men
    const angry_men = new Movie("12 Angry Men", 1957);
    angry_men.movieLink = "https://en.wikipedia.org/wiki/12_Angry_Men_(1957_film)";
    angry_men.movieAbout = 'The play explores the deliberations of a jury of a homicide trial, in which a dozen "men with ties and a coat" decide the fate of a teenager accused of murdering his abusive father. At the beginning, they are nearly unanimous in concluding the youth is guilty. One man dissents, declaring him "not guilty", and he sows a seed of reasonable doubt.'
    
    //Martin Balsam
    const martin_balsam = new Actors(
        "Martin Balsam",
        1919,
        1996, 
        "https://en.wikipedia.org/wiki/Martin_Balsam");
    martin_balsam.info = "He had a prolific career in character roles in film, in theatre, and on television. An early member of the Actors Studio, he began his career on the New York stage, winning a Tony Award for Best Actor in a Play for Robert Anderson's You Know I Can't Hear You When the Water's Running (1968). He won the Academy Award for Best Supporting Actor for his performance in A Thousand Clowns (1965)."
    martin_balsam.addNodes("All the President's Men (1976)","Psycho (1960)","A Thousand (1965)");
    martin_balsam.toTooltip();
    martin_balsam.addToMovie(angry_men);

    //John Fiedler
    const john_fiedler = new Actors(
        "John Fiedler", 
        1925, 
        2005, 
        "https://en.wikipedia.org/wiki/John_Fiedler");
    john_fiedler.info = "He had a prolific career in character roles in film, in theatre, and on television. An early member of the Actors Studio, he began his career on the New York stage, winning a Tony Award for Best Actor in a Play for Robert Anderson's You Know I Can't Hear You When the Water's Running (1968). He won the Academy Award for Best Supporting Actor for his performance in A Thousand Clowns (1965). Fiedler was born in Platteville, Wisconsin, a son of beer salesman Donald Fiedler and his wife Margaret (née Phelan). He was of German and Irish descent.";
    john_fiedler.addNodes("The Odd Couple (1965)","The Bob Newhart Show (1972)","Robin Hood (1973)");
    john_fiedler.toTooltip();
    john_fiedler.addToMovie(angry_men);

    //Lee J. Cobb
    const lee_j_cobb = new Actors(
        "Lee J. Cobb", 
        1911, 
        1976, 
        "https://en.wikipedia.org/wiki/Lee_J._Cobb");
    lee_j_cobb.info = "he is known both for film roles and his work on the Broadway stage, as well as for his television role as the star of the TV series The Virginian. He often played arrogant, intimidating and abrasive characters, but he also acted as respectable figures such as judges and police officers. Cobb was born in New York City, to a Jewish family of Russian and Romanian origin. He grew up in the Bronx, New York, on Wilkins Avenue, near Crotona Park. His parents were Benjamin (Benzion) Jacob, a compositor for a foreign-language newspaper, and Kate (Neilecht).";
    lee_j_cobb.addNodes("On the Waterfront (1954)","Exodus (1960)","The Exorcist (1973)");
    lee_j_cobb.toTooltip();
    lee_j_cobb.addToMovie(angry_men);

    //E. G. marshall
    const e_g_marshall = new Actors(
        "E. G. Marshall", 
        1914, 
        1998, 
        "https://en.wikipedia.org/wiki/E._G._Marshall");
    e_g_marshall.info = 'Marshall was born Everett Eugene Grunz[1] in Owatonna, Minnesota,[2] the son of Hazel Irene (née Cobb) and Charles G. Grunz. His paternal grandparents were German immigrants. During his life, he chose not to reveal what "E. G." stood for, saying that it stood for "Everybody'+ "'" +'s Guess." The U.S. Social Security Claims Index states that he was listed with the Social Security Administration in June 1937 as Everett Eugene Grunz, and in December 1975 as E.G. Marshall.';
    e_g_marshall.addNodes("Creepshow (1982)","National Lampoon's Cristmas Vacation (1989)","Nixon (1995)");
    e_g_marshall.toTooltip();
    e_g_marshall.addToMovie(angry_men);

    //Jack Klugman
    const jack_klugman = new Actors(
        "Jack Klugman", 
        1922, 
        2012, 
        "https://en.wikipedia.org/wiki/Jack_Klugman");
    jack_klugman.info = "Klugman was born in Philadelphia, the youngest of six children born to Rose, a hat maker, and Max Klugman, a house painter. His parents were Russian-Jewish immigrants. Klugman served in the United States Army during World War II."
    jack_klugman.addNodes("The Odd Couple (1970)","Quincy M.E. (1976)","Days of Wine and Roses (1962)");
    jack_klugman.toTooltip();
    jack_klugman.addToMovie(angry_men);

    //Edward Binns
    const edward_binns = new Actors(
        "Edward Binns", 
        1916, 
        1990, 
        "https://en.wikipedia.org/wiki/Edward_Binns");
    edward_binns.addNodes("Patton (1970)","The Verdict (1982)","North by Northwest (1959)");
    edward_binns.toTooltip();
    edward_binns.addToMovie(angry_men);

    //Jack Warden
    const jack_warden = new Actors(
        "Jack Warden", 
        1920, 
        2006, 
        "https://en.wikipedia.org/wiki/Jack_Warden");
    jack_warden.addNodes("... and justice for all (1979)","While You Where Sleeping (Saul)","Being There (1979)");
    jack_warden.toTooltip();
    jack_warden.addToMovie(angry_men);

    //Henry Fonda
    const henry_fonda = new Actors(
        "Henry Fonda", 
        1905, 
        1982,
        "https://en.wikipedia.org/wiki/Henry_Fonda");
    henry_fonda.addNodes("On Golden Pond (1981)","The Grapes of Wrath (1940)","The Wrong Man (1956)");
    henry_fonda.toTooltip();
    henry_fonda.addToMovie(angry_men);

    //Joseph Sweedney
    const joseph_sweeney = new Actors(
        "Joseph Sweeney", 
        1884, 
        1963, 
        "https://en.wikipedia.org/wiki/Joseph_Sweeney_(actor)");
    joseph_sweeney.addNodes("The United States Steel Hour (1954)","Armstrong Circle Theatre (1951)","The Defenders (1961)");
    joseph_sweeney.toTooltip();
    joseph_sweeney.addToMovie(angry_men);

    //Ed Begley
    const ed_begley = new Actors("Ed Begley", 
    1901, 
    1970, 
    "https://en.wikipedia.org/wiki/Ed_Begley");
    ed_begley.addNodes("Sweet bird of Youth (1962)", "Hang 'Em High (1986)", "The Unsinkable Molly Brown (1964)");
    ed_begley.toTooltip();
    ed_begley.addToMovie(angry_men);

    //George Voskovec
    const george_voskovec = new Actors(
        "George Voskovec", 
        1905, 
        1981, 
        "https://en.wikipedia.org/wiki/George_Voskovec");
    george_voskovec.addNodes("Somewhere in Time (1980)","The iceman Cometh (1973)","Penize nebo zivot (1932)");
    george_voskovec.toTooltip();
    george_voskovec.addToMovie(angry_men);

    //Robert Webber
    const robert_webber = new Actors(
        "Robert Webber", 
        1924, 
        1989, 
        "https://en.wikipedia.org/wiki/Robert_Webber");
    robert_webber.addNodes("The Dirty Dozen (1967)","Midway (1976)","Private Benjamin (1980)");
    robert_webber.toTooltip();
    robert_webber.addToMovie(angry_men);

    //Rudy Bond
    const rudy_bond = new Actors(
        "Rudy Bond", 
        1912, 
        1982, 
        "https://en.wikipedia.org/wiki/Rudy_Bond");
    rudy_bond.addNodes("Tramlijn (1951)","On the Waterfront (1954)","The Godfather (1972)");
    rudy_bond.toTooltip();
    rudy_bond.addToMovie(angry_men);

if (page == "info.html") angry_men.addAllToPage();

//menus


const Footer = document.querySelector('footer');
const Header = document.querySelector('header');

const elementDropdown = document.createElement('select');
const styleDropdown = document.createElement('select');
const fontSizeInput = document.createElement('input');
const colorInput = document.createElement('input');

// Add the CSS elements
elementDropdown.classList.add('select-dropdown');
styleDropdown.classList.add('select-dropdown');
fontSizeInput.classList.add('fontssize-box');

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

// Add the placeholder to the textbox
  fontSizeInput.setAttribute('placeholder', 'Enter text size');

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
        let urlTemp = event.target.closest('a').getAttribute("href");
        
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

