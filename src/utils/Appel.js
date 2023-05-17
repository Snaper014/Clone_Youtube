import axios from "axios";


const URL = process.env.REACT_APP_URL_YTB
const KEY_API = process.env.REACT_APP_API_KEY
const options = {
    headers: {
      'X-RapidAPI-Key': `${KEY_API}`,
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
  };
  async function Recherche(search){
    const endpoint = `search?q=${search}&part=snippet%2Cid&regionCode=FR&maxResults=10`
        const reponse = await axios.get(`${URL}/${endpoint}`, options).catch(error => console.log(error.message))
        return reponse
  }
  async function DetailVideos(id){
    const endpoint = `videos?part=contentDetails%2Csnippet%2Cstatistics&id=${id}`
      const reponse = await axios.get(`${URL}/${endpoint}`, options).catch(error => console.log(error.message))
      return reponse
  }
  async function Suggestions(id){
    const endpoint = `search?part=snippet&relatedToVideoId=${id}&type=video`
      const reponse = await axios.get(`${URL}/${endpoint}`, options).catch(error => console.log(error.message))
      return reponse
  }
export {Recherche, DetailVideos, Suggestions}
