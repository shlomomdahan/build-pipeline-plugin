window.addEventListener("DOMContentLoaded", () => {
    const projectDataHolders = document.querySelectorAll(".ch-project-data-holder");

    projectDataHolders.forEach(dataHolder => {
        const { projectId, proxyName, projectJson } = dataHolder.dataset;

        buildPipeline.projectProxies[projectId] = window[proxyName];

        const projectElement = document.getElementById("project-" + projectId);
        const projectData = JSON.parse(projectJson);
        projectElement.innerHTML = buildPipeline.projectCardTemplate(projectData);
    });
});
