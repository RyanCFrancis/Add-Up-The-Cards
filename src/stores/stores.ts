import { writable } from 'svelte/store';

export const tutAppear = writable<boolean>(true);
export const hintAppear = writable<boolean>(false);
