var React       = require('react');
var MemberStore = require('../stores/members.js');

var Members = React.createClass({
    getInitialState: function () {
        return {
            members: []
        };
    },
    componentDidMount: function () {
        MemberStore.subscribe('list', function (results) {
            this.setState({
                members: results
            });
        }.bind(this));
    },
    render: function () {
        if (!this.state.members.length) {
            return (
                <tr className="members__row">
                    <td className="members__row__box members__row__box--no-results" colSpan="4">No members have been added.</td>
                </tr>
            );
        }

        var renderMemberRows = this.state.members.map(function (e) {
            return (
                <tr className="members__row">
                    <td className="members__row__box">{e.name}</td>
                    <td className="members__row__box">{e.email}</td>
                    <td className="members__row__box">{e.phone}</td>
                    <td className="members__row__box"></td>
                </tr>
            );
        });

        return (
            <tbody>
                {renderMemberRows}
            </tbody>
        );
    }
});

var MemberList = React.createClass({
    render: function () {
        return (
            <table className="members">
                <thead>
                    <tr>
                        <th className="members__header">Name</th>
                        <th className="members__header">Email Address</th>
                        <th className="members__header">Phone Number</th>
                        <th className="members__header">Options</th>
                    </tr>   
                </thead>
                <Members />
            </table>
        );
    }
});

module.exports = MemberList;
