import{c as C,d as _}from"./chunk-AO77CTVI.js";import"./chunk-X6ELEKMY.js";import{a as v}from"./chunk-XDIPF3I4.js";import"./chunk-7CMIEGEP.js";import"./chunk-MAP4FUGS.js";import{e as s,f as g,g as u,h as p,i as f}from"./chunk-NTBE4NJ6.js";import"./chunk-BRGKWRVN.js";import"./chunk-T3Q3DASN.js";import"./chunk-QI2QTTT6.js";import"./chunk-MAQY66WU.js";import{q as d}from"./chunk-HXLDE4VL.js";import{Nb as t,Ob as e,Pb as n,Xb as c,eb as r,jc as o,mb as m}from"./chunk-XVGCL5GT.js";var M=class l{constructor(a,i){this.userService=a;this.router=i}onLogout(){this.userService.logout().subscribe(()=>{this.userService.setAuthState(null),this.router.navigate(["/home"])})}static \u0275fac=function(i){return new(i||l)(r(v),r(g))};static \u0275cmp=m({type:l,selectors:[["app-admin-layout"]],decls:26,vars:0,consts:[[1,"content","p-4"],[1,"container"],[1,"row"],[1,"col-12","text-center"],[1,"my-5"],[1,"col-12","col-md-3"],[1,"mb-5","mb-md-0"],[1,"list-group","list-group-sm","list-group-strong","list-group-flush-x"],["routerLink","/admin/dashboard","routerLinkActive","active",1,"list-group-item","list-group-item-action","dropend-toggle"],["routerLink","/admin/categories","routerLinkActive","active",1,"list-group-item","list-group-item-action","dropend-toggle"],["routerLink","/admin/products","routerLinkActive","active",1,"list-group-item","list-group-item-action","dropend-toggle"],["routerLink","/admin/user-lists","routerLinkActive","active",1,"list-group-item","list-group-item-action","dropend-toggle"],["routerLink","/admin/orders","routerLinkActive","active",1,"list-group-item","list-group-item-action","dropend-toggle"],[1,"list-group-item","list-group-item-action","dropend-toggle",3,"click"],[1,"col-12","col-md-9","col-lg-8","offset-lg-1"]],template:function(i,h){i&1&&(n(0,"app-header"),t(1,"main",0)(2,"div",1)(3,"div",2)(4,"div",3)(5,"h1",4),o(6,"Admin"),e()()(),t(7,"div",2)(8,"div",5)(9,"nav",6)(10,"div",7)(11,"a",8),o(12," Dashboard "),e(),t(13,"a",9),o(14," Categories "),e(),t(15,"a",10),o(16," Products "),e(),t(17,"a",11),o(18," Users List "),e(),t(19,"a",12),o(20," Orders "),e(),t(21,"a",13),c("click",function(){return h.onLogout()}),o(22," Logout "),e()()()(),t(23,"div",14),n(24,"router-outlet"),e()()()(),n(25,"app-footer"))},dependencies:[f,s,u,p,d,_,C],styles:['.list-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;margin-bottom:0;padding-left:0}.list-group-sm[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]{padding:1.25rem}.list-group-item[_ngcontent-%COMP%]{flex-shrink:0;transition:.2s all ease-in-out}.dropdown-toggle[_ngcontent-%COMP%], .dropend-toggle[_ngcontent-%COMP%]{overflow:hidden}.list-group-item[_ngcontent-%COMP%]{border:1px solid #e5e5e5;display:block;padding:1.5rem;position:relative}.list-group-item[_ngcontent-%COMP%], .list-group-item-action[_ngcontent-%COMP%]:active{background-color:transparent;color:#1f1f1f}.list-group-item-action[_ngcontent-%COMP%]{color:#767676;text-align:inherit;width:100%}.list-group-flush-x[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]{border-left:none;border-right:none;padding-left:0;padding-right:0}.list-group-item[_ngcontent-%COMP%] + .list-group-item[_ngcontent-%COMP%]{border-top-width:0}.dropend-toggle[_ngcontent-%COMP%]:after{content:">"}.dropdown-toggle[_ngcontent-%COMP%]:after, .dropend-toggle[_ngcontent-%COMP%]:after{border:0;float:right;font-family:cursive;margin-left:.255em}.active[_ngcontent-%COMP%], .active[_ngcontent-%COMP%]:hover, .active[_ngcontent-%COMP%]:focus, .list-group-item[_ngcontent-%COMP%]:hover{color:#1f1f1f;font-weight:700}']})};export{M as AdminLayoutComponent};
