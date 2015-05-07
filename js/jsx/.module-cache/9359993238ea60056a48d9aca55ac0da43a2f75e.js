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
  getInitialState: function() {
    return {data: []}
  },
  render: function() {
    var contactNodes = this.props.data.map(function (contact) {
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
  React.createElement(ContactList, {url: "data.json"}),
  document.getElementById('data-table')
);
