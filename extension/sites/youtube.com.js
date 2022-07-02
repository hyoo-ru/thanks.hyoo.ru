function init() {
	
	const like = document.querySelector( '#actions #top-level-buttons-computed > *:first-child' )
	if( !like ) return setTimeout( init, 500 )
	
	const target = document.querySelector( '#formatted-snippet-text [href*="https%3A%2F%2Fthanks.hyoo.ru%2F%23%21to%3D"]' )
	if( !target ) return
	
	const worker = chrome.runtime.connect( 'mdbcommedgjkcjjkklkkoefgkhomjnkc', {} )
	
	like.addEventListener( 'click', ()=> worker.postMessage({
		type: 'like',
		liked: like.classList.contains( 'style-default-active' ),
		target: new URL( target.href ).searchParams.get( 'q' ),
	}) )
	
}
init()
