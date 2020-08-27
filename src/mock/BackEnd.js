import UserDB from "./UserDB";

/**
 * Mock Backend, mocks API for Login, Logout and validating email and pw combinations
 * @namespace
 * @author Martin Krzyzanek
 */
const BackEnd = {

    /**
     * Checks if user is in session based on token received, if so sends response to client to log him automatically
     * @param {Object} req - request object received from client
     */
    isLoggedIn : function(req){
        //Initial response object for the client
        var res = {
            success : false,
            err: true,
            msg: 'arg-missing',
            username : ''
        };

        //If request object received
        if(req){
            //if the method is post
            if(req.method === 'POST'){

                //If there would be session storage with logged users and such there would be code block to check if user who opened the app is logged in, probably based on the token

            }
        }

        //Just for the mock purposes, returns msg as user wouldnt be found in user session
        res.msg = 'user-not-logged';

        return JSON.stringify(res);
    },

    /**
     * Validates the user against DB and logs him in
     * @param {Object} req - request object received from client
     */
    login : function(req){
        //Initial response object for the client
        var res = {
            success : false,
            err: true,
            msg: 'arg-missing',
            username : ''
        };

        //If request object received
        if(req){
            //if the method is post
            if(req.method === 'POST'){

                let parsed_req = JSON.parse(req.body);

                //if username and password were posted, check if valid
                if(parsed_req.username && parsed_req.password){

                    //User is in DB
                    if(UserDB[parsed_req.username]){

                        //Combination of username and password received is same as in db
                        if(UserDB[parsed_req.username].pass === parsed_req.password){
                            res.success = true;
                            res.err = false;
                            res.msg = "user-valid";
                            res.username = UserDB[parsed_req.username].email;

                            //There would also be code of block to add a user into user session if there would be one

                        } else {
                            res.msg = "password-bad";
                        }

                    } else {
                        res.msg = 'user-unknown';
                    }


                } else {
                    res.msg = 'param-missing';
                }

            } else {
                res.msg = 'method-not-supported';
            }
        }

        return JSON.stringify(res);

    },

    /**
     * Logs out the user, validating that he is logged and in session then loging him out
     * Arrow type function just to demonstrate i know what they are... Arrow type functions arent scoped as standard fces that means this. in arrow represents scope higher 
     * than this. in normal fce
     * @param {Object} req -  request object received from client
     */
    logout : (req) =>{
        //Initial response object for the client
        var res = {
            success : false,
            err: true,
            msg: 'arg-missing',
            username : ''
        };

        //If request object received
        if(req){
            //if the method is post
            if(req.method === 'POST'){
        
                //Code block for Validating the user that he is really logged in and then removing him from the session, probably based on the token
                res.success = true;
                res.err = false;
                res.msg = 'user-logedout';
        
            }
        }

        return JSON.stringify(res);
    }

}

export default BackEnd;