import{a as J}from"./chunk-DRQEKNOB.js";import{a as H}from"./chunk-X6ELEKMY.js";import{a as $}from"./chunk-XDIPF3I4.js";import{c as K,d,f as X,g as ee,i as te,j as ie,l as re,m as ne,n as oe,s as le,w as ae,x as me,y as de}from"./chunk-SMQGBKL2.js";import{s as Y}from"./chunk-7CMIEGEP.js";import{f as j,g as Z,i as U}from"./chunk-NTBE4NJ6.js";import"./chunk-BRGKWRVN.js";import"./chunk-T3Q3DASN.js";import"./chunk-QI2QTTT6.js";import"./chunk-MAQY66WU.js";import{m as R,n as G,p as W,q as Q}from"./chunk-HXLDE4VL.js";import{Bb as f,Db as s,Nb as t,Ob as e,Pb as c,Sb as V,Xb as P,ab as F,ac as M,bc as I,db as o,dc as z,eb as q,ec as B,fc as L,ia as v,ic as D,jc as i,kc as b,lc as A,mb as T,nc as E,oc as w,pc as O,ra as _,rc as N,sa as S,uc as k,vc as x}from"./chunk-XVGCL5GT.js";var ce=["checkoutForm"],pe=()=>({standalone:!0});function ue(l,a){l&1&&(t(0,"p",52),i(1," Full Name must be at least 8 characters. "),e())}function fe(l,a){l&1&&(t(0,"p",52),i(1," Please enter a valid email. "),e())}function ge(l,a){l&1&&(t(0,"p",52),i(1," Please enter a valid Country. "),e())}function he(l,a){l&1&&(t(0,"p",52),i(1," Address must be at least 10 characters. "),e())}function ye(l,a){l&1&&(t(0,"p",52),i(1," City must be at least 4 characters. "),e())}function Ce(l,a){l&1&&(t(0,"p",52),i(1," Please enter a valid ZIP or Postcode. "),e())}function ve(l,a){l&1&&(t(0,"p",52),i(1," Phone number must be 10-15 digits. "),e())}function be(l,a){if(l&1&&(t(0,"li",30)(1,"div",53)(2,"div",54)(3,"a",55),c(4,"img",56),e()(),t(5,"div",57)(6,"p",58)(7,"a",59),i(8),e(),c(9,"br"),t(10,"span",60),i(11),k(12,"currency"),e(),t(13,"span",61),i(14," x "),e(),t(15,"span",62),i(16),e()()()()()),l&2){let r=a.$implicit;o(3),I("routerLink","/product/",r._id,""),o(),M("src",r.images,F),M("alt",r.name),o(3),I("routerLink","/product/",r._id,""),o(),b(r.name),o(3),b(x(12,9,r.price)),o(5),b(r.quantity)}}var se=class l{constructor(a){this.fb=a;this.form=this.fb.group({fullName:["",[d.required,d.minLength(8)]],email:["",[d.required,d.email]],country:["",[d.required,d.minLength(4)]],address:["",[d.required,d.minLength(10)]],city:["",[d.required,d.minLength(4)]],zipCode:["",[d.required,d.pattern(/^\d{5}$/)]],phone:["",[d.required,d.pattern(/^[0-9]{10,15}$/)]]})}checkoutForm;cartItems=[];orderItems=[];shippingInfo={address:"",city:"",zipCode:"",country:""};totalPrice=0;paymentMethod="Credit Card";cartService=v(H);orderService=v(J);userService=v($);snackBar=v(Y);router=v(j);form;errorMessage="";ngOnInit(){let a=this.cartService.getCart();this.cartItems=a.items,this.orderItems=a.items.map(r=>({product:r,quantity:r.quantity,price:r.price})),this.totalPrice=a.totalPrice,this.userService.getAuthState().subscribe(r=>{if(r){let{fullName:n,email:p,shippingInfo:u,phone:m}=r,{address:g,city:h,zipCode:y,country:C}=u||{};this.form.patchValue({fullName:n||"",email:p||"",address:g||"",city:h||"",zipCode:y||"",country:C||"",phone:m||""}),this.shippingInfo={address:g||"",city:h||"",zipCode:y||"",country:C||""}}}),this.form.patchValue(this.shippingInfo),this.form.valueChanges.subscribe(r=>{this.shippingInfo={address:r.address,city:r.city,zipCode:r.zipCode,country:r.country}})}onSubmit(){if(this.checkoutForm?.valid){let a={_id:"",user:"",orderItems:this.orderItems,shippingInfo:this.shippingInfo,paymentMethod:this.paymentMethod,totalPrice:this.totalPrice,paymentStatus:"Pending",isDelivered:!1,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};this.orderService.createOrder(a).subscribe({next:r=>{this.snackBar.success(r.message),this.cartService.clearCart(),this.orderService.setOrderPlaced(!0),this.router.navigate(["/order-confirmation",r.order._id])},error:r=>{this.snackBar.error(r.error.message),this.errorMessage=r.error.message}})}}static \u0275fac=function(r){return new(r||l)(q(ae))};static \u0275cmp=T({type:l,selectors:[["app-checkout"]],viewQuery:function(r,n){if(r&1&&z(ce,5),r&2){let p;B(p=L())&&(n.checkoutForm=p.first)}},decls:104,vars:25,consts:[["checkoutForm","ngForm"],[1,"pt-4","pb-5","my-6"],[1,"container"],[1,"row"],[1,"col-12","text-center"],[1,"mb-5"],[1,"col-12","col-md-7"],[3,"ngSubmit","formGroup"],[1,"mb-4","fs-5"],[1,"row","mb-5"],[1,"col-12"],[1,"form-group"],["for","fullName",1,"form-label"],["id","fullName","formControlName","fullName","type","text","placeholder","Full Name","required","",1,"form-control","form-control-sm"],["class","text-danger",4,"ngIf"],["for","email",1,"form-label"],["id","email","formControlName","email","type","email","placeholder","Email","required","",1,"form-control","form-control-sm"],["for","country",1,"form-label"],["id","country","formControlName","country","type","text","placeholder","Country","required","",1,"form-control","form-control-sm"],["for","address",1,"form-label"],["id","address","formControlName","address","type","text","placeholder","Address","required","",1,"form-control","form-control-sm"],[1,"col-12","col-md-6"],["for","city",1,"form-label"],["id","city","formControlName","city","type","text","placeholder","Town / City","required","",1,"form-control","form-control-sm"],["for","zipCode",1,"form-label"],["id","zipCode","formControlName","zipCode","type","text","placeholder","ZIP / Postcode","required","",1,"form-control","form-control-sm"],[1,"form-group","mb-0"],["for","phone",1,"form-label"],["id","phone","formControlName","phone","type","tel","placeholder","Mobile Phone","required","",1,"form-control","form-control-sm"],[1,"list-group","list-group-sm","mb-7"],[1,"list-group-item"],[1,"form-check","custom-radio"],["id","checkoutPaymentCard","name","payment","type","radio",1,"form-check-input",3,"ngModelChange","ngModel","ngModelOptions","value"],["for","checkoutPaymentCard",1,"form-check-label","fs-sm","text-body","text-nowrap"],["src","https://yevgenysim-turkey.github.io/shopper/assets/img/brands/color/cards.svg","alt","...",1,"ms-2"],["id","checkoutPaymentPaypal","name","payment","type","radio",1,"form-check-input",3,"ngModelChange","ngModel","ngModelOptions","value"],["for","checkoutPaymentPaypal",1,"form-check-label","fs-sm","text-body","text-nowrap"],["src","https://yevgenysim-turkey.github.io/shopper/assets/img/brands/color/paypal.svg","alt","..."],[1,"col-12","col-md-5","col-lg-4","offset-lg-1"],[1,"mb-4"],[1,"my-4"],[1,"list-group","list-group-lg","list-group-flush-y","list-group-flush-x","mb-3"],["class","list-group-item",4,"ngFor","ngForOf"],[1,"card","mb-4","bg-light"],[1,"card-body"],[1,"list-group","list-group-sm","list-group-flush-y","list-group-flush-x"],[1,"list-group-item","d-flex"],[1,"ms-auto","fs-sm"],[1,"list-group-item","d-flex","fs-lg","fw-bold"],[1,"ms-auto"],[1,"mb-3","fs-xs","text-gray-500"],["type","button",1,"btn","w-100","btn-dark",3,"click","disabled"],[1,"text-danger"],[1,"row","align-items-center"],[1,"col-4",2,"height","6rem"],[3,"routerLink"],[1,"img-fluid","w-100","h-100","object-fit-cover",3,"src","alt"],[1,"col"],[1,"mb-4","fs-sm","fw-bold"],[1,"text-body",3,"routerLink"],[1,"text-muted"],[1,"fw-bold"],[1,"fw-bolder"]],template:function(r,n){if(r&1){let p=V();t(0,"section",1)(1,"div",2)(2,"div",3)(3,"div",4)(4,"h1",5),i(5,"Checkout"),e()()(),t(6,"div",3)(7,"div",6)(8,"form",7,0),P("ngSubmit",function(){return _(p),S(n.onSubmit())}),t(10,"h2",8),i(11,"Billing Details"),e(),t(12,"div",9)(13,"div",10)(14,"div",11)(15,"label",12),i(16,"Full Name *"),e(),c(17,"input",13),f(18,ue,2,0,"p",14),e()(),t(19,"div",10)(20,"div",11)(21,"label",15),i(22,"Email *"),e(),c(23,"input",16),f(24,fe,2,0,"p",14),e()(),t(25,"div",10)(26,"div",11)(27,"label",17),i(28,"Country *"),e(),c(29,"input",18),f(30,ge,2,0,"p",14),e()(),t(31,"div",10)(32,"div",11)(33,"label",19),i(34,"Address *"),e(),c(35,"input",20),f(36,he,2,0,"p",14),e()(),t(37,"div",21)(38,"div",11)(39,"label",22),i(40,"Town / City *"),e(),c(41,"input",23),f(42,ye,2,0,"p",14),e()(),t(43,"div",21)(44,"div",11)(45,"label",24),i(46,"ZIP / Postcode *"),e(),c(47,"input",25),f(48,Ce,2,0,"p",14),e()(),t(49,"div",10)(50,"div",26)(51,"label",27),i(52,"Mobile Phone *"),e(),c(53,"input",28),f(54,ve,2,0,"p",14),e()()(),t(55,"h2",8),i(56,"Payment"),e(),t(57,"div",29)(58,"div",30)(59,"div",31)(60,"input",32),O("ngModelChange",function(m){return _(p),w(n.paymentMethod,m)||(n.paymentMethod=m),S(m)}),e(),t(61,"label",33),i(62," Credit Card "),c(63,"img",34),e()()(),t(64,"div",30)(65,"div",31)(66,"input",35),O("ngModelChange",function(m){return _(p),w(n.paymentMethod,m)||(n.paymentMethod=m),S(m)}),e(),t(67,"label",36),c(68,"img",37),e()()()()()(),t(69,"div",38)(70,"h6",39),i(71),e(),c(72,"hr",40),t(73,"ul",41),f(74,be,17,11,"li",42),e(),t(75,"div",43)(76,"div",44)(77,"ul",45)(78,"li",46)(79,"span"),i(80,"Subtotal"),e(),t(81,"span",47),i(82),k(83,"currency"),e()(),t(84,"li",46)(85,"span"),i(86,"Tax"),e(),t(87,"span",47),i(88,"$00.00"),e()(),t(89,"li",46)(90,"span"),i(91,"Shipping"),e(),t(92,"span",47),i(93,"$8.00"),e()(),t(94,"li",48)(95,"span"),i(96,"Total"),e(),t(97,"span",49),i(98),k(99,"currency"),e()()()()(),t(100,"p",50),i(101," Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy. "),e(),t(102,"button",51),P("click",function(){_(p);let m=D(9);return S(m.ngSubmit.emit())}),i(103," Place Order "),e()()()()()}if(r&2){let p,u,m,g,h,y,C;o(8),s("formGroup",n.form),o(10),s("ngIf",((p=n.form.get("fullName"))==null?null:p.touched)&&((p=n.form.get("fullName"))==null?null:p.invalid)),o(6),s("ngIf",((u=n.form.get("email"))==null?null:u.touched)&&((u=n.form.get("email"))==null?null:u.invalid)),o(6),s("ngIf",((m=n.form.get("country"))==null?null:m.touched)&&((m=n.form.get("country"))==null?null:m.invalid)),o(6),s("ngIf",((g=n.form.get("address"))==null?null:g.touched)&&((g=n.form.get("address"))==null?null:g.invalid)),o(6),s("ngIf",((h=n.form.get("city"))==null?null:h.touched)&&((h=n.form.get("city"))==null?null:h.invalid)),o(6),s("ngIf",((y=n.form.get("zipCode"))==null?null:y.touched)&&((y=n.form.get("zipCode"))==null?null:y.invalid)),o(6),s("ngIf",((C=n.form.get("phone"))==null?null:C.touched)&&((C=n.form.get("phone"))==null?null:C.invalid)),o(6),E("ngModel",n.paymentMethod),s("ngModelOptions",N(23,pe))("value","Credit Card"),o(6),E("ngModel",n.paymentMethod),s("ngModelOptions",N(24,pe))("value","PayPal"),o(5),A("Order Items (",n.orderItems.length,")"),o(3),s("ngForOf",n.cartItems),o(8),b(x(83,19,n.totalPrice)),o(16),b(x(99,21,n.totalPrice)),o(4),s("disabled",n.form.invalid)}},dependencies:[Q,R,G,W,U,Z,me,ie,K,re,X,ee,le,te,de,ne,oe],styles:[".card-body[_ngcontent-%COMP%]{flex:1 1 auto;padding:1.5rem}.cart-items[_ngcontent-%COMP%]{max-height:50rem;overflow-y:auto;overflow-x:hidden}.list-group[_ngcontent-%COMP%]{border-radius:0;max-height:25rem;overflow-y:auto;overflow-x:hidden}.list-group-item[_ngcontent-%COMP%]{border:1px solid #e5e5e5;display:block;padding:1.5rem;position:relative}.list-group-item[_ngcontent-%COMP%], .list-group-item-action[_ngcontent-%COMP%]:active{background-color:transparent;color:#1f1f1f}.list-group-item[_ngcontent-%COMP%] + .list-group-item[_ngcontent-%COMP%]{border-top-width:0}.list-group-sm[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]{padding:1.25rem}.list-group-flush-x[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]{border-left:none;border-right:none;padding-left:0;padding-right:0}.list-group-flush-y[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]:first-child{border-top:none;padding-top:0}.list-group-flush-y[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]:last-child{border-bottom:0;padding-bottom:0}.btn-link[_ngcontent-%COMP%]{color:#1f1f1f;font-weight:500}"]})};export{se as CheckoutComponent};
