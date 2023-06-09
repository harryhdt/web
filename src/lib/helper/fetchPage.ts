import type { SvelteComponent } from 'svelte';
import type { Page } from '$lib/types';

export const fetchPages = async () =>
	(
		await Promise.all(
			Object.entries(import.meta.glob('../../data/pages/*.md')).map(async ([, page]) => {
				const { metadata, default: component } = (await page()) as never;
				return {
					metadata: metadata as Page,
					component: component as SvelteComponent
				};
			})
		)
	)
		.filter(({ metadata: { title } }) => title && title !== '__error')
		.sort((a, b) => (b.metadata?.priority ?? 0) - (a.metadata?.priority ?? 0));

export const fetchPage = async (path: string) =>
	(await fetchPages()).find(
		({ metadata: { path: identifyPath, title } }) =>
			path === identifyPath || path === title.toLowerCase()
	);
