import { TOTEM } from './config.mjs'
/**
 * renvoie le score d'une compétence d'un actor existant
 * @param {TotemActor} 
 * @return {number||null}                   Data for rendering or null
 */
export function getActorSkillScore(actor, skillLabel, property = "value") {
  let returnedValue = null;

  for(let i in actor.system.skills){
    for(let j in actor.system.skills[i].data){
      if (actor.system.skills[i].data[j].label == skillLabel){
        returnedValue = actor.system.skills[i].data[j][property];  
      }
    }
  }
  if (returnedValue == null){
    for(let i in actor.system.cskills.data){
      if (actor.system.cskills.data[i].label == skillLabel){
        returnedValue = actor.system.cskills.data[i][property];  
      }
    }  
  }

  return returnedValue;
}

/**
 * renvoie le type d'une compétence 
 * @param {TotemActor} 
 * @return {string||null}                   Data for rendering or null
 */
export function getSkillTypeFromLabel(skillLabel) {
  let returnedValue = null;

  for(let i in TOTEM.skills){
    for(let j in TOTEM.skills[i].data){
      if (TOTEM.skills[i].data[j].label == skillLabel){
        returnedValue = j;  
      }
    }
  }

  return returnedValue;
}

/**
 * met à jour le score d'une compétence d'un actor existant
 * @param {TotemActor} 
 * @return {boolean}                   bool 
 */
export function updateActorSkillScore(selectedActor, skillLabel, property = "value", updatedValue) {
  try {
    let updated = false; 
    // on recherche le label parmi les compétences
    for (let st in selectedActor.system.skills){
      for (let s in selectedActor.system.skills[st].data){
        if (selectedActor.system.skills[st].data[s].label == skillLabel){
          selectedActor.system.skills[st].data[s][property] = updatedValue; // printing the new value
          const systemSkillKey = `system.skills.${st}.data.${s}.${property}`;
          selectedActor.update({[systemSkillKey]:updatedValue }); // updating actor's data
          updated = true;
        }
      }
    }

    if (updated == false){
      for (let s in selectedActor.system.cskills.data){
          if (selectedActor.system.cskills.data[s].label == skillLabel){
            selectedActor.system.cskills.data[s][property] = updatedValue; // printing the new value
            const systemSkillKey = `system.cskills.data.${s}.${property}`;
            selectedActor.update({[systemSkillKey]:updatedValue }); // updating actor's data
            updated = true;
          }
      } 
    }

    return updated;
  } catch(e){
    return false;
  }
}


/**
 * réinitialise toutes les dépenses d'usure
 * @param {TotemActor} 
 * @return {boolean}                   bool 
 */
export function resetActorSkillUsure(selectedActor) {
  try {
    // on recherche les usures des compétences
    for (let st in selectedActor.system.skills){
      for (let s in selectedActor.system.skills[st].data){
        const systemSkillKey = `system.skills.${st}.data.${s}.spent`;
        selectedActor.update({[systemSkillKey]:0 }); // updating actor's data
      }
    }

    // on recherche les usures des compétences céphaliques
    for (let s in selectedActor.system.cskills.data){
      const systemSkillKey = `system.cskills.data.${s}.spent`;
      selectedActor.update({[systemSkillKey]:0 }); // updating actor's data
    }
    return true;
  } catch(e){
    return false;
  }
}
