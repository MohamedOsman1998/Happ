// export const HireAppApi = () =>
//     console.log("test");
//     fetch('http://192.168.1.3:1337/api/hireApp')
//         .then(res => res.json());

import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.1.3:1337/api/hireApp';

class HireAppApi {
    constructor(){
        this.generalPath = axios.defaults.baseURL;
        this.RoullettePath = this.generalPath + '/sendRandRoullette';
        this.CountriesPath = this.generalPath + '/findAllCountries';
    }

    //ADD HERE THE POST FUNCTION

    async RandRoullette(){
        const {data} = await axios.get(this.RoullettePath);

        return data.hireApp;
    }

    async CountriesList(){
        const {countries} = await axios.get(this.CountriesPath);

        return countries.hireApp;
    }

    async findPoints(lng1, lat1, lng2, lat2){
        this.pointsPath = this.generalPath + '/' + lng1.toString() + '/' + lat1.toString() + '/' + lng2.toString() + '/' + lat2.toString();

        const {points} = await axios.get(this.pointsPath);

        return points.hireApp;
    }

}

export {
    HireAppApi
};
