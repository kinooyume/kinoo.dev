const played = new Set<string>();

export function hasPlayed(id: string): boolean {
  return played.has(id);
}

export function markPlayed(id: string): void {
  played.add(id);
}

export function markAllPlayed(ids: string[]): void {
  ids.forEach((id) => played.add(id));
}

export function getPlayed(): ReadonlySet<string> {
  return played;
}
