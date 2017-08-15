#!/usr/bin/env node

import * as fs from 'fs';
import * as clear from 'clear';
import * as figlet from 'figlet';
import * as chalk from 'chalk';
import * as inquirer from 'inquirer';

import { Util, createComponent } from './lib/';

let util = new Util();



clear();
console.log(
    chalk.green(
        figlet.textSync('rnutils', {
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
                    
                inquirer.prompt({
                    type: 'input',
                    name: 'componentName',
                    message: 'Enter your component name. Components will be created in ./src/components. You can provide a subdirectory if necessary (subdir/componentName): '
                    
                }).then((answer) => {
                    createNewComponent(answer.componentName);
                })

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
    })
}


function createNewComponent(componentName) {
    if(util.projectRoot !== null) {
        createComponent(componentName);
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
