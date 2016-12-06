/**
 * Created by annity on 4.12.2016 г..
 */
import React, { Component } from 'react';

export default class UsersView extends Component {
    render() {
        let userRows = this.props.users.map(user =>
            <tr key={user._id}>
                <td>{user.username}</td>
            </tr>
        );

        return (
            <div className="users-view">
                <h1>Users</h1>
                <table className="users-table">
                    <thead>
                    <tr>
                        <th>Username</th>
                    </tr>
                    </thead>
                    <tbody>
                    {userRows}
                    </tbody>
                </table>
            </div>
        );
    }
}
