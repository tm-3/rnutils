import * as shelljs from 'shelljs';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import * as pkgUp from 'pkg-up';
var hbt = require('../lib/templates/templates.js');


export class ComponentTools { 
    constructor() {
        this.getProjectRoot();
    }
    
    
    projectRoot = null;

    private getProjectRoot() {
        let pr: string =  pkgUp.sync(process.cwd());
        if(pr !== null) {
            this.projectRoot = pr.replace('/package.json', '');
        }
        else {
            this.projectRoot = null;
        }
    }

    createComponentFile(componentName: string, componentPath: string, isStateless: boolean) {
        try 
        {
            let source: string = null;
            let template = null;
            
            if(isStateless) {
                template = handlebars.templates['StatelessComponent'];
            }
            else 
            {
                template = handlebars.templates['Component'];
            }

            let context = {componentName: componentName};

            let file = template(context);

            fs.writeFileSync(componentPath + '/' + componentName + '.tsx', file);
        }
        catch (err) 
        {
            console.log(err);
        }
    }

    createComponentPropsFile(componentName: string, componentPath: string) {
        try
        {
                      
            let template = handlebars.templates['IComponentProps'];
            let context = {componentName: componentName};

            let file = template(context);

            fs.writeFileSync(componentPath + '/' + 'I' + componentName + 'Props' + '.ts', file);
        }
        catch (err) 
        {
            console.log(err);
        }
    }


    createComponentStateFile(componentName: string, componentPath: string) {
        try
        {
            
            let template = handlebars.templates['IComponentState'];
            let context = {componentName: componentName};

            let file = template(context);

            fs.writeFileSync(componentPath + '/' + 'I' + componentName + 'State' + '.ts', file);
        }
        catch (err) 
        {
            console.log(err);
        }
    }


    createComponentIndexFile(componentName: string, componentPath: string, isStateless: boolean) {
        try
        {
            
            let template = handlebars.templates['ComponentIndex'];
            let context = {componentName: componentName, isStateless: isStateless};

            let file = template(context);

            fs.writeFileSync(componentPath + '/' + 'index.ts', file);
        }
        catch (err) 
        {
            console.log(err);
        }
    }
}





