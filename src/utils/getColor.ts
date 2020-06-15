export const SUCCESS = 'success';
export const FAILURE = 'failure';

const SILVER = 15002093; // rgba(228, 233, 237, 1)
const RED = 14832193; // rgba(226,82,65,1)
const GREEN = 3979128; // rgba(60,183,120,1)

export const getColor = (colorType?:string) => {
	switch (colorType) {
		case SUCCESS:
			return GREEN;
		case FAILURE:
			return RED;
		default:
			return SILVER;
	}
};
