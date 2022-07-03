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
			return this.$.$mol_state_local.value( 'likes', next ) ?? {
				'EQAyyEkW6tPWofboOqzZcHglL9kk6Az6mpnMxSwNyhDz36z7': 1,
			}
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

		@ $mol_mem
		wallet_words(next?: string[]) {
			return this.$.$mol_store_local.value( 'wallet' , next )
		}

		import_label() {
			const count = this.import_words().split(/\s+/).filter(Boolean).length
			return super.import_label().replace('{num}', `${24 - count}`)
		}

		import_wallet() {
			this.wallet_words( this.import_words().split(/\s+/).filter(Boolean) )
		}

		wallet_keys() {
			const words = this.wallet_words()
			if (!words) return null
			return $mol_ton_wallet.words_to_pair(words)
		}

		awaiting_tools() {
			return !this.wallet_words() ? [] : [this.Wallet_balance()]
		}

		awaiting_body() {
			if (!this.wallet_words()) return [this.Import_block()]
			return [this.Subscription_block(), this.Awaiting_targets_block()]
		}

		@ $mol_mem
		wallet() {
			const ton = new $mol_ton
			return ton.wallet( this.wallet_keys()! )
		}

		wallet_address() {
			return this.wallet().address().toString(true, true, true, this.wallet().ton().is_testnet())
		}

		wallet_balance() {
			return this.wallet().balance() + ' TON'
		}
		
	}
	
}
