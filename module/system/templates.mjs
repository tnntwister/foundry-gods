/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
 export const preloadHandlebarsTemplates = async function() {
  return loadTemplates([

    // Actor partials.
    "systems/totem/templates/actor/parts/actor-traits.html",
    "systems/totem/templates/actor/parts/actor-background.html",
    "systems/totem/templates/actor/parts/actor-skills.html",
    "systems/totem/templates/actor/parts/actor-items.html",
    "systems/totem/templates/actor/parts/actor-cephalie.html",
    "systems/totem/templates/actor/parts/actor-effects.html",
  ]);
};
