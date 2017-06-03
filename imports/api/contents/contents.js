import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Contents = new Mongo.Collection('contents');

Contents.deny({
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
		},
		optional: false
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
		optional: false
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
	answering: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
		optional: true
	}
});

Contents.attachSchema(Contents.schema);

