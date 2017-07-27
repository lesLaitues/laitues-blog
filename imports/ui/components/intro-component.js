import { Template } from 'meteor/templating';

import { AsciiMorph } from '../lib/asciiMorph';

import './intro-component.html';

Template.introComponent.onCreated(function introComponentCreated() {
	console.log(AsciiMorph);
});