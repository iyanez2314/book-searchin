const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        me: async(parent, args, context) => {
            const userData = await User.findOne({ _id: context.user._id })
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })

                return userData;
            }

            throw new AuthenticationError('Not Logged in')
        },
        users: async (parent, args) => {
            return User.find();
        },
    },

    Mutation: {
        addUser : async (parent, args) =>{
            const user = await User.create(args);
            const token = signToken(user)
            
            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({email})

            if (!user) {
                throw new AuthenticationError('Incorrect creds silly')
            }

            // * .isCorrectPassword comes from Bycrpt in the user model (../models/User)
            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw){
                throw new AuthenticationError('Incorrect sheeeeesh')
            }

            const token = signToken(user);
            return { token, user };
        },

        saveBook: async(
            parent, 
            { bookId, authors, description, image, link, title },
            context
        ) => {
            if(context.user) {
                const updateUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    {
                        $push : {
                            savedBooks: { bookId, authors, description, image, link, title },
                        },
                    },
                    { new: true }
                );
                return updateUser;
            }
            throw new AuthenticationError("You need to be logged in fool! ")
        },

        removeBook: async (parent, { bookId }, context) => {
            if(context.user) {
                const updateUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                );
                return updateUser
            }
            throw new AuthenticationError("You need to be logged in foolio!")
        },
    },
};

module.exports = resolvers;