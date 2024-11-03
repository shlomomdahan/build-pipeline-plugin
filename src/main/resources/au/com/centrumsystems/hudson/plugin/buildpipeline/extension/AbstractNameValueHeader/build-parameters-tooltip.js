document.addEventListener('DOMContentLoaded', function() {
    const buildId = document.querySelector('.build-parameters-trigger-id').dataset.buildId;
    jQuery('#build-parameters-trigger-' + buildId).tooltip({
        bodyHandler: function() {
            return jQuery('#build-parameters-' + buildId).html();
        },
    });
});
