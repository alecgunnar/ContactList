var ContactListItem = React.createClass({displayName: "ContactListItem",
  render: function() {
    return (
      React.createElement("tr", null, 
        React.createElement("td", null, this.props.info.name), 
        React.createElement("td", null), 
        React.createElement("td", null), 
        React.createElement("td", null), 
        React.createElement("td", null)
      )
    );
  }
});

var ContactList = React.createClass({displayName: "ContactList",
  render: function() {
    var contactNodes = this.props.contacts.map(function (contact) {
      return (
        React.createElement(ContactListItem, {info: contact})
      );
    });

    return (
      React.createElement("tbody", null, 
        contactNodes
      )
    );
  }
});

var ContactListBody = React.createClass({displayName: "ContactListBody",
  getInitialState: function() {
    return {data: []}
  },
  componentDidMount: function() {

  },
  render: function() {
    return (
      React.createElement(ContactList, {contacts: this.state.data})
    );
  }
});

React.render(
  React.createElement(ContactListBody, {url: "data.json"}),
  document.getElementById('data-table')
);
