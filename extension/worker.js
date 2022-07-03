chrome.action.onClicked.addListener( tab => {
	
	chrome.tabs.create({
		url: 'https://thanks.hyoo.ru/#!section=awaiting'
	})
	
} )

// chrome.action.disable()

chrome.runtime.onConnect.addListener( content => {
	
	// chrome.action.enable( content.sender.tab.id )
	
	content.onMessage.addListener( async ( msg )=> {
		
		switch( msg.type ) {
			
			case 'like':
				
				chrome.action.setBadgeText({
					text: msg.liked ? '💲' : '',
					tabId: content.sender.tab.id,
				})
				
				const app = await chrome.tabs.create({
					url: msg.target + '/from=' + content.sender.tab.url,
					active: false,
				})
				
				await chrome.scripting.executeScript({
					target: { tabId: app.id },
					world: 'MAIN',
					func: msg.liked
						? ()=> $mol_wire_async( $hyoo_thanks_app.Root(0).Target_likes() ).event_inc()
						: ()=> $mol_wire_async( $hyoo_thanks_app.Root(0).Target_likes() ).event_dec()
				} )
				
				await chrome.tabs.remove( app.id )
				
				break
				
			default: throw Error( `Unknown message ${ msg.type }` )
		}
		
	} )
	
} )
