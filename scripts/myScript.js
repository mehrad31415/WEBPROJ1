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
    //CLASSES
    body.setAttribute('class', 'body--fit-content body--background-color body--text-font');
    body.children[0].setAttribute('class', 'body__container');
    nav.setAttribute('class', 'nav');
    header.setAttribute('class', 'header--fit-content header--background-colour');
    footer.setAttribute('class', 'footer--positioning footer--fit-content footer--background-colour');

    //HEAD
    const charset = document.createElement('meta');
    charset.setAttribute('charset', 'UTF-8');
    const descr = document.createElement('meta');
    descr.setAttribute('name', 'description');
    const contentString = page.split("-")[0].split(".")[0].charAt(0).toUpperCase() + page.split("-")[0].split(".")[0].slice(1) + " webpage of the movie '12 Angry Men'";
    descr.setAttribute('content', contentString);
    const author = document.createElement('meta');
    author.setAttribute('name', 'author');
    author.setAttribute('content', 'STUDENTS OF UTRECHT UNIVERSITY WEB TECHNOLOGY COURSE');
    const viewp = document.createElement('meta');
    viewp.setAttribute('name', 'viewport');
    viewp.setAttribute('content', 'width=device-width, initial-scale=1.0');
    const title = document.createElement('title');
    title.innerHTML = '12 ANGRY MEN | ' + page.split("-")[0].split(".")[0].toUpperCase();
        //Adding Favicon
    const icon = document.createElement('link');
    icon.setAttribute('rel', 'icon');
    icon.setAttribute('href', '../files/icon/icon.ico');
    const styles = document.createElement('link');
    styles.setAttribute('rel', 'stylesheet');
    styles.setAttribute('href', '../css/style.css');
        //Font Embedding
    const font1 = document.createElement('link');
    font1.setAttribute('rel', 'preconnect');
    font1.setAttribute('href', 'https://fonts.googleapis.com');
    const font2 = document.createElement('link');
    font2.setAttribute('rel', 'preconnect');
    font2.setAttribute('href', 'https://fonts.gstatic.com');
    font2.setAttribute('crossorigin', '');
    const font3 = document.createElement('link');
    font3.setAttribute('rel', 'stylesheet');
    font3.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300&family=Roboto&display=swap');

    head.append(charset, descr, author, viewp, title, icon, styles, font1, font2, font3);

    //HEADER
    const imgLink = document.createElement('a');
    imgLink.setAttribute('href', 'home.html');
    const img = document.createElement('img');
    img.setAttribute('src', '../files/images/film-frame.png');
    img.setAttribute('alt', 'This is an image of a film frame sticker from twitter');
    img.setAttribute('class', 'film-frame');
    imgLink.append(img);
    const h1 = document.createElement('h1');
    h1.setAttribute('class', 'h1--position h1--text-attributes');
    if (page == 'home.html' || page == ''){
        h1.innerHTML = '12 Angry Men';
    } else {
        h1.innerHTML = '12 Angry Men - ' + page.split("-")[0].split(".")[0].charAt(0).toUpperCase() + page.split("-")[0].split(".")[0].slice(1);
    }

    header.append(imgLink, h1)

    //NAVIGATION
    const homeDiv = document.createElement('div');
    homeDiv.setAttribute('class', 'nav__field');
    const homeLink = document.createElement('a');
    homeLink.setAttribute('class', 'link');
    homeLink.setAttribute('href', 'home.html')
    homeDiv.append(homeLink);
    homeLink.innerHTML = 'Home';
    const castDiv = document.createElement('div');
    castDiv.setAttribute('class', 'nav__field');
    const castLink = document.createElement('a');
    castLink.setAttribute('class', 'link');
    castLink.setAttribute('href', 'cast-members.html')
    castDiv.append(castLink);
    castLink.innerHTML = 'Cast';
    const adapDiv = document.createElement('div');
    adapDiv.setAttribute('class', 'nav__field');
    const adapLink = document.createElement('a');
    adapLink.setAttribute('class', 'link');
    adapLink.setAttribute('href', 'adaptations-and-parodies.html')
    adapDiv.append(adapLink);
    adapLink.innerHTML = 'Adaptations';
    const awarDiv = document.createElement('div');
    awarDiv.setAttribute('class', 'nav__field');
    const awarLink = document.createElement('a');
    awarLink.setAttribute('class', 'link');
    awarLink.setAttribute('href', 'awards.html')
    awarDiv.append(awarLink);
    awarLink.innerHTML = 'Awards';
    const tranDiv = document.createElement('div');
    tranDiv.setAttribute('class', 'nav__field');
    const tranLink = document.createElement('a');
    tranLink.setAttribute('class', 'link');
    tranLink.setAttribute('href', 'transcripts.html')
    tranDiv.append(tranLink);
    tranLink.innerHTML = 'Transcripts';
    const reviDiv = document.createElement('div');
    reviDiv.setAttribute('class', 'nav__field');
    const reviLink = document.createElement('a');
    reviLink.setAttribute('class', 'link');
    reviLink.setAttribute('href', 'reviews.html')
    reviDiv.append(reviLink);
    reviLink.innerHTML = 'Reviews';
    const infoDiv = document.createElement('div');
    infoDiv.setAttribute('class', 'nav__field');
    const infoLink = document.createElement('a');
    infoLink.setAttribute('class', 'link');
    infoLink.setAttribute('href', 'info.html')
    infoDiv.append(infoLink);
    infoLink.innerHTML = 'Info';
    const contDiv = document.createElement('div');
    contDiv.setAttribute('class', 'nav__field');
    const contLink = document.createElement('a');
    contLink.setAttribute('class', 'link');
    contLink.setAttribute('href', 'contact.html')
    contDiv.append(contLink);
    contLink.innerHTML = 'Contact';

    nav.append(homeDiv, castDiv, adapDiv, awarDiv, tranDiv, reviDiv, infoDiv, contDiv);

    //FOOTER
    const parFooter = document.createElement('p');
    parFooter.setAttribute('class', 'footer__paragraph');
    parFooter.innerHTML = 'This website has been created as part of the Web Technology course at Utrecht University.';
    parFooter.append(document.createElement('br'));
    parFooter.innerHTML += 'This work has been carried out by three students, namely, Bogaert, L.P. van den (Lars), Riel, E.P.M. van (Erik), Haghshenas, M. (Mehrad).';
    parFooter.append(document.createElement('br'));
    parFooter.innerHTML += 'Should you have any enquiries please ';
    const contact = document.createElement('a');
    contact.setAttribute('class', 'footer__contact-link--no-colour-change');
    contact.innerHTML = 'contact us';
    parFooter.innerHTML += '.';
    const spanFooter = document.createElement('span');
    spanFooter.setAttribute('class', 'footer__jump-top--position-absolute');
    const toTopLink = document.createElement('a');
    toTopLink.setAttribute('href', '#');
    toTopLink.setAttribute('class', 'footer__jump-top--no-colour-change');
    toTopLink.innerHTML = 'Click here to scroll to the top of the page.';
    spanFooter.append(toTopLink);

    footer.append(parFooter, spanFooter);
}

