import axios from 'axios';
const KEY = 'AIzaSyAkmdItqzkmMSgNRsFNYAEufUMyrVVzoXk'; // mention your youtube API key here
// AIzaSyD5ygG6aIKpB1ijVu0-HD9qer1g4NrEGSc
export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 10,
        key: KEY
    }
})