
/**
 *
 * Formula for {Device} "Darker" colors
 * HUE/LIGHT: -10
 * HUE/SAT: +5
 *
 */


DevicePrivate = {}
IH.Device.Color = {

  // Zone Colors (If changing this, change the chart.css points too)
  green: "#69d356",
  "green-saturated": "#80fc2d",

  yellow: "#f5d141",
  orange: "#e89544",
  red: "#e94525",
  danger: "#ec1700",

  // Device Colors
  none: "#141414",
  alt: "#EEE", // Used for subheadings

  // BG
  BG: "#4ab7e7", BGDarker: "#3ea4d1", onBG: "#FFF",
  BGrgba: function(o) {
    return `rgba(74,183,231,${o})`
  },
  // BP
  BP: "#ed5e56", BPDarker: "#d6514a", onBP: "#FFF",
  BPalt: "#FF3",
  BPrgba: function(o) {
    return `rgba(237,94,86,${o})`
  },
  BPzone0: "#1ECB49",
  BPzone1: "#FFDE26",
  BPzone2: "#FFA126",
  BPzone3: "#FF6026",
  BPzone4: "#FF3F26",
  // AM
  AM: "#664bc4", AMDarker: "#5940b0", onAM: "#FFF",
  AMalt: "#FF3",
  AMrgba: function(o) {
    return `rgba(102,75,196,${o})`
    // Purposely darker by about 20% black
    // return `rgba(82,60,157,${o})`
  },
}

IH.Device.Defaults = {
  AM: {
    goal: 10000
  }
}
