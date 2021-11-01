// @ts-nocheck
import React, { FC }  from 'react';
import gandalfRune from './assets/gandalf-rune.svg'

interface GandalfRuneProps {
	style?: { [key as string]: string }
}

const GandalfRune: FC<GandalfRuneProps> = (props) => {
	return (
		<span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				version="1.0"
				width="20"
				height="20"
				viewBox="4.5 7 20 35"
			>
				<defs />
				<g>
					<path
						d="M 10.744549,17.902233 L 15.557049,13.417858 L 14.271893,11.285046 L 17.853924,9.4393425 L 19.371502,12.078014 L 10.744549,20.636608 L 10.744549,25.599499 L 22.611736,13.472546 L 21.217205,11.285046 L 24.799236,9.4393425 L 26.303143,12.078014 L 10.744549,28.142467 L 10.744549,34.076061 L 12.303143,36.660046 L 8.6664238,38.451061 L 7.217205,35.894421 L 7.217205,13.786999 L 5.6449394,11.285046 L 9.2269707,9.4393425 L 10.744549,12.050671 L 10.744549,17.902233"
						style={{fill: '#000000' }}
						{...props}
					/>
				</g>
			</svg>
		</span>
	);
}

export default GandalfRune;
