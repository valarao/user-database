const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        joe.save()
            .then(() => done());
    });

    function assertName(operation, done) {
        operation
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'Alex');
                done();
            });
    }

    it('instance type using set n save', (done) => {
        joe.set('name', 'Alex');
        assertName(joe.save(), done);
    });

    it('A model instance can updateOne', (done) => {
        assertName(joe.updateOne({ name: 'Alex' }), done);
    });

    it('A model class can updateOne', (done) => {
        assertName(User.updateOne({ name: 'Joe' }, { name: 'Alex' }), done);
    });

    it('A model class can updateMany', (done) => {
        assertName(User.updateMany({ name: 'Joe' }, { name: 'Alex' }), done);
    })
});

