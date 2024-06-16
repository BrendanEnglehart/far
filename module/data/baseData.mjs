export class BaseDataModel extends foundry.abstract.DataModel {
    static defineSchema() {
        const fields = foundry.data.fields;
        return {
            name: new fields.HTMLField(),
            img: new fields.StringField(),
            
        }
    }
}