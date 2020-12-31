import React from 'react';

const warhammer4eSL = (
	<span className="tooltip-fast-sl">
		<p>To determine the SL of a Test, subtract the 10s number of the rolled dice from the 10s number of the Characteristic or Skill being tested.</p>
	</span>
);

const fastSL = (
	<span className="tooltip-fast-sl">
		<p>When you <strong className="tooltip-success">pass</strong> a Test, use the result of the tens die as your SL.</p>
		<p>If a Test <strong className="tooltip-failed">fails</strong>, you calculate SL as normal, taking your rolled tens die from your tested Skill to determine your negative SL.</p>
	</span>
);

const warhammer2eSL = (
	<span className="tooltip-fast-sl">
		<p>Compare the result of your Skill Test with your percentage chance. For each full 10% you beat your chance by, you achieve one degree of success.</p>
	</span>
);

const darkHeresy = (
	<span className="tooltip-fast-sl">
		<p>If the roll is equal to or lower than the characteristic, the character has gained one <strong className="tooltip-success">degree of success (DoS)</strong>. He also gains additional degrees of success equal to the tens digit of the target value minus the tens digit of the roll.</p>
		<p>If the roll is higher than the characteristic, the character has gained one <strong className="tooltip-failed">degree of failure (DoF)</strong>, and gains additional degrees of failure equal to the tens digit of the roll minus the tens digit of the target value.</p>
	</span>
);

export default {
	critical: <span>A roll of <strong>01</strong>.</span>,
	extreme: <span>The roll is equal to or below <strong>a&nbsp;fifth</strong> of the character’s skill or characteristic.</span>,
	hard: <span>The roll is equal to or below <strong>a&nbsp;half</strong> of the character’s skill or characteristic.</span>,
	success: <span>The roll is <strong>equal or below</strong> the character’s skill or characteristic.</span>,
	failure: <span>The roll is <strong>above</strong> the character’s skill or characteristic (but not a fumble).</span>,
	fumble: <span>The roll is <strong>100</strong>. If the roll required for success is less than 50, a roll of <strong>96 or over</strong> is a fumble.</span>,
	pushInfo: <span>Only skill and characteristic rolls can be pushed, not Luck, Sanity, or combat rolls, or rolls to determine an amount of damage or Sanity loss.</span>,
	luckInfo: <span>Luck points may not be spent on Luck rolls, damage rolls, Sanity rolls, or rolls to determine the amount of Sanity points lost.</span>,

	tnInfo: <span>The skill’s <strong>Target Number</strong> (TN) is equal to the attribute for that skill, plus any ranks in Expertise the character possesses for that skill.</span>,
	focusInfo: <span>Each d20 result equal to or less than the character’s <strong>Focus</strong> for that skill scores two successes instead of one.</span>,
	untrainedTestInfo: <span>If the character has no ranks in Expertise or Focus makes an <strong>untrained test</strong>.</span>,
	fortuneInfo: <span>Adds "pre-rolled" bonus d20 with a score of 1 to a test.</span>,
	assistanceInfo: <span>Dice 6th, 7th and 8th are used by the GM to handle actions made by <strong>Mobs and Squads</strong>.</span>,

	warhammerTooltip: <span>Supports rolling <strong>SL</strong> for Warhammer 4e and <strong>DoS</strong> for Dark Heresy II.</span>,

	warhammer4eSL,
	fastSL,
	warhammer2eSL,
	darkHeresy
};