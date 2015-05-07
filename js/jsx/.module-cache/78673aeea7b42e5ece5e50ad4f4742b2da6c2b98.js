var ContactList = React.CreateComponent({
  getInitialState: function() {
    return 
  },
  render: function() {
    return (
      React.createElement("tbody", null, 
        React.createElement(ContactListItem, null)
      )
    );
  }
});

React.render(
  React.createElement(ContactList, {url: "data.json"}),
  document.getElementById('data-table')
);
