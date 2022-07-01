chrome.action.onClicked.addListener( tab => {
	
	chrome.tabs.create({
		url: 'https://thanks.hyoo.ru/'
	})
	
} )

chrome.action.disable()

chrome.runtime.onConnect.addListener( content => {
	
	chrome.action.enable( content.sender.tab.id )
	
	content.onMessage.addListener( msg => {
		
		switch( msg[0] ) {
			
			case 'like':
				
				chrome.action.setBadgeText({
					text: msg[1] ? '💲' : '',
					tabId: content.sender.tab.id,
				})
				
				chrome.tabs.create({
					url: msg[2],
					active: false,
				})
							
				break
				
			default: throw Error( `Unknown message ${ msg[0] }` )
		}
		
	} )
	
} )
