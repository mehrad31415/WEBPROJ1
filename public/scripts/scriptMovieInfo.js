//Javascript

let movieArray = [];
let id = ejsmovie.movieID;
console.log("ejsmovie = " + ejsmovie)

//classes for info-page
//movie
class Movie {
    constructor(id, name, year, genre) {
        this.movieID = id;
        this.movieName = name;
        this.movieYear = year;
        this.movieGenre = genre;
        this.movieLink = "";
        this.posterLink = "";
        this.trailerLink = "";
        this.movieAbout = [];
        this.moviePlot = [];
        this.artistArray = [];
    }

    addAllToPage() {
        const container = document.getElementsByClassName("body__container")[0];
        const article = document.createElement("article");
        container.appendChild(article);
        article.setAttribute("class", "article-block");
        const heading = document.createElement("h2");
        article.appendChild(heading);
        heading.setAttribute("class", "h2--position h2--text-attributes line--width-full");
        const headingText = document.createTextNode(this.movieName + " - Information");
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
        link.append(document.createTextNode(this.movieName));
        const aboutText = document.createTextNode(" is a " + this.movieGenre + " movie from the year " + this.movieYear + ". The poster of the movie can be found on ");
        about.append(aboutText);
        const underlineLinkPoster = document.createElement('u');
        about.appendChild(underlineLinkPoster);
        const posterLinkTemp = document.createElement('a');
        posterLinkTemp.setAttribute("class", "link--decoration");
        posterLinkTemp.setAttribute("href", this.posterLink);
        posterLinkTemp.setAttribute("target", "_blank");
        underlineLinkPoster.appendChild(posterLinkTemp);
        posterLinkTemp.append(document.createTextNode(this.posterLink.split('.')[1]));
        about.append(document.createTextNode('. The trailer can either be found on the '));
        const underlineLinkHomePage = document.createElement('u');
        about.appendChild(underlineLinkHomePage);
        const homePageLinkTemp = document.createElement('a');
        homePageLinkTemp.setAttribute("class", "link--decoration");
        homePageLinkTemp.setAttribute("href", 'home.html');
        underlineLinkHomePage.appendChild(homePageLinkTemp);
        homePageLinkTemp.append(document.createTextNode('home page'));
        about.append(document.createTextNode(' of this website or on '));
        const underlineLinkTrailer = document.createElement('u');
        about.appendChild(underlineLinkTrailer);
        const trailerLinkTemp = document.createElement('a');
        trailerLinkTemp.setAttribute("class", "link--decoration");
        trailerLinkTemp.setAttribute("href", this.trailerLink);
        trailerLinkTemp.setAttribute("target", "_blank");
        underlineLinkTrailer.appendChild(trailerLinkTemp);
        trailerLinkTemp.append(document.createTextNode(this.trailerLink.split('.')[1]));
        about.append(document.createTextNode('.'));


        for (let i = 0; i < this.movieAbout.length; i++) {
            const pAbout = document.createElement('p');
            article.appendChild(pAbout);
            pAbout.append(document.createTextNode(this.movieAbout[i]));
        }
        for (let i = 0; i < this.moviePlot.length; i++) {
            const pPlot = document.createElement('p');
            article.appendChild(pPlot);
            pPlot.append(document.createTextNode(this.moviePlot[i]));
        }
        const para = document.createElement('p');
        article.appendChild(para);
        para.append(document.createTextNode("Extended information about the artists that participated in this movie is listed below."));

        const artistsSection = document.createElement('section');
        article.appendChild(artistsSection);

        const headingDirector = document.createElement("h3");
        headingDirector.setAttribute('class', 'h3--position h3--attributes');
        artistsSection.appendChild(headingDirector);
        const hrDir = document.createElement('hr');
        hrDir.setAttribute('class', 'hr--decoration');
        headingDirector.append(document.createTextNode('Director'));
        artistsSection.appendChild(hrDir);

        for (let i = 0; i < this.artistArray.length; i++) {
            if (this.artistArray[i].role == "director") {
                this.artistArray[i].createArtistInfo(this.artistArray[i], artistsSection);
            }
        }

        const headingWriter = document.createElement("h3");
        headingWriter.setAttribute('class', 'h3--position h3--attributes');
        artistsSection.appendChild(headingWriter);
        headingWriter.append(document.createTextNode('Writer'));
        const hrWri = document.createElement('hr');
        hrWri.setAttribute('class', 'hr--decoration');
        artistsSection.appendChild(hrWri);

        for (let i = 0; i < this.artistArray.length; i++) {
            if (this.artistArray[i].role == "writer") {
                this.artistArray[i].createArtistInfo(this.artistArray[i], artistsSection);
            }
        }

        const headingActor = document.createElement("h3");
        headingActor.setAttribute('class', 'h3--position h3--attributes');
        artistsSection.appendChild(headingActor);
        headingActor.append(document.createTextNode('Actors'));
        const hrAct = document.createElement('hr');
        hrAct.setAttribute('class', 'hr--decoration');
        artistsSection.appendChild(hrAct);

        for (let i = 0; i < this.artistArray.length; i++) {
            if (this.artistArray[i].role == "actor") {
                this.artistArray[i].createArtistInfo(this.artistArray[i], artistsSection);
            }
        }

    }

}

