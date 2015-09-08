var $ = require('jquery');

var initialized = false,
    api         = {},
    subscribers = {},
    results     = [];

api = {
    merge: function (data) {
        return $.ajax('/members/update', {
            type: 'POST',
            data: data
        });
    },
    create: function (data) {
        return $.ajax('/members/save', {
            type: 'POST',
            data: data
        });
    },
    get: function () {
        var id = '';

        if (arguments.length) {
            id = '/' + arguments[0];
        }

        return $.ajax('/members' + id, {
            type: 'GET'
        });
    },
    subscribe: function (name, callback) {
        subscribers[name] = callback;
    },
    unsubscribe: function (name) {
        subscribers[name] = function () { };
    }
};

if (!initialized) {
    initialized = true;

    setInterval(function () {
        if (subscribers === {})
            return;

        api.get().success(function (resp) {
            var name;

            for (name in subscribers)
                if (subscribers.hasOwnProperty(name))
                    subscribers[name](JSON.parse(resp));
        });
    }, 5000);
}

module.exports = api;
