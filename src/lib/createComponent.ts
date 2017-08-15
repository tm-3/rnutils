import { Util } from './';
import * as shelljs from 'shelljs';
import * as fs from 'fs';
import * as handlebars from 'handlebars';



let util = new Util();


//create directory at ./src/components

function getTemplates() {
    let templates = fs.readFileSync('./templates/templates.js');
    return templates;
}

function createComponentFile(componentName: string, componentPath: string) {
    let source = fs.readFileSync('./templates/Component.handlebars').toString();

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


function createComponentIndexFile(componentName: string, componentPath: string) {
    let source = fs.readFileSync('./templates/ComponentIndex.handlebars').toString();
    
    let template = handlebars.compile(source);
    let context = {componentName: componentName};

    let file = template(context);

    fs.writeFileSync(componentPath + '/' + 'index.ts', file);
}



//return to menu


export function createComponent(component: string) {
    if(!util.pathExists(util.projectRoot + '/src/components/' + component)) {

        //I should probably add all kinds of validation here, but I won't.



        let componentName = component.slice(component.lastIndexOf('/') + 1);
        componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
        let componentPath = util.projectRoot + '/src/components/' + (component.substr(0, component.lastIndexOf('/') + 1) + componentName);


        shelljs.mkdir('-p', componentPath);

        createComponentFile(componentName, componentPath);
        createComponentIndexFile(componentName, componentPath);
        createComponentStateFile(componentName, componentPath);
        createComponentPropsFile(componentName, componentPath);
    }
    else {
        console.log('A component with that name already exists.');
    }
}


// console.log(componentPath);
// console.log(componentName);

