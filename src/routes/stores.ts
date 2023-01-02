import { writable } from 'svelte-local-storage-store';
//import { browser } from '$app/environment';

export const tutAppear = writable<boolean>('tutAppear', true);

export const tutDone = writable<boolean>('tutDone', false);

export const isLoggedIn = writable<boolean>('isLoggedIn', false);
