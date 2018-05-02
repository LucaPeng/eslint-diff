"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
function getChangedFile(path) {
    var stdout = child_process_1.execSync("git diff HEAD --name-only --diff-filter=ACMR" + (path ? " " + path : ''), {
        encoding: 'utf8',
    });
    return stdout.trim().split('\n');
}
exports.default = getChangedFile;
