export class FarClassData extends foundry.abstract.DataModel {
    static defineSchema() {
        const fields = foundry.data.fields;
        return { 
            description:  new fields.HTMLField(),
            health: new fields.NumberField({
                required: true,
                initial: 0,
                integer: true
            }),
            abilities: new fields.SchemaField({
                agility: new fields.SchemaField({
                    initial: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: true
                    }),
                    per: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: true
                    })
                }),
                culinary: new fields.SchemaField({
                    initial: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: true
                    }),
                    per: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: true
                    })
                }),
                deception: new fields.SchemaField({
                    initial: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: true
                    }),
                    per: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: true
                    })
                }),
                focus: new fields.SchemaField({
                    initial: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: true
                    }),
                    per: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: true
                    })
                }),
                handicraft: new fields.SchemaField({
                    initial: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: true
                    }),
                    per: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: true
                    })
                }),
                healing: new fields.SchemaField({
                    initial: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: true
                    }),
                    per: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: true
                    })
                }),
                influence: new fields.SchemaField({
                    initial: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: true
                    }),
                    per: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: true
                    })
                }),
                nature: new fields.SchemaField({
                    initial: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: true
                    }),
                    per: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: true
                    })
                }),
                perception: new fields.SchemaField({
                    initial: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: true
                    }),
                    per: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: true
                    })
                }),
                physique: new fields.SchemaField({
                    initial: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: true
                    }),
                    per: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: true
                    })
                }),
                skullduggery: new fields.SchemaField({
                    initial: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: true
                    }),
                    per: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: true
                    })
                }),
                spellcraft: new fields.SchemaField({
                    initial: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: true
                    }),
                    per: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: true
                    })
                }),
                stealth: new fields.SchemaField({
                    initial: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: true
                    }),
                    per: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: true
                    })
                }),
                survival: new fields.SchemaField({
                    initial: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: true
                    }),
                    per: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: true
                    })
                }),
                warcraft: new fields.SchemaField({
                    initial: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: true
                    }),
                    per: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: true
                    })
                }),
            }),
        

        };
    }
  }