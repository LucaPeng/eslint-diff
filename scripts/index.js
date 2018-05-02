"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eslint_1 = require("eslint");
var get_changed_files_1 = require("./lib/get_changed_files");
var filter_error_1 = require("./lib/filter_error");
module.exports = {
    check: function (checkConfig) {
        var path = checkConfig.path;
        path = path || process.cwd();
        var changedFiles = get_changed_files_1.default(path);
        var jsFiles = changedFiles.filter(function (file) { return (/(\.js|\.jsx|\.vue|\.ts|\.tsx)$/.test(file)); });
        if (!jsFiles.length) {
            return null;
        }
        var cliEngine = new eslint_1.CLIEngine({});
        var report = cliEngine.executeOnFiles(jsFiles);
        report = filter_error_1.default(report);
        return report;
    },
    format: function (report) {
        var cliEngine = new eslint_1.CLIEngine({});
        var formatter = cliEngine.getFormatter('stylish');
        var formatterInfo = formatter(report.results);
        formatterInfo = formatterInfo.replace(/([^\n]*)potentially fixable with the `--fix` option./, '');
        return formatterInfo;
    },
};