//artist
class Artists {
    constructor(name, yearBirth, yearDeath, link) {
        this.name = name;
        this.yearBirth = yearBirth;
        this.yearDeath = yearDeath;
        this.link = link;
        this.picture = "../files/images/" + name.replaceAll(" ", "_").replaceAll(".", "").toLowerCase() + ".jpg";
        this.infoArray = [];
        this.info = "";
    }
    addNodes() {
        const args = arguments;
        for (let i = 0; i < args.length; i++) {
            this.infoArray.push(args[i]);

        }
    }
    toTooltip() {
        let nodeArray = [];
        for (let i = 0; i < 3; i++) {
            nodeArray.push(this.infoArray[i]);
        }
        tooltipArray.push({ name: this.name, yearBirth: this.yearBirth, yearDeath: this.yearDeath, nodeArray: nodeArray });
    }

    addToMovie(movie) {
        movie.artistArray.push(this);
    }

    createArtistInfo(item, section) {
        let container = document.createElement('article');
        container.setAttribute('class', 'container');
        section.appendChild(container);

        let linkTempPic = document.createElement('a');
        linkTempPic.setAttribute("class", "link--decoration");
        linkTempPic.setAttribute("href", item.link);
        linkTempPic.setAttribute("target", "_blank");
        let image = document.createElement('img');
        image.setAttribute('src', item.picture);
        image.setAttribute('alt', 'this is a picture of ' + item.name);
        image.setAttribute('height', '100');
        image.setAttribute('class', 'info-image--margin');
        image.append(document.createTextNode(item.name));
        linkTempPic.append(image);

        let strongTemp = document.createElement('STRONG');
        container.append(linkTempPic, strongTemp);
        let linkTemp = document.createElement('a');
        linkTemp.setAttribute("class", "link--decoration");
        linkTemp.setAttribute("href", item.link);
        linkTemp.setAttribute("target", "_blank");
        strongTemp.appendChild(linkTemp);
        let imageBreak = document.createElement('br');
        linkTemp.append(imageBreak, document.createTextNode(item.name));
        let aboutTemp = document.createElement('p');
        aboutTemp.setAttribute('class', 'info-about--margin');
        container.appendChild(aboutTemp);
        let aboutText = item.name + " was a";
        if (item.role == 'actor') aboutText += "n";
        aboutText += " " + item.role + " born in " + item.yearBirth;
        if (item.yearDeath != null) aboutText += " and passed away in " + item.yearDeath;
        aboutText += ". " + item.info + " Some other projects of " + item.name + " are ";
        aboutTemp.append(document.createTextNode(aboutText));
        for (let i = 0; i < item.infoArray.length - 1; i++) {
            let em = document.createElement("em");
            aboutTemp.appendChild(em);
            em.append(document.createTextNode(item.infoArray[i]));
            aboutTemp.append(document.createTextNode(", "));
        }
        aboutTemp.append(document.createTextNode("and "));
        let emLast = document.createElement("em");
        aboutTemp.appendChild(emLast);
        emLast.append(document.createTextNode(item.infoArray[item.infoArray.length - 1]));
        aboutTemp.append(document.createTextNode("."));
    }
}

