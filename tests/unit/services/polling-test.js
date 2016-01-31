import {module, test} from 'qunit';
import Ember from 'ember';
import Polling from 'travis/services/polling';
import config from 'travis/config/environment';

var service;

module('PollingService', {
  beforeEach() {
    return config.ajaxPolling = true;
  },
  afterEach() {
    config.ajaxPolling = false;
    if (!service.get('isDestroyed')) {
      return Ember.run(function() {
        return service.destroy();
      });
    }
  }
});

test('polls for each of the models', function(assert) {
  var history, model1, model2;
  assert.expect(3);
  history = [];
  service = Polling.create({
    pollingInterval: 20
  });
  model1 = {
    reload: function() {
      assert.ok(true);
      return history.push('model1');
    }
  };
  model2 = {
    reload: function() {
      assert.ok(true);
      return history.push('model2');
    }
  };
  service.startPolling(model1);
  service.startPolling(model2);
  stop();
  return setTimeout(function() {
    start();
    assert.deepEqual(history, ['model1', 'model2']);
    return Ember.run(function() {
      return service.destroy();
    });
  }, 30);
});

test('it will stop running any reloads after it is destroyed', function(assert) {
  var model;
  assert.expect(1);
  service = Polling.create({
    pollingInterval: 20
  });
  model = {
    reload: function() {
      return ok(true);
    }
  };
  service.startPolling(model);
  stop();
  setTimeout(function() {
    return Ember.run(function() {
      return service.destroy();
    });
  }, 30);
  return setTimeout(function() {
    return start();
  }, 50);
});

test('it stops reloading models after they were removed from polling', function(assert) {
  var history, model1, model2;
  assert.expect(4);
  history = [];
  service = Polling.create({
    pollingInterval: 30
  });
  model1 = {
    reload: function() {
      assert.ok(true);
      return history.push('model1');
    }
  };
  model2 = {
    reload: function() {
      assert.ok(true);
      return history.push('model2');
    }
  };
  service.startPolling(model1);
  service.startPolling(model2);
  stop();
  return setTimeout(function() {
    service.stopPolling(model2);
    return setTimeout(function() {
      Ember.run(function() {
        return service.destroy();
      });
      start();
      return deepEqual(history, ['model1', 'model2', 'model1']);
    }, 30);
  }, 40);
});

test('it runs a hook on each interval', function(assert) {
  var history, source;
  assert.expect(1);
  history = [];
  service = Polling.create({
    pollingInterval: 20
  });
  source = {
    pollHook: function() {
      return ok(true);
    }
  };
  service.startPollingHook(source);
  stop();
  return setTimeout(function() {
    service.stopPollingHook(source);
    return setTimeout(function() {
      Ember.run(function() {
        return service.destroy();
      });
      return start();
    }, 10);
  }, 30);
});

test('it will not run pollHook if the source is destroyed', function(assert) {
  var history, source;
  assert.expect(1);
  history = [];
  service = Polling.create({
    pollingInterval: 20
  });
  source = Ember.Object.extend({
    pollHook: function() {
      return ok(true);
    }
  }).create();
  service.startPollingHook(source);
  stop();
  return setTimeout(function() {
    Ember.run(function() {
      return source.destroy();
    });
    return setTimeout(function() {
      Ember.run(function() {
        return service.destroy();
      });
      return start();
    }, 35);
  }, 30);
});
