global.$ = require( 'jquery' );

const apiHost = 'https://fiap-horusapp.herokuapp.com';

global.registerUser = function( name, email, password, callback ) {
  $.ajax( {
    url: `${ apiHost }/users`,
    method: 'POST',
    data: {
      name,
      email,
      password,
    },
    success(id) {
      alert( 'Usuário cadastrado com sucesso!' );
      login( email, password );
    },
    error() {
      alert( 'Usuario já existe!' )
    }
  } );
}

global.login = function( email, password ) {
  $.ajax( {
    url: `${ apiHost }/login`,
    method: 'POST',
    data: {
      email,
      password,
    },
    success( token ) {
      alert(token);
      alert(email);

      global.localStorage.setItem( 'email', email );
      global.localStorage.setItem( 'token', token );

      global.location.href = 'https://horusapp.github.io/site/public/';
    },
    error() {
      alert( 'Email e/ou senha inválidos!' );
    }
  } );
}

global.logout = function() {
  global.localStorage.removeItem( 'email' );
  global.localStorage.removeItem( 'token' );

  alert( 'Até logo :)');
}

global.getResource = function( resource, callback ) {
  $.ajax({
    url: `${ apiHost }/${ resource }`,
    dataType: 'json',
    headers: {
      email: global.localStorage.getItem( 'email' ),
      token: global.localStorage.getItem( 'token' ),
    },
    success( data ) {
      callback( data );
    },
    error( err ) {
      console.log( err );
    },
  });
}
