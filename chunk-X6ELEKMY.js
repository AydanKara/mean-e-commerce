import{a as h}from"./chunk-QI2QTTT6.js";import{c as n}from"./chunk-MAQY66WU.js";import{ca as c,ia as o,k as i,t as s}from"./chunk-XVGCL5GT.js";var m=class a{http=o(n);baseUrl=`${h.apiUrl}/orders`;cartKey="cart";cart={items:[],totalPrice:0};cartSubject=new i(this.cart);constructor(){this.loadCart()}loadCart(){let t=localStorage.getItem(this.cartKey);t&&(this.cart=JSON.parse(t)),this.cartSubject.next(this.cart)}getCartObservable(){return this.cartSubject.asObservable()}saveCart(){localStorage.setItem(this.cartKey,JSON.stringify(this.cart)),this.cartSubject.next(this.cart)}addToCart(t){let r=this.cart.items.find(e=>e._id===t._id);r?r.quantity+=t.quantity:this.cart.items.push(t),this.updateTotalPrice(),this.saveCart()}removeFromCart(t){this.cart.items=this.cart.items.filter(r=>r._id!==t),this.updateTotalPrice(),this.saveCart()}updateQuantity(t,r){let e=this.cart.items.find(u=>u._id===t);e&&(e.quantity=r,this.updateTotalPrice(),this.saveCart())}updateTotalPrice(){this.cart.totalPrice=this.cart.items.reduce((t,r)=>t+r.price*r.quantity,0)}getCart(){return this.cart}getTotalQuantity(){return this.cart.items.reduce((t,r)=>t+r.quantity,0)}getTotalQuantityObservable(){return this.cartSubject.asObservable().pipe(s(t=>t.items.reduce((r,e)=>r+e.quantity,0)))}clearCart(){this.cart={items:[],totalPrice:0},this.saveCart()}checkout(t){return this.http.post(this.baseUrl,t,{withCredentials:!0})}static \u0275fac=function(r){return new(r||a)};static \u0275prov=c({token:a,factory:a.\u0275fac,providedIn:"root"})};export{m as a};
