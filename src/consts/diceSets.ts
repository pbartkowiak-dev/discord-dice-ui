import { D6_CONAN, D20_CONAN_TEST, D20_CONAN, D20_CONAN_HL } from './consts';
import { D100_SL } from './consts';
import {
	D100,
	D20,
	D12,
	D10,
	D8,
	D6,
	D5,
	D4,
	POOL
} from './diceConstants';

export const classicSet = [{
	diceType: D100,
	imageFilename: 'd100.png',
	label: 'd100'
}, {
	diceType: D20,
	imageFilename: 'd20.png',
	label: 'd20'
}, {
	diceType: D12,
	imageFilename: 'd12.png',
	label: 'd12'
}, {
	diceType: D10,
	imageFilename: 'd10.png',
	label: 'd10'
}, {
	diceType: D8,
	imageFilename: 'd8.png',
	label: 'd8'
}, {
	diceType: D6,
	imageFilename: 'd6.png',
	label: 'd6'
}, {
	diceType: D4,
	imageFilename: 'd4.png',
	label: 'd4'
}, {
	diceType: POOL,
	imageFilename: 'pool.png',
	label: 'Pool Builder'
}];

export const CoCSet = [{
	diceType: D100_SL,
	imageFilename: 'd100.png',
	label: 'Skill test'
}, {
	diceType: D20,
	imageFilename: 'd20.png',
	label: 'd20'
}, {
	diceType: D12,
	imageFilename: 'd12.png',
	label: 'd12'
}, {
	diceType: D10,
	imageFilename: 'd10.png',
	label: 'd10'
}, {
	diceType: D8,
	imageFilename: 'd8.png',
	label: 'd8'
}, {
	diceType: D6,
	imageFilename: 'd6.png',
	label: 'd6'
}, {
	diceType: D4,
	imageFilename: 'd4.png',
	label: 'd4'
}];

export const warhammerSet = [{
	diceType: D100_SL,
	imageFilename: 'd100.png',
	label: 'Skill test'
}, {
	diceType: D100,
	imageFilename: 'd100.png',
	label: 'd100'
}, {
	diceType: D10,
	imageFilename: 'd10.png',
	label: 'd10'
}, {
	diceType: D5,
	imageFilename: 'd10.png',
	label: 'd5',
	extraMark: 'd5'
}];

export const conanSet = [{
	diceType: D20_CONAN_TEST,
	imageFilename: 'd20conan-test.png',
	label: 'Skill Test'
}, {
	diceType: D20_CONAN,
	imageFilename: 'd20conan.png',
	label: 'd20'
}, {
	diceType: D20_CONAN_HL,
	imageFilename: 'd20conan-hl.png',
	label: 'Hit Location'
}, {
	diceType: D6_CONAN,
	imageFilename: 'd6conan.png',
	label: 'Combat Die'
}];
