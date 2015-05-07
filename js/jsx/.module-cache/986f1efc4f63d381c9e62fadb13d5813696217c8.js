var ContactList = React.createClass({displayName: "ContactList",
  getInitialState: function() {
    return {data: []}
  },
  render: function() {
    var contactNodes = this.props.data.map(function (comment) {
      return (
        React.createElement(Comment, {author: comment.author}, 
          comment.text
        )
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
