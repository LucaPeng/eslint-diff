// Type definitions for BMA
import { CLIEngine } from 'eslint';

export as namespace eslintDiff;

interface CheckConfig {
  path?: string;
}

export function check(config: CheckConfig): CLIEngine.LintReport;
export function format(report: CLIEngine.LintReport): string;
