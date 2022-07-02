namespace $.$$ {
	
	export class $hyoo_thanks_app extends $.$hyoo_thanks_app {
		
		@ $mol_mem
		target_title() {
			return super.target_title()
				.replace( '{name}', 'Jin' )
		}
		
		@ $mol_mem
		welcome_text() {
			return super.welcome_text()
				.replace( /{my_link}/g, '#!to=EQAyyEkW6tPWofboOqzZcHglL9kk6Az6mpnMxSwNyhDz36z7' )
		}
		
	}
	
}
