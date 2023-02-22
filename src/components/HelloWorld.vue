<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1>
     -->
    <div id="chart">
        <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
      </div>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import axios from 'axios';
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
      poblacion:[],
      poblacionActual:[],
      Años:[],

      series: [{
            name: 'Poblacion',
            data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
          }],
          chartOptions: {
            chart: {
              height: 350,
              type: 'bar',
            },
            plotOptions: {
              bar: {
                borderRadius: 10,
                dataLabels: {
                  position: 'top', // top, center, bottom
                },
              }
            },
            dataLabels: {
              enabled: true,
              formatter: function (val) {
                return val + " Hab.";
              },
              offsetY: -20,
              style: {
                fontSize: '12px',
                colors: ["#304758"]
              }
            },
            
            xaxis: {
              categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              position: 'top',
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false
              },
              crosshairs: {
                fill: {
                  type: 'gradient',
                  gradient: {
                    colorFrom: '#D8E3F0',
                    colorTo: '#BED1E6',
                    stops: [0, 100],
                    opacityFrom: 0.4,
                    opacityTo: 0.5,
                  }
                }
              },
              tooltip: {
                enabled: true,
              }
            },
            yaxis: {
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
                formatter: function (val) {
                  return val + " hab. ";
                }
              }
            
            },
            title: {
              text: 'Monthly Inflation in Argentina, 2002',
              floating: true,
              offsetY: 330,
              align: 'center',
              style: {
                color: '#444'
              }
            }
          },
          
    }
   },
   created(){
    //Se ejecuta al inciar el componente
      this.consumirApi();
   },


   methods:{
    //Metodo asyncrono
     async  consumirApi(){
          const data =await  axios.get('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
          console.log("Datos traidos desde api",data.data.data)

                this.poblacion=data.data.data;

                 this.poblacion.filter((data)=>{
                      this.poblacionActual.push(data.Population)
                      this.Años.push(data.Year)
                    })

            //Asignar poblacion
            this.series=[{
                data:  this.poblacionActual
              }]

          //Asignamos años
              this.chartOptions={
                xaxis:{
                  categories: this.Años
                }
              }

       }
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
