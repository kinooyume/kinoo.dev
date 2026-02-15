import { createEventBus } from "./eventBus";

/** Shared app-level event bus instance. */
export const { on, emit } = createEventBus();
