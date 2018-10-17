const discount = 0.12;

const applySale = ()=> {
    // each fish returns DOM object 
    $(".on-sale").each((i,fish)=>{
        // $(fish) to turn it into fish object
        const fullPrice = $(fish).find('.price');
        // console.log(fullPrice.html());
        const newPrice = (parseInt(fullPrice.html()) * (1 - discount)).toFixed(2);
        //console.log(newPrice);
        fullPrice.html(newPrice);
    })
}
// Filter fish that are "on sale"

// Add fish to "Basket"

const writeFishes = (arrayOfFishes)=>{
    let domString ='';
    arrayOfFishes.forEach((fish) => {
        domString += `
        <div class="${fish.onSale ? 'on-sale' : ''} fish card col-md-6 col-md-offset-3">
                <div class="thumbnail">
                    <img src="${fish.imageSoure}"
                        alt="" width="40%">
                    <div class="caption">
                        <h3 id="thumbnail-label">${fish.name}</h3>
                        <p>$
                            <span class="price">${fish.basePrice}</span>
                        </p>
                    </div>
                    <div class="caption card-footer">
                        <button class="add btn btn-danger">Add To Basket</button>
                    </div>
                </div>
            </div>
        `
    })
    // write to the available div
    $('#available').append(domString);
              // or
    // $(domString).appendTo('#available');
 //    bindEvents();
    
}
// Event Listener for add to Basket
// const bindEvents = ()=> {
//     $(".add").on('click', (e) =>{
//         // // what is the div that has the fish
//         // const fishToMove = $(e.target).closest('.fish');
//         // // move it to 'snagged' div
//         // $("#snagged").append(fishToMove);
//         // // button text => remove from Basket | change class - "add" + "remove"
//         // $(e.target).text('Remove from Basket').addClass('remove').removeClass('add');
//         //  // Remove Fish
//     $(".remove").on('click',(e)=>{
    
//    })
//     });
// }



// Dynamically listens for events that happen on buttons with a class add
$('body').on('click', 'button.add', (e) => {
    // what is the div that has the fish
    const fishToMove = $(e.target).closest('.fish');
    // move it to the 'snagged' div
    $("#snagged").append(fishToMove);
    // button text => Remove from Basket | change class - 'add' + 'remove'
    $(e.target).text('Remove from Basket').addClass('remove').removeClass('add');
  })

  $('body').on('click', 'button.remove', (e) => {
    const fishToMove = $(e.target).closest('.fish');
      $("#available").append(fishToMove);
      $(e.target).text('Add To Basket').addClass('add').removeClass('remove');
    })

// Dynamically listens for events that happen on buttons with a class add
// $("body").on('click', 'button.add', () =>{
    
// });


$("#show-sale").click(()=>{
    // all divs with the class fish, give me just the ones WITHOUT the calss 'on-sale' and HIDE
    $(".fish").not(".on-sale").toggle();
    $("#show-sale").text((i, text)=>{
        if(text==="Show Sale Fish"){
            return "Show All";
        }else {
            return "Show Sale Fish";
        }
        // return (text === "Show Sale Fish") ? 'Show All' : 'Show Sale Fish'
    });
});

// load Fish
$.get('../db/fishes.json')
 .done((data)=>{
     console.log(data);
     writeFishes(data.fishes);
     applySale();
 })
 .fail((error)=>{
     console.error(error);
 });

// Event Listener
