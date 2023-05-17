export const registerSettings = function () {
    game.settings.register("totem", "game-mode", {
        name: game.i18n.localize("TOTEM.WorldSettings.GameMode.Name"),
        hint: game.i18n.localize("TOTEM.WorldSettings.GameMode.Hint"),
        scope: "system",
        config: true,
        type: String,
        choices: {
        "1": "Survie",
        "2": "Cauchemar",
        "3": "Apocalypse"
        },
        default: 'e',
        onChange: value => {
        // console.log(value);
        }
    });
}  