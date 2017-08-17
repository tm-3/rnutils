"use strict";
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
        let packages = [
            'typescript',
            'jest-expo-ts',
            'react-test-renderer',
            'react-native-typescript-transformer',
            '@types/react',
            '@types/react-native',
            '@types/react-test-renderer',
            '@types/jest'
        ];
        yarn.devDependencies(packages, (err) => {
            console.log(err);
        });
    }
    installDependencies() {
        let packages = [
            'mobx',
            'mobx-react'
        ];
        yarn.dependencies(packages, (err) => {
            console.log(err);
        });
    }
    /**
     * Add sourceExts/transformer to app.json
    */
    modifyAppJson() {
        try {
            let appJson = fs.readFileSync(this.projectRoot + '/app.json').toString();
            let appJsonObject = JSON.parse(appJson);
            if (appJsonObject.expo.packagerOpts === undefined) {
                appJsonObject.expo.packagerOpts = {};
            }
            appJsonObject.expo.packagerOpts.sourceExts = ['ts', 'tsx'];
            appJsonObject.expo.packagerOpts.transformer = 'node_modules/react-native-typescript-transformer/index.js';
            fs.writeFileSync(this.projectRoot + '/app.json', JSON.stringify(appJsonObject, null, 4));
        }
        catch (err) {
            console.log(err);
        }
    }
    /**
     * Modify Scripts
     */
    createDevScripts() {
    }
    /**
     * Create tsconfig file
     */
    createTsConfigJson() {
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
    createStructure() {
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
        let settings = {
            "react-native": {
                "packager": {
                    "port": 19001
                }
            }
        };
        fs.writeFileSync(this.projectRoot + '/.vscode/settings.json', JSON.stringify(settings, null, 4));
    }
}
exports.ProjectTools = ProjectTools;
