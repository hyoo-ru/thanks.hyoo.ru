namespace $.$$ {

	export class $hyoo_thanks_app_test extends $.$hyoo_thanks_app_test {

		wallet_create() {
			const { keys, address } = this.ton().wallet_create()
			console.log(keys, address)
		}

		wallet_private(next?: string) {
			return this.$.$mol_state_local.value('wallet_private', next) ?? 'none'
		}

		wallet_public(next?: string) {
			return this.$.$mol_state_local.value('wallet_public', next) ?? 'none'
		}

		wallet_address(next?: string) {
			return this.$.$mol_state_local.value('wallet_address', next) ?? 'none'
		}

	} 

}
