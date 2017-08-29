"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const handlebars = require("handlebars");
const pkgUp = require("pkg-up");
var hbt = require('../lib/templates/templates.js');
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
            let template = null;
            if (isStateless) {
                template = handlebars.templates['StatelessComponent'];
            }
            else {
                template = handlebars.templates['Component'];
            }
            let context = { componentName: componentName };
            let file = template(context);
            fs.writeFileSync(componentPath + '/' + componentName + '.tsx', file);
        }
        catch (err) {
            console.log(err);
        }
    }
    createComponentIndexFile(componentName, componentPath) {
        try {
            let template = handlebars.templates['ComponentIndex'];
            let context = { componentName: componentName };
            let file = template(context);
            fs.writeFileSync(componentPath + '/' + 'index.ts', file);
        }
        catch (err) {
            console.log(err);
        }
    }
}
exports.ComponentTools = ComponentTools;
