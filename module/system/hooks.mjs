
export const registerHooks = function () {
    /**
     * Ready hook loads tables, and override's foundry's entity link functions to provide extension to pseudo entities
     */

    Hooks.once("ready", async () => {
        console.info("Gods | System Initialized.");
    });

    Hooks.on("renderPause", async function () {
        if ($("#pause").attr("class") !== "paused") return;
        $(".paused img").attr("src", 'systems/gods-system/assets/images/ui/gods_pause2.webp');
        // $(".paused img").css({ "opacity": 1, "height":"90px", "width":"250px", "left": "calc(50% - 125px)", "top":"0", "--fa-animation-duration":"60s"}); // pour la pause avec l'épée
        $(".paused img").css({ "opacity": 1});
        $("#pause.paused figcaption").text("");
    });

    // Hooks.on('renderChatLog', (log, html, data) => GodsFight.chatListeners(html));
    // Hooks.on('renderChatMessage', (message, html, data) => GodsFight.chatMessageHandler(message, html, data));

    /**
     * Create a macro when dropping an entity on the hotbar
     * Item      - open roll dialog for item
     * Actor     - open actor sheet
     * Journal   - open journal sheet
     */
    Hooks.on("hotbarDrop", async (bar, data, slot) => {
        // console.log(data.type);
        // Create item macro if rollable item - weapon, spell, prayer, trait, or skill

        return false;
    });

    Hooks.on('getSceneControlButtons', (controls) => {
        /*controls.find((c) => c.name === 'token').tools.push({
        name: 'Dice Roller',
        title: game.i18n.localize("GODS.RollTool"),
        icon: 'fas fa-dice-d6',
        button: true,
        onClick() {
            GodsRoll.ui();
        }
        });*/
    });

    /* -------------------------------------------- */
    /*  PreCreate Hooks                                */
    /* -------------------------------------------- */

    Hooks.on("preCreateActor", function (actor) {
        // console.log('pre create actor', actor);
        if (actor.img == "icons/svg/mystery-man.svg") {
        // actor.updateSource({"img": `systems/gods-system/icons/actors/${actor.type}.webp`});
        // item.updateSource({"img": `systems/gods-system/icons/competence.webp`});
        }
    });
    
    Hooks.on("preCreateItem", function (item) {
        if (item.img == "icons/svg/item-bag.svg") {
        item.updateSource({"img": `systems/gods-system/icons/items/${item.type}.webp`});
        // item.updateSource({"img": `systems/gods-system/icons/competence.webp`});
        }
    });
    
    /* -------------------------------------------- */
    /*  Combat Hooks                                */
    /* -------------------------------------------- */

    /*
    Hooks.on("createCombatant", function (combatant) {
    if (game.user.isGM) {
        let actor = combatant.actor;

        console.log('create combatant', actor);
    }
    });*/

    Hooks.on("updateCombat", function () {
        if (game.user.isGM) {
        let combatant = (game.combat.combatant) ? game.combat.combatant.actor : "";
    
        console.log('update combat', game.combat);
    
        /*if (combatant.type == "marker" && combatant.system.settings.general.isCounter == true) {
            let step = (!combatant.system.settings.general.counting) ? -1 : combatant.system.settings.general.counting;
            let newQuantity = combatant.system.pools.quantity.value + step;
            combatant.update({"system.pools.quantity.value": newQuantity});
        }*/
        }
    });

   /* Hooks.on("chatCommandsReady", function (chatCommands) {
        chatCommands.registerCommand(chatCommands.createCommandFromData({
          commandKey: "/dr",
          invokeOnCommand: (chatlog, messageText, chatdata) => {
            Roll.get().parse(messageText);
          },
          shouldDisplayToChat: false,
          iconClass: "fa-dice-d6",
          description: "Roll Gods check"
        }));
      });*/
  
    
}
