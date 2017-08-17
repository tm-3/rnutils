#!/usr/bin/env node

import * as fs from 'fs';
import * as clear from 'clear';
import * as figlet from 'figlet';
import * as chalk from 'chalk';
import * as inquirer from 'inquirer';
import * as shelljs from 'shelljs'; 

import { ComponentTools, ProjectTools } from './lib/';

let componentTools = new ComponentTools();
let projectTools = new ProjectTools();

function init() {
    clear();
    console.log(
        chalk.green(
            figlet.textSync('rnutils', {
                horizontalLayout: 'default',
                verticalLayout: 'default'
            })
        )
    )
}

function menuPrompt() {
    clear();
    console.log(
        chalk.green(
            figlet.textSync('rnutils', {
                horizontalLayout: 'default',
                verticalLayout: 'default'
            })
        )
    )

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
                }).then(() => { menuPrompt()})

                break;
            case 'Create Stateless Component':
                inquirer.prompt({
                    type: 'input',
                    name: 'componentName',
                    message: 'Enter your component name. Components will be created in ./src/components. You can provide a subdirectory if necessary (subdir/componentName): '
                    
                }).then((answer) => {
                    createNewStatelessComponent(answer.componentName);
                })
                break;
            case 'Create Screen':
                inquirer.prompt({
                    type: 'input',
                    name: 'screenName',
                    message: 'Enter your screen name. Screens will be created in ./src/screens. You can provide a subdirectory if necessary (subdir/componentName): '
                    
                }).then((answer) => {
                    createNewScreen(answer.screenName);
                })
                break;
            case 'Post CRNA Config':
                break;    
            default:
                break;
        }
    })
}

/**
 * Creates a new component in the components directory.
 * 
 * @param {any} componentName 
 */
function createNewComponent(componentName) {
    if(projectTools.projectRoot !== null) {
        if(!pathExists(projectTools.projectRoot + '/src/components/' + componentName)) {
            
            //I should probably add all kinds of validation here, but I won't.
    
            componentName = componentName.slice(componentName.lastIndexOf('/') + 1);
            componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
            let componentPath = projectTools.projectRoot + '/src/components/' + (componentName.substr(0, componentName.lastIndexOf('/') + 1) + componentName);
    
    
            shelljs.mkdir('-p', componentPath);
    
    
            componentTools.createComponentFile(componentName, componentPath, false);
            componentTools.createComponentIndexFile(componentName, componentPath, false);
            componentTools.createComponentPropsFile(componentName, componentPath);           
            componentTools.createComponentStateFile(componentName, componentPath);

            
        }
        else {
            console.log('A component with that name already exists.');
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
    if(projectTools.projectRoot !== null) {
        if(!pathExists(projectTools.projectRoot + '/src/components/' + componentName)) {
            
            //I should probably add all kinds of validation here, but I won't.
    
            componentName = componentName.slice(componentName.lastIndexOf('/') + 1);
            componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
            let componentPath = projectTools.projectRoot + '/src/components/' + (componentName.substr(0, componentName.lastIndexOf('/') + 1) + componentName);
    
    
            shelljs.mkdir('-p', componentPath);
    
            componentTools.createComponentFile(componentName, componentPath, true);
            componentTools.createComponentIndexFile(componentName, componentPath, true);
            componentTools.createComponentPropsFile(componentName, componentPath);   
        }
        else {
            console.log('A component with that name already exists.');
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
    if(projectTools.projectRoot !== null) {
        if(!pathExists(projectTools.projectRoot + '/src/screens/' + screenName)) {
            
            //I should probably add all kinds of validation here, but I won't.
    
            screenName = screenName.slice(screenName.lastIndexOf('/') + 1);
            screenName = screenName.charAt(0).toUpperCase() + screenName.slice(1);
            let componentPath = projectTools.projectRoot + '/src/screens/' + (screenName.substr(0, screenName.lastIndexOf('/') + 1) + screenName);
    
            shelljs.mkdir('-p', componentPath);
    
            componentTools.createComponentFile(screenName, componentPath, false);
            componentTools.createComponentIndexFile(screenName, componentPath, false);
            componentTools.createComponentPropsFile(screenName, componentPath);           
            componentTools.createComponentStateFile(screenName, componentPath);

        }
        else {
            console.log('A component with that name already exists.');
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
    
}


function pathExists(dir: string) {
    return fs.existsSync(dir);
}

function notInProject() {
    console.log('You do not appear to be in a project. Please run rnutils from within your react native project.')
}

menuPrompt()