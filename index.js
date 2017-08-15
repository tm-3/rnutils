#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var clear = require("clear");
var figlet = require("figlet");
var chalk = require("chalk");
var inquirer = require("inquirer");
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
                'Setup Storybook'
            ]
        }
    ]).then(function (answers) {
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
            default:
                break;
        }
    });
}
function createComponent() {
    console.log('create component');
}
function createScreen() {
    console.log('create screen');
}
function createMobxStore() {
    console.log('create mobx');
}
function createDirectoryStructure() {
    console.log('create ds');
}
function setupTypescript() {
    console.log('setup typescript');
}
function setupStorybook() {
    console.log('setup storybook');
}
function setupScripts() {
    console.log('setup scripts');
}
menuPrompt();
