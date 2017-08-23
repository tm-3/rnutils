import * as fs from 'fs';
import * as shelljs from 'shelljs';
import * as pkgUp from 'pkg-up';
import * as spawn from 'cross-spawn';

export class ProjectTools { 
    constructor() {
        this.getProjectRoot();
    }

    projectRoot = null;
    devPackages = [
        'jest',
        'typescript', 
        'jest-expo-ts', 
        'react-test-renderer@16.0.0-alpha.12',
        'react-native-typescript-transformer',
        '@types/react',
        '@types/react-native',
        '@types/react-test-renderer',
        '@types/jest'
    ]

    packages = [
        'mobx',
        'mobx-react'
    ]

    private getProjectRoot() {
        let pr: string =  pkgUp.sync(process.cwd());
        if(pr !== null) {
            this.projectRoot = pr.replace('/package.json', '');
        }
        else {
            this.projectRoot = null;
        }
    }

    installPackages() {

        let cmd = null;
        let devArgs = [];
        let args = [];

        if(this.userHasYarn()) {
            //Use Yarn
            console.log('Using yarn to install packages...');

            devArgs = ['add', '-D'];
            args = ['add'];

            args = args.concat(this.packages);
            devArgs = devArgs.concat(this.devPackages);
            cmd = 'yarnpkg';

            console.log('args: ' + args);
            console.log('devArgs: ' + devArgs);

        }
        else {
            //Use NPM
            console.log('Using NPM to install packages...');

            devArgs = ['isntall', '-D'];
            args = ['install'];

            args = args.concat(this.packages);
            devArgs = devArgs.concat(this.devPackages);
            cmd = 'npm';

            console.log('args: ' + args);
            console.log('devArgs: ' + devArgs);
            
        }

        try 
        {

            let devResult = spawn.sync(cmd, devArgs, { stdio: 'inherit' });
            let result = spawn.sync(cmd, args, { stdio: 'inherit' });

            console.log('devResult: ' + devResult);
            console.log('result: ' + result);
        }
        catch(err)
        {
            console.log('err: ' + err);
        }
    }

    /**
     * Add sourceExts/transformer to app.json
    */
    async modifyAppJson() {

        try 
        {
            let appJson = JSON.parse(fs.readFileSync(this.projectRoot + '/app.json').toString());

            if(appJson.expo.packagerOpts === undefined) {
                appJson.expo.packagerOpts = {};
            }

            appJson.expo.packagerOpts.sourceExts = [ 'ts', 'tsx'];
            appJson.expo.packagerOpts.transformer = 'node_modules/react-native-typescript-transformer/index.js';
            
            fs.writeFileSync(this.projectRoot + '/app.json', JSON.stringify(appJson, null, 4));
        }
        catch (err)
        {
            console.log(err);
        }
    }

    /**
     * Modify Scripts
     */
    async createDevScripts() {
        try
        {


            let packageJson = JSON.parse(fs.readFileSync(this.projectRoot + '/package.json').toString());

            packageJson.scripts = {
                "prestart": "yarn cleanWatchman",
                "start": "react-native-scripts start",
                "eject": "react-native-scripts eject",
                "android": "react-native-scripts android",
                "ios": "react-native-scripts ios",
                "test": "node node_modules/jest/bin/jest.js --watch",
                "cleanWatchman": "watchman watch-del-all",
                "startEmulator": "~/Android/Sdk/tools/emulator -avd Pixel_XL_API_26 &",
                "preandroid": "yarn cleanWatchman & yarn startEmulator &",
                "increaseWatches": "sudo sysctl -w fs.inotify.max_user_watches=10000"
              }

            fs.writeFileSync(this.projectRoot + '/package.json', JSON.stringify(packageJson, null, 2));

        }
        catch (err)
        {
            console.log(err);
        }
    }

    /**
     * Create tsconfig file
     */
    async createTsConfigJson() {
        let config = {
            "compilerOptions": {
                "allowJs": true,
                "allowSyntheticDefaultImports": true,
                "target": "es2015",
                "module": "commonjs",
                "jsx": "react-native",
                "moduleResolution": "node",
                "experimentalDecorators": true
            },
            "exclude": [
                "node_modules"
            ]
        };

        fs.writeFileSync(this.projectRoot + '/tsconfig.json', JSON.stringify(config, null, 4));
        this.deleteJsConfigJson();

    }

    /**
     * Creates a standard directory structure. 
     */
    async createStructure() {
        try
        { 
            if(this.projectRoot !== null) {
                shelljs.mkdir('-p',
                    [
                        
                        this.projectRoot + '/src/components',
                        this.projectRoot + '/src/config',
                        this.projectRoot + '/src/navigation',
                        this.projectRoot + '/src/screens',
                        this.projectRoot + '/src/stores',
                        this.projectRoot + '/src/util', 
                        this.projectRoot + '/__tests__/components',
                        this.projectRoot + '/__tests__/config',
                        this.projectRoot + '/__tests__/navigation',
                        this.projectRoot + '/__tests__/screens',
                        this.projectRoot + '/__tests__/stores',
                        this.projectRoot + '/__tests__/util'
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

    /**
     * Delete jsonconfig if it exists
     */
    private deleteJsConfigJson() {
        try
        {
            if(fs.existsSync(this.projectRoot + '/jsconfig.json')) {
                fs.unlinkSync(this.projectRoot + '/jsconfig.json')
            }
        }
        catch (err)
        {
            console.log(err);
        }
    }

    async setupDebugging() {
        let settings = {
            "react-native": {
                "packager" : {
                    "port": 19001
                }
            }
        }

        fs.writeFileSync(this.projectRoot + '/.vscode/settings.json', JSON.stringify(settings, null, 4));
    }

    private userHasYarn() {
        try {
          const result = spawn.sync('yarnpkg', ['--version'], { stdio: 'ignore' });
          if (result.error || result.status !== 0) {
            return false;
          }
          return true;
        } catch (e) {
          return false;
        }
    }

}