//classes for info-page
    //movie
    class Movie {
        movieName = "placeholderName";
        movieYear = "placeholderYear";
        movieLink = "https://en.wikipedia.org/wiki/Main_Page";
        movieAbout = [];
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
            const aboutText = document.createTextNode(" is a movie from the year " + this.movieYear + ". ");
            for (let i = 0; i < this.movieAbout.length; i++){
                const pAbout = document.createElement('p');
                article.appendChild(pAbout);
                pAbout.innerHTML = this.movieAbout[i];
            }
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
            aboutText = item.name + " was a";
            if (item.role == 'actor') aboutText += "n";
            aboutText += " " + item.role + " born in " + item.yearBirth;
            if (item.yearDeath != null) aboutText += " and passed away in " + item.yearDeath;
            aboutText += ". " + item.info + " Some other projects of " + item.name + " are ";
            aboutTemp.append(document.createTextNode(aboutText));
            for (let i = 0; i < item.infoArray.length - 1; i++){
                let em = document.createElement("em");
                aboutTemp.appendChild(em);
                em.innerHTML = item.infoArray[i];
                aboutTemp.innerHTML += ", ";
            } 
            aboutTemp.innerHTML += "and ";
            let emLast = document.createElement("em");
            aboutTemp.appendChild(emLast);
            emLast.innerHTML = item.infoArray[item.infoArray.length -1]
            aboutTemp.innerHTML += ".";
        }
    }

    //director
    class Director extends Artists{
        constructor (name, yearBirth, yearDeath, link){
            super(name, yearBirth, yearDeath, link);
            this.role = "director";
        }

        createArtistInfo(item, section, aboutText){
            super.createArtistInfo(item, section);

        }
    }

    //writer 
    class Writer extends Artists{
        constructor (name, yearBirth, yearDeath, link){
            super(name, yearBirth, yearDeath, link);
            this.role = "writer";
        }

        createArtistInfo(item, section, aboutText){
            super.createArtistInfo(item, section);

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

//add data
    //Movie 12 Angry Men
    const angry_men = new Movie("12 Angry Men", 1957);
    angry_men.movieLink = "https://en.wikipedia.org/wiki/12_Angry_Men_(1957_film)";
    angry_men.movieAbout = [
        'The movie is an American courtroom drama film directed by Sidney Lumet, adapted from a 1954 teleplay of the same name by Reginald Rose. The film tells the story of a jury of 12 men as they deliberate the conviction or acquittal of a teenager charged with murder on the basis of reasonable doubt; disagreement and conflict among them force the jurors to question their morals and values. It stars Henry Fonda (who also produced the film with Reginald Rose), Lee J. Cobb, Ed Begley, E. G. Marshall, and Jack Warden.',
        '12 Angry Men explores many techniques of consensus-building and the difficulties encountered in the process among this group of men whose range of personalities adds to the intensity and conflict. The jury members are identified only by number; no names are revealed until an exchange of dialogue at the very end. The film forces the audience to evaluate their own self-image through observing the personalities, experiences, and actions of the jurors. The film is also notable for its almost exclusive use of one set, where all but three minutes of the film takes place.',
        'The film was selected as the second-best courtroom drama ever (after 1962'+"'"+'s To Kill a Mockingbird) by the American Film Institute for their AFI'+"'"+'s 10 Top 10 list. It is regarded by many as one of the greatest films ever made. In 2007, the film was selected for preservation in the United States National Film Registry by the Library of Congress as being "culturally, historically, or aesthetically significant".'
    ];
    
    //Sidney Lumet
    const sidney_lumet = new Director(
        "Sidney Lumet",
        1924,
        2011,
        "https://en.wikipedia.org/wiki/Sidney_Lumet"
    )
    sidney_lumet.info = 'According to The Encyclopedia of Hollywood, Lumet was one of the most prolific filmmakers of the modern era, directing more than one movie a year on average since his directorial debut in 1957. Turner Classic Movies notes his "strong direction of actors", "vigorous storytelling" and the "social realism" in his best work. Film critic Roger Ebert described him as "one of the finest craftsmen and warmest humanitarians among all film directors". Lumet was also known as an "actor'+"'"+'s director", having worked with the best of them during his career, probably more than "any other director". Sean Connery, who acted in five of his films, considered him one of his favorite directors, and one who had that "vision thing".';
    sidney_lumet.addNodes("Dog Day Afternoon (1975)", "Network (1976)", "The Verdict (1982)", "Prince of the City (1981)");
    sidney_lumet.toTooltip();
    sidney_lumet.addToMovie(angry_men);

    //Reginald Rose
    const reginald_rose = new Writer(
        "Reginald Rose",
        1920,
        2002,
        "https://en.wikipedia.org/wiki/Reginald_Rose"
    )
    reginald_rose.info = 'Reginald Rose was born in Manhattan on December 10, 1920, the son of Alice (née Obendorfer) and William Rose, a lawyer. Rose attended Townsend Harris High School and briefly attended City College (now part of the City University of New York). He served in the U.S. Army during World War II, from 1942-46, where he was promoted to first lieutenant. Rose began trying to write when he was 15 years old and living in Harlem, but he said, "I didn'+"'"+'t make it until I was 30." In the interim, he worked as an ad agency'+"'"+'s copywriter, a publicist for Warner Bros, a window washer, a clerk, and a counselor at a camp.';
    reginald_rose.addNodes("Crime in the Streets (1956)", "The Porcelain Year (1950)", "Sacco-Vanzetti Story (1960)", "Black Monday (1962)", "Dear Friends (1968)", "This Agony, This Triumph (1972)");
    reginald_rose.toTooltip();
    reginald_rose.addToMovie(angry_men);
    
    //Martin Balsam
    const martin_balsam = new Actors(
        "Martin Balsam",
        1919,
        1996, 
        "https://en.wikipedia.org/wiki/Martin_Balsam"
    );
    martin_balsam.info = "He had a prolific career in character roles in film, in theatre, and on television. An early member of the Actors Studio, he began his career on the New York stage, winning a Tony Award for Best Actor in a Play for Robert Anderson's You Know I Can't Hear You When the Water's Running (1968). He won the Academy Award for Best Supporting Actor for his performance in A Thousand Clowns (1965).";
    martin_balsam.addNodes("All the President's Men (1976)","Psycho (1960)","A Thousand (1965)", "You Know I Can't Hear You When the Water's Running (1968)", "Breakfast at Tiffany's (1961)", "The Carpetbaggers (1964)");
    martin_balsam.toTooltip();
    martin_balsam.addToMovie(angry_men);

    //John Fiedler
    const john_fiedler = new Actors(
        "John Fiedler", 
        1925, 
        2005, 
        "https://en.wikipedia.org/wiki/John_Fiedler"
    );
    john_fiedler.info = "He had a prolific career in character roles in film, in theatre, and on television. An early member of the Actors Studio, he began his career on the New York stage, winning a Tony Award for Best Actor in a Play for Robert Anderson's You Know I Can't Hear You When the Water's Running (1968). He won the Academy Award for Best Supporting Actor for his performance in A Thousand Clowns (1965). Fiedler was born in Platteville, Wisconsin, a son of beer salesman Donald Fiedler and his wife Margaret (née Phelan). He was of German and Irish descent.";
    john_fiedler.addNodes("The Odd Couple (1965)","The Bob Newhart Show (1972)","Robin Hood (1973)", "A Raisin in the Sun (1961)");
    john_fiedler.toTooltip();
    john_fiedler.addToMovie(angry_men);

    //Lee J. Cobb
    const lee_j_cobb = new Actors(
        "Lee J. Cobb", 
        1911, 
        1976, 
        "https://en.wikipedia.org/wiki/Lee_J._Cobb"
    );
    lee_j_cobb.info = "he is known both for film roles and his work on the Broadway stage, as well as for his television role as the star of the TV series The Virginian. He often played arrogant, intimidating and abrasive characters, but he also acted as respectable figures such as judges and police officers. Cobb was born in New York City, to a Jewish family of Russian and Romanian origin. He grew up in the Bronx, New York, on Wilkins Avenue, near Crotona Park. His parents were Benjamin (Benzion) Jacob, a compositor for a foreign-language newspaper, and Kate (Neilecht).";
    lee_j_cobb.addNodes("On the Waterfront (1954)","Exodus (1960)","The Exorcist (1973)", "On the Waterfront (1954)", "The Brothers Karamazov (1958)",  "Man of the West (1958)", "Exodus (1960)", "How the West Was Won (1962)", "Our Man Flint (1966)");
    lee_j_cobb.toTooltip();
    lee_j_cobb.addToMovie(angry_men);

    //E. G. marshall
    const e_g_marshall = new Actors(
        "E. G. Marshall", 
        1914, 
        1998, 
        "https://en.wikipedia.org/wiki/E._G._Marshall"
    );
    e_g_marshall.info = 'Marshall was born Everett Eugene Grunz[1] in Owatonna, Minnesota,[2] the son of Hazel Irene (née Cobb) and Charles G. Grunz. His paternal grandparents were German immigrants. During his life, he chose not to reveal what "E. G." stood for, saying that it stood for "Everybody'+ "'" +'s Guess." The U.S. Social Security Claims Index states that he was listed with the Social Security Administration in June 1937 as Everett Eugene Grunz, and in December 1975 as E.G. Marshall.';
    e_g_marshall.addNodes("Creepshow (1982)","National Lampoon's Cristmas Vacation (1989)","Nixon (1995)", "Superman II (1980)");
    e_g_marshall.toTooltip();
    e_g_marshall.addToMovie(angry_men);

    //Jack Klugman
    const jack_klugman = new Actors(
        "Jack Klugman", 
        1922, 
        2012, 
        "https://en.wikipedia.org/wiki/Jack_Klugman"
    );
    jack_klugman.info = "Klugman was born in Philadelphia, the youngest of six children born to Rose, a hat maker, and Max Klugman, a house painter. His parents were Russian-Jewish immigrants. Klugman served in the United States Army during World War II."
    jack_klugman.addNodes("The Odd Couple (1970)","Quincy M.E. (1976)","Days of Wine and Roses (1962)");
    jack_klugman.toTooltip();
    jack_klugman.addToMovie(angry_men);

    //Edward Binns
    const edward_binns = new Actors(
        "Edward Binns", 
        1916, 
        1990, 
        "https://en.wikipedia.org/wiki/Edward_Binns"
    );
    edward_binns.info = "He had a wide-spanning career in film and television, often portraying competent, hard working and purposeful characters in his various roles. Binns was born in Philadelphia, Pennsylvania, the son of Esther (née Bracken) and Edward Thomas Binns. His family were Quakers. He graduated from the Pennsylvania State University in 1937.";
    edward_binns.addNodes("Patton (1970)","The Verdict (1982)","North by Northwest (1959)", "Judgment at Nuremberg (1961)", "Fail Safe (1964)", "The Americanization of Emily (1964)");
    edward_binns.toTooltip();
    edward_binns.addToMovie(angry_men);

    //Jack Warden
    const jack_warden = new Actors(
        "Jack Warden", 
        1920, 
        2006, 
        "https://en.wikipedia.org/wiki/Jack_Warden"
    );
    jack_warden.info = "Warden was born in Newark, New Jersey, the son of Laura M. (née Costello) and John Warden Lebzelter, who was an engineer and technician. He was of Pennsylvania Dutch (German) and Irish ancestry. Raised in Louisville, Kentucky, he was expelled from high school for fighting and eventually fought as a professional boxer under the name Johnny Costello. He fought in 13 bouts as a welterweight, but earned little money.";
    jack_warden.addNodes("... and justice for all (1979)", "While You Where Sleeping (Saul)", "Being There (1979)", "Heaven Can Wait (1978)", "Shampoo (1975)");
    jack_warden.toTooltip();
    jack_warden.addToMovie(angry_men);

    //Henry Fonda
    const henry_fonda = new Actors(
        "Henry Fonda", 
        1905, 
        1982,
        "https://en.wikipedia.org/wiki/Henry_Fonda"
    );
    henry_fonda.info = "He had a career that spanned five decades on Broadway and in Hollywood. He cultivated an everyman screen image in several films considered to be classics. Born and raised in Nebraska, Fonda made his mark early as a Broadway actor and made his Hollywood film debut in 1935. Born in Grand Island, Nebraska, on May 16, 1905, Henry Jaynes Fonda was the son of printer William Brace Fonda, and his wife, Herberta (Jaynes). The family moved to Omaha, Nebraska, in 1906.";
    henry_fonda.addNodes("The Grapes of Wrath (1940)", "On Golden Pond (1981)","The Grapes of Wrath (1940)","The Wrong Man (1956)",  "Jezebel (1938)", "Jesse James (1939)", "Young Mr. Lincoln (1939)");
    henry_fonda.toTooltip();
    henry_fonda.addToMovie(angry_men);

    //Joseph Sweedney
    const joseph_sweeney = new Actors(
        "Joseph Sweeney", 
        1884, 
        1963, 
        "https://en.wikipedia.org/wiki/Joseph_Sweeney_(actor)"
    );
    joseph_sweeney.info = "He worked in stage productions, television and movies. Born in Philadelphia, Sweeney debuted on stage in stock theater with a company in Norwich, Connecticut. He had a successful career as a stage performer. Sweeney kept acting until his death, appearing in numerous television shows, including at least twelve during the last year of his life. He died on November 25, 1963, at the age of 79.";
    joseph_sweeney.addNodes("The United States Steel Hour (1954)","Armstrong Circle Theatre (1951)","The Defenders (1961)");
    joseph_sweeney.toTooltip();
    joseph_sweeney.addToMovie(angry_men);

    //Ed Begley
    const ed_begley = new Actors(
        "Ed Begley", 
        1901, 
        1970, 
        "https://en.wikipedia.org/wiki/Ed_Begley"
    );
    ed_begley.info = 'He won an Academy Award for Best Supporting Actor for his performance in the film Sweet Bird of Youth (1962). Begley was born in Hartford, Connecticut, to two Irish immigrants, Hannah (née Clifford) and Michael Joseph Begley. After he dropped out of school as a fifth-grader, Begley ran away from home several times, going to work for "carnivals, fairs, and small circuses". Later he sold brushes, delivered milk, and served four years in the United States Navy during World War I.';
    ed_begley.addNodes("Sweet bird of Youth (1962)", "Hang 'Em High (1986)", "The Unsinkable Molly Brown (1964)");
    ed_begley.toTooltip();
    ed_begley.addToMovie(angry_men);

    //George Voskovec
    const george_voskovec = new Actors(
        "George Voskovec", 
        1905, 
        1981, 
        "https://en.wikipedia.org/wiki/George_Voskovec"
    );
    george_voskovec.info = "Jiří Voskovec (Czech pronunciation: ['jɪr̝i: 'voskovɛts] (listen)), born Jiří Wachsmann and known in the United States as George Voskovec (June 19, 1905 - July 1, 1981) was a Czech actor, writer, dramatist, and director who became an American citizen in 1955. Throughout much of his career he was associated with actor and playwright Jan Werich.";
    george_voskovec.addNodes("Somewhere in Time (1980)","The iceman Cometh (1973)","Penize nebo zivot (1932)");
    george_voskovec.toTooltip();
    george_voskovec.addToMovie(angry_men);

    //Robert Webber
    const robert_webber = new Actors(
        "Robert Webber", 
        1924, 
        1989, 
        "https://en.wikipedia.org/wiki/Robert_Webber"
    );
    robert_webber.info = "Webber was the son of Robert Webber, who was a merchant seaman. He graduated from Oakland Technical High School. Webber enlisted in the United States Marine Corps in 1943 during World War II, serving in the 1st Marine Amphibious Corps and later in the 6th Marine Division as a 776-Radio Operator (Low Speed) in Guam and Okinawa. Webber was discharged in 1945 as a private first class and was awarded the Navy Combat Action Ribbon, the Navy Presidential Unit Citation, the American Campaign Medal, the Asiatic-Pacific Campaign Medal and the World War II Victory Medal.";
    robert_webber.addNodes("The Dirty Dozen (1967)","Midway (1976)","Private Benjamin (1980)");
    robert_webber.toTooltip();
    robert_webber.addToMovie(angry_men);

    //Rudy Bond
    const rudy_bond = new Actors(
        "Rudy Bond", 
        1912, 
        1982, 
        "https://en.wikipedia.org/wiki/Rudy_Bond"
    );
    rudy_bond.info = "He was active from 1947 until his death. His work spanned Broadway, films and television. Bond was born in Philadelphia, Pennsylvania, the second youngest of five children. He was raised in urban Philadelphia by his mother. He was educated in Philadelphia schools, and eventually received a BA degree from Central High, the only school in the nation certificated to grant such degrees. Bond was introduced to the world of acting at the age of 16. He was playing basketball with a group of friends when Julie Sutton, the director of a city amateur acting group (Neighborhood Players, which performed in the same building as the basketball area) approached the group and asked if anybody wanted to be in an upcoming play. He volunteered, and acted in several plays before leaving Philadelphia to join the United States Army. He spent four years in the army, was wounded while serving in World War II, and returned to Philadelphia upon his discharge.";
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
            text3 = document.createTextNode("Click to read more about " + nameTemp + " and go to: " );
            container.append(text3);
            container.appendChild(document.createElement('br'));
            container.innerHTML += urlTemp;
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

