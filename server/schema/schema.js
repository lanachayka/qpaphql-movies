const graphql = require('graphql');

const {GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID, GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLBoolean} = graphql;

const Movies = require('../models/movies');
const Directors = require('../models/directors');

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)},
        genre: {type: new GraphQLNonNull(GraphQLString)},
        rate: {type: GraphQLInt},
        watched: {type: new GraphQLNonNull(GraphQLBoolean)},
        director: {
            type: DirectorType,
            resolve({directorId}){
                return Directors.findById(directorId);
            }
        }
    })
});

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)},
        movies: {
            type: new GraphQLList(MovieType),
            resolve({id}){
                return Movies.find({directorId: id});
            }
        }
    })
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: {id: {type: GraphQLID}},
            resolve(parent, {id}) {
                return Movies.findById(id);
            }
        },
        director: {
            type: DirectorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, {id}) {
                return Directors.findById(id);
            }
        },
        movies: {
            type: GraphQLList(MovieType),
            args: {name: {type: GraphQLString}},
            resolve(parent, {name}){
                return Movies.find({ name: { $regex: name, $options: "i" } });
            }
        },
        directors: {
            type: GraphQLList(DirectorType),
            args: {name: {type: GraphQLString}},
            resolve(parent, {name}){
                return Directors.find({ name: { $regex: name, $options: "i" } });
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addDirector: {
            type: DirectorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)},
            },
            resolve(parent, {name, age}) {
                const newDirector = new Directors({name, age});
                return newDirector.save();
            }
        },
        addMovie: {
            type: MovieType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                directorId: {type: new GraphQLNonNull(GraphQLString)},
                rate: {type: GraphQLInt},
                watched: {type: new GraphQLNonNull(GraphQLBoolean)}
            },
            resolve(parent, {name, genre, directorId, rate, watched}){
                const newMovie = new Movies({name, genre, directorId, rate, watched});
                return newMovie.save();
            }
        },
        deleteDirector: {
           type: DirectorType,
           args: {id: {type: GraphQLID}},
           resolve(parent, {id}){
              return Directors.findByIdAndRemove(id);
           }
        },
        deleteMovie: {
            type: MovieType,
            args: {id: {type: GraphQLID}},
            resolve(parent, {id}){
                return Movies.findByIdAndRemove(id);
            }
        },
        updateDirector: {
            type: DirectorType,
            args: {
                id: {type: GraphQLID},
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, {id, name, age}) {
                return Directors.findByIdAndUpdate(
                    id,
                    {$set: {name, age}},
                    {new: true}
                );
            }
        },
        updateMovie: {
            type: MovieType,
            args: {
                id: {type: GraphQLID},
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                directorId: {type: new GraphQLNonNull(GraphQLString)},
                rate: {type: GraphQLInt},
                watched: {type: new GraphQLNonNull(GraphQLBoolean)},
            },
            resolve(parent, {id, name, genre, directorId, rate, watched}) {
                return Movies.findByIdAndUpdate(
                    id,
                    {$set: {name, genre, directorId, rate, watched}},
                    {new: true}
                );
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});


