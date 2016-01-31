import { test, moduleForComponent } from 'ember-qunit';
import Ember from 'ember';

var server = null;

moduleForComponent('travis-status', 'TravisStatusComponent', {});

test('adds incident class to .status-circle', function(assert) {
  var component;
  assert.expect(3);
  component = this.subject();
  component.getStatus = function() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      return resolve({
        status: {
          indicator: 'major'
        }
      });
    });
  };
  assert.ok(!component.get('status'), 'status is initially not set');
  this.append();
  assert.equal(component.get('status'), 'major', 'status is updated from the API');
  return ok(component.$('.status-circle').hasClass('major'), 'status class is set on .status-circle');
});
