import * as _ from 'lodash';
import { CLIEngine, Linter } from 'eslint';
import getChangedLines from './get_changed_lines';
import { CheckLevel } from '../constants';

/**
 * 修正文件的统计数字
 * @param fileResult
 */
function fixFileStats(fileResult: CLIEngine.LintResult) {
  fileResult.errorCount = 0;
  fileResult.warningCount = 0;
  fileResult.fixableErrorCount = 0;
  fileResult.fixableWarningCount = 0;

  fileResult.messages.forEach((message) => {
    if (message.fatal || message.severity === 2) {
      // error
      fileResult.errorCount++;
      if (message.fix) {
        fileResult.fixableErrorCount++;
      }
    } else {
      // warning
      fileResult.warningCount++;
      if (message.fix) {
        fileResult.fixableWarningCount++;
      }
    }
  });
}

/**
 * 修正report的统计数字
 * @param report
 */
function fixAllStats(report: CLIEngine.LintReport) {
  report.errorCount = 0;
  report.warningCount = 0;
  report.fixableErrorCount = 0;
  report.fixableWarningCount = 0;

  report.results.forEach((result: CLIEngine.LintResult) => {
    report.errorCount += result.errorCount;
    report.warningCount += result.warningCount;
    report.fixableErrorCount += result.fixableErrorCount;
    report.fixableWarningCount += result.fixableWarningCount;
  });
}

/**
 * 是否需要忽略的文件
 * @param result {CLIEngine.LintResult} 单个文件的lint结果
 * @returns {boolean} 是否被忽略
 */
function isIgnoreFile(result: CLIEngine.LintResult) {
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

/**
 * lint级别过滤器
 * @param message {Linter.LintMessage} 单个 message 信息
 * @param level {CheckLevel} 检查级别
 */
function levelFilter(message: Linter.LintMessage, level: CheckLevel) {
  if (level === CheckLevel.ERROR) {
    if (!message.fatal && message.severity !== 2) {
      // warning
      return false;
    }
  }
  return true;
}

/**
 * 过滤提交中之前就有的错误；
 * @param report {CLIEngine.LintReport} Lint报告对象
 * @param level {CheckLevel} 检查级别
 * @returns {CLIEngine.LintReport} 过滤后Lint报告对象
 */
export default function filter(report: CLIEngine.LintReport, level: CheckLevel) {
  const newReport = _.assign({}, report);

  newReport.results = newReport.results.filter((result) => {
    if (isIgnoreFile(result)) {
      return false;
    }

    const changeLinesMap = getChangedLines(result.filePath);

    result.messages = result.messages.filter((message: Linter.LintMessage) => (
      changeLinesMap[message.line || 0] && levelFilter(message, level)
    ));

    fixFileStats(result);

    return result.messages.length !== 0;
  });

  fixAllStats(newReport);

  return newReport;
}
