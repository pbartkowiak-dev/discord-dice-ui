import React from 'react';
import CodeSpan from '../components/CodeSpan/CodeSpan';

type ResultsType = Array<number | string | JSX.Element>;

export default function joinAsBlocks(
	results: ResultsType = [],
	joinerProp?: string | null,
	getForDiscord?: boolean
) {
	const joiner = joinerProp || ', ';
	if (getForDiscord) {
		return getMd(results, joiner);
	}
	return getJsx(results, joiner);
}

function getJsx(results: ResultsType, joiner: string) {
	return results.map((result, i) => {
		if (i === results.length - 1) {
			return <span key={i} data-value={result}><CodeSpan>{result}</CodeSpan></span>;
		}
		return <span key={i} data-value={result}><CodeSpan>{result}</CodeSpan>{joiner}</span>;
	});
}

function getMd(results: ResultsType, joiner: string) {
	const arr = results.map((result, i) => {
		if (i === results.length - 1) {
			return `\`${result}\``;
		}
		return `\`${result}\`${joiner}`;
	});
	return arr.join('');
}
