/**
 * Created by annity on 4.12.2016 г..
 */
import React, { Component } from 'react';
import './MoviesView.css';
export default class MoviesView extends Component{
    render() {
        let movieRows = this.props.movies.map(movie =>
            <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.actors}</td>
                <td>{this.getRows(movie.description,movie)}</td>
                <td>{movie.genre}</td>
                <td>{movie.year}</td>
                {this.getActions(movie, this.props.userId)}
            </tr>
        );
        return (
            <div className="movies-view">
                <h1>Movies</h1>
                <table className="movies-table">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Actors</th>
                        <th>Description</th>
                        <th>Genre</th>
                        <th>Year</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {movieRows}
                    </tbody>
                </table>
            </div>
        );
    }
    getRows(rows,movie){
        if(rows.length>100)
        return(
           <td>
            {
            rows=rows.slice(0,100)+"..."
           }
               <a href="#" onClick={this.props.detailsMovieClicked.bind(this, movie._id)}>Read More</a>
           </td>
        );
       else
           return <td>{rows}</td>
    }
    getActions(movie, userId) {
        if (movie._acl.creator === userId)
            return (
                <td>
                    <input type="button" value="Edit"
                           onClick={this.props.editMovieClicked.bind(this, movie._id)} />
                    &#32;
                    <input type="button" value="Details"
                           onClick={this.props.detailsMovieClicked.bind(this, movie._id)} />
                    &#32;
                    <input type="button" value="Delete"
                           onClick={this.props.deleteMovieClicked.bind(this, movie._id)} />
                </td>
            );
        else
            return <td>
                <input type="button" value="Details"
                       onClick={this.props.detailsMovieClicked.bind(this, movie._id)} />
            </td>;
    }
}
