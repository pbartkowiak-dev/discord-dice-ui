import React from 'react';
import narrativeSymbols from '../../consts/narrativeSymbols';
import styles from '../../components/ResultsModal/ResultsModal.module.css';

export default (results: string) => {
	const resultsArr = results.split(',');
	const joiner = ', ';
	
	return resultsArr.map((result, i) => {
		if (i === results.length - 1) {
			return (
				<span key={i}>
					<img
					className={styles.narrativeImageResult}
						src={require(`../../img/${result}.png`)}
						alt={result}
					/>
				</span>
			);
		}
		return (
			<span key={i}>
				<img
					className={styles.narrativeImageResult}
					src={require(`../../img/${result}.png`)}
					alt={result}
				/>
			</span>
		);
	});
}
