document.querySelector( '#nav-toggle' ).addEventListener( 'click', function() {
  this.classList.toggle( 'active' );
  document.querySelector('.navbar').classList.toggle('open');
  document.querySelector('#nav-toggle span').classList.toggle('active');
});




