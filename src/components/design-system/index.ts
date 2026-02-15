/**
 * Design System Documentation Components
 * Shared components for consistent DS page documentation
 */

// Re-export all DS components for easier imports
// Usage: import { DSBlock, DSPreview } from "@/components/design-system"

// Documentation components
export { default as DSBlock } from "./DSBlock.astro";
export { default as DSPreview } from "./DSPreview.astro";
export { default as DSPropsTable } from "./DSPropsTable.astro";
export { default as DSCode } from "./DSCode.astro";
export { default as DSStructure } from "./DSStructure.astro";
export { default as DSNote } from "./DSNote.astro";

// Layout components
export { default as DSLayout } from "./DSLayout.astro";
export { default as DSCategoryHeader } from "./DSCategoryHeader.astro";
export { default as DSAtomicLabel } from "./DSAtomicLabel.astro";
export { default as DSSidebar } from "./DSSidebar.tsx";

// Sidebar config
export * from "./sections/index";
