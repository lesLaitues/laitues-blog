import { Meteor } from 'meteor/meteor';
import { Contents } from './contents';

// methods on one article
Meteor.methods({
	'contents.insert'({ title, authors, tags, data, answering }) {
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
	},
	'contents.rename'({ contentId, newTitle }) {
		Contents.update(contentId, {
			$set: {
				title: newTitle
			}
		});
	},
	'contents.updateData'({ contentId, newData }) {
		Contents.update(contentId, {
			$set: {
				data: newData
			}
		});
	},
	'contents.addTag'({ contentId, newTag }) {
		Contents.update(contentId, {
			$addToSet: {
				tags: newTag
			}
		});
	},
	'contents.removeTag'({ contentId, tag }) {
		Contents.update(contentId, {
			$pull: {
				tags: tag
			}
		});
	},
	'contents.remove'({ contentId }) {
		Contents.remove(contentId);
	}
});

