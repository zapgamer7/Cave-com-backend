var alimento = localStorage.getItem("alimentos")
var alimentoformatado = JSON.parse(alimento)




var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);

      //console.log(myObj)

      for(var i = 0; i<alimentoformatado.length; i++ ){
        //console.log(alimentoformatado[i].id)

        var teste = myObj.filter(item => item.id_alimento == alimentoformatado[i].id)

        teste.map((item, index)=>{
          //console.log(item)
          let alimentoItem = document.querySelector('.models .alimento').cloneNode(true)
      
          document.querySelector('.iten-area').append(alimentoItem)
      
          alimentoItem.querySelector('.nome-alimento h1').innerHTML = item.nome_alimento
          alimentoItem.querySelector('.preco-alimento h1').innerHTML = `R$${item.preco_alimento}`
          alimentoItem.querySelector('.image-alimento img').src = `/imagens_cadastro/${item.dest_imagem}`
      })
      }



      //console.log(teste)


    }
  };
xmlhttp.open("get", "/dados/alimentos.json", true)
xmlhttp.send()

function apagaItem(id){
  const listaDeItemAtualizada = alimentoformatado.filter((itemAtual)=>{
    itemAtual.id !== 1
  })
  console.log(listaDeItemAtualizada)

  alimentoformatado = listaDeItemAtualizada

  let stringListaDeItemAtualizada = JSON.stringify(listaDeItemAtualizada)

  console.log(stringListaDeItemAtualizada)

  localStorage.setItem("alimentos", stringListaDeItemAtualizada)
}