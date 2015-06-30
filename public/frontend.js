// var $upvote = $('#upvote');
// var $downvote = $('#downvote');

// $upvote.on('change', function() {
// 	articleSchema.upvote += 1;
// });

document.querySelector( '#nav-toggle' ).addEventListener( 'click', function() {
  this.classList.toggle( 'active' );
  console.log(this);
  document.querySelector('.navbar').classList.toggle('open');
  document.querySelector('#nav-toggle span').classList.toggle('active');
});

