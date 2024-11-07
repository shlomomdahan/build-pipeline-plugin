// src/main/webapp/templates/index.js
import Handlebars from 'handlebars';
import projectCardTemplate from './project-card.hbs';
import buildCardTemplate from './build-card.hbs';

window.Handlebars = Handlebars;

const templates = {
    'project-card': projectCardTemplate,
    'build-card': buildCardTemplate
};

window.BuildPipelineTemplates = templates;

export { Handlebars, templates };