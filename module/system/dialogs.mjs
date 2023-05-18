
  export class CombatResultDialog extends Dialog {

    constructor(dialogData, options) {      
      /*let options = { classes: ["combat", "result"], ...options };
      let conf = {
        title: "Résultat de la confrontation",
        content: dialogData.content      
      };
      super(conf, options);
      this.dialogData = dialogData;*/
    }
    
    /* -------------------------------------------- */
    activateListeners(html) {
      /*super.activateListeners(html);
      this.html = html;
      this.setEphemere(this.dialogData.signe.system.ephemere);
      html.find(".signe-aleatoire").click(event => this.setSigneAleatoire());
      html.find("[name='signe.system.ephemere']").change((event) => this.setEphemere(event.currentTarget.checked));
      html.find(".signe-xp-sort").change((event) => this.onValeurXpSort(event));
      html.find("input.select-actor").change((event) => this.onSelectActor(event));
      html.find("input.select-tmr").change((event) => this.onSelectTmr(event));*/
    }
  
  
    async onSelectActor(event) {
      /*const actorId = this.html.find(event.currentTarget)?.data("actor-id");
      const actor = this.dialogData.actors.find(it => it.id == actorId);
      if (actor) {
        actor.selected = event.currentTarget.checked;
      }*/
    }
  
  
  }

  export const getRollBox = async function(data) {
    let html = await renderTemplate('systems/totem/templates/roll.hbs', data);
    let ui = new Dialog({
      title: game.i18n.localize("TOTEM.roll_tool"),
      content: html,
      buttons: {
        roll: {
          label: game.i18n.localize('TOTEM.roll_dice'),
          callback: (html) => {
            let form = html.find('#dice-pool-form');
            if (!form[0].checkValidity()) {
              throw "Invalid Data";
            }
            let formData = {};
            form.serializeArray().map(item => {
              formData[item.name] = item.value;
            });
            console.log("roll form data", formData);
            let NoD = parseInt(formData.ability,10);
            let Reroll = 0;
            // maîtrise bonus
            if (formData.skill > 0 && formData.skill < 3){
              NoD += 1;
            } else if (formData.skill > 2 && formData.skill < 5){  
              NoD += 2;
            } else if (formData.skill > 4){    
              NoD += 3;
            }
            // maîtrise relance
            if (formData.skill > 1 && formData.skill < 4){
              Reroll += 1;
            } else if (formData.skill > 3){    
              Reroll += 2;
            }
            // réserves
            if (formData.self_control > 0){
              NoD += parseInt(formData.self_control,10);
            } 
            if (formData.group > 0){
              NoD += parseInt(formData.group,10);
            } 
            // checks
            if (formData.usingSpecialization !== undefined && formData.usingSpecialization == 1){
              NoD += 1;
            }
            if (formData.usingTools !== undefined && formData.usingTools == 1){
              NoD += 1;
            }
            if (formData.helped !== undefined && formData.helped == 1){
              NoD += 1;
            }
            return game.totem.TotemRoll.roll(data.actorId, data.label, NoD, Reroll, data);
          }
        },
        close: {
          label: game.i18n.localize('Close'),
          callback: () => { }
        }
      },
      render: function (h) {
        h.find("#skills-radio input").change(function () {
          let s = $(this).attr("data-skill");
          h.find(".trait-list .hidden").removeClass("show");
          let f = h.find(".trait-list ." + s);
          f.addClass("show");
          if (f.length == 0) {
            h.find(".use-trait input").attr("disabled", "disabled").prop("checked", false);
          } else
            h.find(".use-trait input").attr("disabled", null);
        });
      }
    });
    ui.render(true);
  }  