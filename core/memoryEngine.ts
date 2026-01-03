export type Memory = {
  id: string;
  content: string;
  emotion: "joy" | "fear" | "sadness" | "trust" | "anger";
  weight: number;       // importance 0–1
  decayRate: number;    // per hour
  createdAt: number;
};

export let memoryStore: Memory[] = [];

// Store a new memory
export function storeMemory(mem: Memory) {
  memoryStore.push(mem);
}

// Decay existing memories
export function decayMemories() {
  const now = Date.now();
  memoryStore = memoryStore
    .map(m => {
      const hours = (now - m.createdAt) / 3_600_000;
      return { ...m, weight: Math.max(0, m.weight - hours * m.decayRate) };
    })
    .filter(m => m.weight > 0.05); // forget if too low
}

// Get current memory count
export function memoryCount() {
  return memoryStore.length;
}
