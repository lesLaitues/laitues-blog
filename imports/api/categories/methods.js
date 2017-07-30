import { Meteor } from 'meteor/meteor';
import { Categories } from './categories';
import { Articles } from '../articles/articles';

Meteor.methods({
	'categories.insert'({ name, description }) {
		const category = {
			name,
			description
		};

		Categories.insert(category);
	},
	'categories.rename'({ categoryId, newName }) {
		Category.update(categoryId, {
			$set: {
				name: newName
			}
		});
	},
	'categories.updateDescription'({ categoryId, newDescription }) {
		Categories.update(categoryId, {
			$set: {
				description: newDescription
			}
		});
	},
	'categories.remove'({ categoryId }) {
		//remove every article under this category
		Articles.find({
			category: categoryId
		}).foreach(article => {
			Articles.remove(article._id);
		});

		//remove category
		Categories.remove(categoryId);
	}
});

