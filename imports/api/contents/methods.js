import { Contents } from './contents.js';

// methods on one article
export const insert = new ValidatedMethod({
	name: 'contents.insert',
	validate: Contents.schema.pick(['title', 'authors', 'tags', 'data', 'answering']).validator({
		clean: true,
		filter: false
	}),
	run({ title, authors, tags, data, answering }) {
		//TODO: here check foreign keys for authors
		//TODO: here check foreign keys for tags

		const content = {
			title,
			authors,
			tags,
			data,
			answering,
			createdAt: new Date()
		};

		Contents.insert(content);
	}
});

export const rename = new ValidatedMethod({
	name: 'contents.rename',
	validate: Contents.schema.pick(['_id', 'title']).validator({ clean: true, filter: false }),
	run({ contentId, newTitle }) {
		Contents.update(contentId, {
			$set: {
				title: newTitle
			}
		});
	}
});

export const updateData = new ValidatedMethod({
	name: 'contents.updateData',
	validate: Contents.schema.pick(['_id', 'data']).validator({ clean: true, filter: false }),
	run({ contentId, newData }) {
		Contents.update(contentId, {
			$set: {
				data: newData
			}
		});
	}
});

export const addTag = new ValidatedMethod({
	name: 'contents.addTag',
	validate: Contents.schema.pick(['_id', 'tags']).validator({ clean: true, filter: false }),
	run({ contentId, newTag }) {
		Contents.update(contentId, {
			$addToSet: {
				tags: newTag
			}
		});
	}
});

export const removeTag = new ValidatedMethod({
	name: 'contents.removeTag',
	validate: Contents.schema.pick(['_id', 'tags']).validator({ clean: true, filter: false }),
	run({ contentId, tag }) {
		Contents.update(contentId, {
			$pull: {
				tags: tag
			}
		});
	}
});

export const remove = new ValidatedMethod({
	name: 'contents.remove',
	validate: Contents.schema.pick(['_id']).validator({ clean: true, filter: false }),
	run({ contentId }) {
		Contents.remove(contentId);
	}
});

