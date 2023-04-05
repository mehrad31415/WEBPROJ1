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
        const dayDropdown = document.createElement('select');
        const timeDropdown = document.createElement('select');
        const purchaseBtn = document.createElement('button');
        elementDropdown.classList.add('select-dropdown');
        styleDropdown.classList.add('select-dropdown');
        const container = document.getElementsByClassName("body__container")[0];
        const article = document.createElement("article");
        article.append(document.createTextNode('Purchase your tickets for ' + this.movieName + ' now:  '), dayDropdown, timeDropdown, purchaseBtn);
        
        const dayDropdownPlaceholder = document.createElement('option');
        dayDropdownPlaceholder.append('Select a day');
        dayDropdownPlaceholder.setAttribute('value', '');
        dayDropdownPlaceholder.setAttribute('disabled', 'true');
        dayDropdownPlaceholder.setAttribute('selected', 'true');
        dayDropdown.append(dayDropdownPlaceholder);

        const timeDropdownPlaceholder = document.createElement('option');
        timeDropdownPlaceholder.append('Select a time');
        timeDropdownPlaceholder.setAttribute('value', '');
        timeDropdownPlaceholder.setAttribute('disabled', 'true');
        timeDropdownPlaceholder.setAttribute('selected', 'true');
        timeDropdown.append(timeDropdownPlaceholder);

        timeDropdown.setAttribute('placeholder', 'Select a time');
        purchaseBtn.append(document.createTextNode('GO!'));

        purchaseBtn.addEventListener("click", this.goToTickets.bind(null, this.movieID, dayDropdown.value, timeDropdown.value));
        
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
        link.setAttribute("href", "redirect?url=" + this.movieLink);
        link.setAttribute("target", "_blank");
        strongLink.appendChild(link);
        link.append(document.createTextNode(this.movieName));
        const aboutText = document.createTextNode(" is a " + this.movieGenre + " movie from the year " + this.movieYear + ". The poster of the movie can be found on ");
        about.append(aboutText);
        const underlineLinkPoster = document.createElement('u');
        about.appendChild(underlineLinkPoster);
        const posterLinkTemp = document.createElement('a');
        posterLinkTemp.setAttribute("class", "link--decoration");
        posterLinkTemp.setAttribute("href", "redirect?url=" + this.posterLink);
        posterLinkTemp.setAttribute("target", "_blank");
        underlineLinkPoster.appendChild(posterLinkTemp);
        posterLinkTemp.append(document.createTextNode(this.posterLink.split('.')[1]));
        about.append(document.createTextNode('. The trailer can '));
        if (id == 0) about.append(document.createTextNode('either '));
        about.append(document.createTextNode('be found on the '));
        if (id == 0){
            const underlineLinkHomePage = document.createElement('u');
            about.appendChild(underlineLinkHomePage);
            const homePageLinkTemp = document.createElement('a');
            homePageLinkTemp.setAttribute("class", "link--decoration");
            homePageLinkTemp.setAttribute("href", 'plot-AM');
            underlineLinkHomePage.appendChild(homePageLinkTemp);
            homePageLinkTemp.append(document.createTextNode('home page'));
            about.append(document.createTextNode(' of this website or on '));
        }
        const underlineLinkTrailer = document.createElement('u');
        about.appendChild(underlineLinkTrailer);
        const trailerLinkTemp = document.createElement('a');
        trailerLinkTemp.setAttribute("class", "link--decoration");
        trailerLinkTemp.setAttribute("href", "redirect?url=" + this.trailerLink);
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

    goToTickets(id, day, time) {
        window.location =   'tickets' + 
                            '?id=' + id +
                            '&day=' + day +
                            '&time=' + time;
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
        linkTempPic.setAttribute("href", "redirect?url=" + item.link);
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
        linkTemp.setAttribute("href", "redirect?url=" + item.link);
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