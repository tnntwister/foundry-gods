export const registerHandlebarsHelpers = function () {
    Handlebars.registerHelper('concat', (...args) => args.slice(0, -1).join(''));
    Handlebars.registerHelper('lower', e => e.toLocaleLowerCase());
  
    Handlebars.registerHelper('toLowerCase', function(str) {
        return str.toLowerCase();
    });
  
    // Ifis not equal
    Handlebars.registerHelper('ifne', function (v1, v2, options) {
      if (v1 !== v2) return options.fn(this);
      else return options.inverse(this);
    });
  
    // if equal
    Handlebars.registerHelper('ife', function (v1, v2, options) {
      if (v1 === v2) return options.fn(this);
      else return options.inverse(this);
    });
    // if equal
    Handlebars.registerHelper('ifgt', function (v1, v2, options) {
      if (v1 > v2) return options.fn(this);
      else return options.inverse(this);
    });
}