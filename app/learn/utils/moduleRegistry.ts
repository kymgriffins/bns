/**
 * Module Registry
 * Central place to register and manage all learning modules
 * Clients can submit new modules through the API
 */

import type { ModuleMetadata } from "./moduleLoader";

export interface ModuleRegistry {
  modules: Map<string, ModuleMetadata>;
  registerModule(metadata: ModuleMetadata): void;
  getModule(id: string): ModuleMetadata | undefined;
  getAllModules(): ModuleMetadata[];
  removeModule(id: string): boolean;
}

// Import metadata files (these would be dynamically loaded in production)
import BPS2026Metadata from "../data/modules/bps-2026/metadata.json";

// In-memory registry
const registry = new Map<string, ModuleMetadata>();

// Initialize with default modules
function initializeRegistry() {
  if (registry.size === 0) {
    // Register all default modules
    registerDefaultModules();
  }
}

function registerDefaultModules() {
  // BPS 2026 Module
  registry.set(BPS2026Metadata.id, BPS2026Metadata as ModuleMetadata);
}

/**
 * Get all registered modules
 */
export function getAllModules(): ModuleMetadata[] {
  initializeRegistry();
  return Array.from(registry.values());
}

/**
 * Get a specific module by ID
 */
export function getModule(id: string): ModuleMetadata | undefined {
  initializeRegistry();
  return registry.get(id);
}

/**
 * Register a new module (for client submissions)
 */
export function registerModule(metadata: ModuleMetadata): boolean {
  if (registry.has(metadata.id)) {
    console.warn(`Module ${metadata.id} already exists`);
    return false;
  }
  registry.set(metadata.id, metadata);
  return true;
}

/**
 * Remove a module
 */
export function removeModule(id: string): boolean {
  initializeRegistry();
  return registry.delete(id);
}

/**
 * Update an existing module (in-memory only).
 */
export function updateModule(metadata: ModuleMetadata): boolean {
  initializeRegistry();
  if (!registry.has(metadata.id)) return false;
  registry.set(metadata.id, metadata);
  return true;
}

/**
 * Check if module exists
 */
export function moduleExists(id: string): boolean {
  initializeRegistry();
  return registry.has(id);
}

/**
 * Get modules by category
 */
export function getModulesByCategory(category: string): ModuleMetadata[] {
  initializeRegistry();
  return Array.from(registry.values()).filter((m) => m.category === category);
}

/**
 * Get unlocked modules
 */
export function getUnlockedModules(): ModuleMetadata[] {
  initializeRegistry();
  return Array.from(registry.values()).filter((m) => !m.isLocked);
}

/**
 * Get module statistics
 */
export function getModuleStats() {
  initializeRegistry();
  const modules = Array.from(registry.values());
  return {
    total: modules.length,
    locked: modules.filter((m) => m.isLocked).length,
    unlocked: modules.filter((m) => !m.isLocked).length,
    categories: [...new Set(modules.map((m) => m.category))],
  };
}
