export type DiagramColor = "purple" | "orange" | "red" | "green" | "pink" | "blue" | "cyan";

export type DiagramRow = {
  label: string;
  detail?: string;
  badge?: string;
  color: DiagramColor;
};

export type DiagramNode = {
  label: string;
  detail?: string;
  color: DiagramColor;
};

export type DiagramArrowData = {
  from: DiagramNode;
  to: DiagramNode;
  label?: string;
  bidirectional?: boolean;
};

export type DiagramFlowStep = {
  label: string;
  detail?: string;
  color: DiagramColor;
};

export type DiagramTreeNode = {
  label: string;
  color: DiagramColor;
  children?: DiagramTreeNode[];
};

export type DiagramCompareColumn = {
  title: string;
  color: DiagramColor;
  items: string[];
};

export type DiagramCycleStep = {
  label: string;
  color: DiagramColor;
};

export function colorStyle(color: DiagramColor) {
  return `--cell-bg: var(--${color}-tint); --cell-border: var(--${color}-border); --cell-text: var(--${color}-light);`;
}

export function badgeStyle(color: DiagramColor) {
  return `--cell-bg: var(--${color}); --cell-text: var(--background-color);`;
}

export function mutedStyle(color: DiagramColor) {
  return `--cell-bg: var(--${color}-bg); --cell-border: var(--${color}-border); --cell-text: var(--${color}-lightest);`;
}

export type PageMapBlock = {
  label: string;
  detail?: string;
  badge?: string;
  color: DiagramColor;
  children?: PageMapBlock[];
  direction?: "row" | "column";
};
