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
		autoValue() {
			if (this.isInsert) {
				return new Date();
			} else if (this.isUpsert) {
				return { $setOnInsert: new Date() };
			} else {
				this.unset();
			}
		}
	},
	updatedAt: {
		type: Date,
		autoValue() {
			if (this.isUpdate) {
				return new Date();
			}
		},
		denyInsert: true
	},
	authors: {
		type: [String],
		regEx: SimpleSchema.RegEx.Id,
		optional: false
	},
	'data.text' : {
		type: String
	},
	tags: {
		type: [String],
		regEx: SimpleSchema.RegEx.Id,
		optional: false
	},
	answering: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	}
});

Contents.attachSchema(Contents.schema);

