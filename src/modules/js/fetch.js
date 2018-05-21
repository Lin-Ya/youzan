import axios from 'axios'

function fetch(url,data) {
    return new Promise((resolve,reject)=>{
        axios.post(url,data).then(res=>{
            console.log(res)
            if(res.data.status === 200){
                resolve(res)
            }
        }).catch(error=>{
            reject(error)
        })
    })
}
export default fetch