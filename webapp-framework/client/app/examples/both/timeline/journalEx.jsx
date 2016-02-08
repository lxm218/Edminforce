App.JournalEx1 = App.Example(
  class extends RC.Code {
    renderExample() {
      return (
        <RC.Div>
          <RC.Journal
            theme="heading" title="Journal theme='Heading'"
            uiClass="map" uiBgColor="brand2"
            />
          <RC.Journal title={new Date("Wed Jul 01 2012 17:54:07 GMT-0700 (PDT)")}>
            Journal is often put inside RC.Timeline, but it doesn't have to.
          </RC.Journal>
          <RC.Journal title="Journal w/o theme">
            <p>You can place other tags inside Journal too.</p>
          </RC.Journal>
        </RC.Div>
      )
    }
    code() {
      return `
    renderExample() {
      return (
        <RC.Div>
          <RC.Journal
            theme="heading" title="Journal theme='Heading'"
            uiClass="map" uiBgColor="brand2"
            />
          <RC.Journal title={new Date("Wed Jul 01 2012 17:54:07 GMT-0700 (PDT)")}>
            Journal is often put inside RC.Timeline, but it doesn't have to.
          </RC.Journal>
          <RC.Journal title="Journal w/o theme">
            <p>You can place other tags inside Journal too.</p>
          </RC.Journal>
        </RC.Div>
      )
    }
  `
    }
  }
)

App.JournalEx2 = App.Example(
  class extends RC.Code {
    renderExample() {
      let areaInnerStyle = {
        "backgroundColor": "orange"
      }
      let titleStyle = {
        "color": "blue"
      }
      let arrowStyle = {
        "borderLeft": "7px solid red"
      }
      return (
        <RC.Div>
          <RC.Journal
            theme="heading" title="Journal theme='Heading'"
            uiClass="map" uiBgColor="brand2"
            />
          <RC.Journal title={new Date("Wed Jul 01 2012 17:54:07 GMT-0700 (PDT)")} areaInnerStyle={areaInnerStyle} titleStyle={titleStyle} arrowStyle={arrowStyle}>
            Journal is often put inside RC.Timeline, but it doesn't have to.
          </RC.Journal>
          <RC.Journal title="Journal w/o theme" arrowStyle={arrowStyle}>
            <p>You can place other tags inside Journal too.</p>
          </RC.Journal>
        </RC.Div>
      )
    }
    code() {
      return `
    renderExample() {
      let areaInnerStyle = {
        "backgroundColor": "orange"
      }
      let titleStyle = {
        "color": "blue"
      }
      let arrowStyle = {
        "borderLeft": "7px solid red"
      }
      return (
        <RC.Div>
          <RC.Journal
            theme="heading" title="Journal theme='Heading'"
            uiClass="map" uiBgColor="brand2"
            />
          <RC.Journal title={new Date("Wed Jul 01 2012 17:54:07 GMT-0700 (PDT)")} areaInnerStyle={areaInnerStyle} titleStyle={titleStyle} arrowStyle={arrowStyle}>
            Journal is often put inside RC.Timeline, but it doesn't have to.
          </RC.Journal>
          <RC.Journal title="Journal w/o theme" arrowStyle={arrowStyle}>
            <p>You can place other tags inside Journal too.</p>
          </RC.Journal>
        </RC.Div>
      )
    }
  `
    }
  }
)