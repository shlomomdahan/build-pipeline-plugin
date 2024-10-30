Handlebars.registerHelper('startScript', function() {
    return new Handlebars.SafeString("<scr" + "ipt>");
});

Handlebars.registerHelper('endScript', function() {
    return new Handlebars.SafeString("</scr" + "ipt>");
});
