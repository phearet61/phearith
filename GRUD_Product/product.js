

const post_product=()=>{

            const id      = document.querySelector('#id').value;
            const name    = document.querySelector('#name').value;
            const price   = document.querySelector('#price').value;
            const qty     = document.querySelector('#qty').value;
            const made_in = document.querySelector('#made_in').value;
            const image   = document.querySelector('#image').files[0];
    
    let tb_pro;
     if(localStorage.getItem('tb_pro') == null) {
        tb_pro = [];
    }else {
           tb_pro = JSON.parse(localStorage.getItem('tb_pro'));
   }
      if(id != ''&& name != ''&& price != ''&& qty != '' && made_in != ''&& image != '')
   {
     tb_pro.push({
            id: id,
            name: name,
            price: price,
            qty: qty,
            made_in: made_in,
            image: image.name
   });
          localStorage.setItem('tb_pro', JSON.stringify(tb_pro));
          document.querySelector('#id').value = '';
          document.querySelector('#name').value = '';
          document.querySelector('#price').value= '';
          document.querySelector('#qty').value =  '';
          document.querySelector('#made_in').value= '';
          document.querySelector('#image').value =  '';
   }
   else{
    swal("Error!", "You clicked the button!", "Error");
   }
} 
get_product=()=>{
      let html = '';
      let tb_pro;
      tb_pro = JSON.parse(localStorage.getItem('tb_pro'));
      tb_pro.sort((a,b)=> b.id - a.id );
      tb_pro.forEach((items,index) => {
        var { id,name,price,qty,made_in,image}= items;
    html += `
            <tr class=" text-dark">
            <td>${id}</td>
            <td>${name}</td>
            <td>$${price}</td>
            <td>${qty}</td>
            <td>${made_in}</td>
            <td>
                <img  width ="70" src="./img/${image}" alt="not">
            </td>
            <td>
                <button class="btn btn-success" onclick="update(${index})" data-bs-toggle="modal" data-bs-target="#exampleModal" >Edit</button>
                <button class="btn btn-danger"  onclick="detele_pro(${index})"=>Delete</button>
            </td>
          </tr>
    `;
    
     });
   document.querySelector('tbody').innerHTML = html;
    }
   get_product();

  const update=(index)=>{
          document.querySelector('#btn-update').style.display = 'block';
          document.querySelector('#btn-save').style.display = 'none';
          document.querySelector('.img').style.display = 'block';

      let tb_pro;
         
      if(localStorage.getItem('tb_pro') == null){
        tb_pro=[];
      }else{
        tb_pro = JSON.parse(localStorage.getItem('tb_pro'));
      }
        tb_pro.sort((a,b)=> b.id - a.id );
     
        document.querySelector('#id').value      =tb_pro[index].id;
        document.querySelector('#name').value    =tb_pro[index].name;
        document.querySelector('#price').value   =tb_pro[index].price;
        document.querySelector('#qty').value     =tb_pro[index].qty;
        document.querySelector('#made_in').value =tb_pro[index].made_in;
        document.querySelector('.img').innerHTML =`<img width="70" src="./img/${tb_pro[index].image}" alt="">`;
        document.querySelector('#old_image').value=tb_pro[index].image;

        document.querySelector('#btn-update').addEventListener('click',function(){
              const id      = document.querySelector('#id').value;
              const name    = document.querySelector('#name').value;
              const price   = document.querySelector('#price').value;
              const qty     = document.querySelector('#qty').value;
              const made_in = document.querySelector('#made_in').value;


              if(document.querySelector('#image').value == ''){
                   const image  = document.querySelector('#old_image').value;
                    tb_pro[index].image = image;
              } else{
                   const image = document.querySelector('#image').files[0];
                   tb_pro[index].image  = image.name;
              }
                  tb_pro[index].id      = id;
                  tb_pro[index].name    = name;
                  tb_pro[index].price   = price;
                  tb_pro[index].qty     = qty;
                  tb_pro[index].made_in = made_in;
                  localStorage.setItem('tb_pro',JSON.stringify(tb_pro));
                  get_product();
        });

        }
      document.querySelector('.btn-add')
      .addEventListener('click',function(){
      document.querySelector('#btn-update').style.display = 'none';
      document.querySelector('#btn-save').style.display = 'block';
      document.querySelector('.img').style.display      ='none';
      document.querySelector('#id').value = '';
      document.querySelector('#name').value = '';
      doocumet.querySelector('#price').value = '';
      document.querySelector('#qty').value   = '';
      document.querySelector('#image').value = '';
      });

     const detele_pro=(index)=>{
      
      let tb_pro;
         
      if(localStorage.getItem('tb_pro') == null){
        tb_pro=[];
      }else{
        tb_pro = JSON.parse(localStorage.getItem('tb_pro'));
      }
        tb_pro.sort((a,b)=> b.id - a.id );
        tb_pro.splice(index, 1);
        localStorage.setItem('tb_pro',JSON.stringify(tb_pro));
        get_product();
     }
        
