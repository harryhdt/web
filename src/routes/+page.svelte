<script lang="ts">
	import slugify from '$lib/helper/slugify';
	import type { Post } from '$lib/types';
	import moment from 'moment';
	import MetaTags from '../partitions/MetaTags.svelte';

	export let data;

	let posts: {
		published: Date;
		posts: {
			component: any;
			metadata: Post;
		}[];
	}[] = data.props.posts.list.reduce((acc: any, post) => {
		const published = moment(post.metadata.published).format('YYYY-MM-DD');
		const group: any = acc.find((group: any) => group.published === published);
		if (group) {
			group.posts.push(post);
		} else {
			acc.push({
				published,
				posts: [post]
			});
		}
		return acc;
	}, []);
</script>

<MetaTags
	title="Harry Hidayat"
	description="a Junior Fullstack Software Engineer. I have been programming since 2020. Especially on Web and Mobile Development."
/>
<div>
	<div class="full mx-auto max-w-[1368px] px-4 py-4 md:px-8">
		<h3 class="mb-4 text-2xl font-semibold">Posts</h3>
		<div class="space-y-4 sm:space-y-3">
			{#each posts as post}
				<div class="flex flex-col items-start gap-1 sm:flex-row sm:gap-2">
					<span class="font-light opacity-50 dark:opacity-40">
						{moment(post.published).format('YYYY-MM-DD')}
					</span>
					<div class="inline-flex flex-col gap-2">
						{#each post.posts as p}
							<a
								class="text-slate-900 underline hover:no-underline dark:text-gray-100"
								href="/{slugify(p.metadata.title)}">{p.metadata.title}</a
							>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
