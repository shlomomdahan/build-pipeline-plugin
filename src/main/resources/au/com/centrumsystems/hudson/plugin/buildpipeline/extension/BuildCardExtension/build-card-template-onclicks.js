let pipelineClickHandler = null;
let consoleClickHandler = null;
let progressClickHandler = null;
let successRerunHandler = null;
let latestRerunHandler = null;
let triggerBuildHandler = null;
let triggerManualBuildLatestHandler = null;
let triggerManualBuildHandler = null;

const parseDataAttributes = (container) => ({
    id: parseInt(container.dataset.showSpinnerId, 10),
    buildExtId: container.dataset.rerunBuildExtId,
    dependencyIds: container.dataset.rerunBuildDependencyIds
        .split(',')
        .filter(Boolean)
        .map(id => parseInt(id, 10))
});

const parseTriggerAttributes = (container) => ({
    id: parseInt(container.dataset.showSpinnerId, 10),
    upstreamProjectName: container.dataset.upstreamProjectName,
    upstreamBuildNumber: parseInt(container.dataset.upstreamBuildNumber, 10),
    projectName: container.dataset.projectName,
    dependencyIds: container.dataset.dependencyIds
        .split(',')
        .filter(Boolean)
        .map(id => parseInt(id, 10))
});

const handleDialogClick = (dataContainer) => {
    const { fillDialogHref: href, fillDialogTitle: title } = dataContainer.dataset;
    buildPipeline.fillDialog(href, title);
};

const handleRerunClick = (dataContainer) => {
    const { id, buildExtId, dependencyIds } = parseDataAttributes(dataContainer);
    buildPipeline.showSpinner(id);
    buildPipeline.rerunBuild(id, buildExtId, dependencyIds);
};

const handleTriggerBuild = (dataContainer) => {
    const { id, upstreamProjectName, upstreamBuildNumber, projectName, dependencyIds } = parseTriggerAttributes(dataContainer);
    buildPipeline.showSpinner(id);
    buildPipeline.triggerBuild(id, upstreamProjectName, upstreamBuildNumber, projectName, dependencyIds);
};

const createDelegatedHandler = (parentSelector, targetSelector, handlerFn, existingHandler) => {

    const parentElement = document.querySelector(parentSelector);

    if (existingHandler) {
        parentElement.removeEventListener('click', existingHandler);
    }

    const newHandler = (event) => {
        const clickTarget = event.target.closest(targetSelector);
        if (!clickTarget) return;

        const dataContainer = document.querySelector(targetSelector + '-params');
        handlerFn(dataContainer);
    };

    parentElement.addEventListener('click', newHandler);
    return newHandler;
};

Behaviour.specify(
    ".bct-progress-console-onclick",
    'BuildCardExtension_progressBarClick',
    0,
    function() {
        progressClickHandler = createDelegatedHandler(
            '.pipelines',
            '.bct-progress-console-onclick',
            handleDialogClick,
            progressClickHandler
        );
    }
);

Behaviour.specify(
    ".bct-console-icon-onclick",
    'BuildCardExtension_consoleIconClick',
    0,
    function() {
        consoleClickHandler = createDelegatedHandler(
            '.pipelines',
            '.bct-console-icon-onclick',
            handleDialogClick,
            consoleClickHandler
        );
    }
);

Behaviour.specify(
    ".bct-rerun-success-icon-onclick",
    'BuildCardExtension_successRerunClick',
    0,
    function() {
        successRerunHandler = createDelegatedHandler(
            '.pipelines',
            '.bct-rerun-success-icon-onclick',
            handleRerunClick,
            successRerunHandler
        );
    }
);

Behaviour.specify(
    ".bct-rerun-failed-latest-build-onclick",
    'BuildCardExtension_latestRerunClick',
    0,
    function() {
        latestRerunHandler = createDelegatedHandler(
            '.pipelines',
            '.bct-rerun-failed-latest-build-onclick',
            handleRerunClick,
            latestRerunHandler
        );
    }
);

Behaviour.specify(
    ".bct-rerun-failed-not-manual-build-onclick",
    'BuildCardExtension_failedNotManualRerunClick',
    0,
    function() {
        pipelineClickHandler = createDelegatedHandler(
            '.pipelines',
            '.bct-rerun-failed-not-manual-build-onclick',
            handleRerunClick,
            pipelineClickHandler
        );
    }
);

Behaviour.specify(
    ".bct-trigger-manual-build-latest-onclick",
    'BuildCardExtension_triggerBuildClick',
    0,
    function() {
        triggerManualBuildLatestHandler = createDelegatedHandler(
            '.pipelines',
            '.bct-trigger-manual-build-latest-onclick',
            handleTriggerBuild,
            triggerBuildHandler
        );
    }
);

Behaviour.specify(
    ".bct-trigger-manual-build-onclick",
    'BuildCardExtension_triggerManualBuildClick',
    0,
    function() {
        triggerManualBuildHandler = createDelegatedHandler(
            '.pipelines',
            '.bct-trigger-manual-build-onclick',
            handleTriggerBuild,
            triggerManualBuildHandler
        );
    }
);

