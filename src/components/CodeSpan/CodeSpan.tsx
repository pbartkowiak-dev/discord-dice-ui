import React from 'react';
import styles from './CodeSpan.module.css';

export default function CodeSpan(props:any) {
	return (
		<span className={styles.codeSpan}>{ props.children }</span>
	);
}