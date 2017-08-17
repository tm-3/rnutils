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
const yarn = require("yarn-api");
const fs = require("fs");
const shelljs = require("shelljs");
const pkgUp = require("pkg-up");
// import { Util } from './Util';
// let util = new Util();
class ProjectTools {
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
    /**
     * Install as dev dependencies:
     *
     * typescript
     * jest-expo-ts
     * react-test-renderer
     * react-native-typescript-transformer
     * @types/react
     * @types/react-native
     * @typesreact-test-renderer
     * @types/jest
     */
    installDevDependencies() {
        return __awaiter(this, void 0, void 0, function* () {
            let packages = [
                'typescript',
                'jest-expo-ts',
                'react-test-renderer@16.0.0-alpha.12',
                'react-native-typescript-transformer',
                '@types/react',
                '@types/react-native',
                '@types/react-test-renderer',
                '@types/jest'
            ];
            yarn.devDependencies(packages, (err) => {
                console.log(err);
            });
        });
    }
    installDependencies() {
        return __awaiter(this, void 0, void 0, function* () {
            let packages = [
                'mobx',
                'mobx-react'
            ];
            yarn.dependencies(packages, (err) => {
                console.log(err);
            });
        });
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
            }
            catch (err) {
                console.log(err);
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
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    /**
     * Create tsconfig file
     */
    createTsConfigJson() {
        return __awaiter(this, void 0, void 0, function* () {
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
                }
                else {
                    console.log('Please run rnutils from within your react native project.');
                }
            }
            catch (err) {
                console.log(err);
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
    setupDebugging() {
        return __awaiter(this, void 0, void 0, function* () {
            let settings = {
                "react-native": {
                    "packager": {
                        "port": 19001
                    }
                }
            };
            fs.writeFileSync(this.projectRoot + '/.vscode/settings.json', JSON.stringify(settings, null, 4));
        });
    }
}
exports.ProjectTools = ProjectTools;
