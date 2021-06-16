let cookie = 'AccessToken=eyJ0cHkiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOiJhZG1pbiIsImV4cCI6MTYyMjYwNTE0MDQ3Mn0.C4Ydyyhm3V93dZfWxTExY31%2Bdc0GPT3mBUYXAoKUqbc; token=zxcv; ggggg=ë©ë¡±ì¿ í¤; user=John'
let cookieArr = cookie.split(';');


cookieArr.forEach(v=>{
    let [name,value] = v.split('=');
    if(name.trim() == 'AccessToken'){
        let jwt = value.split('.');
        let payload = Buffer.from(jwt[1],'base64').toString();
        let {userid} = JSON.parse(payload);
        console.log('첫번째 방법 : ',userid);
    }
})

let [userid] = 
cookie.split(';').filter( v => v.indexOf('AccessToken') == 0)
                 .map( v=>{
                     let [name,value] = v.split('=');
                     return JSON.parse(Buffer.from(value.split('.')[1],'base64').toString()).userid
                 })

console.log('두번째 방법 : ',userid);