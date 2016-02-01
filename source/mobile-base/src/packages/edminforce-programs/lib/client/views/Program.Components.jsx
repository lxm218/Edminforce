{

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.ProgramsList = React.createClass({

        getInitialState(){
          return {
              beginning: {
                  display:"none"
              },
              intermediate:{
                  display: 'none'
              },
              summercamp: {
                  display: 'none'
              }
          }
        },

        bookTrial(){
            //TODO Add condition of book trail

            // To show the flow, jump to login page
            FlowRouter.go('/programs/111');
        },

        clickBeginning(){
            this.setState({
                beginning: {
                    display:"block"
                },
                intermediate:{
                    display: 'none'
                },
                summercamp: {
                    display: 'none'
                }
            });
        },

        clickIntermediate(){
            this.setState({
                beginning: {
                    display:"none"
                },
                intermediate:{
                    display: 'block'
                },
                summercamp: {
                    display: 'none'
                }
            });
        },

        clickSummerCamp(){
            this.setState({
                beginning: {
                    display:"none"
                },
                intermediate:{
                    display: 'none'
                },
                summercamp: {
                    display: 'block'
                }
            });
        },

        render: function () {

            // Fill with your UI
            return (
                <RC.Div style={{padding: "10px"}}>
                    <RC.Div>
                        <RC.Button bgColor="brand1" onClick={this.clickBeginning}>Beginning</RC.Button>
                        <RC.Div style={this.state.beginning}>
                            <RC.Div>
                                Class length: 1.5 hours The class will offer students a wide spectrum of art world 1.
                                Pictorial Classes (2D): Professional Living Drawing with multiple drawing materials:
                                Landscape drawing, Portrait drawing, Still-life drawing, Animal drawing, Realistic
                                drawing, and Expressive drawing. Water base Painting: Use water base materials, such as
                                watercolor, acrylic, ink to represent landscape, portrait, still life, animal, and
                                creative art. Topic Creative classes: Holiday inspiration classes; Multiple Culture
                                inspiration. Fine Art Appreciation: Master piece study and inspiration to open students’
                                mind. Chinese Traditional Art: Chinese Calligraphy and Chinese Painting study. Oil
                                Painting classes: Introduce various genres of oil paintings to students, e.g classic oil
                                painting, Impressionism, Post Impressionism, modern art, contemporary paintings. Comic
                                Art: Japanese Manga and American comic exploration and creation class. 2. Spatial
                                Classes (3D) Clay Sculpture Art: Professional sculpture art and develop 3D concept.
                            </RC.Div>
                            <RC.Button bgColor="brand2" theme="inline">Simple Art Work</RC.Button>
                            <RC.Button bgColor="brand2" theme="inline" onClick={this.bookTrial}>Book Trial</RC.Button>
                        </RC.Div>
                    </RC.Div>

                    <RC.Div>
                        <RC.Button bgColor="brand1" onClick={this.clickIntermediate}>Intermediate</RC.Button>
                        <RC.Div style={this.state.intermediate}>
                            <RC.Div>
                                Class length: 1.5 hours The class will offer students a wide spectrum of art world 1.
                                Pictorial Classes (2D): Professional Living Drawing with multiple drawing materials:
                                Landscape drawing, Portrait drawing, Still-life drawing, Animal drawing, Realistic
                                drawing, and Expressive drawing. Water base Painting: Use water base materials, such as
                                watercolor, acrylic, ink to represent landscape, portrait, still life, animal, and
                                creative art. Topic Creative classes: Holiday inspiration classes; Multiple Culture
                                inspiration. Fine Art Appreciation: Master piece study and inspiration to open students’
                                mind. Chinese Traditional Art: Chinese Calligraphy and Chinese Painting study. Oil
                                Painting classes: Introduce various genres of oil paintings to students, e.g classic oil
                                painting, Impressionism, Post Impressionism, modern art, contemporary paintings. Comic
                                Art: Japanese Manga and American comic exploration and creation class. 2. Spatial
                                Classes (3D) Clay Sculpture Art: Professional sculpture art and develop 3D concept.
                            </RC.Div>
                            <RC.Button bgColor="brand2" theme="inline">Simple Art Work</RC.Button>
                            <RC.Button bgColor="brand2" theme="inline" onClick={this.bookTrial}>Book Trial</RC.Button>
                        </RC.Div>
                    </RC.Div>

                    <RC.Div>
                        <RC.Button bgColor="brand1" onClick={this.clickSummerCamp}>Summer Camp</RC.Button>
                        <RC.Div style={this.state.summercamp}>
                            <RC.Div>
                                Class length: 1.5 hours The class will offer students a wide spectrum of art world 1.
                                Pictorial Classes (2D): Professional Living Drawing with multiple drawing materials:
                                Landscape drawing, Portrait drawing, Still-life drawing, Animal drawing, Realistic
                                drawing, and Expressive drawing. Water base Painting: Use water base materials, such as
                                watercolor, acrylic, ink to represent landscape, portrait, still life, animal, and
                                creative art. Topic Creative classes: Holiday inspiration classes; Multiple Culture
                                inspiration. Fine Art Appreciation: Master piece study and inspiration to open students’
                                mind. Chinese Traditional Art: Chinese Calligraphy and Chinese Painting study. Oil
                                Painting classes: Introduce various genres of oil paintings to students, e.g classic oil
                                painting, Impressionism, Post Impressionism, modern art, contemporary paintings. Comic
                                Art: Japanese Manga and American comic exploration and creation class. 2. Spatial
                                Classes (3D) Clay Sculpture Art: Professional sculpture art and develop 3D concept.
                            </RC.Div>
                            <RC.Button bgColor="brand2" theme="inline">Simple Art Work</RC.Button>

                        </RC.Div>
                    </RC.Div>
                </RC.Div>
            );
        }
    });

}