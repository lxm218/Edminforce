
let UserProfileSchema = {
    nickName : KG.schema.default(),
    email : KG.schema.default({
        regEx: SimpleSchema.RegEx.Email,
        optional : true
    }),
    title : KG.schema.default({
        optional : true
    }),
    group : KG.schema.default(),
    phone : KG.schema.default({
        optional : true
    })
};

let Base = KG.getClass('Base');
let AdminUser = class extends Base{
    defineDBSchema(){
        return {
            userID : {
                type : String
            },
            password : {
                type : String
            },
            userProfile : KG.schema.default({
                type : UserProfileSchema
            })
        };

    }
};

KG.define('EF-AdminUser', Base);