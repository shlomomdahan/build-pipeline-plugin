// Store references to handlers to avoid duplicates
let pipelineClickHandler = null;
let consoleClickHandler = null;
let progressClickHandler = null;
let successRerunHandler = null;
let latestRerunHandler = null;
let triggerBuildHandler = null;
let triggerManualBuildLatestHandler = null;
let triggerManualBuildHandler = null;

// Common utilities
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

// Dialog handlers
const handleDialogClick = (dataContainer) => {
    const { fillDialogHref: href, fillDialogTitle: title } = dataContainer.dataset;
    buildPipeline.fillDialog(href, title);
};

// Rerun build handlers
const handleRerunClick = (dataContainer) => {
    const { id, buildExtId, dependencyIds } = parseDataAttributes(dataContainer);
    buildPipeline.showSpinner(id);
    buildPipeline.rerunBuild(id, buildExtId, dependencyIds);
};

// Trigger build handler
const handleTriggerBuild = (dataContainer) => {
    const { id, upstreamProjectName, upstreamBuildNumber, projectName, dependencyIds } = parseTriggerAttributes(dataContainer);
    buildPipeline.showSpinner(id);
    buildPipeline.triggerBuild(id, upstreamProjectName, upstreamBuildNumber, projectName, dependencyIds);
};

// Create delegated event handler
const createDelegatedHandler = (parentSelector, targetSelector, handlerFn, existingHandler) => {
    const parentElement = document.querySelector(parentSelector);
    if (!parentElement) {
        console.warn(`Parent element not found: ${parentSelector}`);
        return;
    }

    // Remove existing handler if it exists
    if (existingHandler) {
        parentElement.removeEventListener('click', existingHandler);
    }

    // Create new handler
    const newHandler = (event) => {
        const clickTarget = event.target.closest(targetSelector);
        if (!clickTarget) return;

        // All data containers follow the pattern: selector + '-params'
        const dataContainer = document.querySelector(targetSelector + '-params');
        if (!dataContainer) {
            console.warn('Data container not found');
            return;
        }

        handlerFn(dataContainer);
    };

    // Add the new handler
    parentElement.addEventListener('click', newHandler);
    return newHandler;
};

