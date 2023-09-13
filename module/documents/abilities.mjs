import { revisionItem } from "./item.mjs";

export class revisionAbilities extends revisionItem {


    getModifier()  {
        let sum = 0;
        const rollData = this.getRollData();
        for (key in this.system.roll.abilitiesModifiers.keys())
        {
            sum += this.system.roll.abilitiesModifiers[key].value * rollData[key].value;
        }
        sum += this.system.roll.staticModifiers.value();
        return sum;
    }
    
  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  async roll() {
    const item = this.data;

    // Initialize chat data.
    const speaker = ChatMessage.getSpeaker({ actor: this.actor });
    const rollMode = game.settings.get('core', 'rollMode');
    const label = `[${item.type}] ${item.name}`;

    // If there's no roll data, send a chat message.
    if (this.system.passive) {
      ChatMessage.create({
        speaker: speaker,
        rollMode: rollMode,
        flavor: label,
        content: item.data.description ?? ''
      });
    }
    // Otherwise, create a roll and send a chat message from it.
    else {
      // Retrieve roll data.
      const rollData = this.getRollData();
      // Invoke the roll and submit it to chat.
      const roll = new Roll("1d100 + @modifier", {modifier: this.getModifier() });
      // If you need to store the value first, uncomment the next line.
      roll.toMessage({
        speaker: speaker,
        rollMode: rollMode,
        flavor: label,
      });
      return roll;
    }
  }
}