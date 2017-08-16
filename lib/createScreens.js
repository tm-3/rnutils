"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
const fs = require("fs");
const handlebars = require("handlebars");
let util = new _1.Util();
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
