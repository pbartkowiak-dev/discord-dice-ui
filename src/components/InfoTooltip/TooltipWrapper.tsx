import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import getRandom from '../../utils/getRandom';

function TooltipWrapper({ content, placement, children }: any) {
	if (content) {
		const id = `tooltip-${getRandom(999)}`;

		return (
			<OverlayTrigger
				key={id}
				placement={placement || 'top'}
				delay={100}
				overlay={
					<Tooltip id={id}>
						<>{ content }</>
					</Tooltip>
				}
			>{children}
			</OverlayTrigger>
		);
	}
	return <>{children}</>;
}

export default TooltipWrapper;
