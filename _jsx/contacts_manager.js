var positions = ['Member', 'Executive/Lead', 'Advisor'];

var ContactListItemOptions = React.createClass({
  render: function() {
    return (
      <ul>
        <li><a href="#" className="modify-record">Modify</a></li>
        <li><a href="#" className="remove-record">Remove</a></li>
      </ul>
    );
  }
});

var ContactListItem = React.createClass({
  render: function() {
    return (
      <tr rel={this.props.data.idx}>
        <td className="name">{this.props.data.name}</td>
        <td className="email">{this.props.data.email}</td>
        <td className="phone">{this.props.data.phone}</td>
        <td className="position">{positions[this.props.data.position]}</td>
        <td><ContactListItemOptions /></td>
      </tr>
    );
  }
});

var ContactList = React.createClass({
  componentDidUpdate: function() {
    $('body').trigger('update');
  },
  render: function() {
    var contactNodes = this.props.contacts.map(function (contact, i) {
      if(!i)
        return;

      return (
        <ContactListItem key={i} data={contact} />
      );
    });

    return (
      <tbody>
        {contactNodes}
      </tbody>
    );
  }
});

var ContactListBody = React.createClass({
  getInitialState: function() {
    return {data: []}
  },
  loadContacts: function() {
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
  componentDidMount: function() {
    this.loadContacts();
    setInterval(this.loadContacts, this.props.pollInterval);
  },
  render: function() {
    return (
      <ContactList contacts={this.state.data} />
    );
  }
});

React.render(
  <ContactListBody url="data.json" pollInterval={2000} />,
  document.getElementById('data-table')
);
