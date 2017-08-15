import * as shelljs from 'shelljs';
import * as fs from 'fs';
import * as pkgUp from 'pkg-up';


export class Util {
    constructor() {
        this.getProjectRoot();
    }

    cwd: string = process.cwd();
    projectRoot: string;


    pathExists(dir: string) {
        return fs.existsSync(dir);
    }

    getProjectRoot() {
        let pr: string =  pkgUp.sync(process.cwd());
        if(pr !== null) {
            this.projectRoot = pr.replace('/package.json', '');
        }
        else {
            this.projectRoot = null;
        }
    }

    createFile() {
        
    }

    createDirectory() {

    }

    createStructure() {
        try
        { 
            if(this.projectRoot != null) {
                shelljs.mkdir(
                    [
                        this.projectRoot + '/src',
                        this.projectRoot + '/src/components',
                        this.projectRoot + '/src/config',
                        this.projectRoot + '/src/navigation',
                        this.projectRoot + '/src/screens',
                        this.projectRoot + '/src/stores',
                        this.projectRoot + '/__tests__',
                        this.projectRoot + '/__tests__/components',
                        this.projectRoot + '/__tests__/config',
                        this.projectRoot + '/__tests__/navigation',
                        this.projectRoot + '/__tests__/screens',
                        this.projectRoot + '/__tests__/stores'
                    ]
                )
            }
            else
            {
    
                console.log('Please run rnutils from within your react native project.');
            }
        }
        catch(err) 
        {
            console.log(err);
    
        }
    }

    addStandardScripts() {
        
    }

    setupTypeScript() {
        if(this.projectRoot === this.cwd) {

        }
        else {
            console.log('Please run this option from your project root.');
        }

    }
}