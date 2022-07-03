namespace $ {
	
	export class $hyoo_thanks_app_person extends $mol_object2 {
		
		id(): string {
			return this.$.$mol_fail( new Error( 'Not defined' ) )
		}
		
		domain(): $hyoo_thanks_app_domain {
			return this.$.$mol_fail( new Error( 'Not defined' ) )
		}
		
		@ $mol_mem
		state() {
			return this.domain().state().doc( 'person' ).doc( this.id() )
		}
		
		name( next?: string ) {
			return String( this.state().sub( 'name' ).value( next ) ?? '' )
		}

		@ $mol_mem
		wallet_keys() {
			let words = this.$.$mol_store_local.value( this.id() )
			if (!words) {
				words = this.$.$mol_store_local.value( this.id(), $mol_ton_wallet.words_create() )
			}
			return $mol_ton_wallet.words_to_pair(words)
		}
		
		@ $mol_mem
		wallet() {
			const ton = new $mol_ton
			return ton.wallet( this.wallet_keys() )
		}

		like_persons(next?: $hyoo_thanks_app_person[]) {
			return this.state().sub('like_persons').list( next?.map( obj => obj.id() ) ).map( id => this.domain().person( String(id) ) )
		}

		@ $mol_mem_key
		like_count(person: $hyoo_thanks_app_person, count?: number) {
			return Number( this.state().sub('like_count').sub(person.id()).value(count) ) 
		}

		@ $mol_action
		like_change( person: $hyoo_thanks_app_person, count: number ) {
			let next = this.like_count(person) + count

			if (next <= 0) {
				next = 0
				this.like_persons( this.like_persons().filter( obj => obj !== person ) )
			}

			if (next > 0 && !this.like_persons().includes(person)) {
				this.like_persons( [...this.like_persons(), person] )
			}

			this.like_count( person , next )
		}

	}
}
