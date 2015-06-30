document.querySelector( '#nav-toggle' ).addEventListener( 'click', function() {
  this.classList.toggle( 'active' );
  document.querySelector('.navbar').classList.toggle('open');
  document.querySelector('#nav-toggle span').classList.toggle('active');
});

// $upvote = $('#upvote');
// $downvote = $('#downvote');
// $voteView = $('.vote-count');
// var voteCount = 0;

// $upvote.on('click', function(){
// 	voteCount += 1;
// 	$voteView.text('Current vote: ' + voteCount);
// });

// $downvote.on('click', function(){
// 	voteCount -= 1;
// 	$voteView.text('Current vote: ' + voteCount);
// });




