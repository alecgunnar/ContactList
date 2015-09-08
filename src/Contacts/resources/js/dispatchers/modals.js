var dispatcher = require('flux').Dispatcher;

var actions = {
    triggerAddMemberModal: function (opened) {
        dispatcher.handleAction('addMember', {
            open: opened
        });
    }
};

module.exports = actions;