namespace $.$$ {

	export class $hyoo_thanks_app_test extends $.$hyoo_thanks_app_test {

		@ $mol_mem
		wallet() {
			return this.ton().wallet( this.keys() ) 
		}

		@ $mol_mem
		words(next?: string[]) {
			return this.$.$mol_store_local.value('words', next)
		}

		@ $mol_mem
		keys() {
			let words = this.words()
			if (!words) words = this.words( $mol_ton_wallet.words_create() )
			return $mol_ton_wallet.words_to_pair(words)
		}

		wallet_create() {
			console.log(this.wallet().address().toString(true, true, true))
			console.log(this.wallet().info())
			console.log(this.wallet().transactions())
		}

		send() {
			this.wallet().send('EQCJ8v-iq5PmU06yDlsiTFQ6n9qtIWdUamAAoG3RBKuruZKJ', '0.0001', 'hello world!')
		}

		auto() {
			this.wallet()
		}

	} 

}
