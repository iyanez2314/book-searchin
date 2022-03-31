const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        me: async(parent, args, context) => {
            const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')

            return userData;
        }
    },

    Mutation: {
        createUser : async (parent, args) =>{
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
        }
    }
};

module.exports = resolvers;