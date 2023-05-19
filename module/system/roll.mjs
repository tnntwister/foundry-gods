export class TotemRoll {

    static roll(actorId, label, NoD, Reroll = 0, params = {}){        
        const actor = game.actors.get(actorId);
        let formula = '' + (parseInt(NoD,10) + parseInt(Reroll,10)) + "d10";
        if (Reroll > 0 && params.difficulty != undefined){
          formula += 'kh' + (parseInt(NoD,10) -1);
        }
        formula += (params.difficulty != undefined) ? "cs>" + params.difficulty : "cs>7";
        let roll = new Roll(formula, actor.getRollData());
        roll.toMessage({
          speaker: ChatMessage.getSpeaker({ actor: actor }),
          flavor: label,
          rollMode: game.settings.get('core', 'rollMode'),
        });
        return roll;
    } 

}



