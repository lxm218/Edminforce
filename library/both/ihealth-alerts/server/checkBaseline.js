
function checkBaseline(dataObj) {
  let deviceInfo = _.pick(dataObj, 'deviceType', 'msg');

  let dataType = h.getDataTypeFromDeviceType(deviceInfo);

  console.log("dataType", dataType);
}