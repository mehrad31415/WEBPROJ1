//Javascript

//classes for info-page
    //movie (3: Erik)


    //artist (1: Mehrad)


        //director


        //writer 


        //actor


//menus (2: Lars)
    //header menu
    
    // all elements in the menu 

    const elementNames = ["body", "header", "footer", "aside", "articles", "section"]; 


    //footer menu

   

//tooltip (3: Erik)
var tooltipArray = [];
let body = document.getElementsByTagName('body')[0];
let header = document.getElementsByTagName('header')[0];
let footer = document.getElementsByTagName('footer')[0];
let nav = document.getElementsByTagName('nav')[0];

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