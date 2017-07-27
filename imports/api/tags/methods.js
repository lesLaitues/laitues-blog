import { Meteor } from 'meteor/meteor';
import { Tags } from './tags';
import { Articles } from '../articles/articles';

Meteor.methods({
	'tags.insert'({ name, description }) {
		const tag = {
			name,
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

