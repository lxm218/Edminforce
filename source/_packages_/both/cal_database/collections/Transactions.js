/**
 * Created by Jeffreyfan on 11/5/15.
 */

DB.Transactions = new Mongo.Collection('transactions');

/*
 不同的任务字段不一样  暂不定义 schema

 {

  status:

  type: 'add_class_to_cart'

  class

  swimmer

  cartId


 }


 {

  type: 'remove_class_from_cart'




 }





 */