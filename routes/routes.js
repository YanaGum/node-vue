const Joi = require("@hapi/joi");
const Adverts = require("../models/Advertisement");
const User = require("../models/user");
const Category = require("../models/categories");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const routes = (server) => [
  {
    path: "/public/{path*}",
    method: "GET",
    handler: {
      directory: {
        path: "./public",
        listing: false,
        index: false,
      },
    },
  },
  {
    method: "GET",
    path: "/hello",
    handler: function(request, h) {
      return "Hello";
    },
  },
  {
    method: "GET",
    path: "/category",
    options: {
      auth: false,
    },
    handler: async (request, h) => {
      const category = await Category.find().lean();
      return h.response(category);
    },
  },
  {
    method: "POST",
    path: "/adverts",
    options: {
      auth: "jwt",
      payload: {
        parse: true,
        multipart: true,
      },
    },
    handler: async (request, h) => {
      try {
        const adverts = new Adverts({
          ...request.payload,
        });
        const result = await adverts.save();
        console.log(request.payload);
        console.log(result);
        return h.response(result);
      } catch (error) {
        console.log(error);
      }
    },
  },
  {
    method: "GET",
    path: "/adverts",
    options: {
      auth: false,
    },
    handler: async (request, h) => {
      try {
        var advert = await Adverts.find()
          .populate("categories")
          .populate("user");
        return h.response(advert);
      } catch (error) {
        console.log(error);
        return h.response(error);
      }
    },
  },
  {
    method: "GET",
    path: "/adverts/{id}",
    options: {
      auth: false,
    },
    handler: async (request, h) => {
      try {
        var adverts = await Adverts.findById(request.params.id)
          .populate("categories")
          .populate("user");
        return h.response(adverts);
      } catch (error) {
        return h.response(error);
      }
    },
  },
  {
    method: "GET",
    path: "/users/{username}",
    options: {
      auth: false,
    },
    handler: async (request, h) => {
      try {
        console.log(request.payload);
        const result = await User.findOne({
          email: request.payload.email,
        }).lean();
        return h.response({
          username: result.username,
          email: result.email,
          phone: result.phone,
        });
      } catch (error) {
        return h.response(error).code(500);
      }
    },
  },
  {
    method: "PUT",
    path: "/adverts/{id}",
    options: {
      auth: false,
      validate: {
        payload: Joi.object({
          title: Joi.string()
            .min(3)
            .max(100)
            .required(),
          description: Joi.string()
            .min(3)
            .required(),
          user: Joi.string()
            .min(3)
            .max(50)
            .required(),
        }),
        failAction: (request, h, error) => {
          return error.isJoi
            ? h.response(error.details[0]).takeover()
            : h.response(error).takeover();
        },
      },
    },
    handler: async (request, h) => {
      try {
        var result = await Adverts.findByIdAndUpdate(
          request.params.id,
          request.payload,
          {
            new: true,
          }
        );
        return h.response(result);
      } catch (error) {
        return h.response(error).code(500);
      }
    },
  },
  {
    method: "DELETE",
    path: "/adverts/{id}",
    options: {
      auth: false,
    },
    handler: async (request, h) => {
      try {
        var result = await Adverts.findByIdAndDelete(request.params.id);
        return h.response(result);
      } catch (error) {
        return h.response(error).code(500);
      }
    },
  },
  {
    method: "POST",
    path: "/users",
    handler: async (request) => {
      try {
        console.log(request.payload);
        const present = await User.findOne({
          email: request.payload.email,
        });
        if (present) {
          return "Email used";
        } else {
          const user = new User({
            username: request.payload.username,
            email: request.payload.email,
            phone: request.payload.phone,
            password: request.payload.password,
            role: "user",
          });
          const token = jwt.sign(
            {
              email: user.email,
              id: user._id,
            },
            "key",
            {
              expiresIn: 60 * 60,
            }
          );
          console.log("Token:", token);
          return JSON.stringify({
            token: `Bearer ${token}`,
          });
        }
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    options: {
      auth: false,
      payload: {
        parse: true,
        multipart: true,
      },
    },
  },
  {
    method: "GET",
    path: "/users",
    options: {
      auth: false,
    },
    handler: async (request, h) => {
      try {
        const user = await User.find();
        return h.response(user);
      } catch (error) {
        return h.response(error).code(500);
      }
    },
  },
  {
    method: "POST",
    path: "/login",
    options: {
      payload: {
        parse: true,
        multipart: true,
      },
      auth: false,
    },
    handler: async (request, h) => {
      try {
        console.log(request.payload);
        const user = await User.findOne({
          email: request.payload.email,
        });

        console.log(validUser);
        if (request.payload.password === user.password) {
          const token = jwt.sign(
            {
              email: user.email,
              id: user._id,
            },
            "key",
            {
              expiresIn: 60 * 60,
            }
          );
          console.log("Token:", token);
          console.log("User:", user._id);
          return JSON.stringify({
            token: `Bearer ${token}`,
            userId: user._id,
          });
        } else {
          return "Invalid email or password";
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  {
    method: "GET",
    path: "/restricted",
    config: {
      auth: "jwt",
    },
    handler: function(request, h) {
      try {
        console.log(
          "request.headers.authorization ::: ",
          request.headers.authorization
        );
        const response = h.response({
          text: "You used a Token!",
        });
        response.header("Authorization", request.headers.authorization);
        return response;
      } catch (error) {
        return h.response(error).code(500);
      }
    },
  },
];

module.exports = routes;
