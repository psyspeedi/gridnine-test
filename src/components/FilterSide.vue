<template>
  <div class="filter">
    <div class="filter__top"></div>
    <div class="filter__content">
      <div class="filter__sort">
        <p class="title">Сортировать</p>
        <label class="label" for="priceHigh">
          <input
            type="radio"
            name="sort"
            id="priceHigh"
            @change="sortFlightsHandler"
            value="priceHigh"
            v-model="localSort"
          />
          <span class="text"> - по возрастанию цены</span>
        </label>

        <label class="label" for="priceLow">
          <input
            type="radio"
            name="sort"
            id="priceLow"
            @change="sortFlightsHandler"
            value="priceLow"
            v-model="localSort"
          />
          <span class="text"> - по убыванию цене</span>
        </label>

        <label class="label" for="timeDuration">
          <input
            type="radio"
            name="sort"
            id="timeDuration"
            @change="sortFlightsHandler"
            value="timeDuration"
            v-model="localSort"
          />
          <span class="text"> - по времени в пути</span>
        </label>
      </div>

      <div class="filter__transfer">
        <p class="title">Фильтровать</p>
        <label class="label" for="transfer">
          <input type="checkbox" id="transfer" @change="transferHandler" v-model="transfer" />
          <span class="text"> - 1 пересадка</span>
        </label>
        <label class="label" for="noTransfer">
          <input type="checkbox" id="noTransfer" @change="transferHandler" v-model="noTransfer" />
          <span class="text"> - без пересадок</span>
        </label>
      </div>

      <div class="filter__range">
        <p class="title">Цена</p>

        <label class="label" for="priceMin">
          <span class="text">От</span>
          <input class="range-price" id="priceMin" type="number" @input="minPriceHandler" v-model="localPriceMin" />
        </label>

        <label class="label" for="priceMax">
          <span class="text">До</span>
          <input class="range-price" id="priceMax" type="number" @input="maxPriceHandler" v-model="localPriceMax" />
        </label>
      </div>

      <div class="filter__airlines">
        <p class="title">Авиакомпании</p>

        <label v-for="(a, idx) in airlines" class="label" :for="a.airlineCode" :key="idx">
          <input type="checkbox" :id="a.airlineCode" v-model="a.checked" />

          <span class="text text-overflow">
            - {{a.caption}}
          </span>
          <span class="from-price text">от {{a.priceMin}} р.</span>
        </label>
      </div>
    </div>
    <div class="filter__bottom"></div>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapMutations } from 'vuex'
  export default {
    name: 'FilterSide',
    data: () => ({
      localSort: undefined,
      localPriceMin: undefined,
      localPriceMax: undefined,
      transfer: false,
      noTransfer: false,
    }),
    computed: {
      ...mapGetters(['flights']),
      ...mapState(['sort', 'priceMin', 'priceMax', 'airlines'])
    },
    methods: {
      ...mapMutations(['setSort', 'setTransfer', 'setPriceMin', 'setPriceMax']),
      sortFlightsHandler() {
        this.setSort(this.localSort)
      },
      transferHandler() {
        if (this.transfer && this.noTransfer || !this.transfer && !this.noTransfer) {
          this.setTransfer('all')
        }

        if (this.transfer && !this.noTransfer) {
          this.setTransfer('with')
        }

        if (!this.transfer && this.noTransfer) {
          this.setTransfer('without')
        }
      },
      minPriceHandler() {
        this.setPriceMin(+this.localPriceMin)
      },
      maxPriceHandler() {
        this.setPriceMax(+this.localPriceMax)
      }
    },
    created() {
      this.localSort = this.sort
      this.localPriceMin = this.priceMin
      this.localPriceMax = this.priceMax
    }
  }
</script>

<style scoped>
  .filter {
    width: 256px;
    margin-right: 25px;
  }

  .filter__content {
    margin-left: 20px;
    margin-right: 20px;
  }

  .filter__sort {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
  }

  .title {
    font-weight: 600;
    color: #425668;
    font-size: 12px;
    margin-bottom: 22px;
  }

  .text {
    color: #425668;
    font-size: 12px;
    margin-right: 3px;
    white-space: nowrap;
  }

  .text-overflow {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 110px;
  }

  .label {
    display: flex;
    align-items: center;
    margin-bottom: 3px;
    max-width: max-content;
    width: 100%;
    cursor: pointer;
  }

  .label input {
    margin-right: 4px;
    cursor: pointer;
  }

  .label input[type='number'] {
    padding: 0 2px;
    color: #425668;
    cursor: pointer;
  }

  .filter__transfer {
    margin-bottom: 20px;
  }

  .filter__range {
    display: flex;
    flex-direction: column;
  }

  .filter__range label {
    margin-bottom: 15px;
  }

  .range-price {
    border: 1px solid #777777;
    border-radius: 3px;
  }

  .from-price {
    align-self: end;
  }

  .filter__top {
    height: 37px;
    background: #d9d9d9;
    margin-bottom: 38px;
  }

  .filter__bottom {
    background: #d9d9d9;
    height: 144px;
    margin-top: 40px;
  }
</style>
