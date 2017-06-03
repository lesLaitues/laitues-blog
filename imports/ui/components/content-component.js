import { Template } from 'meteor/templating';

import './tag-component';

import './content-component.html';

import { Tags } from '../../api/tags/tags';

Template.contentComponent.helpers({
	tag(tagId) {
		return Tags.findOne(tagId); // TODO: try with this
	}
});