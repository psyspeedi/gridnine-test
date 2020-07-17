import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/flights.json'

Vue.use(Vuex)

//вспомогательные методы

const filterWithTransfer = flights => {
  return flights.filter(f => f.flight.legs[0].segments.length > 1 || f.flight.legs[f.flight.legs.length - 1].segments.length > 1)
}

const filterWithoutTransfer = flights => {
  return flights.filter(f => f.flight.legs[0].segments.length === 1 && f.flight.legs[f.flight.legs.length - 1].segments.length === 1)
}

const filterAirlines = (flights, airlines) => {
  let result = []
  airlines.forEach(a => {
    result = [...result,...flights.filter(f => f.flight.carrier.airlineCode === a.airlineCode)]
  })
  return result
}

const sortByPriceHigh = flights => {
  return flights.sort((a, b) => {
    return +a.flight.price.total.amount - +b.flight.price.total.amount
  })
}

const sortByPriceLow = flights => {
  return flights.sort((a, b) => {
    return +b.flight.price.total.amount - +a.flight.price.total.amount
  })
}

const sortByTimeDuration = flights => {
  return flights.sort((a, b) => {
    return (
      +a.flight.legs[0].duration +
      +a.flight.legs[1].duration -
      (+b.flight.legs[0].duration + +b.flight.legs[1].duration)
    )
  })
}

const filterPriceRange = (flights, state) => {
  return flights.filter(f => +f.flight.price.total.amount >= state.priceMin && +f.flight.price.total.amount <= state.priceMax)
}

const setUniqueAirlines = (flights) => {
  const result = {}
  const resultArray = []

  flights.forEach(f => {
    if (!result[f.flight.carrier.airlineCode]) {
      result[f.flight.carrier.airlineCode] = {...f.flight.carrier, checked: false}
    }
  })

  Object.keys(result).forEach(key => {
    resultArray.push(result[key])
  })

  resultArray.forEach(airlines => {
    const priceMin = Math.min.apply(null, flights.filter(f => f.flight.carrier.airlineCode === airlines.airlineCode).map(f => (+f.flight.price.total.amount)))
    airlines.priceMin = priceMin
  })

  return resultArray
}

//-------------//

export default new Vuex.Store({
  state: {
    flights: [],
    flightsPerPage: 2,
    sort: 'priceHigh',
    transfer: 'all',
    airlines: [],
    priceMin: 0,
    priceMax: undefined
  },
  getters: {
    flights(state, getters) {
      let result

      if (state.sort === 'priceHigh') {
        result = sortByPriceHigh(state.flights)
      }

      if (state.sort === 'priceLow') {
        result = sortByPriceLow(state.flights)
      }

      if (state.sort === 'timeDuration') {
        result = sortByTimeDuration(state.flights)
      }

      if (state.transfer === 'without') {
        result = filterWithoutTransfer(result)
      }

      if (state.transfer === 'with') {
        result = filterWithTransfer(result)
      }

      if (state.airlines.some(a => a.checked === true) && state.airlines.some(a => a.checked === false)) {
        result = filterAirlines(result, getters.checkedAirlines)
      }

      result = filterPriceRange(result, state)

      return result
    },
    checkedAirlines(state) {
      return state.airlines.filter(a => a.checked === true)
    }
  },
  mutations: {
    setFlights(state, flights) {
      state.flights = flights
    },
    setAirlines(state) {
      const airlines = setUniqueAirlines(state.flights)
      state.airlines = airlines
    },
    setSort(state, sort) {
      state.sort = sort
    },
    setPriceMin(state, price) {
      state.priceMin = price
    },
    setPriceMax(state) {
      const price = Math.max.apply(null, state.flights.map(f => (+f.flight.price.total.amount)))
      state.priceMax = price
    },
    setTransfer(state, transfer) {
      state.transfer = transfer
    },
    setFlightsPerPage(state) {
      state.flightsPerPage = state.flightsPerPage + 2
    },
    setReady(state, ready) {
      state.ready = ready
    }
  },
  actions: {
    fetchFlights({ commit }) {
      const flights = api.result.flights
      commit('setFlights', flights)
    }
  }
})
