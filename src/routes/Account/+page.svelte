<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	async function toDo() {
		const {
			data: { user }
		} = await supabase.auth.getUser();
		return user;
	}
	onMount(() => {
		toDo();
	});
</script>

{#await toDo() then data}
	testing{data}
{/await}

<style>
</style>
