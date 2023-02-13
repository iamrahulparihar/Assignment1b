const Order = require("./Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    CONTACT: Symbol("contact"),
    SIZE:   Symbol("size"),
    TOPPINGS:   Symbol("toppings"),
    DRINKS:  Symbol("drinks"),
    FLAVOUR: Symbol("flavour"),
    PAYMENT: Symbol("payment")
});

module.exports = class assignment extends Order{
    constructor(sNumber, sUrl){
        super(sNumber, sUrl);
        this.stateCur = OrderState.WELCOMING;
        this.contact="";
        this.sSize = "";
        this.sToppings = "";
        this.sDrinks = "";
        this.sItem = "Faluda";
        this.ssweets = "";
        this.price = 0;
        this.sflavour = "";

    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
          //welcoming
          case OrderState.WELCOMING:
                this.stateCur = OrderState.CONTACT;
                aReturn.push("Welcome to Faluda shop.");
                aReturn.push("Please enter your contact number");
                break; 
                //contact
          case OrderState.CONTACT:
            this.stateCur= OrderState.SIZE;
            this.contact= sInput;
            var contactr=/^\d{10}$/;
            if(contactr.test(this.contact)){
                this.stateCur= OrderState.SIZE;
                aReturn.push("whatt size would you like to have?"); 
            aReturn.push("Pease type small, medium or large for selecting size")
            aReturn.push("'small=$10' || 'medium=$15' || 'large=$20'")
            }
            else{
                this.stateCur=OrderState.CONTACT;
                this.contact=sInput;
                aReturn.push("Please give correct input!!")
            }
             break;

          //size
          case OrderState.SIZE:
                this.stateCur = OrderState.FLAVOUR
                this.sSize = sInput;
                if(this.sSize=="small" || this.sSize== "SMALL"){
                    this.price= this.price + 10;
                }                  else if(this.sSize=="medium" || this.sSize== "MEDIUM"){
                   this.price= this.price + 15;
                }
                else if(this.sSize=="large"  || this.sSize== "LARGE"){
                      this.price= this.price+ 20;
                }
                else{
                    aReturn.push("Please Give Correct Input")
                      this.stateCur=OrderState.SIZE
                      break;
                }
                aReturn.push("What flavour would you like to have");
                aReturn.push("Kesar or badam?");   
                aReturn.push("any flavor- $2 ");        
                  aReturn.push("Please type 'kesar' or 'badam' ");           
               break;
               //flavour
               case OrderState.FLAVOUR:
                this.stateCur = OrderState.TOPPINGS
                this.sflavour = sInput;
                if(this.sflavour=="kesar" || this.sflavour== "KESAR"){
                    this.price= this.price + 2;
                }                  
                else if(this.sflavour=="badam" || this.sflavour== "BADAM"){
                   this.price= this.price + 2;
                }
                else{
                    aReturn.push("Please Give Correct Input")
                    this.stateCur=OrderState.FLAVOUR
                      break;
                }
                aReturn.push(" Would you like to have another item? ");
                aReturn.push(" Jalebi=$5 or ice crream= $5 ");
                aReturn.push("Type 'jalebi' or 'icecream' ");
                aReturn.push("Type no if you do not want to add.")
                break;
                ////toppings
                case OrderState.TOPPINGS:
                  this.stateCur = OrderState.SWEETS
                  this.sToppings = sInput;
                  if(this.sToppings=="jalebi" || this.sToppings== "JALEBI"){
                    this.price= this.price + 5;
                }                  
                else if(this.sToppings=="icecream" || this.sToppings== "ICECREAM"){
                   this.price= this.price + 5;
                }
                else if(this.sToppings=="no" || this.sToppings== "NO"){
                  this.price= this.price + 0;
               }

                else{
                    aReturn.push("Please Give Correct Input")
                    this.stateCur=OrderState.TOPPINGS
                      break;
                }

                  aReturn.push("We have barfi or ladoo available ");
                  aReturn.push("you can have any sweet for $5");
                  aReturn.push("Please type 'barfi' or 'ladoo' ");
                  aReturn.push("Type 'no' if you do not want to add any  ");

                  break;

                  // SWEETS CASE
                  case OrderState.SWEETS:
                    this.stateCur= OrderState.PAYMENT
                    this.ssweets=sInput;
                    if(this.ssweets=="barfi" || this.ssweets== "BARFI"){
                      this.price= this.price + 5;
                  }                  
                  else if(this.ssweets=="ladoo" || this.ssweets== "LADOO"){
                     this.price= this.price + 5;
                  }
                  else if(this.ssweets=="no" || this.ssweets== "NO"){
                    this.price= this.price + 0;
                 }
  
                  else{
                      aReturn.push("Please Give Correct Input")
                      this.stateCur=OrderState.SWEETS
                        break;
                  }

                    
                  
                aReturn.push(`Thank-you for your order of ${this.sSize} faluda`);
                aReturn.push(` With flavour =  '${this.sflavour}' `);
               
                  if(this.sToppings=='no' || this.sToppings=='NO'){
                    aReturn.push( `Toppings-not selected`)
                  }
                  else{
                    aReturn.push( `With toppings = '${this.sToppings}' `)
                   
                  }


                  if(this.ssweets=='no' || this.ssweets=='NO' ){
                    aReturn.push( `Sweets-'not selected'`)
                    
                  }
                  else{
                    aReturn.push( `With sweets '${this.ssweets}'`)
                    
                  }


                aReturn.push( `your total is '${this.price}'`)
                // if(this.sDrinks){
                //     aReturn.push(this.sDrinks);
                // }
                aReturn.push(`Please click the link billow to pay for your order`);
                aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
                break;
            case OrderState.PAYMENT:
                console.log(sInput);
                this.isDone(true);
                let d = new Date();
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Your order will be delivered at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
    renderForm(sTitle = "-1", sAmount = "-1"){
      // your client id should be kept private
      if(sTitle != "-1"){
        this.sItem = sTitle;
      }
      if(sAmount != "-1"){
        this.price = sAmount;
      }
      const sClientID = process.env.SB_CLIENT_ID || 'ABlX6B8cn95k3I03JQ6k097M-O8xAoTq4srqDA5RbaXPBky0Whkoaijd'
      return(`
      <!DOCTYPE html>
  
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- Ensures optimal rendering on mobile devices. -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <!-- Optimal Internet Explorer compatibility -->
      </head>
      
      <body>
        <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        <script
          src="https://www.paypal.com/sdk/js?client-id=${sClientID}"> // Required. Replace SB_CLIENT_ID with your sandbox client ID.
        </script>
        Thank you ${this.contact} for your ${this.sItem} order of $${this.price}.
        <div id="paypal-button-container"></div>
  
        <script>
          paypal.Buttons({
              createOrder: function(data, actions) {
                // This function sets up the details of the transaction, including the amount and line item details.
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: '${this.price}'
                    }
                  }]
                });
              },
              onApprove: function(data, actions) {
                // This function captures the funds from the transaction.
                return actions.order.capture().then(function(details) {
                  // This function shows a transaction success message to your buyer.
                  $.post(".", details, ()=>{
                    window.open("", "_self");
                    window.close(); 
                  });
                });
              }
          
            }).render('#paypal-button-container');
          // This function displays Smart Payment Buttons on your web page.
        </script>
      
      </body>
          
      `);
  
    }
}