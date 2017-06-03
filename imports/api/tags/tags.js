import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Tags = new Mongo.Collection('tags');
//Tags.createIndex({ name: 1 }, { unique: true }); // TODO: check

Tags.deny({
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

Tags.schema = new SimpleSchema({
	_id: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
	},
	name: {
		type: String,
		max: 42,
	},
	color: {
		type: String,
		max: 42,
	},
	description: {
		type: String,
		max: 250
	}
});

Tags.attachSchema(Tags.schema);


