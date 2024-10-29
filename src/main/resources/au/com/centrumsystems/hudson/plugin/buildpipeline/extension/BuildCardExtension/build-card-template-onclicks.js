Behaviour.specify(".bct-progress-console-onclick", 'BuildCardExtension_progressBarClick', 0, function (element) {

    const dataContainer = document.querySelector(".bct-progress-console-onclick-params");;
    const href = dataContainer.dataset.fillDialogHref;
    const title = dataContainer.dataset.fillDialogTitle;

    element.addEventListener('click', () => {
        buildPipeline.fillDialog(href, title);
    });
});

Behaviour.specify(".bct-console-icon-onclick", 'BuildCardExtension_consoleIconClick', 0, function (element) {

    const dataContainer = document.querySelector(".bct-console-icon-onclick-params");
    const href = dataContainer.dataset.fillDialogHref;
    const title = dataContainer.dataset.fillDialogTitle;

    element.addEventListener('click', () => {
        buildPipeline.fillDialog(href, title);
    });
});

Behaviour.specify(".bct-rerun-success-icon-onclick", 'BuildCardExtension_successRerunClick', 0, function(element) {

    const dataContainer = document.querySelector(".bct-rerun-success-icon-onclick-params");
    const id = parseInt(dataContainer.dataset.showSpinnerId, 10);
    const buildExtId = dataContainer.dataset.rerunBuildExtId;
    const dependencyIds = dataContainer.dataset.rerunBuildDependencyIds
        .split(',')
        .filter(Boolean)
        .map(id => parseInt(id, 10));

    element.addEventListener('click', () => {
        buildPipeline.showSpinner(id);
        buildPipeline.rerunBuild(id, buildExtId, dependencyIds);
    });
});


