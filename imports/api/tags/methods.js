import { Meteor } from 'meteor/meteor';
import { Tags } from './tags';
import { Articles } from '../articles/articles';

Meteor.methods({
	'tags.insert'({ name, color, description }) {
		const tag = {
			name,
			color,
			description
		};

		Tags.insert(tag);
	},
	'tags.rename'({ tagId, newName }) {
		Tags.update(tagId, {
			$set: {
				name: newName
			}
		});
	},
	'tags.updateColor'({ tagId, newColor }) {
		Tags.update(tagId, {
			$set: {
				color: newColor
			}
		});
	},
	'tags.updateDescription'({ tagId, newDescription }) {
		Tags.update(tagId, {
			$set: {
				description: newDescription
			}
		});
	},
	'tags.remove'({ tagId }) {
		//remove the tag from all contents using it
		Articles.find({
			tags: tagId
		}).foreach(article => {
			Articles.removeTag(article._id, tagId);
		});

		Tags.remove(tagId);
	}
});

