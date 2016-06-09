
App.CardEx2 = App.Example(
  class extends RC.Code {
    code() {
      return `
    renderExample() {
      return <RC.Card>
        <RC.Item theme="divider">Header</RC.Item>
        <RC.Item theme="body">
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
          </p>
        </RC.Item>
        <RC.Item theme="body">
          <p>
            Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis.
          </p>
        </RC.Item>
        <RC.Item theme="divider">Footer</RC.Item>
      </RC.Card>
    }
  `
    }

    renderExample() {
      return <RC.Card>
        <RC.Item theme="divider">Header</RC.Item>
        <RC.Item theme="body">
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
          </p>
        </RC.Item>
        <RC.Item theme="body">
          <p>
            Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis.
          </p>
        </RC.Item>
        <RC.Item theme="divider">Footer</RC.Item>
      </RC.Card>
    }
  }
)
