export default {
	get(queryParam:string) {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		return urlParams.get(queryParam);
	}
};