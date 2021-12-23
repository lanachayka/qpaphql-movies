import {gql} from 'apollo-boost';

export const addDirectorMutation = gql`
  mutation ($name: String!, $age: Int!){
    addDirector(name: $name, age: $age) {
      id
    }
  }
`

export const updateDirectorMutation = gql`
mutation updateDirector($id:ID!, $name: String!, $age: Int!){
    updateDirector(id:$id, name: $name, age: $age) {
      id
    }
  }
`;