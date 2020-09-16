const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionsSchema = new Schema({
	action: {
		type: String,
		enum: ['BUY', 'SELL'],
		default: 'BUY',
		required: true
	},
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
	currency: {
		from: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Currencies',
			required: true,
		},
		to: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Currencies',
			required: true,
		},
	},
	amount: {
		from: {
			type: Number,
			required: true,
		},
		to: {
			type: Number,
			required: true
		}
	},
}, {
	timestamps: true
});

mongoose.model('Transactions', TransactionsSchema);
