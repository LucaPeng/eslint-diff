import { CLIEngine } from 'eslint';
import getChangedFiles from './lib/get_changed_files';
import filterPassError from './lib/filter_error';

interface CheckConfig {
  path?: string;
}

module.exports = {
  /**
   * 检查diff信息
   * @param checkConfig {CheckConfig} options
   * @return {CLIEngine.LintReport | null} 检查结果
   */
  check(checkConfig: CheckConfig): CLIEngine.LintReport | null {
    let {
      path,
    } = checkConfig;
    path = path || process.cwd();
    const changedFiles = getChangedFiles(path);
    const jsFiles: string[] = changedFiles.filter((file: string) => (
      /(\.js|\.jsx|\.vue|\.ts|\.tsx)$/.test(file)
    ));
    if (!jsFiles.length) {
      return null;
    }
    const cliEngine = new CLIEngine({});
    let report = cliEngine.executeOnFiles(jsFiles);
    report = filterPassError(report);
    return report;
  },
  /**
   * 格式化Eslint-lint报告内容
   * @param report {CLIEngine.LintReport} eslint-lint报告
   * @return {String} 格式化后的报告信息，可以直接输出
   */
  format(report: CLIEngine.LintReport): string {
    const cliEngine = new CLIEngine({});
    const formatter = cliEngine.getFormatter('stylish');
    let formatterInfo = formatter(report.results);
    // 移出eslint关于修复的提示
    formatterInfo = formatterInfo.replace(/([^\n]*)potentially fixable with the `--fix` option./, '');
    return formatterInfo;
  },
};
