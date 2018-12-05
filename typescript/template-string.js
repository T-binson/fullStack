var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var words = 'if you are a man> you wear trousers';
var html = htmlEscape(__makeTemplateObject(["<div> I would like to denote that : ", "</div>"], ["<div> I would like to denote that : ", "</div>"]), words);
function htmlEscape(literals) {
    var placeholders = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        placeholders[_i - 1] = arguments[_i];
    }
    var result = '';
    for (var j = 0; j < placeholders.length; j++) {
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
