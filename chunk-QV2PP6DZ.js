import{a as se}from"./chunk-23CUZQWY.js";import{a as ne}from"./chunk-JQ7IIVUH.js";import{a as ie,b as oe}from"./chunk-MAP4FUGS.js";import{f as Y,g as Q,h as J,i as K}from"./chunk-NTBE4NJ6.js";import{F as re,G as ae,I as f,i as O,j as W,v as ee,y as te}from"./chunk-BRGKWRVN.js";import{d as G,n as Z,q as $}from"./chunk-HXLDE4VL.js";import{Ab as x,Ba as X,Bb as c,Bc as q,Ca as _,Cb as V,Db as p,Eb as A,Ec as C,Fa as v,Fb as E,Fc as T,Gb as U,Ib as j,La as h,Nb as i,Ob as o,Pb as g,Qb as B,Rb as D,Sb as L,Xb as I,Zb as u,ca as N,da as b,db as l,fa as P,ia as n,ic as S,jc as m,kb as F,mb as d,nb as y,ob as H,ra as w,sa as z,xc as R}from"./chunk-XVGCL5GT.js";function be(t,s){t&1&&g(0,"div",2)}var _e=new P("MAT_PROGRESS_BAR_DEFAULT_OPTIONS");var le=(()=>{class t{_elementRef=n(v);_ngZone=n(_);_changeDetectorRef=n(q);_animationMode=n(h,{optional:!0});constructor(){let e=n(_e,{optional:!0});this._isNoopAnimation=this._animationMode==="NoopAnimations",e&&(e.color&&(this.color=this._defaultColor=e.color),this.mode=e.mode||this.mode)}_isNoopAnimation=!1;get color(){return this._color||this._defaultColor}set color(e){this._color=e}_color;_defaultColor="primary";get value(){return this._value}set value(e){this._value=me(e||0),this._changeDetectorRef.markForCheck()}_value=0;get bufferValue(){return this._bufferValue||0}set bufferValue(e){this._bufferValue=me(e||0),this._changeDetectorRef.markForCheck()}_bufferValue=0;animationEnd=new X;get mode(){return this._mode}set mode(e){this._mode=e,this._changeDetectorRef.markForCheck()}_mode="determinate";ngAfterViewInit(){this._ngZone.runOutsideAngular(()=>{this._elementRef.nativeElement.addEventListener("transitionend",this._transitionendHandler)})}ngOnDestroy(){this._elementRef.nativeElement.removeEventListener("transitionend",this._transitionendHandler)}_getPrimaryBarTransform(){return`scaleX(${this._isIndeterminate()?1:this.value/100})`}_getBufferBarFlexBasis(){return`${this.mode==="buffer"?this.bufferValue:100}%`}_isIndeterminate(){return this.mode==="indeterminate"||this.mode==="query"}_transitionendHandler=e=>{this.animationEnd.observers.length===0||!e.target||!e.target.classList.contains("mdc-linear-progress__primary-bar")||(this.mode==="determinate"||this.mode==="buffer")&&this._ngZone.run(()=>this.animationEnd.next({value:this.value}))};static \u0275fac=function(r){return new(r||t)};static \u0275cmp=d({type:t,selectors:[["mat-progress-bar"]],hostAttrs:["role","progressbar","aria-valuemin","0","aria-valuemax","100","tabindex","-1",1,"mat-mdc-progress-bar","mdc-linear-progress"],hostVars:10,hostBindings:function(r,a){r&2&&(V("aria-valuenow",a._isIndeterminate()?null:a.value)("mode",a.mode),U("mat-"+a.color),E("_mat-animation-noopable",a._isNoopAnimation)("mdc-linear-progress--animation-ready",!a._isNoopAnimation)("mdc-linear-progress--indeterminate",a._isIndeterminate()))},inputs:{color:"color",value:[2,"value","value",T],bufferValue:[2,"bufferValue","bufferValue",T],mode:"mode"},outputs:{animationEnd:"animationEnd"},exportAs:["matProgressBar"],features:[x],decls:7,vars:5,consts:[["aria-hidden","true",1,"mdc-linear-progress__buffer"],[1,"mdc-linear-progress__buffer-bar"],[1,"mdc-linear-progress__buffer-dots"],["aria-hidden","true",1,"mdc-linear-progress__bar","mdc-linear-progress__primary-bar"],[1,"mdc-linear-progress__bar-inner"],["aria-hidden","true",1,"mdc-linear-progress__bar","mdc-linear-progress__secondary-bar"]],template:function(r,a){r&1&&(i(0,"div",0),g(1,"div",1),c(2,be,1,0,"div",2),o(),i(3,"div",3),g(4,"span",4),o(),i(5,"div",5),g(6,"span",4),o()),r&2&&(l(),A("flex-basis",a._getBufferBarFlexBasis()),l(),j(a.mode==="buffer"?2:-1),l(),A("transform",a._getPrimaryBarTransform()))},styles:[`.mat-mdc-progress-bar{display:block;text-align:start}.mat-mdc-progress-bar[mode=query]{transform:scaleX(-1)}.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-dots,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__secondary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__bar-inner.mdc-linear-progress__bar-inner{animation:none}.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-bar{transition:transform 1ms}.mdc-linear-progress{position:relative;width:100%;transform:translateZ(0);outline:1px solid rgba(0,0,0,0);overflow-x:hidden;transition:opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);height:max(var(--mdc-linear-progress-track-height, 4px),var(--mdc-linear-progress-active-indicator-height, 4px))}@media(forced-colors: active){.mdc-linear-progress{outline-color:CanvasText}}.mdc-linear-progress__bar{position:absolute;top:0;bottom:0;margin:auto 0;width:100%;animation:none;transform-origin:top left;transition:transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);height:var(--mdc-linear-progress-active-indicator-height, 4px)}.mdc-linear-progress--indeterminate .mdc-linear-progress__bar{transition:none}[dir=rtl] .mdc-linear-progress__bar{right:0;transform-origin:center right}.mdc-linear-progress__bar-inner{display:inline-block;position:absolute;width:100%;animation:none;border-top-style:solid;border-color:var(--mdc-linear-progress-active-indicator-color, var(--mat-sys-primary));border-top-width:var(--mdc-linear-progress-active-indicator-height, 4px)}.mdc-linear-progress__buffer{display:flex;position:absolute;top:0;bottom:0;margin:auto 0;width:100%;overflow:hidden;height:var(--mdc-linear-progress-track-height, 4px);border-radius:var(--mdc-linear-progress-track-shape, var(--mat-sys-corner-none))}.mdc-linear-progress__buffer-dots{-webkit-mask-image:url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='xMinYMin slice'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/svg%3E");mask-image:url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='xMinYMin slice'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/svg%3E");background-repeat:repeat-x;flex:auto;transform:rotate(180deg);animation:mdc-linear-progress-buffering 250ms infinite linear;background-color:var(--mdc-linear-progress-track-color, var(--mat-sys-surface-variant))}@media(forced-colors: active){.mdc-linear-progress__buffer-dots{background-color:ButtonBorder}}[dir=rtl] .mdc-linear-progress__buffer-dots{animation:mdc-linear-progress-buffering-reverse 250ms infinite linear;transform:rotate(0)}.mdc-linear-progress__buffer-bar{flex:0 1 100%;transition:flex-basis 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);background-color:var(--mdc-linear-progress-track-color, var(--mat-sys-surface-variant))}.mdc-linear-progress__primary-bar{transform:scaleX(0)}.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{left:-145.166611%}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation:mdc-linear-progress-primary-indeterminate-translate 2s infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-primary-indeterminate-scale 2s infinite linear}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation-name:mdc-linear-progress-primary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{right:-145.166611%;left:auto}.mdc-linear-progress__secondary-bar{display:none}.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{left:-54.888891%;display:block}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation:mdc-linear-progress-secondary-indeterminate-translate 2s infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-secondary-indeterminate-scale 2s infinite linear}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation-name:mdc-linear-progress-secondary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{right:-54.888891%;left:auto}@keyframes mdc-linear-progress-buffering{from{transform:rotate(180deg) translateX(calc(var(--mdc-linear-progress-track-height, 4px) * -2.5))}}@keyframes mdc-linear-progress-primary-indeterminate-translate{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(83.67142%)}100%{transform:translateX(200.611057%)}}@keyframes mdc-linear-progress-primary-indeterminate-scale{0%{transform:scaleX(0.08)}36.65%{animation-timing-function:cubic-bezier(0.334731, 0.12482, 0.785844, 1);transform:scaleX(0.08)}69.15%{animation-timing-function:cubic-bezier(0.06, 0.11, 0.6, 1);transform:scaleX(0.661479)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(37.651913%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(84.386165%)}100%{transform:translateX(160.277782%)}}@keyframes mdc-linear-progress-secondary-indeterminate-scale{0%{animation-timing-function:cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);transform:scaleX(0.08)}19.15%{animation-timing-function:cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);transform:scaleX(0.457104)}44.15%{animation-timing-function:cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);transform:scaleX(0.72796)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-primary-indeterminate-translate-reverse{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(-83.67142%)}100%{transform:translateX(-200.611057%)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(-37.651913%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(-84.386165%)}100%{transform:translateX(-160.277782%)}}@keyframes mdc-linear-progress-buffering-reverse{from{transform:translateX(-10px)}}`],encapsulation:2,changeDetection:0})}return t})();function me(t,s=0,e=100){return Math.max(s,Math.min(e,t))}var de=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275mod=y({type:t});static \u0275inj=b({imports:[f]})}return t})();var ce="mat-badge-content",he=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275cmp=d({type:t,selectors:[["ng-component"]],decls:0,vars:0,template:function(r,a){},styles:[".mat-badge{position:relative}.mat-badge.mat-badge{overflow:visible}.mat-badge-content{position:absolute;text-align:center;display:inline-block;transition:transform 200ms ease-in-out;transform:scale(0.6);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;box-sizing:border-box;pointer-events:none;background-color:var(--mat-badge-background-color, var(--mat-sys-error));color:var(--mat-badge-text-color, var(--mat-sys-on-error));font-family:var(--mat-badge-text-font, var(--mat-sys-label-small-font));font-weight:var(--mat-badge-text-weight, var(--mat-sys-label-small-weight));border-radius:var(--mat-badge-container-shape, var(--mat-sys-corner-full))}.mat-badge-above .mat-badge-content{bottom:100%}.mat-badge-below .mat-badge-content{top:100%}.mat-badge-before .mat-badge-content{right:100%}[dir=rtl] .mat-badge-before .mat-badge-content{right:auto;left:100%}.mat-badge-after .mat-badge-content{left:100%}[dir=rtl] .mat-badge-after .mat-badge-content{left:auto;right:100%}@media(forced-colors: active){.mat-badge-content{outline:solid 1px;border-radius:0}}.mat-badge-disabled .mat-badge-content{background-color:var(--mat-badge-disabled-state-background-color, color-mix(in srgb, var(--mat-sys-error) 38%, transparent));color:var(--mat-badge-disabled-state-text-color, var(--mat-sys-on-error))}.mat-badge-hidden .mat-badge-content{display:none}.ng-animate-disabled .mat-badge-content,.mat-badge-content._mat-animation-noopable{transition:none}.mat-badge-content.mat-badge-active{transform:none}.mat-badge-small .mat-badge-content{width:var(--mat-badge-legacy-small-size-container-size, unset);height:var(--mat-badge-legacy-small-size-container-size, unset);min-width:var(--mat-badge-small-size-container-size, 6px);min-height:var(--mat-badge-small-size-container-size, 6px);line-height:var(--mat-badge-small-size-line-height, 6px);padding:var(--mat-badge-small-size-container-padding, 0);font-size:var(--mat-badge-small-size-text-size, 0);margin:var(--mat-badge-small-size-container-offset, -6px 0)}.mat-badge-small.mat-badge-overlap .mat-badge-content{margin:var(--mat-badge-small-size-container-overlap-offset, -6px)}.mat-badge-medium .mat-badge-content{width:var(--mat-badge-legacy-container-size, unset);height:var(--mat-badge-legacy-container-size, unset);min-width:var(--mat-badge-container-size, 16px);min-height:var(--mat-badge-container-size, 16px);line-height:var(--mat-badge-line-height, 16px);padding:var(--mat-badge-container-padding, 0 4px);font-size:var(--mat-badge-text-size, var(--mat-sys-label-small-size));margin:var(--mat-badge-container-offset, -12px 0)}.mat-badge-medium.mat-badge-overlap .mat-badge-content{margin:var(--mat-badge-container-overlap-offset, -12px)}.mat-badge-large .mat-badge-content{width:var(--mat-badge-legacy-large-size-container-size, unset);height:var(--mat-badge-legacy-large-size-container-size, unset);min-width:var(--mat-badge-large-size-container-size, 16px);min-height:var(--mat-badge-large-size-container-size, 16px);line-height:var(--mat-badge-large-size-line-height, 16px);padding:var(--mat-badge-large-size-container-padding, 0 4px);font-size:var(--mat-badge-large-size-text-size, var(--mat-sys-label-small-size));margin:var(--mat-badge-large-size-container-offset, -12px 0)}.mat-badge-large.mat-badge-overlap .mat-badge-content{margin:var(--mat-badge-large-size-container-overlap-offset, -12px)}"],encapsulation:2,changeDetection:0})}return t})(),ge=(()=>{class t{_ngZone=n(_);_elementRef=n(v);_ariaDescriber=n(ee);_renderer=n(F);_animationMode=n(h,{optional:!0});_idGenerator=n(ae);get color(){return this._color}set color(e){this._setColor(e),this._color=e}_color="primary";overlap=!0;disabled;position="above after";get content(){return this._content}set content(e){this._updateRenderedContent(e)}_content;get description(){return this._description}set description(e){this._updateDescription(e)}_description;size="medium";hidden;_badgeElement;_inlineBadgeDescription;_isInitialized=!1;_interactivityChecker=n(te);_document=n(G);constructor(){n(O).load(he),n(O).load(W)}isAbove(){return this.position.indexOf("below")===-1}isAfter(){return this.position.indexOf("before")===-1}getBadgeElement(){return this._badgeElement}ngOnInit(){this._clearExistingBadges(),this.content&&!this._badgeElement&&(this._badgeElement=this._createBadgeElement(),this._updateRenderedContent(this.content)),this._isInitialized=!0}ngOnDestroy(){this._renderer.destroyNode&&(this._renderer.destroyNode(this._badgeElement),this._inlineBadgeDescription?.remove()),this._ariaDescriber.removeDescription(this._elementRef.nativeElement,this.description)}_isHostInteractive(){return this._interactivityChecker.isFocusable(this._elementRef.nativeElement,{ignoreVisibility:!0})}_createBadgeElement(){let e=this._renderer.createElement("span"),r="mat-badge-active";return e.setAttribute("id",this._idGenerator.getId("mat-badge-content-")),e.setAttribute("aria-hidden","true"),e.classList.add(ce),this._animationMode==="NoopAnimations"&&e.classList.add("_mat-animation-noopable"),this._elementRef.nativeElement.appendChild(e),typeof requestAnimationFrame=="function"&&this._animationMode!=="NoopAnimations"?this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>{e.classList.add(r)})}):e.classList.add(r),e}_updateRenderedContent(e){let r=`${e??""}`.trim();this._isInitialized&&r&&!this._badgeElement&&(this._badgeElement=this._createBadgeElement()),this._badgeElement&&(this._badgeElement.textContent=r),this._content=r}_updateDescription(e){this._ariaDescriber.removeDescription(this._elementRef.nativeElement,this.description),(!e||this._isHostInteractive())&&this._removeInlineDescription(),this._description=e,this._isHostInteractive()?this._ariaDescriber.describe(this._elementRef.nativeElement,e):this._updateInlineDescription()}_updateInlineDescription(){this._inlineBadgeDescription||(this._inlineBadgeDescription=this._document.createElement("span"),this._inlineBadgeDescription.classList.add("cdk-visually-hidden")),this._inlineBadgeDescription.textContent=this.description,this._badgeElement?.appendChild(this._inlineBadgeDescription)}_removeInlineDescription(){this._inlineBadgeDescription?.remove(),this._inlineBadgeDescription=void 0}_setColor(e){let r=this._elementRef.nativeElement.classList;r.remove(`mat-badge-${this._color}`),e&&r.add(`mat-badge-${e}`)}_clearExistingBadges(){let e=this._elementRef.nativeElement.querySelectorAll(`:scope > .${ce}`);for(let r of Array.from(e))r!==this._badgeElement&&r.remove()}static \u0275fac=function(r){return new(r||t)};static \u0275dir=H({type:t,selectors:[["","matBadge",""]],hostAttrs:[1,"mat-badge"],hostVars:20,hostBindings:function(r,a){r&2&&E("mat-badge-overlap",a.overlap)("mat-badge-above",a.isAbove())("mat-badge-below",!a.isAbove())("mat-badge-before",!a.isAfter())("mat-badge-after",a.isAfter())("mat-badge-small",a.size==="small")("mat-badge-medium",a.size==="medium")("mat-badge-large",a.size==="large")("mat-badge-hidden",a.hidden||!a.content)("mat-badge-disabled",a.disabled)},inputs:{color:[0,"matBadgeColor","color"],overlap:[2,"matBadgeOverlap","overlap",C],disabled:[2,"matBadgeDisabled","disabled",C],position:[0,"matBadgePosition","position"],content:[0,"matBadge","content"],description:[0,"matBadgeDescription","description"],size:[0,"matBadgeSize","size"],hidden:[2,"matBadgeHidden","hidden",C]},features:[x]})}return t})(),pe=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275mod=y({type:t});static \u0275inj=b({imports:[re,f,f]})}return t})();var M=class t{loading=!1;busyRequestCount=0;busy(){this.busyRequestCount++,this.loading=!0}idle(){this.busyRequestCount--,this.busyRequestCount<=0&&(this.busyRequestCount=0,this.loading=!1)}static \u0275fac=function(e){return new(e||t)};static \u0275prov=N({token:t,factory:t.\u0275fac,providedIn:"root"})};function Ee(t,s){if(t&1){let e=L();B(0),i(1,"li")(2,"a",19),m(3,"Admin Dashboard"),o()(),i(4,"li")(5,"a",20),I("click",function(){w(e);let a=u(2);return z(a.onLogout())}),m(6,"Logout"),o()(),D()}}function Ce(t,s){if(t&1){let e=L();B(0),i(1,"li",21)(2,"a",22),m(3,"Profile"),o()(),i(4,"li",21)(5,"a",20),I("click",function(){w(e);let a=u(3);return z(a.onLogout())}),m(6,"Logout"),o()(),D()}}function ke(t,s){if(t&1&&c(0,Ce,7,0,"ng-container",18),t&2){u();let e=S(11),r=u();p("ngIf",r.currentUser)("ngIfElse",e)}}function Me(t,s){t&1&&(i(0,"li",21)(1,"a",23),m(2,"Login"),o()(),i(3,"li",21)(4,"a",24),m(5,"Register"),o()())}function we(t,s){if(t&1&&(i(0,"ul",15)(1,"li")(2,"a",16),m(3,"Home"),o()(),i(4,"li")(5,"a",17),m(6,"Shop"),o()(),c(7,Ee,7,0,"ng-container",18)(8,ke,1,2,"ng-template",null,0,R)(10,Me,6,0,"ng-template",null,1,R),o()),t&2){let e=S(9),r=u();l(7),p("ngIf",r.currentUser==null?null:r.currentUser.isAdmin)("ngIfElse",e)}}function ze(t,s){t&1&&g(0,"mat-progress-bar",25)}var ue=class t{userService=n(ne);router=n(Y);cartService=n(se);busyService=n(M);currentUser=null;isLoading=!0;totalItems=0;ngOnInit(){this.userService.getLoadingState().subscribe(s=>{this.isLoading=s}),this.userService.getAuthState().subscribe(s=>{this.currentUser=s,this.userService.setLoadingState(!1)}),this.cartService.getTotalQuantityObservable().subscribe(s=>{this.totalItems=Number(s)})}onLogout(){this.userService.logout().subscribe(()=>{this.userService.setAuthState(null),this.cartService.clearCart(),this.router.navigate(["/home"])})}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=d({type:t,selectors:[["app-header"]],decls:21,vars:3,consts:[["nonAdminLinks",""],["guestLinks",""],[1,"bg-dark","text-white","p-3"],[1,"navbar","navbar-expand-lg","navbar-light"],[1,"container"],["routerLink","/home",1,"navbar-brand"],["id","navbarCollapse",1,"collapse","navbar-collapse"],["class","navbar-nav mx-auto",4,"ngIf"],[1,"navbar-nav","flex-row"],[1,"nav-item","ms-lg-n4"],["routerLink","/profile",1,"nav-link"],[1,"material-symbols-outlined"],["routerLink","/profile/account-wishlist","routerLinkActive","active",1,"nav-link"],["routerLinkActive","active","routerLink","/shopping-cart","matBadgeSize","large",1,"nav-link",3,"matBadge"],["class","mat-mdc-progress-bar","mode","indeterminate",4,"ngIf"],[1,"navbar-nav","mx-auto"],["routerLink","/home","routerLinkActive","active",1,"link-underline"],["routerLink","/shop","routerLinkActive","active",1,"link-underline"],[4,"ngIf","ngIfElse"],["routerLink","/admin/dashboard","routerLinkActive","active",1,"link-underline"],[1,"link-underline",3,"click"],[1,"nav-item"],["routerLink","/profile","routerLinkActive","active",1,"link-underline"],["routerLink","/login","routerLinkActive","active",1,"link-underline"],["routerLink","/register","routerLinkActive","active",1,"link-underline"],["mode","indeterminate",1,"mat-mdc-progress-bar"]],template:function(e,r){e&1&&(i(0,"header",2)(1,"nav",3)(2,"div",4)(3,"a",5),m(4,"AuraLux."),o(),i(5,"div",6),c(6,we,12,2,"ul",7),i(7,"ul",8)(8,"li",9)(9,"a",10)(10,"mat-icon",11),m(11," person "),o()()(),i(12,"li",9)(13,"a",12)(14,"mat-icon",11),m(15," favorite "),o()()(),i(16,"li",9)(17,"a",13)(18,"mat-icon",11),m(19," shopping_cart "),o()()()()()()()(),c(20,ze,1,0,"mat-progress-bar",14)),e&2&&(l(6),p("ngIf",!r.isLoading),l(11),p("matBadge",r.totalItems),l(3),p("ngIf",r.busyService.loading))},dependencies:[K,Q,J,$,Z,de,le,oe,ie,pe,ge],styles:["header[_ngcontent-%COMP%]{position:relative;background-color:#efedf0!important;padding:.5rem!important;text-align:center;box-shadow:#0003 0 6px 24px,#0000001a 0 0 0 1px;z-index:3}.navbar-brand[_ngcontent-%COMP%]{font-size:1.75rem;margin-right:1rem;padding-bottom:-.0625rem;padding-top:-.0625rem;white-space:nowrap;font-weight:600}.button-nav.active[_ngcontent-%COMP%]{background-color:#1f1f1f!important;border-color:#1f1f1f!important;color:#fff!important}.mat-badge[_ngcontent-%COMP%]{position:relative}.mat-badge.mat-badge[_ngcontent-%COMP%]{overflow:visible}.mat-badge-content[_ngcontent-%COMP%]{position:absolute;width:1.25rem!important;height:1.25rem!important;display:flex!important;justify-content:center!important;align-items:center!important;background-color:var(--mat-badge-background-color, var(--mat-sys-error))}"]})};var fe=class t{static \u0275fac=function(e){return new(e||t)};static \u0275cmp=d({type:t,selectors:[["app-footer"]],decls:3,vars:0,consts:[[1,"bg-dark","text-white","text-center","py-3"]],template:function(e,r){e&1&&(i(0,"footer",0)(1,"p"),m(2,"\xA9 2024 E-Commerce. All rights reserved."),o()())},styles:["footer[_ngcontent-%COMP%]{background-color:#efedf0!important;padding:1.5rem!important;text-align:center;box-shadow:#0003 0 6px 24px,#0003 0 6px 24px}footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#000}"]})};export{M as a,ue as b,fe as c};
