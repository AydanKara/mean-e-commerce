import{a as U}from"./chunk-PIA62S65.js";import{a as N}from"./chunk-XDIPF3I4.js";import"./chunk-7CMIEGEP.js";import{a as T}from"./chunk-MAP4FUGS.js";import{g as A,i as L}from"./chunk-NTBE4NJ6.js";import"./chunk-BRGKWRVN.js";import"./chunk-T3Q3DASN.js";import"./chunk-QI2QTTT6.js";import"./chunk-MAQY66WU.js";import{m as k,n as E,p as W,q as F}from"./chunk-HXLDE4VL.js";import{Bb as l,Db as s,Nb as r,Ob as i,Pb as d,Qb as x,Rb as C,Sb as w,Xb as O,Zb as p,ab as b,ac as h,bc as M,db as c,eb as m,ic as y,jc as o,kc as f,mb as v,ra as u,sa as _,uc as P,vc as I,xc as S}from"./chunk-XVGCL5GT.js";function D(n,e){if(n&1){let t=w();r(0,"div",4)(1,"div",5)(2,"div",6)(3,"button",7),O("click",function(){let a=u(t).$implicit,V=p(2);return _(V.removeFromWishlist(a._id))}),r(4,"span",8)(5,"mat-icon"),o(6,"close"),i()()(),r(7,"a",9)(8,"span",8)(9,"mat-icon"),o(10,"visibility"),i()(),o(11," Quick View "),i(),d(12,"img",10),i(),r(13,"div",11)(14,"a",12),o(15),i(),d(16,"br"),r(17,"span",13),o(18),P(19,"currency"),i()()()()}if(n&2){let t=e.$implicit;c(7),M("routerLink","/product/",t._id,""),c(5),h("src",t.images[0],b),h("alt",t.name),c(2),s("routerLink","/product/"+t._id),c(),f(t.name),c(3),f(I(19,7,t.price))}}function R(n,e){if(n&1&&(x(0),l(1,D,20,9,"div",3),C()),n&2){let t=p();c(),s("ngForOf",t.wishlist)}}function z(n,e){n&1&&(r(0,"div",14)(1,"h4"),o(2,"No favorites yet!"),i(),r(3,"p",13),o(4,"You haven't added any products to your wishlist."),i(),r(5,"a",15),o(6,"Start Shopping"),i()())}var j=class n{constructor(e,t){this.wishlistService=e;this.userService=t}wishlist=[];userId=null;ngOnInit(){this.userId=this.userService.getUserId(),this.userId&&this.fetchWishlist()}fetchWishlist(){this.userId&&this.wishlistService.getWishlist(this.userId).subscribe({next:e=>{this.wishlist=e},error:e=>{console.error("Error fetching wishlist:",e)}})}removeFromWishlist(e){this.userId&&this.wishlistService.removeFromWishlist(this.userId,e).subscribe({next:()=>{this.wishlist=this.wishlist.filter(t=>t._id!==e)},error:t=>{console.error("Error removing from wishlist:",t)}})}static \u0275fac=function(t){return new(t||n)(m(U),m(N))};static \u0275cmp=v({type:n,selectors:[["app-account-wishlist"]],decls:4,vars:2,consts:[["noFavorites",""],[1,"row","my-4"],[4,"ngIf","ngIfElse"],["class","col-6 col-md-4",4,"ngFor","ngForOf"],[1,"col-6","col-md-4"],[1,"card","mb-4"],[1,"card-img"],[1,"btn","btn-xs","btn-circle","btn-white-primary","card-action","card-action-end",3,"click"],[1,"material-symbols-outlined"],[1,"btn","btn-xs","w-100","btn-dark","card-btn",3,"routerLink"],[1,"card-img-top",3,"src","alt"],[1,"card-body","fw-bold","text-center"],[1,"text-body",3,"routerLink"],[1,"text-muted"],[1,"text-start","mt-5"],["routerLink","/shop",1,"btn","btn-sm","btn-outline-dark"]],template:function(t,g){if(t&1&&(r(0,"div",1),l(1,R,2,1,"ng-container",2)(2,z,7,0,"ng-template",null,0,S),i()),t&2){let a=y(3);c(),s("ngIf",g.wishlist.length>0)("ngIfElse",a)}},dependencies:[F,k,E,W,L,A,T],styles:[".card-img[_ngcontent-%COMP%]{position:relative;cursor:pointer;height:22rem}.card-img-top[_ngcontent-%COMP%]{height:100%;object-fit:cover}.btn-white-primary[_ngcontent-%COMP%]{background-color:#fff;color:#1f1f1f}.btn-circle[_ngcontent-%COMP%]{align-items:center;border-radius:50%!important;display:inline-flex;justify-content:center;padding:0;width:calc(3.25rem + 2px)}.btn-xs[_ngcontent-%COMP%]{height:calc(2.40625rem + 2px)!important;padding:.5rem .75rem}.btn-circle.btn-xs[_ngcontent-%COMP%]{width:calc(2.40625rem + 2px)}.card-action[_ngcontent-%COMP%]{position:absolute;top:1.25rem;z-index:1}.edit-btn[_ngcontent-%COMP%]{border:0;bottom:2.5rem!important}.card-action-end[_ngcontent-%COMP%]{right:1.25rem}.mat-icon[_ngcontent-%COMP%]{height:19px!important}.btn-white-primary[_ngcontent-%COMP%]:focus, .btn-white-primary[_ngcontent-%COMP%]:hover{background-color:#ff6f61;border-color:#ff6f61;color:#fff}.card-btn[_ngcontent-%COMP%]{bottom:0;left:0;opacity:0;position:absolute;transition:opacity .2s ease-in-out}.card-img[_ngcontent-%COMP%]:hover   .card-btn[_ngcontent-%COMP%]{opacity:1}.btn-dark[_ngcontent-%COMP%]:focus, .btn-dark[_ngcontent-%COMP%]:hover{background-color:#1c1c1c;border-color:#1c1c1c;color:#fff}.btn-check[_ngcontent-%COMP%]:focus + .btn-dark[_ngcontent-%COMP%], .btn-dark[_ngcontent-%COMP%]:focus, .btn-dark[_ngcontent-%COMP%]:hover{background-color:#fff;border-color:#fff;color:#1a1a1a}@media (max-width: 1399px){.card-img[_ngcontent-%COMP%]{height:20rem}}@media (max-width: 1199px){.card-img[_ngcontent-%COMP%]{height:17rem}}@media (max-width: 990px){.card-img[_ngcontent-%COMP%]{height:13rem}}@media (max-width: 768px){.card-img[_ngcontent-%COMP%]{height:20.5rem}}"]})};export{j as AccountWishlistComponent};