//director
class Director extends Artists {
    constructor(name, yearBirth, yearDeath, link) {
        super(name, yearBirth, yearDeath, link);
        this.role = "director";
    }

    createArtistInfo(item, section) {
        super.createArtistInfo(item, section);

    }
}

//writer
class Writer extends Artists {
    constructor(name, yearBirth, yearDeath, link) {
        super(name, yearBirth, yearDeath, link);
        this.role = "writer";
    }

    createArtistInfo(item, section) {
        super.createArtistInfo(item, section);

    }
}

//actor
class Actors extends Artists {
    constructor(name, yearBirth, yearDeath, link) {
        super(name, yearBirth, yearDeath, link);
        this.role = "actor";
    }

    createArtistInfo(item, section) {
        super.createArtistInfo(item, section);

    }
}

//add data
//Movie 12 Angry Men
// const currentMovie = new Movie(0, "12 Angry Men", 1957, "courtroom drama");
// currentMovie.movieLink = "https://en.wikipedia.org/wiki/12_currentMovie_(1957_film)";
// currentMovie.posterLink = "https://en.wikipedia.org/wiki/12_currentMovie_%281957_film%29#/media/File:12_currentMovie_(1957_film_poster).jpg";
// currentMovie.trailerLink = "https://www.youtube.com/watch?v=TEN-2uTi2c0";
// currentMovie.movieAbout = [
//     'The movie is an American film directed by Sidney Lumet, adapted from a 1954 teleplay of the same name by Reginald Rose. The film tells the story of a jury of 12 men as they deliberate the conviction or acquittal of a teenager charged with murder on the basis of reasonable doubt; disagreement and conflict among them force the jurors to question their morals and values. It stars Henry Fonda (who also produced the film with Reginald Rose), Lee J. Cobb, Ed Begley, E. G. Marshall, and Jack Warden.',
//     '12 Angry Men explores many techniques of consensus-building and the difficulties encountered in the process among this group of men whose range of personalities adds to the intensity and conflict. The jury members are identified only by number; no names are revealed until an exchange of dialogue at the very end. The film forces the audience to evaluate their own self-image through observing the personalities, experiences, and actions of the jurors. The film is also notable for its almost exclusive use of one set, where all but three minutes of the film takes place.',
//     'The film was selected as the second-best courtroom drama ever (after 1962' + "'" + 's To Kill a Mockingbird) by the American Film Institute for their AFI' + "'" + 's 10 Top 10 list. It is regarded by many as one of the greatest films ever made. In 2007, the film was selected for preservation in the United States National Film Registry by the Library of Congress as being "culturally, historically, or aesthetically significant".'
// ];
// currentMovie.moviePlot = [
//     'In the sweltering jury room of the New York County Courthouse, a jury prepares to deliberate the case of an impoverished teenager accused of stabbing his abusive father to death. The judge instructs the Jury that if there is any reasonable doubt, the jurors are to return a verdict of not guilty; if found guilty, the defendant will receive a mandatory death sentence via the electric chair. The verdict must be unanimous.',
//     'At first, the case seems clear. A neighbor testified to witnessing the defendant stab his father from her window, through the windows of a passing elevated train. Another neighbor testified that he heard the defendant threaten to kill his father, and the father' + "'" + 's body hitting the ground; then, as he ran to his door, saw the defendant running down the stairs. The boy has a violent past; he had recently purchased a switchblade of the same type that was found, wiped of fingerprints, at the murder scene, but claimed he lost it.',
//     'In a preliminary vote, all jurors vote "guilty" except Juror 8, who believes that there should be some discussion before the verdict is made. He says he cannot vote "guilty" because reasonable doubt exists. With his first few arguments seemingly failing to convince any of the other jurors, Juror 8 suggests a secret ballot, from which he will abstain; if all the other jurors still vote guilty, he will acquiesce. The ballot reveals one "not guilty" vote. Juror 9 reveals that he changed his vote; he respects Juror 8' + "'" + 's motives, and agrees that there should be more discussion.',
//     'Juror 8 argues that the noise of the passing train would have obscured everything the second witness claimed to have overheard. Juror 5 changes his vote, followed by Juror 11. Jurors 5, 6, and 8 further question the second witness' + "'" + 's story. After looking at a diagram of the witness' + "'" + 's apartment and conducting an experiment, the jurors determine that it is impossible the disabled witness could have made it to the door in time. Juror 3, infuriated, argues with and tries to attack Juror 8. Jurors 2 and 6 change their votes; the jury is now evenly split.',
//     'Juror 4 doubts the defendant' + "'" + 's alibi based on the boy' + "'" + 's inability to recall specific details. Juror 8 tests Juror 4' + "'" + 's own memory to make a point. Jurors 2 and 5 point out the unlikelihood the boy made a stab wound angled downwards, as he was shorter than his father. Juror 7 changes his vote out of impatience rather than conviction, angering Juror 11. After another vote, Jurors 12 and 1 also change sides, leaving only three "guilty" votes.',
//     'Juror 10 begins a bigoted rant, causing Juror 4 to forbid him to speak for the remainder of the deliberation. When Juror 4 is pressed as to why he still maintains a guilty vote, he declares that the woman who saw the killing from across the street stands as solid evidence. Juror 12 reverts to a guilty vote.',
//     'After watching Juror 4 remove his glasses and rub the impressions they made on his nose, Juror 9 realizes that the first witness was constantly rubbing similar impressions on her own nose, indicating that she also was a habitual glasses wearer. He observes she also always dressed up in clothes befitting a younger woman, hence not wearing the glasses in court. Juror 8 remarks that the witness, who was trying to sleep when she saw the killing through her bedroom window, would not have had glasses on or the time to put them on, making her story questionable. Jurors 12, 10 and 4 all change their vote, leaving Juror 3 as the sole dissenter.',
//     'Juror 3 loudly tries to convince the others, revealing that his strained relationship with his own son makes him wish the defendant guilty. He breaks down in tears and changes his vote to "not guilty". As the others leave, Juror 8 graciously helps Juror 3 with his coat. The defendant is acquitted off-screen, and the jurors leave the courthouse. Jurors 8 and 9 stop to learn each other' + "'" + 's real names (Davis and McCardle, respectively), before parting.'
// ];

