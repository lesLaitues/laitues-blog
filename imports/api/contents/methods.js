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
	'contents.rename'({ contentId, title }) {
		Contents.update(contentId, {
			$set: {
				title
			}
		});
	},
	'contents.updateData'({ contentId, data }) {
		Contents.update(contentId, {
			$set: {
				data
			}
		});
	},
	'contents.addTag'({ contentId, tagId }) {
		Contents.update(contentId, {
			$addToSet: {
				tags: tagId
			}
		});
	},
	'contents.removeTag'({ contentId, tagId }) {
		Contents.update(contentId, {
			$pull: {
				tags: tagId
			}
		});
	},
	'contents.remove'({ contentId }) {
		Contents.remove(contentId);
	}
});

