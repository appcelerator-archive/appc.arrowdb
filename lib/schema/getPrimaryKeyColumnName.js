/**
 * return the column that is the primary key internally (not in the model, but in the native data source)
 * this is used by the model when translating the query for selecting / deselecting columns
 */
exports.getPrimaryKeyColumnName = function (Model) {
	return 'id';
};
