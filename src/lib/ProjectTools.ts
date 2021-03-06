import * as fs from 'fs';
import * as shelljs from 'shelljs';
import * as pkgUp from 'pkg-up';
import * as spawn from 'cross-spawn';
import * as handlebars from 'handlebars';
var hbt = require('../lib/templates/templates.js');

export class ProjectTools { 
    constructor() {
        this.getProjectRoot();
    }

    projectRoot = null;

    // Note that @storybook/react-native should be installed with 'getstorybook' but there seems to be a bug in the CLI.

    devPackages = [
        'jest',
        'typescript', 
        'jest-expo-ts', 
        'react-test-renderer@16.0.0-alpha.12',
        'react-native-typescript-transformer',
        '@types/react',
        '@types/react-native',
        '@types/react-test-renderer',
        '@types/jest',
        '@storybook/react-native'
    ]

    devRnPackages = [
        'typescript',
        'ts-jest',
        'react-native-typescript-transformer',
        'babel-preset-es2015',
        '@types/react',
        '@types/react-native',
        '@types/react-test-renderer',
        '@types/jest',
        '@storybook/react-native'
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



    async installPackages(isCrna) {

        let cmd = null;
        let devArgs = [];
        let args = [];

        if(this.userHasYarn()) {
            //Use Yarn
            console.log('Using yarn to install packages...');

            devArgs = ['add', '-D'];
            args = ['add'];

            args = args.concat(this.packages);
            devArgs = isCrna ? devArgs.concat(this.devPackages) : devArgs.concat(this.devRnPackages);
            cmd = 'yarnpkg';
        }
        else {
            //Use NPM
            console.log('Using NPM to install packages...');

            devArgs = ['isntall', '-D'];
            args = ['install'];

            args = args.concat(this.packages);
            devArgs = isCrna ? devArgs.concat(this.devPackages) : devArgs.concat(this.devRnPackages);
            cmd = 'npm';            
        }

        try 
        {

            let devResult = spawn.sync(cmd, devArgs, { stdio: 'inherit' });
            let result = spawn.sync(cmd, args, { stdio: 'inherit' });

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

            return 'done';
        }
        catch (err)
        {
            console.log(err);
            return err;
        }
    }

    async createBablercFile() {
        try
        {
            let babel = {
                "presets": ["react-native"],
                "sourceMaps": "inline"
            }

            fs.writeFileSync(this.projectRoot + '/.babelrc', JSON.stringify(babel, null, 2));
               
            return 'done';
        }
        catch (err) 
        {
            return err;
        }
    }
    
    async createRnCliConfig() {
        try 
        {
            
            let cliConfigTemplate = handlebars.templates['RnCliConfig'];
            let cliConfig = cliConfigTemplate({});

            fs.writeFileSync(this.projectRoot + '/rn-cli.config.js', cliConfig);
            return 'done';
        }
        catch (err)
        {
            console.log(err);
            return err;
        }
    }
    
    async setupTests() {

        try
        { 
            let basicTest = handlebars.templates['BasicTest'];
            let template = basicTest({});

            fs.writeFileSync(this.projectRoot + '/__tests__/index.unit.tests.js', template);

            fs.unlinkSync(this.projectRoot + '/__tests__/index.ios.js');
            fs.unlinkSync(this.projectRoot + '/__tests__/index.android.js');
        
        }
        catch (err)
        {
            return err;
        }


    }

    /**
     * Modify Package.json
     */
    async modifyPackageJson(isCRNA) {
        try
        {
            let packageJson = JSON.parse(fs.readFileSync(this.projectRoot + '/package.json').toString());

            if (isCRNA) {
                packageJson.scripts = {
                    "prestart": "yarn cleanWatchman",
                    "start": "react-native-scripts start",
                    "eject": "react-native-scripts eject",
                    "android": "react-native-scripts android",
                    "ios": "react-native-scripts ios",
                    "test": "node node_modules/jest/bin/jest.js --watch",
                    "cleanWatchman": "watchman watch-del-all",
                    "startEmulator": "~/Android/Sdk/tools/emulator -avd Pixel_XL_API_26 &",
                    "increaseWatches": "sudo sysctl -w fs.inotify.max_user_watches=20000"
                }
            }
            else {
                packageJson.scripts = {
                    "android": "react-native run-android",
                    "ios": "react-native run-ios",
                    "start": "react-native start --transformer node_modules/react-native-typescript-transformer/index.js --sourceExts ts,tsx",
                    "test": "node node_modules/jest/bin/jest.js --watch",
                    "startEmulator": "~/Android/Sdk/tools/emulator -avd Pixel_XL_API_26 &",
                    "cleanWatchman": "watchman watch-del-all",
                    "increaseWatches": "sudo sysctl -w fs.inotify.max_user_watches=20000"
                }
                packageJson.jest = {
                    "preset": "react-native",
                    "globals": {
                      "ts-jest": {
                        "useBabelrc": true
                      }
                    },
                    "transform": {
                      "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
                      ".(ts|tsx)": "<rootDir>/node_modules/ts-jest/preprocessor.js"
                    },
                    "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
                    "moduleFileExtensions": [
                      "ts",
                      "tsx",
                      "js"
                    ]
                }
            }

            fs.writeFileSync(this.projectRoot + '/package.json', JSON.stringify(packageJson, null, 2));

            return 'done';

        }
        catch (err)
        {
            console.log(err);
            return err;
        }
    }

    /**
     * Creates the index.android.js and index.ios.js files
     * 
     * @memberof ProjectTools
     */
    async createEntryFiles() {

        try {
            let packageJson = JSON.parse(fs.readFileSync(this.projectRoot + '/package.json').toString());


            let context = {projectName: packageJson.name};
            let template = handlebars.templates['EntryPoint'];
            
            let entryFile = template(context);
            

            fs.writeFileSync(this.projectRoot + '/index.ios.js', entryFile);
            fs.writeFileSync(this.projectRoot + '/index.android.js', entryFile);

            return 'done';
        }
        catch (err) {
            return err;
        }
    }

    async createLocalProperties() {
        try 
        {
            let localProps = `sdk.dir = ~/Android/Sdk`;

            fs.writeFileSync(this.projectRoot + '/android/local.properties', localProps);
        }
        catch (err) 
        {
            return err;
        }
    }

    /**
     * Create tsconfig file
     */
    async createTsConfigJson() {

        try
        {
            let config = {
                "compilerOptions": {
                    "allowJs": true,
                    "allowSyntheticDefaultImports": true,
                    "target": "es2015",
                    "module": "es2015",
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

            return 'done';
        }
        catch(err)
        {
            return err;
        }

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

                return 'done';
            }
            else
            {
                console.log('Please run rnutils from within your react native project.');
            }
        }
        catch(err) 
        {
            console.log(err);
            return err;
    
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

    async addStorybook() {
        try {
            if(this.userHasStorybook()){

                let cmd = 'getstorybook'
                let result = spawn.sync(cmd, ['-f'], { stdio: 'inherit' });
                return 'done';
            }
        }
        catch (err)
        {
            return err;
        }
    }

    async setupDebugging(isCrna: boolean) {

        try {
            let settings = {
                "react-native": {
                    "packager" : {
                        "port": 19001
                    }
                }
            }

            let launch = {
                "version": "0.2.0",
                "configurations": [
                    {
                        "name": "Debug Android",
                        "program": "${workspaceRoot}/.vscode/launchReactNative.js",
                        "type": "reactnative",
                        "request": "launch",
                        "platform": "android",
                        "sourceMaps": true,
                        "outDir": "${workspaceRoot}/.vscode/.react"
                    },
                    {
                        "name": "Debug iOS",
                        "program": "${workspaceRoot}/.vscode/launchReactNative.js",
                        "type": "reactnative",
                        "request": "launch",
                        "platform": "ios",
                        "target": "iPhone 5s",
                        "sourceMaps": true,
                        "outDir": "${workspaceRoot}/.vscode/.react"
                    },
                    {
                        "name": "Attach to packager",
                        "program": "${workspaceRoot}/.vscode/launchReactNative.js",
                        "type": "reactnative",
                        "request": "attach",
                        "sourceMaps": true,
                        "outDir": "${workspaceRoot}/.vscode/.react"
                    },
                    {
                        "name": "Debug in Exponent",
                        "program": "${workspaceRoot}/.vscode/launchReactNative.js",
                        "type": "reactnative",
                        "request": "launch",
                        "platform": "exponent",
                        "sourceMaps": true,
                        "outDir": "${workspaceRoot}/.vscode/.react"
                    }
                ]
            }
        
            shelljs.mkdir(this.projectRoot + '/.vscode');

            if(isCrna) {
                fs.writeFileSync(this.projectRoot + '/.vscode/settings.json', JSON.stringify(settings, null, 4));
            }
            fs.writeFileSync(this.projectRoot + '/.vscode/launch.json', JSON.stringify(launch, null, 4));

            return 'done';

            
        }
        catch (err)
        {
            return err;
        }
    }

    /**
     * 
     */
    async createBasicApp() {
        try
        {
            let appTemplate = handlebars.templates['AppTsx'];
            
            let file = appTemplate({}); 

            fs.writeFileSync(this.projectRoot + '/src/index.tsx', file);
        }
        catch (err)
        {
            return err;
        }
    }


    private userHasStorybook() {
        try {
            const result = spawn.sync('getstorybook', ['-V'], { stdio: 'ignore'});

            if(result.error || result.status !== 0) {
                return false;
            }

            return true;
        }
        catch(err) 
        {
            return false;
        }
    }

    private userHasYarn() {
        try {
            const result = spawn.sync('yarnpkg', ['--version'], { stdio: 'ignore' });

            if (result.error || result.status !== 0) {
                return false;
            }

            return true;
        } catch (err) {
            return false;
        }
    }
}