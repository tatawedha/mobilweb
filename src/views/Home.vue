<template>
  <b-container>
    <b-row align-v="center">
      <sales-card v-for=" data in displaySales" :key="data.id" :name="data.name"></sales-card>
    </b-row>
     <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      first-text="First"
      prev-text="Prev"
      next-text="Next"
      last-text="Last"
      @input="paginate(currentPage)"
    ></b-pagination>
  </b-container>
</template>

<script>
// @ is an alias to /src
import salescard from "../components/salesCard";
import {mapGetters} from "vuex";

export default {
  name: "Home",
  components: { "sales-card": salescard },
  computed:{
    ...mapGetters(["dataSales", "displaySales","rows"])
  },
  data(){
    return{
      // dataSales:[],
      // displaySales:[],
      currentPage:1,
      // rows: 1,
      perPage:6 
      
    }
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
       await this.$store.dispatch("fetchSales")
      console.log(this.dataSales);
    },
    paginate(currentPage){
     this.$store.dispatch("paginate", {currentPage, perPage: this.perPage})
    }
  },
};
</script>
