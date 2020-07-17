<template>
  <div class="inner-card">
    <div class="inner-card__top">
      <span class="from">{{cityFrom}}, {{airportFrom}}</span>
      <div class="code-from">({{codeFrom}})
        <svg class="arrow" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="0 0 640 640" width="640" height="640">
          <path d="M3.33 283.94L640 283.94L640 303.38L3.33 303.38L3.33 283.94Z" id="a3fSp1ri5"></path>
          <path d="M633.94 306.16L649.26 291.56L551.5 189.02L536.18 203.62L633.94 306.16Z" id="a9wrAlHJ6l"></path>
          <path d="M646.92 294.7L629.73 282.34L547.05 397.38L564.23 409.73L646.92 294.7Z" id="lyto9Q0c6"></path>
        </svg>
      </div>
      <span class="to">{{cityTo}}, {{airportTo}}</span>
      <div class="code-to">({{codeTo}})</div>
    </div>

    <div class="inner-card__content">
      <div class="date-from">
        <span class="time">{{dateFrom | time}}</span>
        <span class="date">{{dateFrom | date}}</span>
      </div>
      <div class="duration">
        <svg class="watch" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
          <path d="M500,990C231.3,990,10,768.7,10,500C10,231.3,231.3,10,500,10c268.7,0,490,221.3,490,490C990,768.7,771.9,990,500,990L500,990z M500,63.7c-240.3,0-436.3,196-436.3,436.3c0,240.2,196,436.2,436.3,436.2c240.3,0,436.3-196,436.3-436.2C936.3,256.6,740.3,63.7,500,63.7L500,63.7z"/>
          <path d="M582.2,667.5c-9.5,0-15.8-3.2-22.1-9.5l-88.5-94.8c-6.3-6.3-3.1-15.8-3.1-22.1V281.9c0-19,15.8-31.6,31.6-31.6c19,0,31.6,15.8,31.6,31.6v246.6l79,85.3c12.6,12.7,9.5,34.8-3.2,47.4C601.2,664.4,588.5,667.5,582.2,667.5L582.2,667.5z"/>
        </svg>
        {{duration | duration}}</div>
      <div class="date-to">
        <span class="date">{{dateTo | date}}</span>
        <span class="time">{{dateTo | time}}</span>
      </div>
      <div class="transfer">
        <div v-show="transfer > 0" class="transfer__active">
          {{transfer}} пересадка
        </div>
      </div>
    </div>

    <div class="inner-card__footer">Рейс выполняет: {{airline}}</div>
  </div>
</template>

<script>
  export default {
    name: 'FlightCardInfo',
    props: {
      flights: {
        type: Object,
        required: true
      },
      direction: {
        type: Number,
        required: true
      }
    },
    computed: {
      airportFrom() {
        return this.flights.flight.legs[this.direction].segments[0].departureAirport.caption
      },
      cityFrom() {
        return this.flights.flight.legs[this.direction].segments[0].departureCity ? this.flights.flight.legs[this.direction].segments[0].departureCity.caption : ''
      },
      codeFrom() {
        return this.flights.flight.legs[this.direction].segments[0].departureAirport.uid
      },
      dateFrom() {
        return this.flights.flight.legs[this.direction].segments[0].departureDate
      },
      airportTo() {
        return this.flights.flight.legs[this.direction].segments[this.flights.flight.legs[this.direction].segments.length - 1].departureAirport.caption
      },
      cityTo() {
        return this.flights.flight.legs[this.direction].segments[this.flights.flight.legs[this.direction].segments.length - 1].departureCity.caption
      },
      codeTo() {
        return this.flights.flight.legs[this.direction].segments[this.flights.flight.legs[this.direction].segments.length - 1].departureAirport.uid
      },
      dateTo() {
        return this.flights.flight.legs[this.direction].segments[this.flights.flight.legs[this.direction].segments.length - 1].departureDate
      },
      duration() {
        return this.flights.flight.legs[this.direction].duration
      },
      airline() {
        return this.flights.flight.carrier.caption
      },
      transfer() {
        return this.flights.flight.legs[this.direction].segments.length - 1
      }
    }
  }
</script>

<style scoped>
  .inner-card {
    width: 620px;
    color: #1c1c1c;
    margin: 0 auto;
    padding-left: 10px;
    padding-right: 10px;
  }

  .inner-card__top {
    display: flex;
    align-items: center;
    padding-bottom: 15px;
    padding-top: 15px;
    position: relative;
    font-size: 16px;
  }

  .inner-card__top:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: -10px;
    height: 1px;
    width: 620px;
    background: #e5e5e5;
  }

  .inner-card__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 15px;
    flex-wrap: wrap;
  }

  .time {
    font-size: 21px;
    padding-right: 5px;
  }

  .date {
    padding-right: 5px;
    color: #0087c9;
  }

  .duration {
    display: flex;
    align-items: center;
  }

  .watch {
    margin-right: 5px;
  }

  .transfer {
    width: 516px;
    height: 1px;
    background: #a2a2a2;
    margin-top: 15px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 23px;
    position: relative;

  }

  .transfer__active {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 110px;
    height: 20px;
    background: white;
    left: calc(50% - 55px);
    top: calc(50% - 10px);
    color: #ff8e1d;
  }


  .code-from {
    display: flex;
    align-items: center;
    color: #0087c9;
    margin-left: 5px;
  }

  .code-to {
    margin-left: 5px;
    color: #0087c9;
  }

  .arrow {
    width: 16px;
    height: 16px;
    fill: #0087c9;
    margin-left: 5px;
    margin-right: 5px;
  }

  .watch {
    width: 15px;
    height: 15px;
  }

  .inner-card__footer {
    margin-bottom: 12px;
  }
</style>
