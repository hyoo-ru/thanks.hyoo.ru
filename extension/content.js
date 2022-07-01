function init() {
	
	const like = document.querySelector( '#actions #top-level-buttons-computed > *:first-child' )
	if( !like ) return setTimeout( init, 500 )
	
	like.addEventListener( 'click', ()=> {
		worker.postMessage([ 'like', isLiked() ])
		console.info( `$mol_thanks liked:`, isLiked() )
	} )
	
	function isLiked() {
		return like.classList.contains( 'style-default-active' )
	}
	
	const worker = chrome.runtime.connect(
		'mdbcommedgjkcjjkklkkoefgkhomjnkc',
		{},
	)
	
	console.info( `$mol_thanks like:`, like, ` liked:`, isLiked() )
	
}
init()
