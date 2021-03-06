import { Template } from 'meteor/templating';

import './tag-component';
import './article-component.html';

import { Tags } from '../../api/tags/tags';
import { Comments } from '../../api/comments/comments';

Template.articleComponent.helpers({
	tag(tagId) {
		return Tags.findOne(tagId);
	},
	commentsCount(articleId) {
		return Comments.find({ article: articleId }).count();
	}
});

