var ContactList = React.createClass({displayName: "ContactList",
  getInitialState: function() {
    return {data: []}
  },
  render: function() {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        React.createElement(Comment, {author: comment.author}, 
          comment.text
        )
      );
    });

    return (
      React.createElement("tbody", null, 
        contacts
      )
    );
  }
});

React.render(
  React.createElement(ContactList, {url: "data.json"}),
  document.getElementById('data-table')
);
