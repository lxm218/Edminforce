
IH.Device.Color = {
  // Zone Colors
  green: "#69d356",
  "green-saturated": "#80fc2d",

  yellow: "#f5d141",
  orange: "#e89544",
  red: "#e94025",
  danger: "#ec1700",

  // Device Colors
  none: "#141414",

  BG: "#4ab7e7", BGDarker: "#42a4cf", onBG: "#FFF",
  BGrgba: function(o) {
    return `rgba(74,183,231,${o})`
  },
  BP: "#ed5e56", BPDarker: "#d5544d", onBP: "#FFF",
  BPrgba: function(o) {
    return `rgba(237,94,86,${o})`
  },
  AM: "#664bc4", AMDarker: "#5c43b0", onAM: "#FFF",
  AMrgba: function(o) {
    return `rgba(102,75,196,${o})`
  },
}
