const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	id         : { type: String, required: true, index: { unique: true }, lowercase: true, match: /^[a-zA-Z0-9\-_.@\.:]+$/ },
	authVia    : { type: String, required: true },
	firstName  : { type: String, required: true },
	lastName   : { type: String, required: true },
	email      : { type: String, index: true, lowercase: true, match: /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ },
	status     : { type: String, required: true, enum: [ 'active', 'inactive', 'deleted' ] },
	custom     : { type: mongoose.Schema.Types.Mixed, default: {} },
	createdTs  : { type: Date,   required: true },
	createdBy  : { type: String, required: true, lowercase: true, match: /^[a-zA-Z0-9\-_.@\.:]+$/ },
	modifiedTs : { type: Date },
	modifiedBy : { type: String, lowercase: true, match: /^[a-zA-Z0-9\-_.@\.:]+$/ },
	version    : { type: Number, default: 1 },
	orgId      : { type: mongoose.Schema.Types.ObjectId, required: false },
	roleId     : { type: String, required: true },
	isVerified : { type: Boolean },
	locale     : { type: String, default: 'en', enum: ['en', 'es'] },
});

const postSchema = new mongoose.Schema({
	id        : { type: String, required: true, index: { unique: true }, lowercase: true, match: /^[a-zA-Z0-9\-_.@\.:]+$/ },
	createdTs : { type: Date,   required: true },
	createdBy : { type: String, required: true, lowercase: true, match: /^[a-zA-Z0-9\-_.@\.:]+$/ },
	post      : { type: String },
});

const userModel = mongoose.model('User', userSchema);
const postModel = mongoose.model('Post', userSchema);

module.exports = { userModel, postModel };
