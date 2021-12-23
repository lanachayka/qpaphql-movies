import {gql} from 'apollo-boost';

export const addMovieMutation = gql`
  mutation ($name: String!, $genre: String!, $directorId: String!, $rate: Int, $watched: Boolean!){
    addMovie(name: $name, 
             genre: $genre, 
             directorId: $directorId,
             rate: $rate,
             watched: $watched) {
      id
    }
  }
`

export const updateMovieMutation = gql`
  mutation ($id:ID!, $name: String!, $genre: String!, $directorId: String!, $rate: Int, $watched: Boolean!){
    updateMovie(id: $id, 
             name: $name, 
             genre: $genre, 
             directorId: $directorId,
             rate: $rate,
             watched: $watched) {
      id
    }
  }
`