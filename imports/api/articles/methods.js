import { Meteor } from 'meteor/meteor';
import { Articles } from './articles';
import { Tags } from '../tags/tags';

// methods on one article
Meteor.methods({
	'articles.insert'({ title, authors, tags, data, following }) {
		//check foreign keys for authors
		if ((authors.length < 1) || (Meteor.users.find({ _id: { $in: authors }}).count() !== authors.length)) {
			throw new Meteor.Error('InvalidOrNoAuthorsError', 'Invalid or no authors given for this article');
		}

		//check foreign keys for tags
		if (Tags.find({ _id: tags }).count() !== tags.length) {
			throw new Meteor.Error('UndefinedTagsError', 'Such tags do not exist');
		}

		//check for following unicity
		if (following && Articles.findOne({ following })) {
			throw new Meteor.Error('FollowingAlreadyUsedError', 'Cannot follow this article');
		}

		const article = {
			title,
			authors,
			tags,
			data,
			following,
			createdAt: new Date()
		};

		Articles.insert(article);
	},
	'articles.rename'({ articleId, title }) {
		Articles.update(articleId, {
			$set: {
				title
			}
		});
	},
	'articles.updateData'({ articleId, data }) {
		Articles.update(articleId, {
			$set: {
				data
			}
		});
	},
	'articles.addTag'({ articleId, tagId }) {
		Articles.update(articleId, {
			$addToSet: {
				tags: tagId
			}
		});
	},
	'articles.removeTag'({ articleId, tagId }) {
		Articles.update(articleId, {
			$pull: {
				tags: tagId
			}
		});
	},
	'articles.remove'({ articleId }) {
		Articles.update(articleId, {
			$set: {
				inTrash: true
			}
		});
	}
});
