export class WarningDialog extends Dialog {

    constructor(dialogData) {      
      let options = { classes: ["warning"] };
      let conf = {
        title: "Avertissement",
        content: dialogData.content      
      };
      super(conf, options);
      this.dialogData = dialogData;
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

  export class CombatResultDialog extends Dialog {

    constructor(dialogData, options) {      
      let options = { classes: ["combat", "result"], ...options };
      let conf = {
        title: "Résultat de la confrontation",
        content: dialogData.content      
      };
      super(conf, options);
      this.dialogData = dialogData;
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