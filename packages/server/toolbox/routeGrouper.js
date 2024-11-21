module.exports = express =>
  (express.application.group = express.Router.group =
    function (path, mdw = [], cb) {
      const router = express.Router();

      const middleware = Array.isArray(mdw) ? mdw : [];
      const callback = cb || mdw;

      if (middleware.length) router.use(...mdw);
      callback(router);

      this.use(path, router);
    });
