var React      = require('react');
var Modal      = require('./modals.react');
var AddMember  = require('./add_member.react');
var MemberList = require('./members.react');

var AddNewMember = React.createClass({
    render: function () {
        return (
            <Modal {...this.props} title="Add New Member">
                <AddMember afterSubmit={this.props.onClose} />
            </Modal>
        );
    }
});

var HeaderOptions = React.createClass({
    render: function () {
        return (
            <ul className="header__options">
                <li className="header__options__option" onClick={this.props.triggerAddTeamMember}><button>Add Team Member</button></li>
                <li className="header__options__option"><button>Export Email List</button></li>
            </ul>
        );
    }
});

var Header = React.createClass({
    render: function () {
        return (
            <header className="header">
                <div className="site__wrapper">
                    <HeaderOptions {...this.props} />
                    <h1 className="header__branding">{config.app_name}</h1>
                    <small className="header__version"><span className="header_version__wrapper">{config.version}</span></small>
                    <div className="clearfix"></div>
                </div>
            </header>
        );
    }
});

var Application = React.createClass({
    getInitialState: function () {
        return {
            modals: {
                addMember:     false,
                exportMembers: false
            }
        };
    },
    triggerAddTeamMember: function () {
        this.setState({
            modals: {
                addMember: !this.state.modals.addMember
            }
        });
    },
    render: function () {
        return (
            <div className="application__wrapper">
                <div className="modals__wrapper">
                    <AddNewMember triggered={this.state.modals.addMember} onClose={this.triggerAddTeamMember} />
                </div>
                <Header triggerAddTeamMember={this.triggerAddTeamMember} />
                <MemberList />
            </div>
        );
    }
});

React.render(<Application />, document.getElementById('application'));
