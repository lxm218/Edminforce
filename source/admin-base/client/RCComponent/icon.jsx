

KUI.Icon = class extends RC.CSS{

    click(e){
        if(this.props.onClick){
            this.props.onClick(e)
        }

        e.stopPropagation();
    }


    render() {

        let p = {
            className : 'fa fa-'+this.props.icon,
            style : {
                fontSize : this.props.font || '24px',
                color : this.props.color || 'inherit'
            }
        };

        if(this.props.style){
            _.extend(p.style, this.props.style);
        }

        return (
            <i {... p} onClick={this.click.bind(this)}></i>
        );

    }
};