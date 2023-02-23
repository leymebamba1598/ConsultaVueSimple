import Service from './service.js'


export default {
    consumirApiPoblacionesUSS() {
        try{
            return Service.get(`/api/data?drilldowns=Nation&measures=Population`)
        }catch(data){
         console.log()
        }
      
  }

}