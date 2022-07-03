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

		target_person() {
			return this.person( this.target() )
		}
		
		@ $mol_mem
		target_name() {
			return this.target_person().name()
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
				.replace( /{my_link}/g, this.person_link() )
		}
		
		@ $mol_mem
		subscription( next?: number ) {
			return this.$.$mol_state_local.value( 'subscription', next ) ?? 10
		}
		
		target_likes_inc() {
			this.user().like_change( this.target_person(), 1 )
			this.target_likes( this.target_likes() + 1 )
		}

		target_likes_dec() {
			this.user().like_change( this.target_person(), -1 )
			this.target_likes( this.target_likes() - 1 )
		}
		
		@ $mol_mem
		shares() {
			
			const like_persons = this.user().like_persons()
			const like_count = like_persons.map( person => this.user().like_count(person) )

			const total = like_count.reduce( (a,b)=> a+b , 0 )
			
			return like_persons.map( (person, i) => ({
				target: person.name(),
				likes: like_count[i],
				shares: `${ Math.round( like_count[i] / total * 100 ) } %`,
			}) )
			
		}

		person_name(next?: string) {
			return this.user().name(next)
		}

		person_wallet() {
			return this.user().wallet().address().toString(true, true, true)
		}

		person_balance() {
			return this.user().wallet().balance()
		}
		
		wallet() {
			return this.person_balance() + ' TON'
		}

		person_link() {
			return this.Person_link().uri()
		}

		person_id() {
			return this.user().id()
		}

		auto() {
			this.domain().state().socket()
		}
		
	}
	
}
