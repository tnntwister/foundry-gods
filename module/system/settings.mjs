export const registerSettings = function () {
    game.settings.register("gods-system", "game-mode", {
        name: game.i18n.localize("GODS.WorldSettings.GameMode.Name"),
        hint: game.i18n.localize("GODS.WorldSettings.GameMode.Hint"),
        scope: "system",
        config: true,
        type: String,
        choices: {
        "1": game.i18n.localize("GAME_MODES.heroic"),
        "2": game.i18n.localize("GAME_MODES.epic"),
        "3": game.i18n.localize("GAME_MODES.legendary")
        },
        default: 'e',
        onChange: value => {
        // console.log(value);
        }
    });
}  