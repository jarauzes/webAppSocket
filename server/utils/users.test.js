const expect = require('expect');
const {Users} = require('./users');
const {ObjectID} = require('mongodb');

describe('Users', () => {

    it('Should add new user', () => {
        var users = new Users();
        var user = {
            id: new ObjectID(),
            name: 'Joe',
            room: 'developers'
        };

        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);

    });
});