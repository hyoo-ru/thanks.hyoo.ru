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

	}
}
