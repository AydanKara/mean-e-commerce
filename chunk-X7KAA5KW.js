import{a as U}from"./chunk-VE74UDV5.js";import{x as c}from"./chunk-JR3KB4OF.js";import{a as o}from"./chunk-T4ITIP7S.js";import{c as b}from"./chunk-QKMSTV2X.js";import{F as a,_ as r,ca as u,ha as h,ia as n,k as s,p as l,t as p}from"./chunk-IB35DNSN.js";var v=class i{constructor(t){this.http=t;this.loadUserOnAppInit()}apiUrl=`${o.apiUrl}/auth`;userUrl=`${o.apiUrl}/users`;snackbar=n(c);cartService=n(U);authState=new s(null);loading=new s(!0);loadUserOnAppInit(){this.getCurrentUser().pipe(a(()=>l(null))).subscribe(t=>{this.setAuthState(t),this.setLoadingState(!1)})}setLoadingState(t){this.loading.next(t)}getLoadingState(){return this.loading.asObservable()}setAuthState(t){this.authState.next(t)}getAuthState(){return this.authState.asObservable()}login(t){return this.http.post(`${this.apiUrl}/login`,t,{withCredentials:!0}).pipe(p(e=>e.user),r(()=>{this.getCurrentUser().subscribe(e=>{this.setAuthState(e),e&&this.cartService.loadCartFromBackend()})}))}register(t){return this.http.post(`${this.apiUrl}/register`,t,{withCredentials:!0})}logout(){return this.http.post(`${this.apiUrl}/logout`,{},{withCredentials:!0}).pipe(r(()=>this.setAuthState(null)))}getCurrentUser(){return this.http.get(`${this.apiUrl}/me`,{withCredentials:!0})}updateProfile(t){return this.http.patch(`${this.userUrl}/update`,t,{withCredentials:!0}).pipe(r(e=>{this.setAuthState(e)}),a(e=>{throw this.snackbar.error("Error updating profile."),e}))}getUserId(){return this.authState.getValue()?._id||null}static \u0275fac=function(e){return new(e||i)(h(b))};static \u0275prov=u({token:i,factory:i.\u0275fac,providedIn:"root"})};export{v as a};
