"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs = require("shelljs");
const util_1 = require("./util");
let util = new util_1.Util();
function createStructure() {
    try {
        if (util.projectRoot != null) {
            shelljs.mkdir([
                util.projectRoot + '/src',
                util.projectRoot + '/src1/components',
                util.projectRoot + '/src1/config',
                util.projectRoot + '/src1/navigation',
                util.projectRoot + '/src1/screens',
                util.projectRoot + '/src1/stores',
                util.projectRoot + '/__tests__',
                util.projectRoot + '/__tests__/components',
                util.projectRoot + '/__tests__/config',
                util.projectRoot + '/__tests__/navigation',
                util.projectRoot + '/__tests__/screens',
                util.projectRoot + '/__tests__/stores'
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
exports.createStructure = createStructure;
