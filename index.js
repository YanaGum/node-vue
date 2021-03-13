const routes = require('./routes/routes')
const Hapi = require("@hapi/hapi");
require('./config/db.config');
const jwttok = require('./utils/jwt')


const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
    routes: {
      cors: {
        origin: ['*']
      },
    }
  });
  await server.register(require("vision"));
  await server.register(require("inert"));
  await server.register(require('hapi-auth-jwt2'))

  server.auth.strategy('jwt', 'jwt', {
    key: 'key',
    validate: jwttok
  })
  server.auth.default('jwt');

  server.views({
    engines: {
      html: require("handlebars")
    },
    path: __dirname + "/views"
  });

  server.route(routes(server));

  await server.start();
  console.log("Server running on %s", server.info.uri);

  process.on("unhandledRejection", err => {
    console.log(err);
    process.exit(1);
  });
};

init();