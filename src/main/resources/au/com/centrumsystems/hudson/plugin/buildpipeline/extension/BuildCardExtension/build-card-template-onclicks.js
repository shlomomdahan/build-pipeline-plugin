Behaviour.specify(".progress-console-onclick", 'progress-bar-click', 0, function (progressBarElement) {

    const dataContainer = document.querySelector(".fill-dialog-data-container");
    const href = dataContainer.dataset.fillDialogHref;
    const title = dataContainer.dataset.fillDialogTitle;

    progressBarElement.addEventListener('click', () => {
        buildPipeline.fillDialog(href, title);
    });
});