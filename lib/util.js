"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs = require("shelljs");
const fs = require("fs");
const pkgUp = require("pkg-up");
class Util {
    constructor() {
        this.cwd = process.cwd();
        this.getProjectRoot();
    }
    pathExists(dir) {
        return fs.existsSync(dir);
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
    createFile() {
    }
    createDirectory() {
    }
    createStructure() {
        try {
            if (this.projectRoot != null) {
                shelljs.mkdir([
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
    addStandardScripts() {
    }
    setupTypeScript() {
        if (this.projectRoot === this.cwd) {
        }
        else {
            console.log('Please run this option from your project root.');
        }
    }
}
exports.Util = Util;
