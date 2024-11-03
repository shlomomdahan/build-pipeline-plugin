const buildCardTemplateSource = jQuery("#build-card-template").html();
const projectCardTemplateSource = jQuery("#project-card-template").html();
const refreshFrequency = parseInt(document.querySelector(".pipeline-refresh-frequency").dataset.refreshFrequency, 10);

var buildPipeline = new BuildPipeline(
buildPipelineViewProxy,
Handlebars.compile(buildCardTemplateSource),
Handlebars.compile(projectCardTemplateSource),
refreshFrequency
);


function initializeBuildCards() {
    // Find all build data elements
    document.querySelectorAll('.build-data').forEach(buildElement => {

        const buildId = buildElement.dataset.buildId;
        const buildData = JSON.parse(buildElement.dataset.buildInfo);
        const buildStatus = buildElement.dataset.buildStatus;
        const isManualTrigger = buildElement.dataset.isManualTrigger === 'true';
        const nextBuildNumber = parseInt(buildElement.dataset.nextBuildNumber, 10);
        console.log(nextBuildNumber);
        const dependencyIds = buildElement.dataset.dependencyIds
            .split(',')
            .filter(Boolean)
            .map(id => parseInt(id, 10));


        // Generate build card
        jQuery(buildElement).append(buildPipeline.buildCardTemplate(buildData));

        // add build proxy to proxies for future use-->
        buildPipeline.buildProxies[buildId] = window[`buildProxy_${buildId}`];

        if (buildStatus === 'BUILDING') {
            buildPipeline.showProgress(buildId, dependencyIds, nextBuildNumber);
        }

        if (buildStatus === 'PENDING') {
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
        }

    });
}

document.addEventListener('DOMContentLoaded', initializeBuildCards);