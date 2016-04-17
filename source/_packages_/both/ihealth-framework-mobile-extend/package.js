

/*
*
* 由于ihealth 通过submodule引入不可更改 此package用于扩展ihealth缺少或不完善的组件
*
* 使用了 RC 命名空间 和 ihealth一致 组件和业务不相关
*
* */

Package.describe({
  name: "ihealth:framework-mobile-extend",
  summary: "Mobile Framework extend.",
  version: "0.0.1",
  git: ""
})

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.1")

  /**
   * @ @ @ @
   * Use & Imply
   * @ @ @ @
   */
  api.use([
    "react",
    "ihealth:utils",
    "ihealth:framework-engine",
    "ihealth:framework-mobile",
    'less@2.5.1'  //todo delete

  ], ["client","server"])

  api.imply([
    "react",
    "ihealth:utils",
  ], ["client","server"])

  /**
   * @ @ @ @
   * Add Files
   * @ @ @ @
   */
  api.addFiles([

    "RC/Portal/Portal.jsx",


    // calendar
    "RC/Calendar/Calendar.jsx",
    "RC/Calendar/Calendar.less",

  ], "client")

})
