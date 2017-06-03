import { Meteor } from 'meteor/metor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Tags } from './Tags.js';
import { Contents } from '../contents/contents.js';

export const insert = new ValidateMethod({
	name: 'tags.insert',
	validate: Tags.simpleSchema().pick(['name', 'color', 'description']).validator({ clean: true, filter: false }),
	run({ name, color, description }) {
		const tag = {
			name,
			color,
			description
		};

		Tags.insert(tag);
	}
});

export const rename = new ValidateMethod({
	name: 'tags.rename',
	validate: Tags.simpleSchema().pick(['_id', 'name']).validator({ clean: true, filter: false }),
	run({ tagId, newName }) {
		Tags.update(tagId, { $set: {
			name: newName
		} });
	}
});

export const updateColor = new ValidateMethod({
	name: 'tags.updateColor',
	validate: Tags.simpleSchema().pick(['_id', 'color']).validator({ clean: true, filter: false }),
	run({ tagId, newColor }) {
		Tags.update(tagId, { $set: {
			color: newColor
		} });
	}
});

export const updateDescription = new ValidateMethod({
	name: 'tags.updateDescription',
	validate: Tags.simpleSchema().pick(['_id', 'description']).validator({ clean: true, filter: false }),
	run({ tagId, newDescription }) {
		Tags.update(tagId, { $set: {
			description: newDescription
		} });
	}
});

export const remove = new ValidateMethod({
	name: 'tags.remove',
	validate: Tags.simpleSchema().pick(['_id']).validator({ clean: true, filter: false }),
	run({ tagId }) {
		//remove the tag from all contents using it
		Contents.find({
			tags: { $elemMatch: tagId }
		}).foreach(content -> {
			Contents.removeTag(content._id, tagId);
		});
		
		Tags.remove(tagId);
	}
});

