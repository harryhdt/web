import { convertFrontMatter } from './converter.js';
import { fetchUser, fetchAllDiscussions } from './fetcher.js';
import { filterPage as filterPage, filterPost } from './filter.js';
import { writePosts, writePages } from './writer.js';

const { login: user, url: githubUrl, bio } = await fetchUser();
let list = await fetchAllDiscussions(user);

/*
const config = findConfig(list);

config.NAME = user;
config.GITHUB_URL = githubUrl;

[
	['PAGE_SIZE'],
	['BLOG_NAME'],
	['BIO', bio],
	['EMAIL'],
	['INSTAGRAM'],
	['DOMAIN'],
	['DESCRIPTION'],
	['KEYWORDS'],
	['REPOSITORY'],
	['LANGUAGE'],
	['COMMENT'],
	['TIMEZONE']
].forEach(([key, value]) => {
	const finalValue = config[key] || env[key] || value;
	if (!finalValue) return;
	config[key] = finalValue;
});
*/

list = convertFrontMatter(list);

const pages = filterPage(list);
const posts = filterPost(list);

console.log(`writing`);
await writePosts(posts);
console.log('...');
await writePages(pages);
// await writeEnv(config);

console.log(`done`);
