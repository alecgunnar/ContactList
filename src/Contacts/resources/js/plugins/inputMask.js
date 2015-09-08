module.exports = {
    phoneNumber: function (from, to) {
        if (from.length > to.length) {
            return to;
        }

        var numbers = to.replace(/[^0-9]/g, ''),
            value   = numbers;

        if (numbers.length >= 3) {
            value = '(' + numbers.substring(0, 3) + ') ';

            if (numbers.length >= 6) {
                value += numbers.substring(3, 6) + ' - ' + numbers.substring(6, 10);
            } else {
                value += numbers.substring(3, 5);
            }
        }

        return value;
    }
};