import{a as O}from"./chunk-WTH7AYOY.js";import{a as F}from"./chunk-7MDGCOW6.js";import{c as E,d as p,f as R,g as I,j as N,m as M,n as T,s as q,w as k,y as V}from"./chunk-EGF5KOQG.js";import"./chunk-CPN2JVP4.js";import{a as D}from"./chunk-YKFVDGQ5.js";import"./chunk-44JXFXPC.js";import{f as S}from"./chunk-OM67MVYA.js";import"./chunk-RM2HLJRT.js";import"./chunk-T3Q3DASN.js";import"./chunk-T4ITIP7S.js";import"./chunk-BLI2WIQU.js";import{n as y,r as P}from"./chunk-RRDE5Q37.js";import{$b as _,Db as d,Fb as m,Pb as o,Qb as r,Rb as c,Zb as h,c as w,db as s,eb as v,lc as l,mb as C,mc as b,nc as x}from"./chunk-A5AGJRWB.js";function A(i,n){return e=>{let t=e.get(i)?.value,a=e.get(n)?.value;return t!==a?(e.get(n)?.setErrors({mismatch:!0}),{mismatch:!0}):(e.get(n)?.setErrors(null),null)}}function j(i,n){i&1&&(o(0,"div",27),l(1," Please enter a valid username. "),r())}function B(i,n){i&1&&(o(0,"div",27),l(1," Please enter a valid email. "),r())}function G(i,n){if(i&1&&(o(0,"small"),l(1),r()),i&2){let e,t=_(2);s(),b((e=t.registerForm.get("password"))==null||e.errors==null?null:e.errors.strongPassword.message)}}function z(i,n){if(i&1&&(o(0,"div",27),d(1,G,2,1,"small",28),r()),i&2){let e,t=_();s(),m("ngIf",(e=t.registerForm.get("password"))==null||e.errors==null?null:e.errors.strongPassword)}}function H(i,n){i&1&&(o(0,"div",27)(1,"small"),l(2,"Passwords do not match."),r()())}function J(i,n){if(i&1&&(o(0,"div",29),l(1),r()),i&2){let e=_();s(),x(" ",e.errorMessage," ")}}var U=class i{constructor(n,e,t){this.fb=n;this.userService=e;this.router=t;this.registerForm=this.fb.group({username:["",p.required],email:["",[p.required,p.email]],password:["",[O()]],confirmPassword:["",p.required]},{validators:A("password","confirmPassword")})}registerForm;errorMessage="";onSubmit(){if(this.registerForm.invalid)return;let t=this.registerForm.value,{confirmPassword:n}=t,e=w(t,["confirmPassword"]);if(e.password!==n){this.errorMessage="Passwords do not match";return}this.userService.register(e).subscribe({next:()=>this.router.navigate(["/login"]),error:a=>this.errorMessage=a.error.message||"Registration failed"})}static \u0275fac=function(e){return new(e||i)(v(k),v(F),v(S))};static \u0275cmp=C({type:i,selectors:[["app-register"]],decls:48,vars:7,consts:[[1,"my-5","py-5"],[1,"container"],[1,"row"],[1,"col-12"],[1,"card","card-lg"],[1,"card-body"],[1,"mb-4"],[3,"ngSubmit","formGroup"],[1,"form-group"],["for","username",1,"visually-hidden"],["id","username","type","text","placeholder","Username *","required","","formControlName","username",1,"form-control","form-control-sm"],["class","text-danger",4,"ngIf"],["for","email",1,"visually-hidden"],["id","email","type","email","placeholder","Email Address *","required","","formControlName","email",1,"form-control","form-control-sm"],[1,"col-12","col-md-6"],["for","password",1,"visually-hidden"],["id","password","type","password","placeholder","Password *","required","","formControlName","password",1,"form-control","form-control-sm"],["for","confirmPassword",1,"visually-hidden"],["id","confirmPassword","type","password","placeholder","Confirm Password *","required","","formControlName","confirmPassword",1,"form-control","form-control-sm"],[1,"col-12","col-md-auto"],[1,"form-group","fs-sm","text-muted"],[1,"col-12","col-md"],[1,"form-check"],["id","registerNewsletter","type","checkbox",1,"form-check-input"],["for","registerNewsletter",1,"form-check-label"],["type","submit",1,"btn","btn-sm","btn-dark",3,"disabled"],["class","text-danger mt-3",4,"ngIf"],[1,"text-danger"],[4,"ngIf"],[1,"text-danger","mt-3"]],template:function(e,t){if(e&1&&(o(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"h6",6),l(7,"New Customer"),r(),o(8,"form",7),h("ngSubmit",function(){return t.onSubmit()}),o(9,"div",2)(10,"div",3)(11,"div",8)(12,"label",9),l(13," Username "),r(),c(14,"input",10),d(15,j,2,0,"div",11),r()(),o(16,"div",3)(17,"div",8)(18,"label",12),l(19," Email Address * "),r(),c(20,"input",13),d(21,B,2,0,"div",11),r()(),o(22,"div",14)(23,"div",8)(24,"label",15),l(25," Password * "),r(),c(26,"input",16),d(27,z,2,1,"div",11),r()(),o(28,"div",14)(29,"div",8)(30,"label",17),l(31," Confirm Password * "),r(),c(32,"input",18),d(33,H,3,0,"div",11),r()(),o(34,"div",19)(35,"div",20),l(36," By registering your details, you agree with our Terms & Conditions, and Privacy and Cookie Policy. "),r()(),o(37,"div",21)(38,"div",8)(39,"div",22),c(40,"input",23),o(41,"label",24),l(42," Sign me up for the Newsletter! "),r()()()(),o(43,"div",3)(44,"button",25),l(45," Register "),r()(),d(46,J,2,1,"div",26),r()()()()()()()(),c(47,"app-features")),e&2){let a,g,f,u;s(8),m("formGroup",t.registerForm),s(7),m("ngIf",((a=t.registerForm.get("username"))==null?null:a.touched)&&((a=t.registerForm.get("username"))==null?null:a.invalid)),s(6),m("ngIf",((g=t.registerForm.get("email"))==null?null:g.touched)&&((g=t.registerForm.get("email"))==null?null:g.invalid)),s(6),m("ngIf",((f=t.registerForm.get("password"))==null?null:f.touched)&&((f=t.registerForm.get("password"))==null?null:f.invalid)),s(6),m("ngIf",((u=t.registerForm.get("confirmPassword"))==null?null:u.touched)&&((u=t.registerForm.get("confirmPassword"))==null||u.errors==null?null:u.errors.mismatch)),s(11),m("disabled",t.registerForm.invalid),s(2),m("ngIf",t.errorMessage)}},dependencies:[P,y,V,N,E,R,I,q,M,T,D],styles:[".card[_ngcontent-%COMP%]{background-color:#f5f5f5;margin:0 auto;max-width:36rem;justify-content:center;align-items:center}.card-lg[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%], .card-lg[_ngcontent-%COMP%]   .card-footer[_ngcontent-%COMP%]{padding:2rem}.card-body[_ngcontent-%COMP%]{flex:0 0 auto}"]})};export{U as RegisterComponent};