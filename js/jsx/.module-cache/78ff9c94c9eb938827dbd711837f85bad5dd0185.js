var ContactListItem = React.createClass({displayName: "ContactListItem",
  render: function() {
    return (
      React.createElement("tr", null, 
        React.createElement("td", null, this.props.info.name), 
        React.createElement("td", null, this.props.info.email), 
        React.createElement("td", null, this.props.info.name), 
        React.createElement("td", null, this.props.info.name), 
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
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(contacts) {
        this.setState({
          data: contacts
        })
      }.bind(this)
    });
  },
  render: function() {
    return (
      React.createElement(ContactList, {contacts: this.state.data})
    );
  }
});

React.render(
  React.createElement(ContactListBody, {url: "data.json", pollInterval: 5000}),
  document.getElementById('data-table')
);
