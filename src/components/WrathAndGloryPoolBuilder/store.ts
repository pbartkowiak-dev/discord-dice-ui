import create from 'zustand';
import { WRATH_AND_GLORY_SKILL_TEST } from "../../consts/diceConstants";
import getResultsArray from "../../utils/getResultsArray";
import getRandom from "../../utils/getRandom";
import { requestMsgReady, requestPoolRoll } from "../../actions/roll.actions";
import reduxStore from '../../store';
import { getColor } from "../../utils/getColor";
import joinAsBlocks from "../../utils/joinAsBlocks";

interface Pool {
	WRATH_AND_GLORY_SKILL_TEST?: number;
	d6?: number
	d3?: number
}

export interface Result {
	id: number;
	val: number;
	position: number;
	isRerolled: boolean;
	isAdded: boolean;
	style: { [key: string]: string };
}

type State = {
	isModalOpen: boolean;
	isRerolled: boolean;
	areDiceAdded: boolean;
	closeModal: () => void
	rollDice: (pool: Pool, isReroll?: boolean) => void
	getPosition: (positionMax: number) => number
	toggleSelect: (id: number) => void
	setHoverId: (id: number | null) => void
	rerollAll: () => void
	rerollSelected: () => void
	increaseDicePool: (amount: number) => void
	positionMax: number
	results: Result[]
	normalIcons: number
	exaltedIcons: number
	totalIcons: number
	wrathDieResult: number
	positionsTaken: number[]
	selectedIds: number[]
	hoverId: null | number
}

interface GetNewResult {
	val: number;
	id: number;
	position: number;
	isReroll?: boolean;
	isAdded?: boolean;
}

const getNewResult = ({ val, position, isReroll, id, isAdded }: GetNewResult): Result => {
	return {
		val,
		id,
		position,
		isRerolled: Boolean(isReroll),
		isAdded: Boolean(isAdded),
		style: {
			transform: `rotate(${getRandom(90, -90)}deg) scale(.95) translate(${getRandom(5, -5)}px, ${getRandom(5, -5)}px)`
		}
	};
};

const useStore = create<State>(((set, get) => ({
	isModalOpen: false,
	isRerolled: false,
	areDiceAdded: false,
	results: [],
	selectedIds: [],
	normalIcons: 0,
	exaltedIcons: 0,
	totalIcons: 0,
	wrathDieResult: 0,
	positionMax: 0,
	hoverId: null,
	positionsTaken: [],
	getPosition: (positionMax) => {
		const { positionsTaken } = get();

		const getUniqePosition = (): number => {
			const position = getRandom(positionMax, 0);
			if (positionsTaken.includes(position)) {
				return getUniqePosition();
			}
			return position;
		}

		// @FIXME DICE ADDED DON'T GET UNIQE POSITION
		const position = getUniqePosition()

		set({
			positionsTaken: [...positionsTaken, position]
		});

		return position;
	},
	closeModal: () => set({ isModalOpen: false }),
	rollDice: (pool, isReroll) => {
		const { getPosition } = get();

		// Prepere modal for results
		set({
			positionsTaken: [],
			isRerolled: false,
			areDiceAdded: false
		});

		const skillDice = pool[WRATH_AND_GLORY_SKILL_TEST]

		if (skillDice) {
			const results = getResultsArray(6, skillDice, undefined, false);
			const normalIcons = results.filter(val => val === 4 || val === 5).length;
			const exaltedIcons = results.filter(val => val === 6).length;
			const totalIcons = normalIcons + (exaltedIcons * 2);
			const wrathDieResult = results[0];

			const positionMax = results.length + 8;
			const resultsMapped = results.map((val, index) => getNewResult({
				val,
				id: index,
				position: getPosition(positionMax),
				isReroll
			}));

			// Set results
			set({
				results: resultsMapped,
				normalIcons,
				exaltedIcons,
				totalIcons,
				wrathDieResult,
				positionMax,
				isModalOpen: true,
				selectedIds: []
			});

			//	prepare request msg
			const { userSettings } = reduxStore.getState()
			const username = userSettings.username || 'USERNAME_MISSING';
			let description = '';

			description += '**Results**:';
			description += '\n';
			description += `\`${wrathDieResult}\` :skull:`;
			description += '\n';

			description += `${joinAsBlocks(
				results
					.filter((_, index) => index)
					.sort((a, b) => b - a),				
				', ',
				true
			)}.`;

			description += '\n';
			description += '\n';
			description += `**:star: Total Icons**: \`${totalIcons}\``;

			description += '\n';
			description += '\n';
			description += `**:arrow_double_up: Exalted Icons**: \`${exaltedIcons}\``;

			description += '\n';
			description += `**:arrow_right: Normal Icons**: \`${normalIcons}\``;

			description += '\n';
			description += `**:skull: Wrath Die**: \`${wrathDieResult}\``;

			reduxStore.dispatch(requestMsgReady({
				msgTitle: `${username} rolled \`${skillDice}d6\``,
				description,
				color: getColor()
			}));
		} else {
			reduxStore.dispatch(requestPoolRoll({ pool }));
		}
	},
	toggleSelect: (id) => {
		const { selectedIds, results } = get();

		// Added dice cannot be rerolled
		if (!results.find(result => result.id === id && result.isAdded)) {
			if (selectedIds.includes(id)) {
				set({
					selectedIds: selectedIds.filter(i => i !== id)
				});
			} else {
				set({
					selectedIds: [...selectedIds, id]
				});
			}
		}
	},
	rerollAll: () => {
		const { rollDice, results } = get();
		const diceAddedAmount = results.filter(result => result.isAdded).length;

		rollDice({
				// Added dice cannot be rerolled
				[WRATH_AND_GLORY_SKILL_TEST]: results.length - diceAddedAmount
			},
			true
		);

		set({ isRerolled : true });
	},
	rerollSelected: () => {
		const { results, selectedIds } = get();

		const rerolledResults = results.map(result => {
			const newResult = { ...result };
			if (selectedIds.includes(newResult.id)) {
				newResult.val = getResultsArray(6)[0];
				newResult.isRerolled = true;
			}
			return newResult;
		});

		set({
			isRerolled: true,
			areDiceAdded: false,
			selectedIds: [],
			results: rerolledResults
		});
	},
	increaseDicePool: (amount) => {
		const { results, getPosition, positionMax, normalIcons, exaltedIcons, totalIcons } = get();

		const diceResults = getResultsArray(6, amount, undefined, false);

		const newNormalIcons = diceResults.filter(val => val === 4 || val === 5).length;
		const newExaltedIcons = diceResults.filter(val => val === 6).length;
		const newTotalIcons = newNormalIcons + (newExaltedIcons * 2);

		const newPositionMax = positionMax + diceResults.length;

		const newResults = diceResults
			.map((val, index) => getNewResult({
				val,
				id: index + 200,
				position: getPosition(newPositionMax),
				isAdded: true
			}));

		set({
			areDiceAdded : true,
			results: results.concat(newResults),
			normalIcons: newNormalIcons + normalIcons,
			exaltedIcons: newExaltedIcons + exaltedIcons,
			totalIcons: newTotalIcons + totalIcons,
			positionMax: positionMax + newResults.length
		});
	},
	setHoverId: (id) => {
		set({
			hoverId: id
		});
	}
})));

export default useStore;