const currentMovie = new Movie(ejsmovie.movieID, ejsmovie.movieName, ejsmovie.movieYear, ejsmovie.movieGenre);
currentMovie.movieLink = ejsmovie.movieLink;
currentMovie.posterLink = ejsmovie.posterLink;
currentMovie.trailerLink = ejsmovie.trailerLink;
currentMovie.movieAbout = ejsmovie.movieAbout;
currentMovie.moviePlot = ejsmovie.moviePlot;

//Sidney Lumet
const sidney_lumet = new Director(
    "Sidney Lumet",
    1924,
    2011,
    "https://en.wikipedia.org/wiki/Sidney_Lumet"
);
sidney_lumet.info = 'According to The Encyclopedia of Hollywood, Lumet was one of the most prolific filmmakers of the modern era, directing more than one movie a year on average since his directorial debut in 1957. Turner Classic Movies notes his "strong direction of actors", "vigorous storytelling" and the "social realism" in his best work. Film critic Roger Ebert described him as "one of the finest craftsmen and warmest humanitarians among all film directors". Lumet was also known as an "actor' + "'" + 's director", having worked with the best of them during his career, probably more than "any other director". Sean Connery, who acted in five of his films, considered him one of his favorite directors, and one who had that "vision thing".';
sidney_lumet.addNodes("Dog Day Afternoon (1975)", "Network (1976)", "The Verdict (1982)", "Prince of the City (1981)");
sidney_lumet.toTooltip();
sidney_lumet.addToMovie(currentMovie);

