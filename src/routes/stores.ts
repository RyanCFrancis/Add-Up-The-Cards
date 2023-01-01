import { writable } from 'svelte-local-storage-store';
//import { browser } from '$app/environment';

export const tutAppear = writable<boolean>('tutAppear', true);
//export const hintAppear = writable<boolean>('hintAppear', false);
export const tutDone = writable<boolean>('tutDone', false);
//export const sessionToken = writable<JsonWebKey>('sessionToken',);

export const isLoggedIn = writable<boolean>('isLoggedIn', false);

// tutAppear.subscribe((value: boolean) => {
// 	if (browser) {
// 		window.localStorage.setItem('tutAppear', JSON.stringify(value));
// 	}
// });
// tutAppear.subscribe((value: boolean) => {
// 	if (browser) {
// 		window.localStorage.setItem('tutAppear', JSON.stringify(value));
// 	}
// });
// tutAppear.subscribe((value: boolean) => {
// 	if (browser) {
// 		window.localStorage.setItem('tutAppear', JSON.stringify(value));
// 	}
// });

//,{storage:"session"}
