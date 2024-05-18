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
			const address = this.wallet_words() ? this.wallet_address() : ''
			return super.welcome_text()
				.replace( /{my_link}/g, `#!${address && `to=${address}`}/section=target` )
		}
		
		@ $mol_mem
		likes( next?: Record< string, number > ) {
			return this.$.$mol_state_local.value( 'likes', next ) ?? {
				'EQAyyEkW6tPWofboOqzZcHglL9kk6Az6mpnMxSwNyhDz36z7': 1,
			}
		}
		
		@ $mol_mem
		subscription( next?: number ) {
			return this.$.$mol_state_local.value( 'subscription', next ) ?? super.subscription()
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
				TONs: (likes[target] / total * this.subscription()).toFixed(2),
			}) )
			
		}

		@ $mol_mem
		wallet_words(next?: string[]) {
			return this.$.$mol_state_local.value( 'wallet' , next )
		}

		import_words_count() {
			return this.import_words().split(/\s+/).filter(Boolean).length
		}

		import_info() {
			return super.import_info().replace('{num}', `${24 - this.import_words_count()}`)
		}

		import_button_enabled() {
			return this.import_words_count() === 24
		}

		import_wallet() {
			this.wallet_words( this.import_words().split(/\s+/).filter(Boolean) )
			this.import_words('')
		}

		export_words() {
			return (this.wallet_words() ?? []).join(' ')
		}

		wallet_keys() {
			let words = this.wallet_words()
			if (!words) words = this.wallet_words( $mol_ton_wallet.words_create() )!
			return $mol_ton_wallet.words_to_pair(words)
		}

		@ $mol_mem
		wallet() {
			const ton = new $mol_ton
			return ton.wallet( this.wallet_keys()! )
		}

		wallet_address() {
			return this.wallet().address().toString(true, true, true)
		}

		wallet_balance() {
			return this.wallet().balance() + ' TON'
		}

		@ $mol_action
		transfer_enqueue_list() {
			if (!this.wallet_words()) return

			const likes = this.likes()
			const total = Object.values( likes ).reduce( ( a, b )=> a + b, 0 )
			if (total <= 0) return

			for (const [address, count] of Object.entries(likes).reverse()) {
				if (count <= 0) continue
				this.transfer_enqueue( address, count / total * this.subscription() )
			}
		}

		@ $mol_mem
		transfer_queue(next?: { address: string, amount: string, seqno?: number }[]) {
			return this.$.$mol_state_local.value( 'queue' , next ) ?? []
		}

		@ $mol_action
		transfer_enqueue(address: string, val: number) {
			const obj = { address, amount: val.toFixed(5) }
			this.transfer_queue( [...this.transfer_queue(), obj] )
		}

		@ $mol_mem
		transfer_next_moment(next?: $mol_time_moment) {
			let str = this.$.$mol_state_local.value('transfer_next_moment', next && next.toString())
			if (!str) {
				const next = new $mol_time_moment().merge({ day: 0 }).shift({ month: 1, day: -1 })
				str = this.$.$mol_state_local.value('transfer_next_moment', next.toString())!
			}
			return new $mol_time_moment(str)
		}

		@ $mol_action
		transfer() {
			if (!this.transfer_queue().length) return

			const [lead, ...queue] = this.transfer_queue()

			const seqno = this.wallet().info(lead.address).seqno
			if (!lead.seqno) {
				lead.seqno = seqno
				this.transfer_queue([lead, ...queue])
			}

			if (lead.seqno && seqno > lead.seqno) {
				this.transfer_queue(queue)
				return // transfered
			}

			const ok = this.wallet().send(lead.address, lead.amount, 'thanks.hyoo.ru', seqno)
			if (!ok) return

			this.transfer_queue(queue)
		}

		@ $mol_mem
		transfer_start() {
			if (Date.now() > this.transfer_next_moment().valueOf()) {
				this.transfer_enqueue_list()
				this.transfer_next_moment( new $mol_time_moment().merge({ day: 0 }).shift({ month: 1, day: -1 }) )
			}

			try {
				this.transfer()
			} catch(error) {
				if (error instanceof Promise) this.$.$mol_fail_hidden(error)
				console.error(error)
			}
			this.$.$mol_state_time.now(13000)
		}

		auto() {
			this.transfer_start()
		}
	}
	
}
