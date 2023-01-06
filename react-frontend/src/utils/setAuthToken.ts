import axios from 'axios'
const setAuthToken = (token: any) => {
   if(token){
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      axios.defaults.headers.common['Authorization']
   }else{
      delete axios.defaults.headers.common['Authorization']
   }
}
export default setAuthToken;