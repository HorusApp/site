const $ = global.$;

$(function() {
  $('.register-form').submit( function(event) {
    event.preventDefault();

    const $this = $(this);
    const name = $this.find('[name="name"]').val();
    const email = $this.find('[name="email"]').val();
    const password = $this.find('[name="password"]').val();

    global.registerUser( name, email, password );
  } );
});

