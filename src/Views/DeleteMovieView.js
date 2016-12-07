/**
 * Created by annity on 4.12.2016 г..
 */
import React, { Component } from 'react';
import './DeleteMovieView.css';
export default class DeleteMovieView extends Component {
    render() {
        return (
            <form className="delete-movie-form" onSubmit={this.submitForm.bind(this)}>
                <h1>Confirm Delete Movie</h1>
                <label>
                    <div>Title:</div>
                    <input type="text" name="title" disabled
                           defaultValue={this.props.title} />
                </label>
                <br/>
                <label>
                    <div>Actors:</div>
                    <input type="text" name="actors" disabled
                           defaultValue={this.props.actors} />
                </label>
                <br/>
                <label>
                    <div>Description:</div>
                    <textarea name="description" rows="10" disabled
                              defaultValue={this.props.description} />
                </label>
                <br/>
                <label>
                    <div>Genre:</div>
                    <input type="text" name="genre" disabled="disabled"
                           defaultValue={this.props.genre} />
                </label>
                <br/>
                <label>
                    <div>Year:</div>
                    <input type="number" name="year" min="1970" max="2016" disabled="disabled"
                           defaultValue={this.props.year} />
                </label>
                <br/>
                <div>
                    <input type="submit" value="Delete" />
                </div>
            </form>
        );
    }

    submitForm(event) {
        event.preventDefault();
        this.props.onsubmit(this.props.movieId);
    }
}
