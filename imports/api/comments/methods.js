import { Meteor } from 'meteor/meteor';
import { Articles } from '../articles/articles';
import { Comments } from './comments';

// methods on comments
Meteor.methods({
	'comments.insert'({ author, data, answering, article }) {
		//check foreign key for author
		if (!Meteor.users.findOne({ _id: authors })) {
			throw new Meteor.Error('InvalidAuthorError', 'Invalid author given for this comment');
		}

		//check data for emptiness
		if (!data) {
			throw new Meteor.Error('EmptyDataError', 'Data is empty');
		}
		
		//check foreign key for answering
		if (!Comments.findOne({ _id: answering })) {
			throw new Meteor.Error('InvalidCommentError', 'Answering is invalid');
		}

		//check foreign key for article
		if (!Articles.findOne({ _id: article })) {
			throw new Meteor.Error('InvalidArticleError', 'Invalid article');
		}

		const comment = {
			author,
			data,
			anwersing,
			article,
			createdAt: new Date()
		};

		Comments.insert(comment);
	},
	'comments.updateData'({ commentId, data }) {
		Comments.update(commentId, {
			$set: {
				data
			}
		});
	},
	'comments.remove'({ commentId }) {
		Comments.update(commentId, {
			$set: {
				inTrash: true
			}
		});
	}
});

