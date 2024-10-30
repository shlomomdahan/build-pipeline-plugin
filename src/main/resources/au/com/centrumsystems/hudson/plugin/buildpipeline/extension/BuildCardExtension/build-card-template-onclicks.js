let progressBarClickHandler = null;
let consoleIconClickHandler = null;
let successRerunHandler = null;
let latestFailedRerunHandler = null;
let manualFailedRerunHandler = null;
let failedRerunHandler = null;
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
    console.log('handleDialogClick', href, title);
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

        const buildCard = clickTarget.closest('.build-card');
        const dataContainer = buildCard.querySelector(targetSelector + '-params');

        handlerFn(dataContainer);
    };

    parentElement.addEventListener('click', newHandler);
    return newHandler;
};

Behaviour.specify(
    ".bct-progress-bar-onclick",
    'BuildCardExtension_progressBarClick',
    0,
    function() {
        progressBarClickHandler = createDelegatedHandler(
            '.pipelines',
            '.bct-progress-bar-onclick',
            handleDialogClick,
            progressBarClickHandler
        );
    }
);

Behaviour.specify(
    ".bct-console-icon-onclick",
    'BuildCardExtension_consoleIconClick',
    0,
    function() {
        consoleIconClickHandler = createDelegatedHandler(
            '.pipelines',
            '.bct-console-icon-onclick',
            handleDialogClick,
            consoleIconClickHandler
        );
    }
);

Behaviour.specify(
    ".bct-rerun-successful-build-onclick",
    'BuildCardExtension_successRerunClick',
    0,
    function() {
        successRerunHandler = createDelegatedHandler(
            '.pipelines',
            '.bct-rerun-successful-build-onclick',
            handleRerunClick,
            successRerunHandler
        );
    }
);

Behaviour.specify(
    ".bct-rerun-failed-latest-build-onclick",
    'BuildCardExtension_latestFailedRerunClick',
    0,
    function() {
        latestFailedRerunHandler = createDelegatedHandler(
            '.pipelines',
            '.bct-rerun-failed-latest-build-onclick',
            handleRerunClick,
            latestFailedRerunHandler
        );
    }
);

Behaviour.specify(
    ".bct-rerun-failed-manual-build-onclick",
    'BuildCardExtension_failedManualRerunClick',
    0,
    function() {
        manualFailedRerunHandler = createDelegatedHandler(
            '.pipelines',
            '.bct-rerun-failed-manual-build-onclick',
            handleTriggerBuild,
            manualFailedRerunHandler
        );
    }
);

Behaviour.specify(
    ".bct-rerun-failed-build-onclick",
    'BuildCardExtension_failedNotManualRerunClick',
    0,
    function() {
        failedRerunHandler = createDelegatedHandler(
            '.pipelines',
            '.bct-rerun-failed-build-onclick',
            handleRerunClick,
            failedRerunHandler
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
            triggerManualBuildLatestHandler
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

