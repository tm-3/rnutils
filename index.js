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
console.log(chalk.green(figlet.textSync('React Native Utilities', {
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
                new inquirer.Separator(),
                'Set Preferences'
            ]
        }
    ]).then((answers) => {
        switch (answers.options) {
            case 'Create Component':
                createComponent();
                break;
            case 'Create Screen':
                createScreen();
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
            case 'Set Preferences':
                setPreferences();
                break;
            default:
                break;
        }
    });
}
function setPreferences() {
}
function createComponent() {
    if (util.projectRoot !== null) {
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
