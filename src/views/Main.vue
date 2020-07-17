<template>
  <div class="container">
    <FilterSide />
    <div class="main">
      <FlightCard />
      <button :disabled="showMoreButtonDisabled" @click="showMoreHandler" class="more">Показать еще</button>
    </div>
  </div>
</template>

<script>
  import FlightCard from '../components/FlightCard'
  import FilterSide from '../components/FilterSide'
  import {mapGetters, mapState} from 'vuex'
  export default {
    name: 'Home',
    components: {FilterSide, FlightCard},
    computed: {
      ...mapGetters(['flights']),
      ...mapState(['flightsPerPage']),
      showMoreButtonDisabled() {
        if (this.flightsPerPage >= this.flights.length) {
          return true
        }
        return false
      }
    },
    methods: {
      showMoreHandler() {
        this.$store.commit('setFlightsPerPage')
      }
    },
    created() {
      this.$store.dispatch('fetchFlights')
      this.$store.dispatch('fetchAirlines')
      this.$store.dispatch('fetchPriceMax')
    }
  }
</script>

<style scoped>
  .container {
    display: flex;
    justify-content: center;
  }

  .main {
    width: 640px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }

  .more {
    width: 250px;
    height: 28px;
    font-size: 18px;
    background: #f1f1f1;
    border: 1px solid #a6a5a5;
    outline: 1px solid #575454;
    margin-top: -10px;
    cursor: pointer;
    transition: 0.3s;
    margin-bottom: 50px;
  }

  .more:hover {
    box-shadow: 0px 7px 24px 2px rgba(0,0,0,0.75);
  }

  .more:disabled {
    pointer-events: none;
  }
</style>
