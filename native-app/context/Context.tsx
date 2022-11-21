import React from 'react';
import { RegisteredUser, User } from '../types';

type UserContext = {
    currentUser: User;
    setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
};

function createCtx<A extends {} | null>() {
    // creates the context and initialises it with undefined
    const ctx = React.createContext<A | undefined>(undefined);

    // creating function called useCtx
    function useCtx(): A {
        // usual way of calling useContext
        const c = React.useContext(ctx);
        // check if undefined and throw error if necessary
        if (c === undefined)
            throw new Error(
                'useCtx must be inside a Provider with a value'
            );
        // we return A because we know it is populated
        return c;
    }
    // return the useCtx function and the ctxProvider
    return [useCtx, ctx.Provider] as const;
}

// useCurrentUser is our custom React hook, currentUserProvider is the provider
// using the function above means that we don't have to check for null every time we call useCurrentUser
export const [useCurrentUser, CurrentUserProvider] =
    createCtx<UserContext>();

// const { currentUser } = useCurrentUser() as { currentUser: RegisteredUser };
export function useRegisteredUser(): {
    currentUser: RegisteredUser;
} {
    const { currentUser } = useCurrentUser();
    return {
        currentUser: currentUser as RegisteredUser,
    };
}
