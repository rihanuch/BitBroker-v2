const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PositionsSchema = new Schema({
	user: {
        type: mongoose.Schema.Types.ObjectId,
		ref: 'Users',
		required: true
	},
	market: {
        type: mongoose.Schema.Types.ObjectId,
		ref: 'Markets',
		required: true
	},
	transaction: {
		buy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Transactions',
			required: true
		},
		sell: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Transactions',
			// sell it is not required as a position cannot
			// be opened with the selling occurring inmediatly
			required: false
		}
	},
	desiredReturn: {
		type: Number,
		required: true
	}
});

mongoose.model('Positions', PositionsSchema);
