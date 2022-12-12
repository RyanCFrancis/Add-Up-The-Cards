import { writable } from 'svelte-local-storage-store';
import { browser } from '$app/environment';

export const tutAppear = writable<boolean>('tutAppear', true);
export const hintAppear = writable<boolean>('hintAppear', false);

tutAppear.subscribe((value: boolean) => {
	if (browser) {
		window.localStorage.setItem('tutAppear', JSON.stringify(value));
	}
});
tutAppear.subscribe((value: boolean) => {
	if (browser) {
		window.localStorage.setItem('tutAppear', JSON.stringify(value));
	}
});
