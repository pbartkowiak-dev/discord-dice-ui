import React from 'react';
import classNames from 'classnames';
import styles from './CodeSpan.module.css';

const FAILURE = 'failure';
const SUCCESS = 'success';
const INACTIVE = 'inactive';

export default function CodeSpan({
	className,
	type,
	children
}: any) {
	const fullClassName = classNames({
		[styles.codeSpan]: true,
		[className]: !!className,
		[styles.failure]: type === FAILURE,
		[styles.success]: type === SUCCESS,
		[styles.inactive]: type === INACTIVE
	});
	return (
		<span className={fullClassName}>{ children }</span>
	);
}
