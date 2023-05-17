import { registerHooks } from "./system/hooks.mjs";
import { registerSettings } from "./system/settings.mjs";

// Import document classes.
import { TotemActor } from "./documents/actor.mjs";
import { TotemCharacter } from "./documents/character.mjs";
import { TotemNpc } from "./documents/npc.mjs";
import { TotemCreature } from "./documents/creature.mjs";

import { TotemCharacterSheet } from "./sheets/character-sheet.mjs";
import { TotemNpcSheet } from "./sheets/npc-sheet.mjs";
import { TotemCreatureSheet } from "./sheets/creature-sheet.mjs";

import { TotemItem } from "./documents/item.mjs";
import { TotemItemSheet } from "./sheets/item-sheet.mjs";

import { TotemRoll } from "./system/roll.mjs";
import { TotemCombat } from "./system/fight.mjs";

// Import helper/utility classes and constants.
import { preloadHandlebarsTemplates, registerHandlebarsHelpers } from "./system/handlebars-manager.mjs";
import { TOTEM } from "./system/config.mjs";

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once('init', async function() {

  // Add utility classes to the global game object so that they're more easily
  // accessible in global contexts.
  game.totem = {
    TotemCharacter,
    TotemNpc,
    TotemCreature,
    TotemItem,
    TotemRoll,
    TotemCombat
  };

  // Add custom constants for configuration.
  CONFIG.TOTEM = TOTEM;

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d10 + @abilities.dex.mod",
    decimals: 2
  };

  // Define custom Document classes
  CONFIG.Actor.documentClass = TotemActor;
  CONFIG.Item.documentClass = TotemItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet('totem', TotemCharacterSheet, {
      types: ['character'],
      makeDefault: true,
    });

  Actors.registerSheet('totem', TotemNpcSheet, {
      types: ['npc'],
      makeDefault: true,
    });

  Actors.registerSheet('totem', TotemCreatureSheet, {
    types: ['creature'],
    makeDefault: true,
  }); // Register vehicle Sheet
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("totem", TotemItemSheet, { makeDefault: true });

  registerHandlebarsHelpers(); // Register Handlebars helpers
  registerHooks(); // register Hooks
  registerSettings(); // register Engrenages Settings

  // Preload Handlebars templates.
  return preloadHandlebarsTemplates();
});