//Reginald Rose
const reginald_rose = new Writer(
    "Reginald Rose",
    1920,
    2002,
    "https://en.wikipedia.org/wiki/Reginald_Rose"
);
reginald_rose.info = 'Reginald Rose was born in Manhattan on December 10, 1920, the son of Alice (née Obendorfer) and William Rose, a lawyer. Rose attended Townsend Harris High School and briefly attended City College (now part of the City University of New York). He served in the U.S. Army during World War II, from 1942-46, where he was promoted to first lieutenant. Rose began trying to write when he was 15 years old and living in Harlem, but he said, "I didn' + "'" + 't make it until I was 30." In the interim, he worked as an ad agency' + "'" + 's copywriter, a publicist for Warner Bros, a window washer, a clerk, and a counselor at a camp.';
reginald_rose.addNodes("Crime in the Streets (1956)", "The Porcelain Year (1950)", "Sacco-Vanzetti Story (1960)", "Black Monday (1962)", "Dear Friends (1968)", "This Agony, This Triumph (1972)");
reginald_rose.toTooltip();
reginald_rose.addToMovie(currentMovie);

//Martin Balsam
const martin_balsam = new Actors(
    "Martin Balsam",
    1919,
    1996,
    "https://en.wikipedia.org/wiki/Martin_Balsam"
);
martin_balsam.info = "He had a prolific career in character roles in film, in theatre, and on television. An early member of the Actors Studio, he began his career on the New York stage, winning a Tony Award for Best Actor in a Play for Robert Anderson's You Know I Can't Hear You When the Water's Running (1968). He won the Academy Award for Best Supporting Actor for his performance in A Thousand Clowns (1965).";
martin_balsam.addNodes("All the President's Men (1976)", "Psycho (1960)", "A Thousand (1965)", "You Know I Can't Hear You When the Water's Running (1968)", "Breakfast at Tiffany's (1961)", "The Carpetbaggers (1964)");
martin_balsam.toTooltip();
martin_balsam.addToMovie(currentMovie);

//John Fiedler
const john_fiedler = new Actors(
    "John Fiedler",
    1925,
    2005,
    "https://en.wikipedia.org/wiki/John_Fiedler"
);
john_fiedler.info = "He had a prolific career in character roles in film, in theatre, and on television. An early member of the Actors Studio, he began his career on the New York stage, winning a Tony Award for Best Actor in a Play for Robert Anderson's You Know I Can't Hear You When the Water's Running (1968). He won the Academy Award for Best Supporting Actor for his performance in A Thousand Clowns (1965). Fiedler was born in Platteville, Wisconsin, a son of beer salesman Donald Fiedler and his wife Margaret (née Phelan). He was of German and Irish descent.";
john_fiedler.addNodes("The Odd Couple (1965)", "The Bob Newhart Show (1972)", "Robin Hood (1973)", "A Raisin in the Sun (1961)");
john_fiedler.toTooltip();
john_fiedler.addToMovie(currentMovie);

//Lee J. Cobb
const lee_j_cobb = new Actors(
    "Lee J. Cobb",
    1911,
    1976,
    "https://en.wikipedia.org/wiki/Lee_J._Cobb"
);
lee_j_cobb.info = "he is known both for film roles and his work on the Broadway stage, as well as for his television role as the star of the TV series The Virginian. He often played arrogant, intimidating and abrasive characters, but he also acted as respectable figures such as judges and police officers. Cobb was born in New York City, to a Jewish family of Russian and Romanian origin. He grew up in the Bronx, New York, on Wilkins Avenue, near Crotona Park. His parents were Benjamin (Benzion) Jacob, a compositor for a foreign-language newspaper, and Kate (Neilecht).";
lee_j_cobb.addNodes("On the Waterfront (1954)", "Exodus (1960)", "The Exorcist (1973)", "On the Waterfront (1954)", "The Brothers Karamazov (1958)", "Man of the West (1958)", "Exodus (1960)", "How the West Was Won (1962)", "Our Man Flint (1966)");
lee_j_cobb.toTooltip();
lee_j_cobb.addToMovie(currentMovie);

