import{a as F}from"./chunk-2IFWVJDF.js";import{a as w}from"./chunk-DRQEKNOB.js";import{g as k,i as P}from"./chunk-NTBE4NJ6.js";import"./chunk-QI2QTTT6.js";import"./chunk-MAQY66WU.js";import{m as E,n as I,p as A,q as M}from"./chunk-HXLDE4VL.js";import{Bb as m,Cb as v,Db as a,Eb as x,Nb as n,Ob as r,Pb as c,Qb as _,Rb as b,Zb as s,db as o,ia as f,ic as O,jc as i,kc as p,lc as l,mb as u,sc as S,uc as g,vc as h,wc as y,xc as C}from"./chunk-XVGCL5GT.js";var L=t=>["/profile","order-details",t];function R(t,d){if(t&1&&(n(0,"div",23),c(1,"div",24),r()),t&2){let e=d.$implicit;o(),x("background-image","url("+e.product.images[0]+")")}}function $(t,d){if(t&1&&(n(0,"div",23)(1,"div",25)(2,"a",26)(3,"div",27),i(4),c(5,"br"),i(6," more "),r()()()()),t&2){let e=s().$implicit;o(4),l(" + ",e.orderItems.length-3," ")}}function j(t,d){if(t&1&&(n(0,"div",4)(1,"div",5)(2,"div",6)(3,"div",7)(4,"div",8)(5,"div",9)(6,"h6",10),i(7,"Order No:"),r(),n(8,"p",11),i(9),r()(),n(10,"div",9)(11,"h6",10),i(12,"Shipped date:"),r(),n(13,"p",11)(14,"time"),i(15),g(16,"formatDate"),r()()(),n(17,"div",9)(18,"h6",10),i(19,"Status:"),r(),n(20,"p",12),i(21),r()(),n(22,"div",9)(23,"h6",10),i(24,"Order Amount:"),r(),n(25,"p",12),i(26),g(27,"currency"),r()()()()()(),n(28,"div",13)(29,"div",14)(30,"div",15)(31,"div",16),m(32,R,2,2,"div",17)(33,$,7,1,"div",18),r()(),n(34,"div",15)(35,"div",19)(36,"div",20)(37,"a",21),i(38," Order Details "),r()(),n(39,"div",20)(40,"a",22),i(41," Track order "),r()()()()()()()),t&2){let e=d.$implicit;o(9),p(e._id),o(5),v("datetime",e==null?null:e.createdAt),o(),l(" ",y(16,8,e==null?null:e.createdAt,"dd MMM, yyyy","en-US")," "),o(6),p(e.paymentStatus),o(5),l(" ",h(27,12,e.totalPrice)," "),o(6),a("ngForOf",e.orderItems.slice(0,3)),o(),a("ngIf",e.orderItems.length>3),o(4),a("routerLink",S(14,L,e._id))}}function z(t,d){if(t&1&&(_(0),m(1,j,42,16,"div",3),b()),t&2){let e=s();o(),a("ngForOf",e.orders)}}function B(t,d){t&1&&(n(0,"div",28)(1,"h4"),i(2,"No Orders yet!"),r(),n(3,"p",29),i(4,"You haven't added any orders to your account yet."),r(),n(5,"a",30),i(6,"Start Shopping"),r()())}var D=class t{orderService=f(w);orders=[];orderItems=[];ngOnInit(){this.getAllOrders()}getAllOrders(){this.orderService.getAllOrders().subscribe({next:d=>{this.orders=d},error:d=>{console.error("Error fetching orders:",d)}})}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=u({type:t,selectors:[["app-account-orders"]],decls:4,vars:2,consts:[["noOrders",""],[1,"orders-list"],[4,"ngIf","ngIfElse"],["class","card card-lg mb-4 border",4,"ngFor","ngForOf"],[1,"card","card-lg","mb-4","border"],[1,"card-body","pb-0"],[1,"card","card-sm"],[1,"card-body","bg-light"],[1,"row"],[1,"col-6","col-lg-3"],[1,"heading-xxxs","text-muted"],[1,"mb-lg-0","fs-sm","fw-bold"],[1,"mb-0","fs-sm","fw-bold"],[1,"card-footer"],[1,"row","align-items-center"],[1,"col-12","col-lg-6"],[1,"row","gx-5","mb-4","mb-lg-0"],["class","col-3",4,"ngFor","ngForOf"],["class","col-3",4,"ngIf"],[1,"row","gx-5"],[1,"col-6"],[1,"btn","btn-sm","w-100","btn-outline-dark",3,"routerLink"],["href","#!",1,"btn","btn-sm","w-100","btn-outline-dark"],[1,"col-3"],[1,"ratio","ratio-1x1","bg-cover"],[1,"ratio","ratio-1x1","bg-light"],[1,"ratio-item","ratio-item-text","text-reset"],[1,"fs-xxs","fw-bold"],[1,"text-start","mt-5","pt-4"],[1,"text-muted"],["routerLink","/shop",1,"btn","btn-sm","btn-outline-dark"]],template:function(e,T){if(e&1&&(n(0,"div",1),m(1,z,2,1,"ng-container",2),r(),m(2,B,7,0,"ng-template",null,0,C)),e&2){let N=O(3);o(),a("ngIf",T.orders.length>0)("ngIfElse",N)}},dependencies:[M,E,I,A,P,k,F],styles:[".card-footer[_ngcontent-%COMP%]{padding:2rem;background-color:transparent;border-top:0 solid hsla(0,0%,7%,.125)}.fs-xxs[_ngcontent-%COMP%]{font-size:.8125rem!important}.ratio-item[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}.bg-cover[_ngcontent-%COMP%]{background-position:50%!important;background-repeat:no-repeat!important;background-size:cover!important}.g-5[_ngcontent-%COMP%], .gx-5[_ngcontent-%COMP%]{--bs-gutter-x: 1rem}.orders-list[_ngcontent-%COMP%]{max-height:54rem;overflow-x:hidden}"]})};export{D as AccountOrdersComponent};
