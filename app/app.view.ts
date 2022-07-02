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
			return this.short_name( this.target() )
		}
		
		@ $mol_mem_key
		short_name( name: string ) {
			return $mol_hash_string( name ).toString(36).toUpperCase()
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
		
		@ $mol_mem
		likes( next?: Record< string, number > ) {
			return this.$.$mol_state_local.value( 'likes', next ) ?? {}
		}
		
		@ $mol_mem
		subscription( next?: number ) {
			return this.$.$mol_state_local.value( 'subscription', next ) ?? 10
		}
		
		@ $mol_mem
		target_likes( next?: number ) {
			return this.likes(
				next?.valueOf && { ... this.likes(), [ this.target() ]: next }
			)[ this.target() ] ?? 0
		}
		
		@ $mol_mem
		shares() {
			
			const likes = this.likes()
			const total = Object.values( likes ).reduce( ( a, b )=> a + b, 0 )
			
			return Object.keys( likes ).map( target => ({
				target: this.short_name( target ),
				likes: likes[ target ],
				shares: `${ Math.round( likes[ target ] / total * 100 ) } %`,
			}) )
			
		}
		
	}
	
}