//E. G. marshall
const e_g_marshall = new Actors(
    "E. G. Marshall",
    1914,
    1998,
    "https://en.wikipedia.org/wiki/E._G._Marshall"
);
e_g_marshall.info = 'Marshall was born Everett Eugene Grunz[1] in Owatonna, Minnesota,[2] the son of Hazel Irene (née Cobb) and Charles G. Grunz. His paternal grandparents were German immigrants. During his life, he chose not to reveal what "E. G." stood for, saying that it stood for "Everybody' + "'" + 's Guess." The U.S. Social Security Claims Index states that he was listed with the Social Security Administration in June 1937 as Everett Eugene Grunz, and in December 1975 as E.G. Marshall.';
e_g_marshall.addNodes("Creepshow (1982)", "National Lampoon's Cristmas Vacation (1989)", "Nixon (1995)", "Superman II (1980)");
e_g_marshall.toTooltip();
e_g_marshall.addToMovie(currentMovie);

//Jack Klugman
const jack_klugman = new Actors(
    "Jack Klugman",
    1922,
    2012,
    "https://en.wikipedia.org/wiki/Jack_Klugman"
);
jack_klugman.info = "Klugman was born in Philadelphia, the youngest of six children born to Rose, a hat maker, and Max Klugman, a house painter. His parents were Russian-Jewish immigrants. Klugman served in the United States Army during World War II.";
jack_klugman.addNodes("The Odd Couple (1970)", "Quincy M.E. (1976)", "Days of Wine and Roses (1962)");
jack_klugman.toTooltip();
jack_klugman.addToMovie(currentMovie);

//Edward Binns
const edward_binns = new Actors(
    "Edward Binns",
    1916,
    1990,
    "https://en.wikipedia.org/wiki/Edward_Binns"
);
edward_binns.info = "He had a wide-spanning career in film and television, often portraying competent, hard working and purposeful characters in his various roles. Binns was born in Philadelphia, Pennsylvania, the son of Esther (née Bracken) and Edward Thomas Binns. His family were Quakers. He graduated from the Pennsylvania State University in 1937.";
edward_binns.addNodes("Patton (1970)", "The Verdict (1982)", "North by Northwest (1959)", "Judgment at Nuremberg (1961)", "Fail Safe (1964)", "The Americanization of Emily (1964)");
edward_binns.toTooltip();
edward_binns.addToMovie(currentMovie);

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
jack_warden.addToMovie(currentMovie);

//Henry Fonda
const henry_fonda = new Actors(
    "Henry Fonda",
    1905,
    1982,
    "https://en.wikipedia.org/wiki/Henry_Fonda"
);
henry_fonda.info = "He had a career that spanned five decades on Broadway and in Hollywood. He cultivated an everyman screen image in several films considered to be classics. Born and raised in Nebraska, Fonda made his mark early as a Broadway actor and made his Hollywood film debut in 1935. Born in Grand Island, Nebraska, on May 16, 1905, Henry Jaynes Fonda was the son of printer William Brace Fonda, and his wife, Herberta (Jaynes). The family moved to Omaha, Nebraska, in 1906.";
henry_fonda.addNodes("The Grapes of Wrath (1940)", "On Golden Pond (1981)", "The Grapes of Wrath (1940)", "The Wrong Man (1956)", "Jezebel (1938)", "Jesse James (1939)", "Young Mr. Lincoln (1939)");
henry_fonda.toTooltip();
henry_fonda.addToMovie(currentMovie);

