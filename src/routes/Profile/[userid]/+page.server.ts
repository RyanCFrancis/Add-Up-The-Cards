import type { PageServerLoad } from './$types';
import { supabase } from '$lib/supabaseClient';

/** @type {import('./$types').PageServerLoad} */
export const load = (async ({ params }) => {
	const data = await supabase
		.from('scores')
		.select('score,combo_one,combo_two,combo_three,created_at,profiles (full_name,avatar_url,id)')
		.eq('user_made_by', params.userid);
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	// console.log('///////////////////////////////////////////');
	// console.log(data);
	// console.log('///////////////////////////////////////////');

	return {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		playerIconString: data.data![0].profiles!.avatar_url,
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		playerName: data!.data![0]!.profiles!.full_name,
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		scores: data!.data
	};
}) satisfies PageServerLoad;
