<script lang="ts">
	import { supabase } from '$lib/supabaseClient';

	async () => {
		const { data, error } = await supabase.auth.getSession();
		console.log(data);
	};
</script>

<h1>High Scores</h1>

<style>
	h1 {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
