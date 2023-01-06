import { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import { UserType } from '../types/user.type';

export const Home = () =>  {
    const [currentUser, setCurrentUser] = useState<UserType>();
    const [users, setUsers] = useState<UserType[]>([]);

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
        if (currentUser) {
            setCurrentUser(currentUser);
        }

        UserService.getUsers()
            .then( (response: any) => {
                setUsers(response.data);
            })
            .catch( (error: any) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <h1>Hi {currentUser?.name}!</h1>
            <h3>Welcome to the Barty Task:</h3>
            {users.length &&
                <ul>
                    {users.map( (user: UserType) =>
                        <li key={user.username}>{user.name} {user.surname}</li>
                    )}
                </ul>
            }
            {/* {users.loading && <div className="spinner-border spinner-border-sm"></div>}
            {users.error && <div className="text-danger">Error loading users: {users.error.message}</div>} */}
        </div>
    );
}
