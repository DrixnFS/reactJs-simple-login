/**
 * Mock object used in mock BackEnd as DB to get data for users
 * @namespace
 * @author Martin Krzyzanek
 */
const UserDB = {

    "karel.capek@seznam.cz" : {
        id : 1,
        email: "karel.capek@seznam.cz",
        pass : '112233'
    },

    "muj.mail@email.cz" : {
        id : 2,
        email: "muj.mail@email.cz",
        pass : 'abcd'
    },

    "denis.postrach@post-bez-tld" : {
        id : 3,
        email: "denis.postrach@post-bez-tld",
        pass : '0000'
    },

}

export default UserDB;