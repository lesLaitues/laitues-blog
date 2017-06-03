import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Contents = new Mongo.Collection('contents');

Contents.deny({
	insert() { return true; },
	update() { return true; },
	remove() { return true; }
});

Contents.schema = new SimpleSchema({
	_id: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
		optional: false
	},
	title: {
		type: String,
		max: 100,
		optional: false
	},
	createdAt: {
		type: Date,
		denyUpdate: true,
		optional: false
	},
	lastEditedAt: {
		type: Date,
	},
	authors: {
		type: [String],
		regEx: SimpleSchema.RegEx.Id,
		optional: false
	},
	text: {
		type: String
	},
	tags: {
		type: [String],
		regEx: SimpleSchema.RegEx.Id,
		optional: false;
	}
});

Contents.attachSchema(Contents.schema);

