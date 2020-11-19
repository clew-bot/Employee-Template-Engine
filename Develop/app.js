const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
// Using inquirer to ask and answer questions for the given employee stats // 
function generateTheTeam() {
    return inquirer.prompt([
        { 
    type: "list",
    name: "choiceOptions",
    message: "What type of team member are you?",
    choices: [
        "Manager",
        "Engineer",
        "Intern",
        "None left"
    ]}
    ]).then(userSelection => {
        switch (userSelection.choiceOptions) {
            case "Manager":
                //if we're selecting 'manager' then run the function that correlates with manager, //
                //repeat with Engineer and intern //
                return getManager();
                break;
            case "Engineer":
                return getEngineer();
                break;
            case "Intern":
                return getIntern();
                break;
            case "None Left":
                render(teamMembers);
                break
        }
    })


// Main functions to prompt user with corresponding questions and render to HTML. 
function getManager() {
    return inquirer.prompt([{
        type: "input",
        message: "Hello, what is your first name?",
        name: "managerFirstName"
    }, {
        type: "input",
        message: "What is your email address?",
        name: "managerEmail"

    }, {
        type: "input",
        message: "What is the employee ID associated with your name?",
        name: "managerID"
    }, {
        type: "input",
        message: "What is your suite number to the corresponding office?",
        name: "managerSuite"
    }   
]).then(managerChoices => {
    console.log(managerChoices);
    //Important: we will create a new manager class with the properties for first-name, email, ID, etc. //
    const manager = new Manager(managerChoices.managerFirstName, managerChoices.managerEmail, managerChoices.managerID, managerChoices.managerSuite)
    // Once created push up the newly created object into Team Members empty variable. //
    teamMembers.push(manager)
    // render the person into the Team, the function will grab the teamMembers variable and render it //
    return generateTheTeam();
})
}
// Repeat the steps above for engineer and intern. Control C and control V! // 
function getEngineer() {
    return inquirer.prompt([{
        type: "input",
        message: "Hello, what is your first name?",
        name: "engineerFirstName"
    }, {
        type: "input",
        message: "What is your email address?",
        name: "engineerEmail"

    }, {
        type: "input",
        message: "What is the employee ID associated with your name?",
        name: "engineerID"
    }, {
        type: "input",
        message: "What is your Github username?",
        name: "engineerGit"
    }   
]).then(engineerChoices => {
    console.log(engineerChoices);
    const engineer = new Engineer(engineerChoices.engineerFirstName, engineerChoices.engineerEmail, engineerChoices.engineerID, engineerChoices.engineerGit)
    teamMembers.push(engineer)
    return generateTheTeam();
})
}
function getIntern() {
    return inquirer.prompt([{
        type: "input",
        message: "Hello, what is your first name?",
        name: "internFirstName"
    }, {
        type: "input",
        message: "What is your email address?",
        name: "internEmail"

    }, {
        type: "input",
        message: "What is the employee ID associated with your name?",
        name: "internID"
    }, {
        type: "input",
        message: "What is your Github username?",
        name: "internGit"
    }   
]).then(internChoices => {
    console.log(internChoices);
    const intern = new Intern(internChoices.internFirstName, internChoices.internEmail, internChoices.internID, internChoices.internGit)
    teamMembers.push(intern)
    return generateTheTeam();
})
}
}
generateTheTeam().then(() => {
    // render is already a given function, we are passing in the teamMembers variable which holds the employee data // 
    let html = render(teamMembers);
    // node fs module to write the file into the team.html //
    fs.writeFile("./output/team.html", html, "utf8", ()=> {
        console.log(`Completed.`)
    });
})
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
