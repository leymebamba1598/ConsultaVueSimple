<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1>
     -->
    <div id="chart">
        <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
<div>
<div class="input-group input-group-sm mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-sm">Year</span>
  </div>
  <input type="text" class="form-control" aria-label="Small" v-model="year" aria-describedby="inputGroup-sizing-sm">
</div>

<div class="input-group input-group-sm mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-sm">Population</span>
  </div>
  <input type="text" class="form-control" aria-label="Small" v-model="population" aria-describedby="inputGroup-sizing-sm">
</div>

 <button type="button" class="btn btn-primary" @click="agregarPoblacion()">Agregar poblacion</button>
</div>
 

  <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nation</th>
      <th scope="col">Year</th>
      <th scope="col">Population</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item,index) in   this.tablaDatos" :key="index">
      <th scope="row">{{ index+1 }}</th>
      <td>{{ item.Nation }}</td>
      <td>{{ item.Year}}</td>
      <td>{{ item.Population}}</td>
    </tr>
  </tbody>
</table>

  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
// import axios from 'axios';
import servicioAPIS from "../service/serviceEjemplo"

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
      tablaDatos:[],
      year:'',
      population:'',
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
    async agregarPoblacion(){
        /*    await axios.post('localahots:8080//datausa.io/api/data?drilldowns=Nation&measures=Population',{
                Nation: "United States",
                Year: this.year,
                Population: this.population,
        })*/

    var poblacionNueva={
      Nation: "United States",
      Year: this.year,
      Population: this.population,
    }
    this.tablaDatos.push(poblacionNueva)
    this.year='';
    this.population='';
   },

    //Metodo asyncrono
     async  consumirApi () {
          // const data =await  axios.get('https://datausa.io/api/data?drilldowns=Nation&measures=Population')

             const data= await servicioAPIS.consumirApiPoblacionesUSS();
                console.log("Datos traidos desde api",data.data.data)
                this.poblacion=data.data.data;
               
                // llenamos arreglo Tabla
                this.tablaDatos=data.data.data
                

                 this.poblacion.filter((data)=>{
                      this.poblacionActual.push(data.Population)
                      this.Años.push(data.Year)
                    })

            //Asignar poblacion
            this.series=[{
                data:  this.poblacionActual
              }]

          // Asignamos años
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
