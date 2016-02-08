
h.getBGZone = function(glucose, beforeMeal) {
  let cond = beforeMeal
    ? [100,126]
    : [140,200]

  if (glucose < cond[0])
    return 0
  else if (glucose < cond[1])
    return 1
  else
    return 2
}

h.getBGZoneName = function(score) {
  return ["Normal","High","Very High"][score]
}

h.getBGColor = function(bgVal) {
  const zone = h.getBGZone(bgVal.BG, bgVal.beforeMeal)
  const options = ["green","yellow","red"]
  return IH.Device.Color[options[zone]]
}

h.getBGTitle = function(mealType, beforeMeal) {
  if (_.contains(["Random","Bedtime"], mealType))
    return mealType
  return `${beforeMeal ? "After" : "Before"} ${mealType}`
}
