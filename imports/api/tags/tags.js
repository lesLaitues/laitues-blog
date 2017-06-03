import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Tags = new Mongo.Collection('tags');

Tags.deny({
	insert() { return true; },
	update() { return true; },
	remove() { return true; }
});

Tags.schema = new SimpleSchema({
	_id: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
		optional: false
	},
	name: {
		type: String,
		max: 42,
		optional: false
	},
	description: {
		type: String
	}
});

Tags.attachSchema(Tags.schema);


