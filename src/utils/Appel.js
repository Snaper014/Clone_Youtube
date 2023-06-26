import axios from "axios";


const KEY_API = process.env.REACT_APP_API_KEY;
  const options = {
    headers: {
      'X-RapidAPI-Key': `${KEY_API}`,
      'X-RapidAPI-Host': 'youtube-v3-alternative.p.rapidapi.com'
    }
  };
  const optionsVersion3 = {
    headers: {
      'X-RapidAPI-Key': `${KEY_API}`,
      'X-RapidAPI-Host': 'yt-api.p.rapidapi.com',
    }
  };

  async function Recherche(search){
    const endpoint = `search?query=${search}&geo=FR&lang=fr`
        const reponse = await axios.get(`https://youtube-v3-alternative.p.rapidapi.com/${endpoint}`, options).catch(error => console.log(error.message))
        return reponse
  }
  async function DetailVideos(id){
    const endpoint = `video/info?id=${id}`
      const reponse = await axios.get(`https://yt-api.p.rapidapi.com/${endpoint}`, optionsVersion3).catch(error => console.log(error.message))
      
      return reponse
  }
  async function Suggestions(id){
    const endpoint = `related?id=${id}&geo=US&lang=en`
      const reponse = await axios.get(`https://youtube-v3-alternative.p.rapidapi.com/${endpoint}`, options).catch(error => console.log(error.message))
      
      return reponse
  }
  async function fetchTrends(categorie = 'now'){
      const endpoint = `trending?geo=FR&type=${categorie}&lang=fr`
      const reponse = await axios.get(`https://yt-api.p.rapidapi.com/${endpoint}`, optionsVersion3).catch(error => console.log(error.message))
      return reponse
  }
  async function FetchMusique(playlist){
    const reponse = await axios.get(`https://yt-api.p.rapidapi.com/playlist?id=${playlist}&geo=FR&lang=fr`, options).catch(error => console.log(error.message))
    return reponse
  }
  async function FetchHomeShorts(){
    const reponse = await axios.get(`https://yt-api.p.rapidapi.com/home?geo=FR&lang=fr`, optionsVersion3).catch(error => console.log(error.message))
    return reponse

  }
  async function FetchHomeFeed(){
    const reponse = await axios.get(`https://yt-api.p.rapidapi.com/home?geo=FR&lang=fr`, optionsVersion3)
    return reponse
  }
  async function GetActus(){
    const reponse = await axios.get(`https://yt-api.p.rapidapi.com/channel/home?id=UCYfdidRxbB8Qhf0Nx7ioOYw&geo=FR&lang=fr`, optionsVersion3)
    return reponse
  }
  async function GetCategorySport(){
      const reponse = await axios.get(`https://yt-api.p.rapidapi.com/channel/home?id=UCEgdi0XIXXZ-qJOFPf4JSKw&geo=FR&lang=fr`, optionsVersion3)
      return reponse
  }
  async function GetCategoryCulture(){
    const reponse = await axios.get(`https://yt-api.p.rapidapi.com/channel/home?id=UCtFRv9O2AHqOZjjynzrv-xg&geo=FR&lang=fr`, optionsVersion3)
    return reponse
  }
  async function GetCategoryMode(){
    const reponse = await axios.get(`https://yt-api.p.rapidapi.com/channel/home?id=UCrpQ4p1Ql_hG8rKXIKM1MOQ&geo=FR&lang=fr`, optionsVersion3)
    return reponse
  }
export {Recherche, 
        DetailVideos, 
        Suggestions, 
        fetchTrends, 
        FetchMusique, 
        FetchHomeShorts, 
        FetchHomeFeed, 
        GetActus,
        GetCategorySport,
        GetCategoryCulture,
        GetCategoryMode,
      }
