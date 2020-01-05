function retrieveProblems() {
    let diff = document.getElementById("inputDiff").value;
    let xhhtp = new XMLHttpRequest();
    xhhtp.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            var problems = JSON.parse(this.responseText);
            console.log(problems);
            populate(problems);
        }
    };
    xhhtp.open("GET", "http://localhost:3000/problems?diff=" + diff);
    xhhtp.send();
}

function populate(data) {
    document.getElementById("pb").innerHTML = '';
    for (var i = 0; i < data.length; i++) {
        const el = data[i];
        addNewProblem(el.name, el.link, el.difficulty, i);
    }
}

function addNewProblem(name,link,difficulty,i) {
    var tmp = document.getElementsByTagName("template")[0];
    var articleClone = tmp.content.cloneNode(true);

    var problemName = articleClone.querySelector("#templateName");
    problemName.textContent = name;

    var problemLink = articleClone.querySelector("#templateLink a");
    problemLink.textContent = link;
    problemLink.setAttribute("href", link);

    var problemDifficulty = articleClone.querySelector("#templateDifficulty");
    problemDifficulty.textContent = difficulty;

    var delB = articleClone.getElementById("deleteButton");
    delB.addEventListener("click", removeProblemWithParam(i));

    document.getElementById("pb").appendChild(articleClone);

}

let removeProblemWithParam = function(index) {

    return function curried_func(e) {
        removeProblem(index);
    }
};

function removeProblem(index) {
    let toBeDeleted = document.getElementsByClassName("templateProblem")[index];
    toBeDeleted.parentNode.removeChild(toBeDeleted);
}

function addThings() {
    var name_problem = document.getElementById("name").value;
    var link_problem = document.getElementById("link").value;
    var difficulty_problem = document.getElementById("difficulty").value;
    let xhhtp = new XMLHttpRequest();

    xhhtp.onreadystatechange = function () {
        if (this.readyState === 4){
            //alert("Reqeust done" + this.status);
            if(this.status === 200) alert("The problem was added");
            if(this.status === 403) alert("You have to complete the form");
        }
    };

    xhhtp.open("POST", "http://localhost:3000/problems/add");

    xhhtp.setRequestHeader("Content-Type", "application/json");

    let json = {
        name: name_problem,
        link: link_problem,
        difficulty: difficulty_problem,
    }
    var json_string = JSON.stringify(json);
    xhhtp.send(json_string);
}

function editProblem() {
    var name_problem = document.getElementById("putName").value;
    var new_difficulty = document.getElementById("putDiff").value;

    let xhhtp = new XMLHttpRequest();
    xhhtp.onreadystatechange = function () {
        if (this.readyState === 4){
            if(this.status == 200) alert("The problem was edited");
            //alert("Reqeust done" + this.status);
        }
    };

    xhhtp.open("PUT", "http://localhost:3000/problems/put" );

    xhhtp.setRequestHeader("Content-Type", "application/json");

    let json = {
        name: name_problem,
        difficulty: new_difficulty,
    }

    var json_string = JSON.stringify(json);
    xhhtp.send(json_string);
    console.log(name);
}

function deleteProblem() {
    var name_problem = document.getElementById("deleteName").value;

    let xhhtp = new XMLHttpRequest();

    xhhtp.onreadystatechange = function () {
        if (this.readyState === 4){
            alert("Reqeust done" + this.status);
        }
    };

    xhhtp.open("DELETE", "http://localhost:3000/problems/delete?name=" + name_problem);

    xhhtp.setRequestHeader("Content-Type", "application/json");


    xhhtp.send();
}