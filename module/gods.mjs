import { registerHooks } from "./system/hooks.mjs";
import { registerSettings } from "./system/settings.mjs";

// Import document classes.
import { GodsActor } from "./documents/actor.mjs";
import { GodsCharacter } from "./documents/character.mjs";
import { GodsNpc } from "./documents/npc.mjs";
import { GodsCreature } from "./documents/creature.mjs";

import { GodsCharacterSheet } from "./sheets/character-sheet.mjs";
import { GodsNpcSheet } from "./sheets/npc-sheet.mjs";
import { GodsCreatureSheet } from "./sheets/creature-sheet.mjs";

import { GodsItem } from "./documents/item.mjs";
import { GodsItemSheet } from "./sheets/item-sheet.mjs";

import { GodsRoll } from "./system/roll.mjs";
import { GodsCombat } from "./system/fight.mjs";

// Import helper/utility classes and constants.
import { preloadHandlebarsTemplates, registerHandlebarsHelpers } from "./system/handlebars-manager.mjs";
import { GODS } from "./system/config.mjs";

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once('init', async function() {

  // Add utility classes to the global game object so that they're more easily
  // accessible in global contexts.
  game.gods = {
    GodsCharacter,
    GodsNpc,
    GodsCreature,
    GodsItem,
    GodsRoll,
    GodsCombat
  };

  // Add custom constants for configuration.
  CONFIG.GODS = GODS;

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d10 + @abilities.dex.mod",
    decimals: 2
  };

  // Define custom Document classes
  CONFIG.Actor.documentClass = GodsActor;
  CONFIG.Item.documentClass = GodsItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet('gods', GodsCharacterSheet, {
      types: ['character'],
      makeDefault: true,
    });

  Actors.registerSheet('gods', GodsNpcSheet, {
      types: ['npc'],
      makeDefault: true,
    });

  Actors.registerSheet('gods', GodsCreatureSheet, {
    types: ['creature'],
    makeDefault: true,
  }); // Register vehicle Sheet
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("gods", GodsItemSheet, { makeDefault: true });

  registerHandlebarsHelpers(); // Register Handlebars helpers
  registerHooks(); // register Hooks
  registerSettings(); // register Engrenages Settings

  // Preload Handlebars templates.
  return preloadHandlebarsTemplates();
});
