<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1>
     -->
      <div id="chart">
        <apexchart type="donut" :options="chartOptions" :series="series"></apexchart>
      </div>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
   components: {
          apexchart: VueApexCharts,
   },
   data(){
    return{
        series: [44, 55, 41, 17, 15],
          chartOptions: {
            chart: {
              type: 'donut',
            },
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          },    
    }
   },
   created(){
    // alert('Hola')
    //api rest
    this.series=[20,100,200]
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
