const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MarketsSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	currencies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Currencies'
	}],
	transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transactions'	
	}],
	positions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Positions'
	}]
});

mongoose.model('Markets', MarketsSchema);
