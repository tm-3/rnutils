"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
const shelljs = require("shelljs");
const fs = require("fs");
const handlebars = require("handlebars");
let util = new _1.Util();
//This uses precompiled templates. Need to figure out how to access them.
// function getTemplates() {
//     let templates = fs.readFileSync('./templates/templates.js');
//     return templates;
// }
function createComponentFile(componentName, componentPath, isStateless) {
    let source = null;
    if (isStateless) {
        source = fs.readFileSync('./templates/StatelessComponent.handlebars').toString();
    }
    else {
        source = fs.readFileSync('./templates/Component.handlebars').toString();
    }
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
function createComponentIndexFile(componentName, componentPath, isStateless) {
    let source = fs.readFileSync('./templates/ComponentIndex.handlebars').toString();
    let template = handlebars.compile(source);
    let context = { componentName: componentName, isStateless: isStateless };
    let file = template(context);
    fs.writeFileSync(componentPath + '/' + 'index.ts', file);
}
function createComponent(component, isStateless) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!util.pathExists(util.projectRoot + '/src/components/' + component)) {
            //I should probably add all kinds of validation here, but I won't.
            let componentName = component.slice(component.lastIndexOf('/') + 1);
            componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
            let componentPath = util.projectRoot + '/src/components/' + (component.substr(0, component.lastIndexOf('/') + 1) + componentName);
            shelljs.mkdir('-p', componentPath);
            createComponentFile(componentName, componentPath, isStateless);
            createComponentIndexFile(componentName, componentPath, isStateless);
            createComponentPropsFile(componentName, componentPath);
            if (!isStateless) {
                createComponentStateFile(componentName, componentPath);
            }
        }
        else {
            console.log('A component with that name already exists.');
        }
    });
}
exports.createComponent = createComponent;
function createScreen(component) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!util.pathExists(util.projectRoot + '/src/screens/' + component)) {
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
    });
}
exports.createScreen = createScreen;
