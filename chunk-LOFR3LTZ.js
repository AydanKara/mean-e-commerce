import{a as u}from"./chunk-XDIPF3I4.js";import"./chunk-7CMIEGEP.js";import{e as s,f as a,g as m,h as p,i as d}from"./chunk-NTBE4NJ6.js";import"./chunk-BRGKWRVN.js";import"./chunk-T3Q3DASN.js";import"./chunk-QI2QTTT6.js";import"./chunk-MAQY66WU.js";import"./chunk-HXLDE4VL.js";import{Nb as t,Ob as e,Pb as c,Xb as g,ia as i,jc as o,mb as l}from"./chunk-XVGCL5GT.js";var f=class r{router=i(a);userService=i(u);onLogout(){this.userService.logout().subscribe(()=>{this.userService.setAuthState(null),this.router.navigate(["/home"])})}static \u0275fac=function(n){return new(n||r)};static \u0275cmp=l({type:r,selectors:[["app-profile"]],decls:24,vars:0,consts:[[1,"my-6"],[1,"container"],[1,"row"],[1,"col-12","text-center"],[1,"mb-5"],[1,"col-12","col-md-3"],[1,"mb-4","mb-md-0"],[1,"list-group","list-group-sm","list-group-strong","list-group-flush-x"],["routerLink","account-orders","routerLinkActive","active",1,"list-group-item","list-group-item-action","dropend-toggle"],["routerLink","account-wishlist","routerLinkActive","active",1,"list-group-item","list-group-item-action","dropend-toggle"],["routerLink","account-personal-info","routerLinkActive","active",1,"list-group-item","list-group-item-action","dropend-toggle"],["routerLink","account-address","routerLinkActive","active",1,"list-group-item","list-group-item-action","dropend-toggle"],["routerLink","account-payment","routerLinkActive","active",1,"list-group-item","list-group-item-action","dropend-toggle"],[1,"list-group-item","list-group-item-action","dropend-toggle",3,"click"],[1,"col-12","col-md-9","col-lg-8","offset-lg-1"]],template:function(n,C){n&1&&(t(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"h1",4),o(5,"My Account"),e()()(),t(6,"div",2)(7,"div",5)(8,"nav",6)(9,"div",7)(10,"a",8),o(11," Orders "),e(),t(12,"a",9),o(13," Wishlist "),e(),t(14,"a",10),o(15," Personal Info "),e(),t(16,"a",11),o(17," Addresses "),e(),t(18,"a",12),o(19," Payment Methods "),e(),t(20,"a",13),g("click",function(){return C.onLogout()}),o(21," Logout "),e()()()(),t(22,"div",14),c(23,"router-outlet"),e()()()())},dependencies:[d,s,m,p],styles:['section[_ngcontent-%COMP%]{min-height:58vh}.list-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;margin-bottom:0;padding-left:0}.list-group-sm[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]{padding:1.25rem}.list-group-item[_ngcontent-%COMP%]{flex-shrink:0;transition:.2s all ease-in-out}.dropdown-toggle[_ngcontent-%COMP%], .dropend-toggle[_ngcontent-%COMP%]{overflow:hidden}.list-group-item[_ngcontent-%COMP%]{border:1px solid #e5e5e5;display:block;padding:1.5rem;position:relative}.list-group-item[_ngcontent-%COMP%], .list-group-item-action[_ngcontent-%COMP%]:active{background-color:transparent;color:#1f1f1f}.list-group-item-action[_ngcontent-%COMP%]{color:#767676;text-align:inherit;width:100%}.list-group-flush-x[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]{border-left:none;border-right:none;padding-left:0;padding-right:0}.list-group-item[_ngcontent-%COMP%] + .list-group-item[_ngcontent-%COMP%]{border-top-width:0}.dropend-toggle[_ngcontent-%COMP%]:after{content:">"}.dropdown-toggle[_ngcontent-%COMP%]:after, .dropend-toggle[_ngcontent-%COMP%]:after{border:0;float:right;font-family:cursive;margin-left:.255em}.active[_ngcontent-%COMP%], .active[_ngcontent-%COMP%]:hover, .active[_ngcontent-%COMP%]:focus, .list-group-item[_ngcontent-%COMP%]:hover{color:#1f1f1f;font-weight:700}']})};export{f as ProfileComponent};
