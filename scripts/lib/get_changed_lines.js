"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
function getChangedLines(filePath) {
    var stdout = child_process_1.execSync("git diff HEAD " + filePath + " ", {
        encoding: 'utf8',
    });
    var lines = stdout.trim().split('\n');
    var result = {};
    var currentLine;
    lines.forEach(function (line) {
        if (line.indexOf('@@') === 0) {
            var execResult = line.match(/\+(\d+)/);
            if (execResult) {
                currentLine = +execResult[1];
            }
            return;
        }
        if (currentLine === undefined) {
            return;
        }
        switch (line[0]) {
            case ' ':
                currentLine = currentLine + 1;
                break;
            case '-':
                break;
            case '+':
                result[currentLine] = true;
                currentLine = currentLine + 1;
                break;
            default:
                break;
        }
    });
    return result;
}
exports.default = getChangedLines;
