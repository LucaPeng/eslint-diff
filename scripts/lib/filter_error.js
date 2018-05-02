"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_changed_lines_1 = require("./get_changed_lines");
var _ = require("lodash");
function fixFileStats(fileResult) {
    fileResult.errorCount = 0;
    fileResult.warningCount = 0;
    fileResult.fixableErrorCount = 0;
    fileResult.fixableWarningCount = 0;
    fileResult.messages.forEach(function (message) {
        if (message.fatal || message.severity === 2) {
            fileResult.errorCount++;
            if (message.fix) {
                fileResult.fixableErrorCount++;
            }
        }
        else {
            fileResult.warningCount++;
            if (message.fix) {
                fileResult.fixableWarningCount++;
            }
        }
    });
}
function fixAllStats(report) {
    report.errorCount = 0;
    report.warningCount = 0;
    report.fixableErrorCount = 0;
    report.fixableWarningCount = 0;
    report.results.forEach(function (result) {
        report.errorCount += result.errorCount;
        report.warningCount += result.warningCount;
        report.fixableErrorCount += result.fixableErrorCount;
        report.fixableWarningCount += result.fixableWarningCount;
    });
}
function isIgnoreFile(result) {
    if (result.warningCount !== 1 || result.errorCount !== 0) {
        return false;
    }
    if (result.messages.length !== 1) {
        return false;
    }
    if (result.messages[0].message.indexOf('File ignored by default') !== 0) {
        return false;
    }
    return true;
}
function check(report) {
    var newReport = _.assign({}, report);
    newReport.results = newReport.results.filter(function (result) {
        if (isIgnoreFile(result)) {
            return false;
        }
        var changeLinesMap = get_changed_lines_1.default(result.filePath);
        result.messages = result.messages.filter(function (message) { return (changeLinesMap[message.line || 0]); });
        fixFileStats(result);
        return result.messages.length !== 0;
    });
    fixAllStats(newReport);
    return newReport;
}
exports.default = check;
