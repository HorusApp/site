const $ = global.$;

$(function() {
  $('.login-form').submit( function(event) {
    event.preventDefault();

    const $this = $(this);
    const password = $this.find('[name="password"]').val();
    const email = $this.find('[name="email"]').val();

    global.login( email, password );
  } );
});

