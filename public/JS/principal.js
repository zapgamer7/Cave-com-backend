arrayalimentos = new Array()
// fetch("/dados/alimentos.json").then((response)=>{
//     response.json().then((dados)=>{
//         console.log(dados)
//     })
// })

arrayalimentos = localStorage.getItem("alimentos")

//console.log(arrayalimentos)

arrayalimentos = JSON.parse(arrayalimentos)

if(!arrayalimentos){
    arrayalimentos = []
}

function teste(){
    var alimento = document.getElementsByName("alimentos")
    for(var i = 0; i<alimento.length; i++ ){
        if(alimento[i].checked){
            var chackbox = alimento[i]

             arrayalimentos.push( {
                 id: chackbox.value
             })
            console.log(arrayalimentos)

        }
    }
    var tustus = JSON.stringify(arrayalimentos)
    localStorage.setItem('alimentos', tustus)
    console.log(arrayalimentos)
}

function apagar(){
    sessionStorage.removeItem('alimentos')
}
/*function autoRefresh() {
    window.location = window.location.href;
}
setInterval('autoRefresh()', 5000);
*/