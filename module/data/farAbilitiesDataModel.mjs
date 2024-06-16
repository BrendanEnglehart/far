export class AbilitiesData extends foundry.abstract.DataModel {
    static defineSchema() {
        const fields = foundry.data.fields;
        return { 
            description:  new fields.HTMLField(),
            passive : new fields.BooleanField({
                initial: false,
                required: true
            }),
            roll: new fields.SchemaField({
                staticModifiers:  new fields.SchemaField({
                    value: new fields.NumberField({
                        initial: 0,
                        required: true,
                        integer: false
                    })}),
                dice: new fields.SchemaField({
                    value: new fields.NumberField({
                    required: false,
                    integer: false
                    })}),
                abilitiesModifiers: new fields.SchemaField({
                    
                }),
            }),
            damage: new fields.SchemaField({
                staticModifiers:  new fields.SchemaField({
                    value: new fields.NumberField({
                        initial: 0,
                        required: false,
                        integer: false
                    })}),
                dice: new fields.SchemaField({
                    value: new fields.NumberField({
                    required: false,
                    integer: false
                    })}),
                abilitiesModifiers: new fields.SchemaField({
                   
                }),
            }),
            defenseModifiers: new fields.SchemaField({
                
            }),
            factorsArmor: new fields.BooleanField({initial: false}),

        };
    }
  }