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
let ui = new inquirer.ui.BottomBar();

clear();

function menuPrompt() {
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
                }).then(() => { menuPrompt()});

                break;
            case 'Create Stateless Component':
                inquirer.prompt({
                    type: 'input',
                    name: 'componentName',
                    message: 'Enter your component name. Components will be created in ./src/components. You can provide a subdirectory if necessary (subdir/componentName): '
                    
                }).then((answer) => {
                    createNewStatelessComponent(answer.componentName);
                }).then(() => { menuPrompt()});
                break;
            case 'Create Screen':
                inquirer.prompt({
                    type: 'input',
                    name: 'screenName',
                    message: 'Enter your screen name. Screens will be created in ./src/screens. You can provide a subdirectory if necessary (subdir/componentName): '
                    
                }).then((answer) => {
                    createNewScreen(answer.screenName);
                }).then(() => { menuPrompt()});
                break;
            case 'Post CRNA TypeScript Config':
                inquirer.prompt({
                    type: 'confirm',
                    name: 'confirm',
                    message: 'This will setup a default directory structure, install typescript, mobx, and other related @types as well as make some configuration changes. Are you sure you want to proceed?',
                    default: false

                }).then((answer) => {
                    if(answer.confirm) {
                        setupCrnaProject();
                    }
                })
                // .then(() => { menuPrompt()});
                break;    
            case 'Post react-native TypeScript Config':
                inquirer.prompt({
                    type: 'confirm',
                    name: 'confirm',
                    message: 'This will setup a default directory structure, install typescript, mobx, and other related @types as well as make some configuration changes. Are you sure you want to proceed?',
                    default: false

                }).then((answer) => {
                    if(answer.confirm) {
                        setupRnProject();
                    }
                })
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

        componentName = componentName.slice(componentName.lastIndexOf('/') + 1);
        componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);

        if(!pathExists(projectTools.projectRoot + '/src/components/' + componentName)) {
            //I should probably add all kinds of validation here, but I won't.
    
            let componentPath = projectTools.projectRoot + '/src/components/' + (componentName.substr(0, componentName.lastIndexOf('/') + 1) + componentName);
    
            shelljs.mkdir('-p', componentPath);
    
            componentTools.createComponentFile(componentName, componentPath, false);
            componentTools.createComponentIndexFile(componentName, componentPath);
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
    if(projectTools.projectRoot !== null) {

        componentName = componentName.slice(componentName.lastIndexOf('/') + 1);
        componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);

        if(!pathExists(projectTools.projectRoot + '/src/components/' + componentName)) {
            
            //I should probably add all kinds of validation here, but I won't.
    
            let componentPath = projectTools.projectRoot + '/src/components/' + (componentName.substr(0, componentName.lastIndexOf('/') + 1) + componentName);
    
            shelljs.mkdir('-p', componentPath);
    
            componentTools.createComponentFile(componentName, componentPath, true);
            componentTools.createComponentIndexFile(componentName, componentPath);
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
function createNewScreen(screenName: string) {
    if(projectTools.projectRoot !== null) {
        screenName = screenName.slice(screenName.lastIndexOf('/') + 1);
        screenName = screenName.charAt(0).toUpperCase() + screenName.slice(1);

        if(!pathExists(projectTools.projectRoot + '/src/screens/' + screenName)) {
            
            //I should probably add all kinds of validation here, but I won't.
    
            
            let componentPath = projectTools.projectRoot + '/src/screens/' + (screenName.substr(0, screenName.lastIndexOf('/') + 1) + screenName);
    
            shelljs.mkdir('-p', componentPath);
    
            componentTools.createComponentFile(screenName, componentPath, false);
            componentTools.createComponentIndexFile(screenName, componentPath);
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
async function setupCrnaProject() {

    try {
        await projectTools.installPackages(true);
        await projectTools.createDevScripts(true);
        await projectTools.createStructure();
        await projectTools.createTsConfigJson();
        await projectTools.setupDebugging();
        await projectTools.modifyAppJson();
        await projectTools.addStorybook();
        return 'done';
    }
    catch (err) {
        return err;
    }
}

async function setupRnProject() {

    try {
        await projectTools.installPackages(false);
        await projectTools.createDevScripts(false);
        await projectTools.createStructure();
        await projectTools.createTsConfigJson();
        await projectTools.createRnCliConfig();
        // await projectTools.setupDebugging();
        // await projectTools.modifyAppJson();
        await projectTools.addStorybook();
        return 'done';
    }
    catch (err) {
        return err;
    }
}


function pathExists(dir: string) {
    return fs.existsSync(dir);
}

function notInProject() {
    //not working. Need to learn inquirer.
    ui.updateBottomBar('You do not appear to be in a project. Please run rnutils from within your react native project.')
}

menuPrompt()