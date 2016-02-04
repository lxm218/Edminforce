
Schema = {};

Schema.Account = {
    createdAt: KG.schema.createTime(),
    updatedAt: KG.schema.updateTime(),
    username: {
        type: String,
        optional: true
    },
    emails: {
        type: [Object],
        optional: true
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        optional: true
    },
    "emails.$.verified": {
        type: Boolean,
        optional: true
    },
    role : KG.schema.default({
        //defaultValue : 'admin',
        allowedValues : ['admin', 'user']
    }),
    profile: {
        type: Object,
        optional: true,
        blackbox: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    status : KG.schema.default({
        allowedValues : ['active', 'disable'],
        defaultValue : 'active'
    })
};