namespace $ {
	
	export class $hyoo_thanks_app_domain extends $mol_object2 {
		
		@ $mol_mem
		state() {
			const obj = new this.$.$mol_state_shared
			obj.db_sync = ()=>null
			return obj
		}
		
		@ $mol_mem
		user() {
			let id = this.$.$mol_store_local.value( 'user' ) as string | null
			if( !id ) {
				id = Math.random().toString( 16 ).slice( 2 )
				new $mol_after_tick( ()=> this.$.$mol_store_local.value( 'user', id ) )
			}
			
			return this.person( id )
		}
		
		@ $mol_mem_key
		person( id: string ) {
			const obj = new $hyoo_thanks_app_person
			obj.id = $mol_const( id )
			obj.domain = $mol_const( this )
			return obj
		}
	}
}
