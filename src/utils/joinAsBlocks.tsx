import React from 'react';
import CodeSpan from '../components/CodeSpan/CodeSpan';

export default function joinAsBlocks(
	results: Array<number> = [],
	joinerProp?: string | null,
	shouldGetMd?: boolean
) {
	const joiner = joinerProp || ', ';
	if (shouldGetMd) {
		return getMd(results, joiner);
	}
	return getJsx(results, joiner);
}

function getJsx(results: Array<number>, joiner:string) {
	return results.map((result: number, i: number) => {
		if (i === results.length - 1) {
			return <span key={i}><CodeSpan>{result}</CodeSpan></span>;
		}
		return <span key={i}><CodeSpan>{result}</CodeSpan>{joiner}</span>;
	});
}

function getMd(results: Array<number>, joiner:string) {
	const arr = results.map((result: number, i: number) => {
		if (i === results.length - 1) {
			return `\`${result}\``;
		}
		return `\`${result}\`${joiner}`;
	});
	return arr.join('');
}
