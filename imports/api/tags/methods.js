import { Tags } from './tags.js';
import { Contents } from '../contents/contents.js';

export const insert = new ValidatedMethod({
	name: 'tags.insert',
	validate: Tags.schema.pick(['name', 'color', 'description']).validator({ clean: true, filter: false }),
	run({ name, color, description }) {
		const tag = {
			name,
			color,
			description
		};

		Tags.insert(tag);
	}
});

export const rename = new ValidatedMethod({
	name: 'tags.rename',
	validate: Tags.schema.pick(['_id', 'name']).validator({ clean: true, filter: false }),
	run({ tagId, newName }) {
		Tags.update(tagId, {
			$set: {
				name: newName
			}
		});
	}
});

export const updateColor = new ValidatedMethod({
	name: 'tags.updateColor',
	validate: Tags.schema.pick(['_id', 'color']).validator({ clean: true, filter: false }),
	run({ tagId, newColor }) {
		Tags.update(tagId, {
			$set: {
				color: newColor
			}
		});
	}
});

export const updateDescription = new ValidatedMethod({
	name: 'tags.updateDescription',
	validate: Tags.schema.pick(['_id', 'description']).validator({ clean: true, filter: false }),
	run({ tagId, newDescription }) {
		Tags.update(tagId, {
			$set: {
				description: newDescription
			}
		});
	}
});

export const remove = new ValidatedMethod({
	name: 'tags.remove',
	validate: Tags.schema.pick(['_id']).validator({ clean: true, filter: false }),
	run({ tagId }) {
		//remove the tag from all contents using it
		Contents.find({
			tags: { $elemMatch: tagId }
		}).foreach(content => {
			Contents.removeTag(content._id, tagId);
		});

		Tags.remove(tagId);
	}
});