//Joseph Sweedney
const joseph_sweeney = new Actors(
    "Joseph Sweeney",
    1884,
    1963,
    "https://en.wikipedia.org/wiki/Joseph_Sweeney_(actor)"
);
joseph_sweeney.info = "He worked in stage productions, television and movies. Born in Philadelphia, Sweeney debuted on stage in stock theater with a company in Norwich, Connecticut. He had a successful career as a stage performer. Sweeney kept acting until his death, appearing in numerous television shows, including at least twelve during the last year of his life. He died on November 25, 1963, at the age of 79.";
joseph_sweeney.addNodes("The United States Steel Hour (1954)", "Armstrong Circle Theatre (1951)", "The Defenders (1961)");
joseph_sweeney.toTooltip();
joseph_sweeney.addToMovie(currentMovie);

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
ed_begley.addToMovie(currentMovie);

//George Voskovec
const george_voskovec = new Actors(
    "George Voskovec",
    1905,
    1981,
    "https://en.wikipedia.org/wiki/George_Voskovec"
);
george_voskovec.info = "Jiří Voskovec (Czech pronunciation: ['jɪr̝i: 'voskovɛts] (listen)), born Jiří Wachsmann and known in the United States as George Voskovec (June 19, 1905 - July 1, 1981) was a Czech actor, writer, dramatist, and director who became an American citizen in 1955. Throughout much of his career he was associated with actor and playwright Jan Werich.";
george_voskovec.addNodes("Somewhere in Time (1980)", "The iceman Cometh (1973)", "Penize nebo zivot (1932)");
george_voskovec.toTooltip();
george_voskovec.addToMovie(currentMovie);

//Robert Webber
const robert_webber = new Actors(
    "Robert Webber",
    1924,
    1989,
    "https://en.wikipedia.org/wiki/Robert_Webber"
);
robert_webber.info = "Webber was the son of Robert Webber, who was a merchant seaman. He graduated from Oakland Technical High School. Webber enlisted in the United States Marine Corps in 1943 during World War II, serving in the 1st Marine Amphibious Corps and later in the 6th Marine Division as a 776-Radio Operator (Low Speed) in Guam and Okinawa. Webber was discharged in 1945 as a private first class and was awarded the Navy Combat Action Ribbon, the Navy Presidential Unit Citation, the American Campaign Medal, the Asiatic-Pacific Campaign Medal and the World War II Victory Medal.";
robert_webber.addNodes("The Dirty Dozen (1967)", "Midway (1976)", "Private Benjamin (1980)");
robert_webber.toTooltip();
robert_webber.addToMovie(currentMovie);

//Rudy Bond
const rudy_bond = new Actors(
    "Rudy Bond",
    1912,
    1982,
    "https://en.wikipedia.org/wiki/Rudy_Bond"
);
rudy_bond.info = "He was active from 1947 until his death. His work spanned Broadway, films and television. Bond was born in Philadelphia, Pennsylvania, the second youngest of five children. He was raised in urban Philadelphia by his mother. He was educated in Philadelphia schools, and eventually received a BA degree from Central High, the only school in the nation certificated to grant such degrees. Bond was introduced to the world of acting at the age of 16. He was playing basketball with a group of friends when Julie Sutton, the director of a city amateur acting group (Neighborhood Players, which performed in the same building as the basketball area) approached the group and asked if anybody wanted to be in an upcoming play. He volunteered, and acted in several plays before leaving Philadelphia to join the United States Army. He spent four years in the army, was wounded while serving in World War II, and returned to Philadelphia upon his discharge.";
rudy_bond.addNodes("Tramlijn (1951)", "On the Waterfront (1954)", "The Godfather (1972)");
rudy_bond.toTooltip();
rudy_bond.addToMovie(currentMovie);

movieArray.push(currentMovie);

if (page == "info") {
    let movie = movieArray.find(obj => {
        return obj.movieID == id;
    });
    // console.log(currentMovie.movieID == id)
    // console.log("movieID = " + currentMovie.movieID);
    // console.log("id = " + id)
    // console.log(movie);

    movie.addAllToPage();
} 

if (id == 0) {
    //<script src="../scripts/scriptAngryMen.js"></script>
    const infoScript = document.createElement('script');
    infoScript.setAttribute('src', '../scripts/scriptAngryMen.js');
    body.append(infoScript);
}