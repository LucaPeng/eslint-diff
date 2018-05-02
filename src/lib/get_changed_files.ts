import { execSync } from 'child_process';

/**
 * 有修改的文件（新增、修改、重命名）
 * @return {string[]} - 例子 ['.eslintrc.js', 'bin/code-check.js', 'index.js']
 */
export default function getChangedFile(path: string): string[] {
  const stdout = execSync(`git diff HEAD --name-only --diff-filter=ACMR${path ? ` ${path}` : ''}`, {
    encoding: 'utf8',
  });
  return stdout.trim().split('\n');
}
