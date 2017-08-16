import { Util } from './';
import * as shelljs from 'shelljs';
import * as fs from 'fs';
import * as handlebars from 'handlebars';

let util = new Util();

//This uses precompiled templates. Need to figure out how to access them.
// function getTemplates() {
//     let templates = fs.readFileSync('./templates/templates.js');
//     return templates;
// }

function createComponentFile(componentName: string, componentPath: string, isStateless: boolean) {
    let source: string = null;
    
    if(isStateless) {
        source = fs.readFileSync('./templates/StatelessComponent.handlebars').toString();
    }
    else 
    {
        source = fs.readFileSync('./templates/Component.handlebars').toString(); 
    }

    let template = handlebars.compile(source);
    let context = {componentName: componentName};

    let file = template(context);

    fs.writeFileSync(componentPath + '/' + componentName + '.ts', file);

}

function createComponentPropsFile(componentName: string, componentPath: string) {
    let source = fs.readFileSync('./templates/IComponentProps.handlebars').toString();
    
    let template = handlebars.compile(source);
    let context = {componentName: componentName};

    let file = template(context);

    fs.writeFileSync(componentPath + '/' + 'I' + componentName + 'Props' + '.ts', file);
}


function createComponentStateFile(componentName: string, componentPath: string) {
    let source = fs.readFileSync('./templates/IComponentState.handlebars').toString();
    
    let template = handlebars.compile(source);
    let context = {componentName: componentName};

    let file = template(context);

    fs.writeFileSync(componentPath + '/' + 'I' + componentName + 'State' + '.ts', file);
}


function createComponentIndexFile(componentName: string, componentPath: string, isStateless: boolean) {
    let source = fs.readFileSync('./templates/ComponentIndex.handlebars').toString();
    
    let template = handlebars.compile(source);
    let context = {componentName: componentName, isStateless: isStateless};

    let file = template(context);

    fs.writeFileSync(componentPath + '/' + 'index.ts', file);
}

export async function createComponent(component: string, isStateless: boolean) {
    if(!util.pathExists(util.projectRoot + '/src/components/' + component)) {

        //I should probably add all kinds of validation here, but I won't.

        let componentName = component.slice(component.lastIndexOf('/') + 1);
        componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
        let componentPath = util.projectRoot + '/src/components/' + (component.substr(0, component.lastIndexOf('/') + 1) + componentName);


        shelljs.mkdir('-p', componentPath);


        createComponentFile(componentName, componentPath, isStateless);
        createComponentIndexFile(componentName, componentPath, isStateless);
        createComponentPropsFile(componentName, componentPath);
        
        if(!isStateless) {
            createComponentStateFile(componentName, componentPath);
        }
        
    }
    else {
        console.log('A component with that name already exists.');
    }
}


export async function createScreen(component: string) {
    if(!util.pathExists(util.projectRoot + '/src/screens/' + component)) {

        //I should probably add all kinds of validation here, but I won't.

        let componentName = component.slice(component.lastIndexOf('/') + 1);
        componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
        let componentPath = util.projectRoot + '/src/screens/' + (component.substr(0, component.lastIndexOf('/') + 1) + componentName);


        shelljs.mkdir('-p', componentPath);

        createComponentFile(componentName, componentPath, false);
        createComponentIndexFile(componentName, componentPath, false);
        createComponentStateFile(componentName, componentPath);
        createComponentPropsFile(componentName, componentPath);
    }
    else {
        console.log('A screen with that name already exists.');
    }
}



