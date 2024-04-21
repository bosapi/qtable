import { writable, type Writable } from 'svelte/store';
import type { AuthUser } from './types/Auth';
import type { TModal } from './types/Component';
import type { ActionTable } from './types/ActionTable';

export const modal: Writable<TModal> = writable();
export const authUser: Writable<AuthUser | undefined> = writable();
export const actionTable: Writable<ActionTable | undefined> = writable();
export const isCollapsed: Writable<boolean> = writable(false);
export const globalActions: Writable<any> = writable(undefined);
