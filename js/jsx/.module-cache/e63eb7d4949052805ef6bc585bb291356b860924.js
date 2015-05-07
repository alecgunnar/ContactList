var ContactList = React.CreateComponent({
  render: function() {
    return (
      React.createElement("tbody", null, 
        React.createElement(ContactListItem, null)
      )
    );
  }
});

React.render(
  React.createElement(ContactList, null),
  document.getElementById('data-table')
);
