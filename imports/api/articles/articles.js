import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Articles = new Mongo.Collection('articles');

Articles.deny({
	insert() {
		return true;
	},
	update() {
		return true;
	},
	remove() {
		return true;
	}
});

Articles.schema = new SimpleSchema({
	_id: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
		optional: false
	},
	title: {
		type: String,
		max: 255,
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
		},
		optional: true
	},
	updatedAt: {
		type: Date,
		autoValue() {
			if (this.isUpdate) {
				return new Date();
			} else {
				this.unset();
			}
		},
		optional: true
	},
	authors: {
		type: Array,
		optional: false
	},
	'authors.$': {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	data: {
		type: Object,
		optional: false
	},
	'data.text': {
		type: String
	},
	tags: {
		type: Array,
		optional: false
	},
	'tags.$': {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	following: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
		optional: true
	}
});

Articles.attachSchema(Articles.schema);

