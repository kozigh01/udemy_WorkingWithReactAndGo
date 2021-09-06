package models

import (
	"context"
	"database/sql"
	"time"
)

type DBModel struct {
	DB *sql.DB
}

// Get returns one movie and error, if any
func (m *DBModel) Get(id int) (*Movie, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `
		select id, title, description, year, release_date, rating, runtime, mpaa_rating, created_at, updated_at
			from movies 
			where id = $1`

	row := m.DB.QueryRowContext(ctx, query, id)
	var movie Movie
	err := row.Scan(
		&movie.ID,
		&movie.Title,
		&movie.Description,
		&movie.Year,
		&movie.ReleaseDate,
		&movie.Rating,
		&movie.Runtime,
		&movie.MPAARating,
		&movie.CreatedAt,
		&movie.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}

	// get the movie genres
	query = `
		select mg.id, mg.movie_id, mg.genre_id, g.genre_name, mg.created_at, mg.updated_at
			from movies_genres mg
				inner join genres g on mg.genre_id = g.id
			where mg.movie_id = $1`
	rows, err := m.DB.QueryContext(ctx, query, id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var genres []MovieGenre
	genres2 := make(map[int]string)
	for rows.Next() {
		var genre MovieGenre
		err := rows.Scan(
			&genre.ID,
			&genre.MovieId,
			&genre.GenreId,
			&genre.Genre.GenreName,
			&genre.CreatedAt,
			&genre.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		genres = append(genres, genre)
		genres2[genre.GenreId] = genre.Genre.GenreName
	}
	movie.MovieGenres = genres
	movie.MovieGenres2 = genres2

	return &movie, nil
}

// Qll returns all movies and error, if any
func (m *DBModel) All() ([]*Movie, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `
	select id, title, description, year, release_date, rating, runtime, mpaa_rating, created_at, updated_at
		from movies
		order by title`
	rows, err := m.DB.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var movies []*Movie
	for rows.Next() {
		var movie Movie
		err := rows.Scan(
			&movie.ID,
			&movie.Title,
			&movie.Description,
			&movie.Year,
			&movie.ReleaseDate,
			&movie.Rating,
			&movie.Runtime,
			&movie.MPAARating,
			&movie.CreatedAt,
			&movie.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}

		// get the movie genres
		query = `
			select mg.id, mg.movie_id, mg.genre_id, g.genre_name, mg.created_at, mg.updated_at
				from movies_genres mg
					inner join genres g on mg.genre_id = g.id
				where mg.movie_id = $1`
		rowsg, err := m.DB.QueryContext(ctx, query, movie.ID)
		if err != nil {
			return nil, err
		}
		defer rowsg.Close()
		genres2 := make(map[int]string)
		for rowsg.Next() {
			var genre MovieGenre
			err := rowsg.Scan(
				&genre.ID,
				&genre.MovieId,
				&genre.GenreId,
				&genre.Genre.GenreName,
				&genre.CreatedAt,
				&genre.UpdatedAt,
			)
			if err != nil {
				return nil, err
			}
			genres2[genre.GenreId] = genre.Genre.GenreName
		}
		movie.MovieGenres2 = genres2

		movies = append(movies, &movie)
	}

	return movies, nil
}
