/**
 * Created on 10/21/15.
 */

Cal.AdminHome = React.createClass({

    render: function () {

        var colors = ['orange', 'red', 'blue', 'purple'];


        var data = [
            {id: '1', firstName: 'John', lastName: 'Bobson'},
            {id: '2', firstName: 'Bob', lastName: 'Mclaren'}
        ]
        var columns = [
            {name: 'firstName'},
            {name: 'lastName'}
        ]


        var Table = FixedDataTable.Table
        var Column = FixedDataTable.Column



        // Table data as a list of array.
        var rows = [
            ['a1', 'b1', 'c1'],
            ['a2', 'b2', 'c2'],
            ['a3', 'b3', 'c3'],
            // .... and more
        ];

        function rowGetter(rowIndex) {
            return rows[rowIndex];
        }


        const title = (
            <h3>Panel title</h3>
        );

        const panelsInstance = (
            <div>
                <RB.Panel header="Panel heading without title">
                    Panel content
                </RB.Panel>
                <RB.Panel header={title}>
                    Panel content
                </RB.Panel>
            </div>
        );

        const MyLargeModal = React.createClass({
            render() {
                return (
                    <RB.Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
                        <RB.Modal.Header closeButton>
                            <RB.Modal.Title>Modal.Title id="contained-modal-title-lg">Modal heading</RB.Modal.Title>
                        </RB.Modal.Header>
                        <RB.Modal.Body>
                            <h4>Wrapped Text</h4>
                            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                        </RB.Modal.Body>
                        <RB.Modal.Footer>
                            <RB.Button onClick={this.props.onHide}>Close</RB.Button>
                        </RB.Modal.Footer>
                    </RB.Modal>
                );
            }
        });


        const ButtonWithDialog = React.createClass({

            getInitialState() {
                return { showModal: false };
            },

            close() {
                this.setState({ showModal: false });
            },

            open() {
                this.setState({ showModal: true });
            },

            render() {
                let popover = <RB.Popover title="popover">very popover. such engagement</RB.Popover>;
                let tooltip = <RB.Tooltip>wow.</RB.Tooltip>;

                return (
                    <div>
                        <p>Click to get the full Modal experience!</p>

                        <RB.Button
                            bsStyle="primary"
                            bsSize="large"
                            onClick={this.open}
                            >
                            Launch demo modal
                        </RB.Button>

                        <RB.Modal show={this.state.showModal} onHide={this.close}
                            {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
                            <RB.Modal.Header closeButton>
                                <RB.Modal.Title>Modal.Title id="contained-modal-title-lg">Modal heading</RB.Modal.Title>
                            </RB.Modal.Header>
                            <RB.Modal.Body>
                                <h4>Wrapped Text</h4>
                                <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                                <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                                <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                                <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                                <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                                <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                            </RB.Modal.Body>
                            <RB.Modal.Footer>
                                <RB.Button onClick={this.props.onHide}>Close</RB.Button>
                            </RB.Modal.Footer>
                        </RB.Modal>
                    </div>
                );
            }
        });

        const NavDropdownExample = React.createClass({
            handleSelect(event, selectedKey) {
                event.preventDefault();
                alert('selected ' + selectedKey);
            },

            render() {
                return (
                    <RB.Nav bsStyle="tabs" activeKey={1} onSelect={this.handleSelect}>
                        <RB.NavItem eventKey={1} href="/home">NavItem 1 content</RB.NavItem>
                        <RB.NavItem eventKey={2} title="Item">NavItem 2 content</RB.NavItem>
                        <RB.NavItem eventKey={3} disabled>NavItem 3 content</RB.NavItem>
                        <RB.NavDropdown eventKey={4} title="Dropdown" id="nav-dropdown">
                            <RB.MenuItem eventKey="4.1">Action</RB.MenuItem>
                            <RB.MenuItem eventKey="4.2">Another action</RB.MenuItem>
                            <RB.MenuItem eventKey="4.3">Something else here</RB.MenuItem>
                            <RB.MenuItem divider />
                            <RB.MenuItem eventKey="4.4">Separated link</RB.MenuItem>
                        </RB.NavDropdown>
                    </RB.Nav>
                );
            }
        });




        return <div className="padding">

            <RB.Panel header={title} bsStyle="success">
                Panel content
            </RB.Panel>

            <RW.DateTimePicker time={false}/>


            <RW.DropdownList defaultValue={"orange"} data={colors}/>

            <RB.ButtonGroup>
                <RB.Button>1</RB.Button>
                <RB.Button>2</RB.Button>
                <RB.DropdownButton title="Dropdown" id="bg-nested-dropdown">
                    <RB.MenuItem eventKey="1">Dropdown link</RB.MenuItem>
                    <RB.MenuItem eventKey="2">Dropdown link</RB.MenuItem>
                </RB.DropdownButton>
            </RB.ButtonGroup>


            <RB.SplitButton title="Dropdown right" pullRight id="split-button-pull-right">
                <RB.MenuItem eventKey="1">Action</RB.MenuItem>
                <RB.MenuItem eventKey="2">Another action</RB.MenuItem>
                <RB.MenuItem eventKey="3">Something else here</RB.MenuItem>
                <RB.MenuItem divider />
                <RB.MenuItem eventKey="4">Separated link</RB.MenuItem>
            </RB.SplitButton>


            <ButtonWithDialog />


            <Table
                rowHeight={50}
                rowGetter={rowGetter}
                rowsCount={rows.length}
                width={500}
                maxHeight={500}
                headerHeight={50}>
                <Column
                    label="Col 1"
                    width={300}
                    dataKey={0}
                    />
                <Column
                    label="Col 2"
                    width={200}
                    dataKey={1}
                    />
            </Table>


            <NavDropdownExample />





        </div >;
    }

});