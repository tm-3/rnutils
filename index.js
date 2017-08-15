#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clear = require("clear");
const figlet = require("figlet");
const chalk = require("chalk");
const inquirer = require("inquirer");
const _1 = require("./lib/");
let util = new _1.Util();
clear();
console.log(chalk.green(figlet.textSync('rnutils', {
    horizontalLayout: 'default',
    verticalLayout: 'default'
})));
function menuPrompt() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What do you want to do?',
            choices: [
                'Create Component',
                'Create Screen',
                'Create Mobx Store',
                new inquirer.Separator(),
                'Create Directory Structure',
                'Setup Typescript',
                'Setup Storybook',
                'Create Scripts'
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
                });
                break;
            case 'Create Screen':
                break;
            case 'Create Mobx Store':
                createMobxStore();
                break;
            case 'Create Directory Structure':
                createDirectoryStructure();
                break;
            case 'Setup Typescript':
                setupTypescript();
                break;
            case 'Setup Storybook':
                setupStorybook();
                break;
            case 'Create Scripts':
                setupScripts();
                break;
            default:
                break;
        }
    });
}
function createNewComponent(componentName) {
    if (util.projectRoot !== null) {
        _1.createComponent(componentName);
    }
    else {
        notInProject();
    }
}
function createScreen() {
    if (util.projectRoot !== null) {
    }
    else {
        notInProject();
    }
}
function createMobxStore() {
    if (util.projectRoot !== null) {
    }
    else {
        notInProject();
    }
}
function createDirectoryStructure() {
    if (util.projectRoot !== null) {
        util.createStructure();
    }
    else {
        notInProject();
    }
}
function setupTypescript() {
    if (util.projectRoot !== null) {
    }
    else {
        notInProject();
    }
}
function setupStorybook() {
    if (util.projectRoot !== null) {
    }
    else {
        notInProject();
    }
}
function setupScripts() {
    if (util.projectRoot !== null) {
    }
    else {
        notInProject();
    }
}
function notInProject() {
    console.log('You do not appear to be in a project. Please run rnutils from within your react native project.');
}
menuPrompt();
