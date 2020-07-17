<template>
  <h3 class="empty" v-if="!this.flights.length">НЕ НАЙДЕНО</h3>
  <div v-else class="card-wrapper">
    <div class="card" v-for="(f, idx) in this.flights" :key="idx" v-show="idx <= (flightsPerPage - 1)">
      <div class="card__header">
        <img class="card__header--logo" :src="logoSrc(f.flight.carrier.airlineCode)" />
        <div class="card__header--info">
          <div class="price">{{ f.flight.price.total.amount | currency }}</div>
          <div class="info">Стоимость для одного взрослого пассажира</div>
        </div>
      </div>

      <FlightCardInfo :direction="0" :flights="f" :class="f.flight.legs.length > 1 ? 'top-card-border' : null" />
      <FlightCardInfo :direction="1" :flights="f" v-show="f.flight.legs.length > 1" />

      <button class="choose">выбрать</button>
    </div>
  </div>
</template>

<script>
  import FlightCardInfo from './FlightCardInfo'
  import { mapGetters, mapState } from 'vuex'
  export default {
    name: 'FlightCard',
    components: { FlightCardInfo },
    computed: {
      ...mapGetters(['flights']),
      ...mapState(['flightsPerPage'])
    },
    methods: {
      logoSrc(code) {
        //все лого не искал
        switch (code) {
          case 'LO':
            return require('../assets/lot.svg')

          case 'SU':
            return require('../assets/aeroflot.png')


          default:
            return ''
        }
      }
    }
  }
</script>

<style scoped>
  .card {
    width: 100%;
    margin-bottom: 30px;
  }

  .card__header {
    width: 100%;
    height: 44px;
    background: #0087c9;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 7px;
    color: white;
  }

  .card__header--logo {
    max-height: 90px;
  }

  .card__header--info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .price {
    font-size: 21px;
    font-weight: 500;
  }

  .info {
    font-size: 11px;
  }

  .choose {
    height: 41px;
    width: 100%;
    background: #ffb168;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: 0.3s;
  }

  .choose:hover {
    background: #ffb110;
  }

  .top-card-border {
    border-bottom: 2px solid #0084c5;
  }

  .empty {
    width: 100%;
    min-height: 200px;
    text-align: center;
    padding-top: 50px;
  }
</style>
