app.factory('Stor', [
  '$q', '$rootScope', '$timeout',
  function($q, $rootScope, $timeout) {
    var Stor = (function() {

      function Stor(key, exp) {
        this.key = key != null ? key : void 0;
        this.exp = exp != null ? exp : null;
        this.amp = amplify.store;
      }

      Stor.prototype = {
        get: function(key) {
          key = key != null ? key : this.key;
          return this.amp(key);
        }

        , set: function(val, key, exp) {
          key = key != null ? key : this.key;
          exp = exp != null ? exp : this.exp;

          return this.amp(key, val, { expires: exp });
        }

        , remove: function(key) {
          key = key != null ? key : this.key;
          return this.amp(key, null);
        }

        , empty: function() {
          var storage = this.amp();

          for (var key in storage) {
            if (storage.hasOwnProperty(key)) this.remove(key);
          }
        }

        , getAsync: function() {
          var self = this
            , args = [].slice.call(arguments, 1)
            , fn = arguments[0]
            , q = $q.defer();

          $timeout(function() {
            var data = self.get.apply(self, args);

            if (data) {
              $rootScope.safeApply(function() {
                q.resolve({
                    data: data
                  , type: 'local'
                });
              });
            } else {
              var req = fn()
                , ret = { type: 'xhr'};

              req.then(function(res) {
                $rootScope.safeApply(function() {
                  ret.data = res.data;
                  ret.status = res.status;
                  q.resolve(ret);
                });
              });
            }
          }, 1);

          return q.promise;
        }
      };

      return Stor;
    })();

    return Stor;
  }
]);