namespace $.$$ {

	export class $hyoo_thanks_app_test extends $.$hyoo_thanks_app_test {

		@ $mol_mem
		wallet() {
			const keys = this.ton().keys()
			const wallet = this.ton().wallet({ publicKey: keys.publicKey })
			return wallet
		}

		wallet_create() {
			console.log(this.wallet().ton().keys())
			console.log(this.wallet().address())
			console.log(this.wallet().info())
			console.log(this.transaction_list())
		}

		send() {
			this.wallet().send(
				'EQCJ8v-iq5PmU06yDlsiTFQ6n9qtIWdUamAAoG3RBKuruZKJ',
				new $mol_ton_amount('0.01'),
				'hello' + new Date().toString(),
			)
		}

		@ $mol_mem
		transaction_list() {
			return this.wallet().ton().transaction_list(this.wallet().address().toString())
		}

		auto() {
			this.wallet()
		}

	} 

}
