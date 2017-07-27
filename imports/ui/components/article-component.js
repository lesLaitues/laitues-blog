import { Template } from 'meteor/templating';

import './tag-component';

import './article-component.html';

import { Tags } from '../../api/tags/tags';

Template.articleComponent.helpers({
	tag(tagId) {
		return Tags.findOne(tagId); // TODO: try with this
	},
	commentsCount(articleId) {
		return Comments.find({ article: articleId }).count();
	}
});
