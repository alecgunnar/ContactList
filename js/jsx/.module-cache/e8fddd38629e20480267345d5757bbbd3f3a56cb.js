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

var ContactList

var ContactListBody = React.createClass({displayName: "ContactListBody",
  getInitialState: function() {
    return {data: []}
  },
  render: function() {console.log(this.state);
    var contactNodes = this.state.data.map(function (contact) {
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

React.render(
  React.createElement(ContactsBody, {url: "data.json"}),
  document.getElementById('data-table')
);
