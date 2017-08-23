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
const fs = require("fs");
const shelljs = require("shelljs");
const pkgUp = require("pkg-up");
const spawn = require("cross-spawn");
class ProjectTools {
    constructor() {
        this.projectRoot = null;
        this.devPackages = [
            'jest',
            'typescript',
            'jest-expo-ts',
            'react-test-renderer@16.0.0-alpha.12',
            'react-native-typescript-transformer',
            '@types/react',
            '@types/react-native',
            '@types/react-test-renderer',
            '@types/jest'
        ];
        this.packages = [
            'mobx',
            'mobx-react'
        ];
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
    installPackages() {
        let cmd = null;
        let devArgs = [];
        let args = [];
        if (this.userHasYarn()) {
            //Use Yarn
            console.log('Using yarn to install packages...');
            devArgs = ['add', '-D'];
            args = ['add'];
            args = args.concat(this.packages);
            devArgs = devArgs.concat(this.devPackages);
            cmd = 'yarnpkg';
        }
        else {
            //Use NPM
            console.log('Using NPM to install packages...');
            devArgs = ['isntall', '-D'];
            args = ['install'];
            args = args.concat(this.packages);
            devArgs = devArgs.concat(this.devPackages);
            cmd = 'npm';
        }
        try {
            let devResult = spawn.sync(cmd, devArgs, { stdio: 'inherit' });
            let result = spawn.sync(cmd, args, { stdio: 'inherit' });
        }
        catch (err) {
            console.log('err: ' + err);
        }
    }
    /**
     * Add sourceExts/transformer to app.json
    */
    modifyAppJson() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let appJson = JSON.parse(fs.readFileSync(this.projectRoot + '/app.json').toString());
                if (appJson.expo.packagerOpts === undefined) {
                    appJson.expo.packagerOpts = {};
                }
                appJson.expo.packagerOpts.sourceExts = ['ts', 'tsx'];
                appJson.expo.packagerOpts.transformer = 'node_modules/react-native-typescript-transformer/index.js';
                fs.writeFileSync(this.projectRoot + '/app.json', JSON.stringify(appJson, null, 4));
                return 'done';
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
    /**
     * Modify Scripts
     */
    createDevScripts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
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
                };
                fs.writeFileSync(this.projectRoot + '/package.json', JSON.stringify(packageJson, null, 2));
                return 'done';
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
    /**
     * Create tsconfig file
     */
    createTsConfigJson() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
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
                return 'done';
            }
            catch (err) {
                return err;
            }
        });
    }
    /**
     * Creates a standard directory structure.
     */
    createStructure() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.projectRoot !== null) {
                    shelljs.mkdir('-p', [
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
                    ]);
                    return 'done';
                }
                else {
                    console.log('Please run rnutils from within your react native project.');
                }
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
    /**
     * Delete jsonconfig if it exists
     */
    deleteJsConfigJson() {
        try {
            if (fs.existsSync(this.projectRoot + '/jsconfig.json')) {
                fs.unlinkSync(this.projectRoot + '/jsconfig.json');
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    addStorybook() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.userHasStorybook()) {
                    let cmd = 'getstorybook';
                    let result = spawn.sync(cmd, null, { stdio: 'inherit' });
                    return 'done';
                }
            }
            catch (err) {
                return err;
            }
        });
    }
    setupDebugging() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let settings = {
                    "react-native": {
                        "packager": {
                            "port": 19001
                        }
                    }
                };
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
                };
                shelljs.mkdir(this.projectRoot + '/.vscode');
                fs.writeFileSync(this.projectRoot + '/.vscode/settings.json', JSON.stringify(settings, null, 4));
                fs.writeFileSync(this.projectRoot + '/.vscode/launch.json', JSON.stringify(launch, null, 4));
                return 'done';
            }
            catch (err) {
                return err;
            }
        });
    }
    userHasStorybook() {
        try {
            const result = spawn.sync('getstorybook', ['-V'], { stdio: 'ignore' });
            if (result.error || result.status !== 0) {
                return false;
            }
            return true;
        }
        catch (err) {
            return false;
        }
    }
    userHasYarn() {
        try {
            const result = spawn.sync('yarnpkg', ['--version'], { stdio: 'ignore' });
            if (result.error || result.status !== 0) {
                return false;
            }
            return true;
        }
        catch (err) {
            return false;
        }
    }
}
exports.ProjectTools = ProjectTools;
