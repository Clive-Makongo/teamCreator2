const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
console.log(OUTPUT_DIR);
const outputPath = path.join(OUTPUT_DIR, "team.html");
console.log(outputPath);

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
const team = [];

const manager = [
    {
        type: `input`,
        name: `managerName`,
        message: `What is the Manager's name?`,
    },
    {
        type: `input`,
        name: `managerId`,
        message: `What is the Manager's Employee ID?`,
    }, {
        type: `input`,
        name: `managerEmail`,
        message: `What is the Manager's Email Adress?`,
    },
    {
        type: `input`,
        name: `managerOffice`,
        message: `What is the Manager's office number?`,
    },
    {
        type: `list`,
        name: `next`,
        message: `What would you like to do next?`,
        choices: [`Add an Engineer`, `Add an Intern`, `Finish building the team`]
    },
];

const engineer = [
    {
        type: `input`,
        name: `engineerName`,
        message: `What is the Engineer's name?`,
    },
    {
        type: `input`,
        name: `engineerName`,
        message: `What is the Engineer's Employee ID?`,
    }, {
        type: `input`,
        name: `engineerEmail`,
        message: `What is the Engineer's Email Adress?`,
    },
    {
        type: `input`,
        name: `engineerGithub`,
        message: `What is the engineer's GitHub Username?`,
    },
    {
        type: `list`,
        name: `next`,
        message: `What would you like to do next?`,
        choices: [`Add an Engineer`, `Add an Intern`, `Finish building the team`]
    },
];

const intern = [
    {
        type: `input`,
        name: `internName`,
        message: `What is the Intern's name?`,
    },
    {
        type: `input`,
        name: `internIdd`,
        message: `What is the Interns's Employee ID?`,
    }, {
        type: `input`,
        name: `internEmail`,
        message: `What is the Interns's Email Adress?`,
    },
    {
        type: `input`,
        name: `internSchool`,
        message: `What is the engineer's GitHub Username?`,
    },
    {
        type: `list`,
        name: `next`,
        message: `What would you like to do next?`,
        choices: [`Add an Engineer`, `Add an Intern`, `Finish building the team`]
    },
];

const next = [
    {
        type: `list`,
        name: `next`,
        message: `What would you like to do next?`,
        choices: [`Add an Engineer`, `Add an Intern`, `Finish building the team`]
    },
];

const managerPrompt = () => {
    inquirer.prompt(manager).then(data => {
        const managerObj = new Manager(data.managerName, data.managerId, data.managerEmail, data.managerOffice);

        team.push(managerObj);

        if (data.next === "Add an Engineer") {
            engineerPrompt();

        } else if (data.next === "Add an Intern") {
           internPrompt();

        } else {
            writeToFile(team);
        };

        console.log(`running`);
    });
};

// const nextPrompt = () => {
//     inquirer.prompt(next).then(data => {
//         if (data.next === "Add an Engineer") {
//             engineerPrompt(engineer);
//         } else if (data.next === "Add an Intern") {
//             internPrompt(intern);
//         } else {
//             writeToFile(team);
//         };
//     });
// };

const engineerPrompt = () => {
    inquirer.prompt(engineer).then(data => {
        const engineerObj = new Engineer(data.engineerName, data.engineerId, data.engineerEmail, data.engineerGithub);

        team.push(engineerObj);

        if (data.next === "Add an Engineer") {
            engineerPrompt();

        } else if (data.next === "Add an Intern") {
            internPrompt();

        } else {
            writeToFile(team);
        };
    });

};

const internPrompt = () => {
    inquirer.prompt(intern).then(data => {
        const internObj = new Intern(data.internName, data.engineerId, data.engineerEmail, data.internSchool);

        team.push(internObj);

        if (data.next === "Add an Engineer") {
            engineerPrompt();

        } else if (data.next === "Add an Intern") {
            internPrompt();

        } else {
            writeToFile(team);
        };
    });

};

const writeToFile = team => {
    fs.writeFile(outputPath, render(team), (err) =>
        err ? console.error(err) : console.log("Success!")
    );
};

function init() {
    console.log(team);
    managerPrompt();
    //console.log(team);

};

init();