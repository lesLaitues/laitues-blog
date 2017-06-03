import { Meteor } from 'meteor/metor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Contents } from './contents.js';

export const insert = new ValidateMethod({
	name: 'contents.insert',
	validate: Contents.simpleSchema().pick(['title', 'authors', 'tags', 'text', 'answering']).validator({ clean: true, filter: false }),
	run({ title, authors, tags, text, answering }) {
		//TODO: here check foreign keys for authors
		//TODO: here check foreign keys for tags
		
		const content = {
			title,
			authors,
			tags,
			text,
			answering,
			createdAt: new Date()
		};

		Contents.insert(content);
	}
});

export const rename = new ValidateMethod({
	name: 'contents.rename',
	validate: Contents.SimpleSchema().pick(['_id', 'title']).validator({ clean: true, filter: false }),
	run({ contentId, newTitle }) {
		Contents.update(contentId, { $set: {
			title: newTitle
		} });
	}
});

export const updateData = new ValidateMethod({
	name: 'contents.updateData',
	validate: Contents.SimpleSchema().pick(['_id', 'data']).validator({ clean: true, filter: false }),
	run({ contentId, newData }) {
		Contents.update(contentId, { $set: {
			data: newData
		} });
	}
});

export const addTag = new ValidateMethod({
	name: 'contents.addTag',
	validate: Contents.SimpleSchema().pick(['_id', 'tags']).validator({ clean: true, filter: false }),
	run({ contentId, newTag }) {
		Contents.update(contentId, { $addToSet: {
			tags: newTag
		} });
	}
});

export const removeTag = new ValidateMethod({
	name: 'contents.removeTag',
	validate: Contents.SimpleSchema().pick(['_id', 'tags']).validator({ clean: true, filter: false }),
	run({ contentId, tag }) {
		Contents.update(contentId, { $pull: {
			tags: tag
		} });
	}
});

export const remove = new ValidateMethod({
	name: 'contents.remove',
	validate: Contents.SimpleSchema().pick(['_id']).validator({ clean: true, filter: false }),
	run({ contentId }) {
		Contents.remove(contentId);
	}
});

