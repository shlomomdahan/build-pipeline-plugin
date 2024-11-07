const projectCardTemplate = window.BuildPipelineTemplates['project-card'];
const buildCardTemplate = window.BuildPipelineTemplates['build-card'];

const viewSettings = {
    refreshFrequency: parseInt(document.querySelector(".pipeline-view-settings").dataset.refreshFrequency, 10),
    isNewWindowConsoleOutput: document.querySelector(".pipeline-view-settings").dataset.newWindowConsole === 'true',
    isThisWindowConsoleOutput: document.querySelector(".pipeline-view-settings").dataset.thisWindowConsole === 'true',
    isTriggerOnlyLatestJob: document.querySelector(".pipeline-view-settings").dataset.triggerOnlyLatest === 'true',
    hasBuildPermission: document.querySelector(".pipeline-view-settings").dataset.hasBuildPermission === 'true',
    rootURL: document.querySelector(".pipeline-view-settings").dataset.rootUrl
};

var buildPipeline = new BuildPipeline(
    buildPipelineViewProxy,
    buildCardTemplate,
    projectCardTemplate,
    viewSettings
);


function initializeBuildCards() {
    document.querySelectorAll('.build-data').forEach(buildElement => {

        const buildId = buildElement.dataset.buildId;
        const buildData = JSON.parse(buildElement.dataset.buildInfo);
        const buildStatus = buildElement.dataset.buildStatus;
        const isManualTrigger = buildElement.dataset.isManualTrigger === 'true';
        const nextBuildNumber = parseInt(buildElement.dataset.nextBuildNumber, 10);
        const dependencyIds = JSON.parse(buildElement.dataset.dependencyIds);

        const templateContext = {
            ...buildData,
            viewSettings: viewSettings
        };

        // Generate build card with extended context
        jQuery(buildElement).append(buildPipeline.buildCardTemplate(templateContext));

        // add build proxy to proxies for future use-->
        buildPipeline.buildProxies[buildId] = window[`buildProxy_${buildId}`];

        if (buildStatus === 'BUILDING') {
            buildPipeline.showProgress(buildId, dependencyIds);
        }

        jQuery("table.pipelines").on(`show-status-${buildId}`, function() {
            if (isManualTrigger) {
                buildPipeline.updateBuildCard(buildId);
            } else {
                buildPipeline.updateNextBuildAndShowProgress(
                    buildId,
                    nextBuildNumber,
                    dependencyIds
                );
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initializeBuildCards);
