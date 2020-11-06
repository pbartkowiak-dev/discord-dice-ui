import React from 'react';
import Button from 'react-bootstrap/Button';
import CodeSpan from '../CodeSpan/CodeSpan';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import classNames from 'classnames';
import styles from './CocPushOptions.module.css';
import tooltip from '../../locale/tooltip';

function CocPushOptions({ 
	handlePushRoll,
	isPushed,
	luckRequiredForSuccess,
	luckRequiredForHardSuccess,
	luckRequiredForExtremeSuccess
 }: any) {
	const LuckSpends = ({
		luckRequiredForSuccess,
		luckRequiredForHardSuccess,
		luckRequiredForExtremeSuccess
	}: any) => (
		<div className={classNames({ [styles.row]: true, [styles.luckSpends]: true })}>
			{ (luckRequiredForSuccess > 0) && <div>Spend <CodeSpan>{ luckRequiredForSuccess }</CodeSpan> Luck Points for <strong>Success</strong></div> }
			{ (luckRequiredForHardSuccess > 0) && <div>Spend <CodeSpan>{ luckRequiredForHardSuccess }</CodeSpan> Luck Points for <strong>Hard Success</strong></div> }
			{ (luckRequiredForExtremeSuccess > 0) && <div>Spend <CodeSpan>{ luckRequiredForExtremeSuccess }</CodeSpan> Luck Points for <strong>Extreme Success</strong></div> }
			<InfoTooltip
				content={tooltip.luckInfo}
				className={styles.pushInfoIcon}
			/>
		</div>
	);

	return (
		<div className={styles.container}>
			<div className={styles.row}>
				<Button
					variant="outline-primary"
					onClick={ handlePushRoll }
					>Push the Roll
				</Button>
				<InfoTooltip
					content={tooltip.pushInfo}
					className={styles.pushInfoIcon}
				/>
			</div>
			<div className={styles.orContainer}>
				<span className={styles.or}>or</span>
			</div>

			{	
				!isPushed && <LuckSpends
					luckRequiredForSuccess={luckRequiredForSuccess}
					luckRequiredForHardSuccess={luckRequiredForHardSuccess}
					luckRequiredForExtremeSuccess={luckRequiredForExtremeSuccess}
				/>
			}
		</div>
	);
}

export default CocPushOptions;
