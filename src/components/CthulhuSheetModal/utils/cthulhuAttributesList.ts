const cthulhuAttributesList = [
	{ name: 'STR', id: 'str' },
	{ name: 'CON', id: 'con' },
	{ name: 'SIZ', id: 'siz' },
	{ name: 'DEX', id: 'dex' },
	{ name: 'APP', id: 'app' },
	{ name: 'EDU', id: 'edu' },
	{ name: 'INT', id: 'int' },
	{ name: 'POW', id: 'pow' },
	{ name: 'Luck', id: 'lck' }
];

export interface AttributeType {
	name: string;
	id: string;
}

export function getAttributeById(id: string) {
	return cthulhuAttributesList.find((item) => item.id === id) || null;
}

export default cthulhuAttributesList;
