import {Collections} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Tracker} from 'meteor/tracker';
import {DefaultRoutes} from 'meteor/ihealth:utils'
import {RC} from 'meteor/ihealth:framework-mobile';

export default {
    Meteor,
    FlowRouter,
    Collections,
    Tracker,
    LocalState: new ReactiveDict(),
    RC,
    DefaultRoutes
}