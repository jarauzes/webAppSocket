const expect = require('expect');
const {Users} = require('./users');
const {ObjectID} = require('mongodb');

describe('Users', () => {

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '11',
            name: 'Mike',
            room: 'Node Course'
        }, {
            id: '12',
            name: 'Dave',
            room: 'React Course'
        }, {
            id: '13',
            name: 'Mark',
            room: 'Node Course'
        }];

    });

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

    it('Should remove a user', () => {
        var userId = '13';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('Should not remove user', () => {
        var userId = '133';
        var user = users.removeUser(userId);

        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it('Should find user', () => {
        var userId = '12';
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it('Should not find user', () => {
        var userId = '15';
        var user = users.getUser(userId);

        expect(user).toBeFalsy();
    });

    it('Should return names of Node Course', () => {
        var userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Mike', 'Mark']);
    });

    it('Should return names of React Course', () => {
        var userList = users.getUserList('React Course');
        expect(userList).toEqual(['Dave']);
    });
});