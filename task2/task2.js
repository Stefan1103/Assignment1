const RESOURCES = [
	{
		id: 1,
		name: 'Resource #1',
		startDate: '20220101',
		endDate: '20220102',
		type: 'campaign',
		region: 'eu',
		code: 'uk_1111',
	},
	{
		id: 2,
		name: 'Resource #2',
		startDate: '20220102',
		endDate: '20220103',
		type: 'order',
		region: 'na',
		code: 'usa_2222',
	},
	{
		id: 3,
		name: 'Resource #3',
		startDate: '20220103',
		endDate: '20220104',
		type: 'order',
		region: 'na',
		code: 'usa_3333',
	},
	{
		id: 4,
		name: 'Resource #4',
		startDate: '20220104',
		endDate: '20220105',
		type: 'campaign',
		region: 'eu',
		code: 'es_4444',
	},
	{
		id: 5,
		name: 'Resource #5',
		startDate: '20220105',
		endDate: '20220106',
		type: 'order',
		region: 'eu',
		code: 'it_5555',
	},
	{
		id: 6,
		name: 'Resource #6',
		startDate: '20220106',
		endDate: '20220107',
		type: 'campaign',
		region: 'eu',
		code: 'mk_1111',
	},
	{
		id: 7,
		name: 'Resource #7',
		startDate: '20220107',
		endDate: '20220108',
		type: 'order',
		region: 'apac',
		code: 'cn_7777',
	},
	{
		id: 8,
		name: 'Resource #8',
		startDate: '20220108',
		endDate: '20220109',
		type: 'campaign',
		region: 'eu',
		code: 'mk_8888',
	},
	{
		id: 9,
		name: 'Resource #9',
		startDate: '20220109',
		endDate: '20220110',
		type: 'order',
		region: 'apac',
		code: 'au_9999',
	},
	{
		id: 10,
		name: 'Resource #10',
		startDate: '20220110',
		endDate: '20220111',
		type: 'order',
		region: 'latam',
		code: 'mx_1010',
	},
	{
		id: 11,
		name: 'Resource #11',
		startDate: '20220110',
		endDate: '20220111',
		type: 'campaign',
		region: 'latam',
		code: 'mx_2332',
	},
];

function numInStr(str = '') {
	let matches = str.match(/\d+/g);

	if (matches) {
		let matchedNum = '';
		for (let i = 0; i < matches.length; i++) {
			matchedNum = matchedNum + matches[i];
		}
		return matchedNum.toString();
	}
}
function charInStr(str = '') {
	let matches = str.match(/[A-Za-z]+/g);

	if (matches) {
		let matchedNum = '';
		for (let i = 0; i < matches.length; i++) {
			matchedNum = matchedNum + matches[i];
		}
		return matchedNum.toString().toUpperCase();
	}
}

const resourcesManager = (arr = [ {} ], type = 'order') => {
	const filteredResources = arr.filter((resource) => {
		return resource.type === type;
	});

	const uniqueRegions = [ ...new Set(filteredResources.map((item) => item.region)) ];

	const resultObj = {};
	uniqueRegions.forEach((region) => (resultObj[region] = []));

	for (const obj of filteredResources) {
		const { type, id, name, code, startDate, endDate, region } = obj;
		if (resultObj[region]) {
			const newObject = {
				[`${type}_id`]: numInStr(code),
				id: id,
				name: name,
				country: charInStr(code),
				startDate: startDate,
				endDate: endDate,
			};
			resultObj[region].push(newObject);
		}
	}

	return resultObj;
};

console.log(resourcesManager(RESOURCES, 'campaign'));
