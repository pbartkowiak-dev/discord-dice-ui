import React from 'react';
import styles from './CodeSpan.module.css';

export default function CodeSpan(props:any) {
	const { className } = props;
	const fullClassName = `${className} ${styles.codeSpan}`
	return (
		<span className={fullClassName}>{ props.children }</span>
	);
}