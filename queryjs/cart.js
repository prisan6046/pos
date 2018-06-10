
module.exports = function(intiItem){
    this.item = intiItem.item || {};
    this.totalQty = intiItem.totalQty || 0;
    this.totalPrice = intiItem.totalPrice || 0;
    this.totalSum = intiItem.totalSum || 0;
    this.add = function(item , id ,price){
        var storedItem = this.item[id];
        
        if(!storedItem){
            storedItem = this.item[id] = { item : item, qty : 0 , price : 0 , sum : 0};
            storedItem.price = price;
        

        }
        storedItem.qty++;
        storedItem.price = price * 1;
      
        this.totalSum = storedItem.price;
        this.totalQty++;
        this.totalPrice += storedItem.price;
    }
    this.addOrder = function(item , id ,number ,price){
        console.log(number);
        var storedItem = this.item[id];
        
        if(!storedItem){
            storedItem = this.item[id] = { item : item, qty : 0 , price : 0 , sum : 0};
            storedItem.price = price;
        }
        storedItem.qty = (parseInt(storedItem.qty) + parseInt(number));
        storedItem.price = (price*number) * 1;
       
        this.totalQty*number;
        this.totalPrice += storedItem.price;
    }
    this.delOrder = function(item , id ,number ,price){
        console.log(number);
        var storedItem = this.item[id];
        
        if(!storedItem){
            storedItem = this.item[id] = { item : item, qty : 0 , price : 0 , sum : 0};
            storedItem.price = price;
        }
        storedItem.qty = (parseInt(storedItem.qty) - parseInt(number));
        storedItem.price = (price - (price*number)) * 1;
       
        this.totalQty -= number;
        this.totalPrice += storedItem.price;
    }

    this.generateArray = function(){
        var arr = [];
        for(var id in this.item){
            arr.push(this.item[id]);
        }
        return arr;
    } 
} 