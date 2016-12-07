/**
 * Created by annity on 4.12.2016 г..
 */
import React, { Component } from 'react';
import './EditMovieView.css';
export default class EditMovieView extends Component {
    render() {
        return (
            <form className="edit-movie-form" onSubmit={this.submitForm.bind(this)}>
                <h1>Edit Movie</h1>
                <label>
                    <div>Title:</div>
                    <input type="text" name="title" required
                           defaultValue={this.props.title}
                           ref={e => this.titleField = e} />
                </label>
                <br/>
                <label>
                    <div>Actors:</div>
                    <input type="text" name="actors" required
                           defaultValue={this.props.actors}
                           ref={e => this.actorsField = e} />
                </label>
                <br/>
                <label>
                    <div>Description:</div>
                    <textarea name="description" rows="10"
                              defaultValue={this.props.description}
                              ref={e => this.descriptionField = e} />
                </label>
                <br/>
                <label>
                    <div>Genre:</div>
                    <input type="text" name="genre" required
                           defaultValue={this.props.genre}
                           ref={e => this.genreField = e} />
                </label>
                <br/>
                <label>
                    <div>Year:</div>
                    <input type="number" name="year" min="1970" max="2016" required
                           defaultValue={this.props.year}
                           ref={e => this.yearField = e} />
                </label>
                <br/>
                <div>
                    <input type="submit" value="Edit" />
                </div>
            </form>
        );
    }

    submitForm(event) {
        event.preventDefault();
        this.props.onsubmit(
            this.props.movieId,
            this.titleField.value,
            this.actorsField.value,
            this.descriptionField.value,
            this.genreField.value,
            this.yearField.value
        );
    }
}
