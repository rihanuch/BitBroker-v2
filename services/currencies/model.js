const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CurrenciesSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	symbol: {
		type: String,
		required: true
	}
});

mongoose.model('Currencies', CurrenciesSchema);
