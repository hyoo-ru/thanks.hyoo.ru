namespace $.$$ {
	
	export class $hyoo_thanks_app extends $.$hyoo_thanks_app {
		
		@ $mol_mem
		spreads(): any {
			return this.target()
				? { target: this.Target() , ... super.spreads() }
				: super.spreads()
		}
		
		target() {
			return this.$.$mol_state_arg.value( 'to' ) ?? ''
		}
		
		@ $mol_mem
		target_name() {
			return $mol_hash_string( this.target() ).toString(36).toUpperCase()
		}
		
		@ $mol_mem
		target_title() {
			return super.target_title()
				.replace( '{name}', this.target_name() )
		}
		
		@ $mol_mem
		welcome_text() {
			return super.welcome_text()
				.replace( /{my_link}/g, '#!to=EQAyyEkW6tPWofboOqzZcHglL9kk6Az6mpnMxSwNyhDz36z7/section=target' )
		}
		
	}
	
}
