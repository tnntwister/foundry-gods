export class TotemRoll {


    static roll(actorId, label, NoD, Mod, params = {}){        
        const actor = game.actors.get(actorId);
        let roll = new Roll(NoD + "d10+"+ Mod, actor.getRollData());
        roll.toMessage({
          speaker: ChatMessage.getSpeaker({ actor: actor }),
          flavor: label,
          rollMode: game.settings.get('core', 'rollMode'),
        });
        return roll;
    } 

}



