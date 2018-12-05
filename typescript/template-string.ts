let words = 'if you are a man> you wear trousers';
let html = htmlEscape `<div> I would like to denote that : ${words}</div>`;

function htmlEscape(literals, ...placeholders) {
	let result = '';
	for(let j = 0; j < placeholders.length; j++) {
		result += literals[j];
		result += placeholders[j]
			.replace(/&/g, '&amp;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
	}
	result += literals[literals.length - 1];
	return result;
}