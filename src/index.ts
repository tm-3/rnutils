#!/usr/bin/env node

import * as fs from 'fs';
import * as clear from 'clear';
import * as figlet from 'figlet';
import * as chalk from 'chalk';
import * as inquirer from 'inquirer';

import { Util } from './lib/';

let util = new Util();



clear();
console.log(
    chalk.green(
        figlet.textSync('React Native Utilities', {
            horizontalLayout: 'default',
            verticalLayout: 'default'
        })
    )
)

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
            case 'Create Scripts':
                setupScripts();
                break;    
            default:
                break;
        }
    })
}


function createComponent() {
    if(util.projectRoot !== null) {

    }
    else {
        notInProject();
    }
}

function createScreen() {
    if(util.projectRoot !== null) {
        
    }
    else {
        notInProject();
    }
}

function createMobxStore() {
    if(util.projectRoot !== null) {
        
    }
    else {
        notInProject();
    }
}

function createDirectoryStructure() {
    if(util.projectRoot !== null) {
        util.createStructure();
    }
    else {
        notInProject();
    }
}

function setupTypescript() {
    if(util.projectRoot !== null) {
        
    }
    else {
        notInProject();
    }
}

function setupStorybook() {
    if(util.projectRoot !== null) {
        
    }
    else {
        notInProject();
    }
    
}

function setupScripts() {
    if(util.projectRoot !== null) {
        
    }
    else {
        notInProject();
    }
}

function notInProject() {
    console.log('You do not appear to be in a project. Please run rnutils from within your react native project.')
}


menuPrompt()
