// Type definitions for BMA
import { CLIEngine } from 'eslint';

export as namespace eslintDiff;
export enum CheckLevel {
  ALL = 1,
  ERROR,
  WARNING,
}

interface CheckConfig {
  path?: string;
  level?: CheckLevel;
}

export function check(config: CheckConfig): CLIEngine.LintReport;
export function format(report: CLIEngine.LintReport): string;
