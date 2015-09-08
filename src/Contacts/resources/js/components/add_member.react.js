var React       = require('react');
var InputMask   = require('../plugins/inputMask.js');
var MemberStore = require('../stores/members.js');

var AddMemberForm = React.createClass({
    getInitialState: function () {
        return {
            name:   this.props.name,
            email:  this.props.email,
            phone:  this.props.phone,
            errors: []
        };
    },
    updateName: function (e) {
        this.setState({
            name: e.target.value
        });
    },
    updateEmail: function (e) {
        this.setState({
            email: e.target.value
        });
    },
    updatePhone: function (e) {
        this.setState({
            phone: InputMask.phoneNumber(this.state.phone, e.target.value)
        });
    },
    saveMember: function (e) {
        e.preventDefault();

        var errors = [];

        if (!this.state.name) {
            errors.push('You must enter a name!');
        }

        if (!this.state.email && !this.state.phone) {
            errors.push('You must enter an email address or a phone number!');
        }

        this.setState({
            errors: errors
        });

        if (!errors.length) {
            var data = {
                name:  this.state.name,
                email: this.state.email,
                phone: this.state.phone
            };

            if (this.props.id) {
                data[id] = this.props.id;

                MemberStore.merge(data);
            } else {
                MemberStroe.create(data);
            }
        }
    },
    render: function () {
        var errors = <div></div>;

        if (this.state.errors.length) {
            var errorMessages = this.state.errors.map(function (e) {
                return <li>{e}</li>;
            });

            errors = <ul className="form__errors">{errorMessages}</ul>;
        }

        return (
            <form onSubmit={this.saveMember}>
                {errors}
                <div className="form__row">
                    <label className="form__row__label">Name</label>
                    <input type="text" value={this.state.name} onChange={this.updateName} className="form__row__input" />
                </div>
                <div className="form__row">
                    <label className="form__row__label">Email Address</label>
                    <input type="text" value={this.state.email} onChange={this.updateEmail} className="form__row__input" />
                </div>
                <div className="form__row">
                    <label className="form__row__label">Phone Number</label>
                    <input type="text" value={this.state.phone} onChange={this.updatePhone} className="form__row__input" />
                </div>
                <div className="form__row form__row--buttons">
                    <button type="submit">Save New Member</button>
                </div>
            </form>
        );
    }
});

module.exports = AddMemberForm;