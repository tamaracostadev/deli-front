<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px">
    <v-card>
        <v-card-title>
            <span class="headline">{{title}}</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                        v-model="category.name"
                        label="Nome"
                        required
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
            color="blue darken-1"
            text
            @click="$emit('close')"
            >
                Cancelar
            </v-btn>
            <v-btn
            color="blue darken-1"
            text
            :loading="loading"
            :disabled="loading"
            @click="mode === 'Nova'? save() : update()"
            >
                Salvar
            </v-btn>
        </v-card-actions>
    </v-card>
    </v-dialog>
</template>

<script>

export default {
    props:{
        type:{
            type:String,
            default:'Insumo'
        },
        mode:{
            type:String,
            default:'Nova'
        },
        id:{
            type:Number,
            default:0
        }
    },
    data: () => ({
        dialog: true,
        category:{
            name:'',
            type:'',
            id:0
        },
        store:'input',
        loading:false,
        icon:'success'
    }),
    computed:{
        title(){
            return `${this.mode} Categoria - ${this.type}`;
        },
    },
    mounted(){
        if(this.mode === 'Editar'){
            const store = this.type === 'Insumo' ? 'input' : 'product';
            const category = this.$store.state.categories[store].find(item => item.id === this.id);
            this.category.name = category.name
            this.category.id = category.id
            this.category.type = category.type
        }
    },
    methods:{
        async save(){
            this.category.type = this.type.substring(0,1).toUpperCase();
            this.loading = true;
            const response = await this.$store.dispatch(`categories/addCategory`,this.category);
            this.icon = response.errors ? 'error' : 'success';
            this.loading = false;
            this.$toast(this.icon,response.errors ? response.message.join(' '): response.message);
            this.$emit('close');
        },
        async update(){
            this.loading = true;
            const response = await this.$store.dispatch(`categories/updateCategory`,this.category);
            this.icon = response.errors ? 'error' : 'success';
            this.loading = false;
            this.$toast(this.icon,response.errors ? response.message.join(' '): response.message);
            this.$emit('close');
        }
    }
}
</script>

<style>

</style>