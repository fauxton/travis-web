import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('user-avatar', 'UserAvatarComponent | Unit', {

});

test('it renders', function(assert) {

  var name = "Hello Test";
  var url = "https://someurl.com/someimage.jpg";

  var component = this.subject({url: url, name: name});
  this.append();

  assert.ok(component.$().hasClass('avatar'), 'component should have right class');
  assert.equal(component.$('.pseudo-avatar').data('initials'), 'HT', 'initials should be correct');
  assert.equal(component.$('.real-avatar').attr('src'), 'https://someurl.com/someimage.jpg', 'avatar should be right');

});
