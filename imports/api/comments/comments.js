import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Comments = new Mongo.Collection('comments');

Comments.deny({
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

Comments.schema = new SimpleSchema({
	_id: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
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
	author: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
		optional: false
	},
	data: {
		type: Object,
		optional: false
	},
	'data.text': {
		type: String
	},
	answering: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
		optional: true
	},
	article: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
		optional: false
	},
	inTrash: {
		type: Boolean,
		autoValue() {
			return false;
		},
		optional: true
	}
});

Comments.attachSchema(Comments.schema);

