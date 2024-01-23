const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

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
];

const next = [
    {
        type: `list`,
        name: `next`,
        message: `What would you like to do next?`,
        choices: [`Add an Engineer`, `Add an Intern`, `Finish building the team`]
    },
];

const managerPrompt = manager => {
    inquirer.prompt(manager).then(data => {
        Manager(data.managerName, data.managerId, data.managerEmail, data.managerOffice);
    });
};

const nextPrompt = next => {
    inquirer.prompt(next).then(data => {
        if (data.next === "Add an Engineer") {
            engineerPrompt();
        } else if (data.next === "Add an Intern") {
            internPrompt();
        } else {
            // render
        }
    });
};

const engineerPrompt = engineer => {
    inquirer.prompt(engineer).then(data => {
        Engineer(data.engineerName, data.engineerrId, data.engineerEmail, data.engineerGithub);
    });

    nextPrompt();
};

const internPrompt = intern => {
    inquirer.prompt(intern).then(data => {
        Intern(data.internName, data.engineerId, data.engineerEmail, data.engineerGithub);
    });

    nextPrompt();
};

function init() {

    managerPrompt();
    nextPrompt();

    
};