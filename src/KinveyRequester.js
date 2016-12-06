/**
 * Created by annity on 30.11.2016 г..
 */
import $ from 'jquery';

const KinveyRequester = (function() {
    const baseUrl = "https://baas.kinvey.com/";
    const appKey = "kid_SJnZBu-Qg";
    const appSecret = "7f537fddec49472a965e25a6ad21a213";
    const kinveyAppAuthHeaders = {
        'Authorization': "Basic " + btoa(appKey + ":" + appSecret)
    };
    function loginUser(username, password) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "user/" + appKey + "/login",
            headers: kinveyAppAuthHeaders,
            data: { username, password }
        });
    }
    function registerUser(username, password) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "user/" + appKey + "/",
            headers: kinveyAppAuthHeaders,
            data: { username, password }
        });
    }
    function getKinveyUserAuthHeaders() {
        return {
            'Authorization': "Kinvey " + sessionStorage.getItem('authToken'),
        };
    }

    function logoutUser() {
        return $.ajax({
            method: "POST",
            url: baseUrl + "user/" + appKey + "/_logout",
            headers: getKinveyUserAuthHeaders(),
        });
    }
    function findAllMovies() {
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + "/movies",
            headers: getKinveyUserAuthHeaders()
        });
    }
    function findAllUsers() {
        return $.ajax({
            method: "GET",
            url: baseUrl + "user/" + appKey ,
            headers: getKinveyUserAuthHeaders()
        });
    }
    function findMovieById(movieId) {
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + "/movies/" + movieId,
            headers: getKinveyUserAuthHeaders()
        });
    }

    function createMovie(title, actors, description,genre,year) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "appdata/" + appKey + "/movies",
            headers: getKinveyUserAuthHeaders(),
            data: { title, actors, description,genre,year }
        });
    }

    function editMovie(movieId, title, actors, description,genre,year) {
        return $.ajax({
            method: "PUT",
            url: baseUrl + "appdata/" + appKey + "/movies/" + movieId,
            headers: getKinveyUserAuthHeaders(),
            data: { title, actors, description,genre,year }
        });
    }
    function detailMovie(movieId, title, actors, description,genre,year) {
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + "/movies/" + movieId,
            headers: getKinveyUserAuthHeaders(),
            data: { title, actors, description,genre,year }
        });
    }
    function deleteMovie(movieId) {
        return $.ajax({
            method: "DELETE",
            url: baseUrl + "appdata/" + appKey + "/movies/" + movieId,
            headers: getKinveyUserAuthHeaders()
        });
    }
    return {
        loginUser, registerUser, logoutUser,
        findAllMovies,findAllUsers,createMovie, findMovieById, editMovie,detailMovie, deleteMovie
    }
})();

export default KinveyRequester;
