
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
    roles: {
        type: Object,
        blackbox: true,
        optional: true
    },
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
    status : {
        optional: true,
        blackbox: true,
        type: Object
    },
};