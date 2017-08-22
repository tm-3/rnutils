#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const clear = require("clear");
const figlet = require("figlet");
const chalk = require("chalk");
const inquirer = require("inquirer");
const shelljs = require("shelljs");
const _1 = require("./lib/");
let componentTools = new _1.ComponentTools();
let projectTools = new _1.ProjectTools();
let ui = new inquirer.ui.BottomBar();
function menuPrompt() {
    clear();
    console.log(chalk.green(figlet.textSync('rnutils', {
        horizontalLayout: 'default',
        verticalLayout: 'default'
    })));
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What do you want to do?',
            choices: [
                'Create Component',
                'Create Stateless Component',
                'Create Screen',
                new inquirer.Separator(),
                'Post CRNA Config',
                new inquirer.Separator(),
                'Exit',
                new inquirer.Separator()
            ]
        }
    ]).then((answers) => {
        switch (answers.options) {
            case 'Create Component':
                inquirer.prompt({
                    type: 'input',
                    name: 'componentName',
                    message: 'Enter your component name. Components will be created in ./src/components. You can provide a subdirectory if necessary (subdir/componentName): '
                }).then((answer) => {
                    createNewComponent(answer.componentName);
                }).then(() => { menuPrompt(); });
                break;
            case 'Create Stateless Component':
                inquirer.prompt({
                    type: 'input',
                    name: 'componentName',
                    message: 'Enter your component name. Components will be created in ./src/components. You can provide a subdirectory if necessary (subdir/componentName): '
                }).then((answer) => {
                    createNewStatelessComponent(answer.componentName);
                }).then(() => { menuPrompt(); });
                break;
            case 'Create Screen':
                inquirer.prompt({
                    type: 'input',
                    name: 'screenName',
                    message: 'Enter your screen name. Screens will be created in ./src/screens. You can provide a subdirectory if necessary (subdir/componentName): '
                }).then((answer) => {
                    createNewScreen(answer.screenName);
                }).then(() => { menuPrompt(); });
                break;
            case 'Post CRNA Config':
                inquirer.prompt({
                    type: 'confirm',
                    name: 'confirm',
                    message: 'This will setup a default directory structure, install typescript, mobx, and other related @types as well as make some configuration changes. Are you sure you want to proceed?',
                    default: false
                }).then((answer) => {
                    if (answer.confirm) {
                        console.log(answer);
                        setupProject();
                    }
                }).then(() => { menuPrompt(); });
                break;
            default:
                break;
        }
    });
}
/**
 * Creates a new component in the components directory.
 *
 * @param {any} componentName
 */
function createNewComponent(componentName) {
    if (projectTools.projectRoot !== null) {
        componentName = componentName.slice(componentName.lastIndexOf('/') + 1);
        componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
        if (!pathExists(projectTools.projectRoot + '/src/components/' + componentName)) {
            //I should probably add all kinds of validation here, but I won't.
            let componentPath = projectTools.projectRoot + '/src/components/' + (componentName.substr(0, componentName.lastIndexOf('/') + 1) + componentName);
            shelljs.mkdir('-p', componentPath);
            componentTools.createComponentFile(componentName, componentPath, false);
            componentTools.createComponentIndexFile(componentName, componentPath, false);
            componentTools.createComponentPropsFile(componentName, componentPath);
            componentTools.createComponentStateFile(componentName, componentPath);
        }
        else {
            ui.updateBottomBar('A component with that name already exists.');
        }
    }
    else {
        notInProject();
    }
}
/**
 * Creates a new stateless component.
 *
 * @param {any} componentName
 */
function createNewStatelessComponent(componentName) {
    if (projectTools.projectRoot !== null) {
        componentName = componentName.slice(componentName.lastIndexOf('/') + 1);
        componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
        if (!pathExists(projectTools.projectRoot + '/src/components/' + componentName)) {
            //I should probably add all kinds of validation here, but I won't.
            let componentPath = projectTools.projectRoot + '/src/components/' + (componentName.substr(0, componentName.lastIndexOf('/') + 1) + componentName);
            shelljs.mkdir('-p', componentPath);
            componentTools.createComponentFile(componentName, componentPath, true);
            componentTools.createComponentIndexFile(componentName, componentPath, true);
            componentTools.createComponentPropsFile(componentName, componentPath);
        }
        else {
            ui.updateBottomBar('A component with that name already exists.');
        }
    }
    else {
        notInProject();
    }
}
/**
 * Creates a new component in the screens subdirectory.
 *
 * @param {any} screenName
 */
function createNewScreen(screenName) {
    if (projectTools.projectRoot !== null) {
        screenName = screenName.slice(screenName.lastIndexOf('/') + 1);
        screenName = screenName.charAt(0).toUpperCase() + screenName.slice(1);
        if (!pathExists(projectTools.projectRoot + '/src/screens/' + screenName)) {
            //I should probably add all kinds of validation here, but I won't.
            let componentPath = projectTools.projectRoot + '/src/screens/' + (screenName.substr(0, screenName.lastIndexOf('/') + 1) + screenName);
            shelljs.mkdir('-p', componentPath);
            componentTools.createComponentFile(screenName, componentPath, false);
            componentTools.createComponentIndexFile(screenName, componentPath, false);
            componentTools.createComponentPropsFile(screenName, componentPath);
            componentTools.createComponentStateFile(screenName, componentPath);
        }
        else {
            ui.updateBottomBar('A component with that name already exists.');
        }
    }
    else {
        notInProject();
    }
}
/**
 * Installs TypeScript, Mobx, and other dependencies.
 * Configures VSCode for debugging CRNA apps.
 * Configures app.json to use the react-native-typescript-transformer.
 * Creates a standard project folder structure.
 */
function setupProject() {
    projectTools.installDevDependencies().then(() => {
        projectTools.installDependencies();
    });
    // projectTools.installDependencies();
    projectTools.createDevScripts();
    projectTools.createStructure();
    projectTools.createTsConfigJson();
    projectTools.setupDebugging();
    projectTools.modifyAppJson();
}
function pathExists(dir) {
    return fs.existsSync(dir);
}
function notInProject() {
    ui.updateBottomBar('You do not appear to be in a project. Please run rnutils from within your react native project.');
}
menuPrompt();
