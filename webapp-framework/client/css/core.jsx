
App.CSS = {
  brand1Gradient(loc,reverse) {
    let location = loc || "right"
    let center = reverse ? RC.Theme.color.brand1Darker : RC.Theme.color.brand1Light
    let bgColor = RC.Theme.color.brand1
    let textColor = RC.Theme.color.onBrand1
    return {
      backgroundColor: bgColor, color: textColor,
      background: "radial-gradient(ellipse at "+location+", "+center+" 0%, "+bgColor+" 95%, "+bgColor+" 100%)",
      backgroundRepeat: "no-repeat",
    }
  },
  brand2Gradient(loc,reverse) {
    let location = loc || "left"
    let center = reverse ? RC.Theme.color.brand2Light : RC.Theme.color.brand2Darker
    let bgColor = RC.Theme.color.brand2
    let textColor = RC.Theme.color.onBrand2
    return {
      backgroundColor: bgColor, color: textColor,
      background: "radial-gradient(ellipse at "+location+", "+center+" 0%, "+bgColor+" 95%, "+bgColor+" 100%)",
      backgroundRepeat: "no-repeat",
    }
  },
  navarea: {
    position: "absolute", top: 0, bottom: 0, left: 0, zIndex: 1000,
    width: 240, height: "100vh",
  }
}
