import { extendObservable } from 'mobx';

/**
 * UserStore
 */

 class UserStore {
     constructor(){
        extendObservable(this, {

            loading: true,
            isLoggedIn: false,
            username: ''

        })
    }
 }

//Should be exporting singleton
export const instance = new UserStore();