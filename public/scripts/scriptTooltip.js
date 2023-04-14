//tooltip

const links = document.getElementsByTagName('a');
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('mouseover', tooltipshow, false);
    links[i].addEventListener('mouseout', tooltiphide, false);
}

function tooltipshow(event) {
    let container = document.createElement("div");
    container.setAttribute("name", "tooltip");
    container.setAttribute('class', 'tooltip');
    
    function checkNav2(){
        if (nav2 == null) return false;
        return nav2.contains(event.target);
    }
    if (!footer.contains(event.target) && !nav.contains(event.target) && !header.contains(event.target) && !checkNav2() ) {
        body.insertBefore(container, body.firstChild);

        let nodesTemp = [];
        let nameTemp = null;
        let yearBirthTemp = null;
        let yearDeathTemp = null;
        let urlTemp = event.target.closest('a').getAttribute("href");
        if (urlTemp.split('.')[1] == 'html') urlTemp = urlTemp.split("-")[0].split(".")[0].charAt(0).toUpperCase() + urlTemp.split("-")[0].split(".")[0].slice(1);
        if (urlTemp == 'Index') urlTemp = 'Home';

        let result = tooltipArray.find(obj => {
            return obj.name.replace(/\s*|\t|\r|\n/gm, "") === event.target.textContent.replace(/\s*|\t|\r|\n/gm, "");
        });
        if (result != undefined) {
            nameTemp = result.name;
            nodesTemp = result.nodeArray;
            yearBirthTemp = result.yearBirth;
            yearDeathTemp = result.yearDeath;
        }

        let text;

        if (nameTemp == null) {
            text = document.createTextNode("Go to: " + urlTemp);
            container.append(text);
        } else {
            let text1 = nameTemp + " (" + yearBirthTemp;
            if (yearDeathTemp != null) {text1 += ' - ' + yearDeathTemp;}
            text1 += ") is also known for:";
            document.createTextNode(text1);
            container.append(text1);
            const list = document.createElement("ul");
            container.append(list);
            for (var i = 0; i < nodesTemp.length; i++) {
                let newNode = document.createElement("li");
                list.append(newNode);
                let textTemp = document.createTextNode(nodesTemp[i]);
                newNode.append(textTemp);
            }
            const text3 = document.createTextNode("Click to read more about " + nameTemp + " and go to: ");
            container.append(text3);
            container.appendChild(document.createElement('br'));
            container.append(document.createTextNode(urlTemp));
        }
    }

    //tooltip-mouse position
    container.style.left = Math.min((15 + event.pageX), (window.innerWidth - container.getBoundingClientRect().width - body.getBoundingClientRect().left) - 15) + "px";
    container.style.top = (10 + event.pageY) + "px";
}

function tooltiphide() {
    let body = document.getElementsByTagName('body')[0];
    if (body.children[0].getAttribute("name") == "tooltip") {
        body.children[0].remove();
    }
}