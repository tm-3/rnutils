"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const handlebars = require("handlebars");
const pkgUp = require("pkg-up");
class ComponentTools {
    constructor() {
        this.projectRoot = null;
        this.getProjectRoot();
    }
    getProjectRoot() {
        let pr = pkgUp.sync(process.cwd());
        if (pr !== null) {
            this.projectRoot = pr.replace('/package.json', '');
        }
        else {
            this.projectRoot = null;
        }
    }
    createComponentFile(componentName, componentPath, isStateless) {
        try {
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
        catch (err) {
            console.log(err);
        }
    }
    createComponentPropsFile(componentName, componentPath) {
        try {
            let source = fs.readFileSync('./templates/IComponentProps.handlebars').toString();
            let template = handlebars.compile(source);
            let context = { componentName: componentName };
            let file = template(context);
            fs.writeFileSync(componentPath + '/' + 'I' + componentName + 'Props' + '.ts', file);
        }
        catch (err) {
            console.log(err);
        }
    }
    createComponentStateFile(componentName, componentPath) {
        try {
            let source = fs.readFileSync('./templates/IComponentState.handlebars').toString();
            let template = handlebars.compile(source);
            let context = { componentName: componentName };
            let file = template(context);
            fs.writeFileSync(componentPath + '/' + 'I' + componentName + 'State' + '.ts', file);
        }
        catch (err) {
            console.log(err);
        }
    }
    createComponentIndexFile(componentName, componentPath, isStateless) {
        try {
            let source = fs.readFileSync('./templates/ComponentIndex.handlebars').toString();
            let template = handlebars.compile(source);
            let context = { componentName: componentName, isStateless: isStateless };
            let file = template(context);
            fs.writeFileSync(componentPath + '/' + 'index.ts', file);
        }
        catch (err) {
            console.log(err);
        }
    }
}
exports.ComponentTools = ComponentTools;
