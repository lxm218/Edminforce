
"use strict"

IH.RC.LeftNavLogin = class extends RC.CSSMeteorData {
  getMeteorData() {
    const user = Meteor.user()
    return {
      isLoggedIn: !!user && Meteor.loggingIn(),
      user: user
    }
  }
  // @@@@
  getFullName() {
    const name = [h.nk(this.data.user, "profile.firstName"), h.nk(this.data.user,"profile.lastName")]
    return name.join(" ").trim()
  }
  getAvatarURL() {
    const unknownDef = this.props.unknownDefault
    const maleDef = this.props.maleDefault || unknownDef
    const femaleDef = this.props.femaleDefault || unknownDef

    const avatar = h.nk(this.data.user, "profile.avatar")
    const isMale = h.nk(this.data.user, "profile.gender")

    return avatar || (isMale ? maleDef : femaleDef) || unknownDef
  }

  // @@@@
  // @@@@
  // Render
  // @@@@
  // @@@@
  render() {
    const styles = this.css.get("styles")
    const avatarURL = this.getAvatarURL()
    const isHero = _.contains( this.css.get("themes"), "hero")
    const avatar = {
      src: avatarURL,
      theme: isHero ? "inlineBlockLeft" : "absLeft",
      bgColor: this.color.get("isDark") ? "rgba(0,0,0,.15)" : "rgba(0,0,0,.05)",
      diameter: isHero ? 90 : 50
    }

    return <RC.Loading theme={["tiny","absFull"]} color="#FFF" isReady={!this.data.isLoggedIn} style={styles.area}>
      <RC.Avatar {... avatar} />
      <h4 style={styles.name}>{this.getFullName()}</h4>
      <a href={this.props.editProfileURL || "/user/profile"} style={styles.desc}>Edit Profile</a>
    </RC.Loading>
  }
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  baseStyles() {
    const fontSize = RC.Theme.font.size
    return {
      area: {
        position: "relative", padding: "0 0 0 69px"
      },
      name: Object.assign({}, RC.cssMixins.ellipsis, {
        padding: "16px 0 0",
        textIndent: -1,
        fontSize: fontSize+4, color: this.color.get("textColor")
      }),
      desc: {
        fontSize: fontSize-1, lineHeight: 1.4, textIndent: 1,
        textDecoration: "none",
        display: "block"
      }
    }
  }
  themeStyles() {
    const fontSize = RC.Theme.font.size
    return {
      hero: {
        area: Object.assign({}, RC.cssMixins.fontAlt("light"), {
          padding: "100px 10% 50px", margin: "0 0 20px",
          backgroundColor: "rgba(255,255,255,.05)"
        }),
        name: {
          fontFamily: "inherit", fontWeight: "inherit",
          padding: "5px 0 0",
          fontSize: fontSize+14
        }
      }
    }
  }
}

Object.assign( IH.RC.LeftNavLogin.propTypes, {
  editProfileURL: React.PropTypes.string,
})
