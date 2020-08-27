import UserDB from "./UserDB";

/**
 * Mock Backend, mocks API for Login, Logout and validating email and pw combinations
 * @namespace
 * @author Martin Krzyzanek
 */
const BackEnd = {

    /**
     * 
     * @param {Object} req 
     */
    isLoggedIn : function(req){
        //Initial response object for the client
        var res = {
            success : false,
            err: true,
            msg: 'No arg received',
            username : ''
        };


        
        return JSON.stringify(res);
    },

    /**
     * 
     * @param {Object} req -
     */
    login : function(req){
        //Initial response object for the client
        var res = {
            success : false,
            err: true,
            msg: 'No arg received',
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
                            res.msg = "Uživatel je validní";
                            res.username = UserDB[parsed_req.username].email;
                        } else {
                            res.msg = "Špatné heslo";
                        }

                    } else {
                        res.msg = 'Neznámý uživatel';
                    }


                } else {
                    res.msg = 'Username or password missing';
                }

            } else {
                res.msg = 'POST method only';
            }
        }

        return JSON.stringify(res);

    }

}

export default BackEnd;