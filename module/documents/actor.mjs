/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class revisionActor extends Actor {
/**
  @type {t0|null}
 */
  _t0class;
  get t0class() { 
     if (this._t0class !== undefined) return this._t0class;
     return null;
  }

  showClassList(){
    ret = []
    if (this.t0class !== null) {
      ret.push(this._t0class.name)
    }
  }

  changet0class(classObj) { 
    if (classObj.type !== "t0"){
    return;
    }
    if (this.t0class !== null){return;} // We need to implement this but for now we'll just return and not change anything 
    this._t0class = classObj;
    this.t0classDataUpdate()
    this.updateMaxHealth()
    return;

  }

  t0classDataUpdate(){

    if (this._t0class === undefined){

    for (let item of this.items)
    if (item.type == "t0")
    {
      this._t0class = item;
    }
    }
    if (this._t0class !== undefined){
    
    
    const data = this.system;
    for (let item of this.items) 
    {
      if (item.type == "t0" && item._id != this._t0class._id)
      {
        item.delete()
      }
    }

    const stats = this._t0class.system.modifiers;
    

    data.abilities.strength.value   +=    stats.strength.initial;
    data.abilities.dexterity.value  +=    stats.dexterity.initial;
    data.abilities.focus.value      +=    stats.focus.initial;
    data.abilities.endurance.value  +=    stats.endurance.initial;
    data.abilities.presence.value   +=    stats.presence.initial;
    //data.abilities.charm.value      +=    stats.charm.initial;
    data.abilities.knowledge.value  +=    stats.knowledge.initial;
    data.abilities.wisdom.value     +=    stats.wisdom.initial;
    }
    else {
      console.log("No t0 Class for Actor")
    }
  }


  /** @override */
  prepareData() {
    // Prepare data for the actor. Calling the super version of this executes
    // the following, in order: data reset (to clear active effects),
    // prepareBaseData(), prepareEmbeddedDocuments() (including active effects),
    // prepareDerivedData().
    super.prepareData();
  }

  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing embedded
    // documents or derived data.
  }

  /**
   * @override
   * Augment the basic actor data with additional dynamic data. Typically,
   * you'll want to handle most of your calculated/derived data in this step.
   * Data calculated in this step should generally not exist in template.json
   * (such as ability modifiers rather than ability scores) and should be
   * available both inside and outside of character sheets (such as if an actor
   * is queried and has a roll executed directly from it).
   */
  prepareDerivedData() {

    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.
    this._prepareCharacterData();
    



  }

  updateMaxHealth() {
    const data = this.system;
    data.health.max =  data.abilities.endurance.value + (.1 * data.abilities.presence.value) + (.25 * data.abilities.strength.value);
  }

  /**
   * Prepare Character type specific data
   */
  _prepareCharacterData(actorData) {
    //if (actorData.type !== 'character') return;

    // Make modifications to data here. For example:
    const data = this.system;
    this.t0classDataUpdate()
    this.updateMaxHealth()
  }

  /**
   * Override getRollData() that's supplied to rolls.
   */
  getRollData() {
    const data = super.getRollData();

    // Prepare character roll data.
    this._getCharacterRollData(data);

    return data;
  }

  /**
   * Prepare character roll data.
   */
  _getCharacterRollData(data) {
    if (this.data.type !== 'character') return;
    // Copy the ability scores to the top level, so that rolls can use
    // formulas like `@str.mod + 4`.
    if (data.abilities) {
      for (let [k, v] of Object.entries(data.abilities)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }
    // Add level for easier access, or fall back to 0.
    if (data.attributes.level) {
      data.lvl = data.attributes.level.value ?? 0;
    }
  }

}
