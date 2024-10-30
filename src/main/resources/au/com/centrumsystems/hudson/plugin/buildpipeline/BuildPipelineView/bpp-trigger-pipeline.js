Behaviour.specify(".bpp-trigger-pipeline-parameterized", 'BuildPipelineView.TriggerPipelineParameterized', 0, function(element) {
    element.addEventListener('click', function() {
        const paramsElement = document.querySelector('.bpp-trigger-pipeline-parameterized-params');
        const href = paramsElement.dataset.fillDialogHref;
        const title = paramsElement.dataset.fillDialogTitle;
        buildPipeline.fillDialog(href, title);
    });
});

Behaviour.specify(".bpp-trigger-pipeline-button", 'BuildPipelineView.TriggerPipeline', 0, function(element) {
    element.addEventListener('click', function(e) {
        document.getElementById('triggerPipelineForm').submit();
    });
});
