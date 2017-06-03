import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Tags = new Mongo.Collection('tags');
tags.ensureIndex({ name: 1 }, { unique: true });

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
	color: {
		type: String,
		max: 42,
		optional: false
	},
	description: {
		type: String,
		max: 250
	}
});

Tags.attachSchema(Tags.schema);