// Register behaviours
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
    ".bct-rerun-failed-latest-build-onclick", // Changed to match HTML class
    'BuildCardExtension_latestRerunClick',
    0,
    function() {
        latestRerunHandler = createDelegatedHandler(
            '.pipelines',
            '.bct-rerun-failed-latest-build-onclick', // Changed to match HTML class
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
        triggerBuildHandler = createDelegatedHandler(
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

//
// Behaviour.specify(".bct-progress-console-onclick", 'BuildCardExtension_progressBarClick', 0, function (element) {
//
//     const dataContainer = document.querySelector(".bct-progress-console-onclick-params");;
//     const href = dataContainer.dataset.fillDialogHref;
//     const title = dataContainer.dataset.fillDialogTitle;
//
//     element.addEventListener('click', () => {
//         buildPipeline.fillDialog(href, title);
//     });
// });
//
// Behaviour.specify(".bct-console-icon-onclick", 'BuildCardExtension_consoleIconClick', 0, function (element) {
//
//     const dataContainer = document.querySelector(".bct-console-icon-onclick-params");
//     const href = dataContainer.dataset.fillDialogHref;
//     const title = dataContainer.dataset.fillDialogTitle;
//
//     element.addEventListener('click', () => {
//         buildPipeline.fillDialog(href, title);
//     });
// });
//
// Behaviour.specify(".bct-rerun-success-icon-onclick", 'BuildCardExtension_successRerunClick', 0, function(element) {
//
//     const dataContainer = document.querySelector(".bct-rerun-success-icon-onclick-params");
//     const id = parseInt(dataContainer.dataset.showSpinnerId, 10);
//     const buildExtId = dataContainer.dataset.rerunBuildExtId;
//     const dependencyIds = dataContainer.dataset.rerunBuildDependencyIds
//         .split(',')
//         .filter(Boolean)
//         .map(id => parseInt(id, 10));
//
//     element.addEventListener('click', () => {
//         buildPipeline.showSpinner(id);
//         buildPipeline.rerunBuild(id, buildExtId, dependencyIds);
//     });
// });
//
// Behaviour.specify(".bct-rerun-latest-build-onclick", 'BuildCardExtension_latestRerunClick', 0, function(element) {
//
//     const dataContainer = document.querySelector(".bct-rerun-failed-latest-build-onclick-params");
//     const id = parseInt(dataContainer.dataset.showSpinnerId, 10);
//     const buildExtId = dataContainer.dataset.rerunBuildExtId;
//     const dependencyIds = dataContainer.dataset.rerunBuildDependencyIds
//         .split(',')
//         .filter(Boolean)
//         .map(id => parseInt(id, 10));
//
//     element.addEventListener('click', () => {
//         buildPipeline.showSpinner(id);
//         buildPipeline.rerunBuild(id, buildExtId, dependencyIds);
//     });
// });
//
// Behaviour.specify(".bct-rerun-failed-not-manual-build-onclick", 'BuildCardExtension_failedNotManualRerunClick', 0, function(element) {
//     const pipelineWrapper = document.querySelector('.pipelines');
//     if (!pipelineWrapper) {
//         console.warn('Pipeline not found');
//         return;
//     }
//
//     pipelineWrapper.addEventListener('click', function(event) {
//         console.log("Clicked on pipeline wrapper");
//         const clickTarget = event.target.closest('.bct-rerun-failed-not-manual-build-onclick');
//         if (!clickTarget) return;
//
//         const dataContainer = clickTarget.previousElementSibling;
//
//         const id = parseInt(dataContainer.dataset.showSpinnerId, 10);
//         console.log("ID:", id);
//         const buildExtId = dataContainer.dataset.rerunBuildExtId;
//         console.log("BuildExtId:", buildExtId);
//         const dependencyIds = dataContainer.dataset.rerunBuildDependencyIds
//             .split(',')
//             .filter(Boolean)
//             .map(id => parseInt(id, 10));
//         console.log("DependencyIds:", dependencyIds);
//
//         buildPipeline.showSpinner(id);
//         buildPipeline.rerunBuild(id, buildExtId, dependencyIds);
//     });
// });
//


// // Generic handler function for dialog-based clicks
// function createDialogClickHandler(paramsSelector, clickSelector, behaviourName) {
//     Behaviour.specify(clickSelector, behaviourName, 0, function(element) {
//         // Find the closest params container to this specific element
//         const dataContainer = element.closest('.build-card').querySelector(paramsSelector);
//         if (!dataContainer) return;
//
//         const href = dataContainer.dataset.fillDialogHref;
//         const title = dataContainer.dataset.fillDialogTitle;
//
//         element.addEventListener('click', () => {
//             buildPipeline.fillDialog(href, title);
//         });
//     });
// }
//
// // Generic handler function for rerun-based clicks
// function createRerunClickHandler(paramsSelector, clickSelector, behaviourName) {
//     Behaviour.specify(clickSelector, behaviourName, 0, function(element) {
//         // Find the closest params container to this specific element
//         const dataContainer = element.closest('.build-card').querySelector(paramsSelector);
//         if (!dataContainer) return;
//
//         const id = parseInt(dataContainer.dataset.showSpinnerId, 10);
//         const buildExtId = dataContainer.dataset.rerunBuildExtId;
//         const dependencyIds = dataContainer.dataset.rerunBuildDependencyIds
//             .split(',')
//             .filter(Boolean)
//             .map(id => parseInt(id, 10));
//
//         element.addEventListener('click', () => {
//             buildPipeline.showSpinner(id);
//             buildPipeline.rerunBuild(id, buildExtId, dependencyIds);
//         });
//     });
// }
//
// // Dialog-based handlers
// createDialogClickHandler(
//     '.bct-progress-console-onclick-params',
//     '.bct-progress-console-onclick',
//     'BuildCardExtension_progressBarClick'
// );
//
// createDialogClickHandler(
//     '.bct-console-icon-onclick-params',
//     '.bct-console-icon-onclick',
//     'BuildCardExtension_consoleIconClick'
// );
//
// // Rerun-based handlers
// createRerunClickHandler(
//     '.bct-rerun-success-icon-onclick-params',
//     '.bct-rerun-success-icon-onclick',
//     'BuildCardExtension_successRerunClick'
// );
//
// createRerunClickHandler(
//     '.bct-rerun-failed-latest-build-onclick-params',
//     '.bct-rerun-failed-latest-build-onclick',
//     'BuildCardExtension_latestRerunClick'
// );
//
// createRerunClickHandler(
//     '.bct-rerun-failed-not-manual-build-onclick-params',
//     '.bct-rerun-failed-not-manual-build-onclick',
//     'BuildCardExtension_failedNotManualRerunClick'
// );
