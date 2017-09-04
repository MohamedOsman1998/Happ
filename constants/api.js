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
        this.TetrisPath = this.generalPath + '/findAllTetris';
    }

    

    async addPoint(name, ifImage, ifVideo, imgPath, VidPath, Country, ifFeautured, tetrisType, lng, lat){
        const res = await axios.post(this.generalPath, {
            name: name,
            ifImage: ifImage,
            ifVideo: ifVideo,
            imgPath: imgPath,
            VidPath: VidPath,
            Country: Country,
            ifFeautured: ifFeautured,
            tetrisType: tetrisType,
            loc: lng + ',' + lat
        })
        return res;
    }

    async RandRoullette(){
        try{
        const {data} = await axios.get(this.RoullettePath);

        return data.hireApp[0];
        }catch (e){
            console.log(e);
        }
    }

    async CountriesList(){
        try{
        const {data} = await axios.get(this.CountriesPath);
       // console.log(data.hireApp);
        return data.hireApp;
        } catch(e){
            console.log(e)
        }
    }

    async TetrisList(){
        try{
        const {data} = await axios.get(this.TetrisPath);
       // console.log(data.hireApp);
        return data.hireApp;
        } catch(e){
            console.log(e)
        }
    }

    async findPoints(lng1, lat1, lng2, lat2){
        this.pointsPath = this.generalPath + '/' + lng1.toString() + '/' + lat1.toString() + '/' + lng2.toString() + '/' + lat2.toString();

        try{
        const {data} = await axios.get(this.pointsPath);

        return data.hireApp;
        }catch(e){
            console.log(e);
        }
    }

}

export {
    HireAppApi
};
