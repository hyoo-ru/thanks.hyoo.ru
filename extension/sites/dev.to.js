function init() {
	
	const likes = [ ... document.querySelectorAll( '#reaction-butt-like, #reaction-butt-unicorn, #reaction-butt-readinglist' ) ]
	if( !likes.length ) return setTimeout( init, 500 )
	
	const target = document.querySelector( '#article-show-container [href^="https://thanks.hyoo.ru/#!to="]' )
	if( !target ) return
	
	const worker = chrome.runtime.connect( 'mdbcommedgjkcjjkklkkoefgkhomjnkc', {} )
	
	for( const like of likes ) {
		like.addEventListener( 'click', ()=> worker.postMessage({
			type: 'like',
			liked: likes.some( like => like.getAttribute( 'aria-pressed' ) === "true" ),
			target: target.href,
		}) )
	}
	
}
init()
