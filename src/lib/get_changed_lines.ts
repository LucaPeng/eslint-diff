import {
  execSync,
} from 'child_process';

interface ChangedLinesMap {
  [index: number]: boolean;
}

/**
 * 返回指定文件改动过的行号
 * @param filePath {string} 例子: src/index
 * @return {ChangedLinesMap} 例子: 第2、5行有改动， {2: true, 5: true}
 */
export default function getChangedLines(filePath: string): ChangedLinesMap {
  const stdout = execSync(`git diff HEAD ${filePath} `, {
    encoding: 'utf8',
  });
  const lines = stdout.trim().split('\n');
  const result: ChangedLinesMap = {};

  let currentLine: number;
  lines.forEach((line) => {
    if (line.indexOf('@@') === 0) {
      const execResult = line.match(/\+(\d+)/);
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
