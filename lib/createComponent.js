"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
const shelljs = require("shelljs");
const fs = require("fs");
const handlebars = require("handlebars");
let util = new _1.Util();
//create directory at ./src/components
function getTemplates() {
    let templates = fs.readFileSync('./templates/templates.js');
    return templates;
}
function createComponentFile(componentName, componentPath) {
    let source = fs.readFileSync('./templates/Component.handlebars').toString();
    let template = handlebars.compile(source);
    let context = { componentName: componentName };
    let file = template(context);
    fs.writeFileSync(componentPath + '/' + componentName + '.ts', file);
}
function createComponentPropsFile(componentName, componentPath) {
    let source = fs.readFileSync('./templates/IComponentProps.handlebars').toString();
    let template = handlebars.compile(source);
    let context = { componentName: componentName };
    let file = template(context);
    fs.writeFileSync(componentPath + '/' + 'I' + componentName + 'Props' + '.ts', file);
}
function createComponentStateFile(componentName, componentPath) {
    let source = fs.readFileSync('./templates/IComponentState.handlebars').toString();
    let template = handlebars.compile(source);
    let context = { componentName: componentName };
    let file = template(context);
    fs.writeFileSync(componentPath + '/' + 'I' + componentName + 'State' + '.ts', file);
}
function createComponentIndexFile(componentName, componentPath) {
    let source = fs.readFileSync('./templates/ComponentIndex.handlebars').toString();
    let template = handlebars.compile(source);
    let context = { componentName: componentName };
    let file = template(context);
    fs.writeFileSync(componentPath + '/' + 'index.ts', file);
}
//return to menu
function createComponent(component) {
    if (!util.pathExists(util.projectRoot + '/src/components/' + component)) {
        //I should probably add all kinds of validation here, but I won't.
        // let componentPath = util.projectRoot + '/src/components/' + (component.substr(0, component.lastIndexOf('/') + 1));
        // let componentName = component.slice(component.lastIndexOf('/') + 1);
        // componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
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
exports.createComponent = createComponent;
// console.log(componentPath);
// console.log(componentName);
