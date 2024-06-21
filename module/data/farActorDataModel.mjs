export class CharacterData extends foundry.abstract.DataModel {
    static defineSchema() {
        const fields = foundry.data.fields;
        return {
            biography: new fields.HTMLField(),
            health: new fields.SchemaField({
                value: new fields.NumberField({
                    required: true,
                    initial: 10,
                    integer: false
                }),
                min: new fields.NumberField({
                    required: true,
                    initial: 0,
                    integer: true
                }),
                max: new fields.NumberField({
                    required: true,
                    initial: 10,
                    integer: false
                })
            }),
            shield: new fields.SchemaField({
                value: new fields.NumberField({
                    required: true,
                    initial: 0,
                    integer: false
                }),
                min: new fields.NumberField({
                    required: true,
                    initial: 0,
                    integer: true
                }),
            }),
            attributes: new fields.SchemaField({
                class: new fields.SchemaField({
                    class: new fields.StringField({
                        required: true,
                        initial: null,
                        nullable: true
                    })
                }),
                race: new fields.StringField({
                    required: true,
                    initial: null,
                    nullable: true
                }),
                level: new fields.SchemaField({
                    level: new fields.NumberField({
                        required: true,
                        initial: 1,
                        integer: true
                    }),
                }),
                optionals: new fields.SchemaField({
                }),
            }),
            abilities: new fields.SchemaField({
                agility: new fields.SchemaField({
                    value: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: false
                    })
                }),
                culinary: new fields.SchemaField({
                    value: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: false
                    })
                }),
                deception: new fields.SchemaField({
                    value: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: false
                    })
                }),
                focus: new fields.SchemaField({
                    value: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: false
                    })
                }),
                handicraft: new fields.SchemaField({
                    value: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: false
                    })
                }),
                healing: new fields.SchemaField({
                    value: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: false
                    })
                }),
                influence: new fields.SchemaField({
                    value: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: false
                    })
                }),
                nature: new fields.SchemaField({
                    value: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: false
                    })
                }),
                perception: new fields.SchemaField({
                    value: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: false
                    })
                }),
                physique: new fields.SchemaField({
                    value: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: false
                    })
                }),
                skullduggery: new fields.SchemaField({
                    value: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: false
                    })
                }),
                spellcraft: new fields.SchemaField({
                    value: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: false
                    })
                }),
                stealth: new fields.SchemaField({
                    value: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: false
                    })
                }),
                survival: new fields.SchemaField({
                    value: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: false
                    })
                }),
                warcraft: new fields.SchemaField({
                    value: new fields.NumberField({
                        required: true,
                        initial: 0,
                        integer: false
                    })
                }),


            })
        };
    }
}
