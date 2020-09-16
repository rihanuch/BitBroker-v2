const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 12;

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
	telegramId: {
		type: Number,
		required: true,
		unique: true
	},
	name: {
		type: String,
		required: false
	},
	password: {
		type: String,
		required: true
	},
	permissionLevel: {
		type: Number,
		required: true,
		default: 1
    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transactions'
    }],
    positions: [{
        type: mongoose.Schema.Types.ObjectId,
		ref: 'Positions',
    }]
});

// https://stackoverflow.com/a/14595363
UsersSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UsersSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

mongoose.model('Users', UsersSchema);
