#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
                'Post CRNA TypeScript Config',
                'Post react-native TypeScript Config',
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
            case 'Post CRNA TypeScript Config':
                inquirer.prompt({
                    type: 'confirm',
                    name: 'confirm',
                    message: 'This will setup a default directory structure, install typescript, mobx, and other related @types as well as make some configuration changes. Are you sure you want to proceed?',
                    default: false
                }).then((answer) => {
                    if (answer.confirm) {
                        setupCrnaProject();
                    }
                });
                // .then(() => { menuPrompt()});
                break;
            case 'Post react-native TypeScript Config':
                inquirer.prompt({
                    type: 'confirm',
                    name: 'confirm',
                    message: 'This will setup a default directory structure, install typescript, mobx, and other related @types as well as make some configuration changes. Are you sure you want to proceed?',
                    default: false
                }).then((answer) => {
                    if (answer.confirm) {
                        setupRnProject();
                    }
                });
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
        let compName = componentName.slice(componentName.lastIndexOf('/') + 1);
        compName = compName.charAt(0).toUpperCase() + compName.slice(1);
        let path = componentName.substr(0, componentName.lastIndexOf('/') + 1);
        if (!pathExists(projectTools.projectRoot + '/src/components/' + path + compName)) {
            //I should probably add all kinds of validation here, but I won't.
            let componentPath = projectTools.projectRoot + '/src/components/' + path + compName;
            shelljs.mkdir('-p', componentPath);
            componentTools.createComponentFile(compName, componentPath, false);
            componentTools.createComponentIndexFile(compName, componentPath);
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
        let compName = componentName.slice(componentName.lastIndexOf('/') + 1);
        compName = compName.charAt(0).toUpperCase() + compName.slice(1);
        let path = componentName.substr(0, componentName.lastIndexOf('/') + 1);
        if (!pathExists(projectTools.projectRoot + '/src/components/' + path + compName)) {
            //I should probably add all kinds of validation here, but I won't.
            let componentPath = projectTools.projectRoot + '/src/components/' + path + compName;
            shelljs.mkdir('-p', componentPath);
            componentTools.createComponentFile(compName, componentPath, true);
            componentTools.createComponentIndexFile(compName, componentPath);
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
        let compName = screenName.slice(screenName.lastIndexOf('/') + 1);
        compName = compName.charAt(0).toUpperCase() + compName.slice(1);
        let path = screenName.substr(0, screenName.lastIndexOf('/') + 1);
        if (!pathExists(projectTools.projectRoot + '/src/components/' + path + compName)) {
            //I should probably add all kinds of validation here, but I won't.
            let componentPath = projectTools.projectRoot + '/src/screens/' + path + compName;
            shelljs.mkdir('-p', componentPath);
            componentTools.createComponentFile(compName, componentPath, false);
            componentTools.createComponentIndexFile(compName, componentPath);
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
function setupCrnaProject() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (projectTools.projectRoot !== null) {
                yield projectTools.installPackages(true);
                yield projectTools.modifyPackageJson(true);
                yield projectTools.createStructure();
                yield projectTools.createTsConfigJson();
                yield projectTools.setupDebugging(true);
                yield projectTools.modifyAppJson();
                yield projectTools.addStorybook();
                return 'done';
            }
            else {
                notInProject();
            }
        }
        catch (err) {
            return err;
        }
    });
}
function setupRnProject() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (projectTools.projectRoot !== null) {
                yield projectTools.installPackages(false);
                yield projectTools.modifyPackageJson(false);
                yield projectTools.createStructure();
                yield projectTools.createTsConfigJson();
                yield projectTools.createRnCliConfig();
                yield projectTools.createBablercFile();
                yield projectTools.createEntryFiles();
                yield projectTools.setupDebugging(false);
                yield projectTools.addStorybook();
                yield projectTools.createBasicApp();
                yield projectTools.setupTests();
                //Setup testing
                //Setup app container
                // await projectTools.createLocalProperties(); 
                return 'done';
            }
            else {
                notInProject();
            }
        }
        catch (err) {
            return err;
        }
    });
}
function pathExists(dir) {
    return fs.existsSync(dir);
}
function notInProject() {
    //not working. Need to learn inquirer.
    ui.updateBottomBar('You do not appear to be in a project. Please run rnutils from within your react native project.');
}
menuPrompt();
// screenName.charAt(0).toUpperCase() + screenName.slice(1);
// let cname = 'folder/sub/component';
// let compName = cname.slice(cname.lastIndexOf('/') + 1);
// compName = compName.charAt(0).toUpperCase() + compName.slice(1);
// let path = cname.substr(0, cname.lastIndexOf('/') + 1);
// console.log(compName);
// console.log(path); 
