import{Ca as f,D as d,U as c,Y as v,ca as l,g as b,ia as a,j as i}from"./chunk-XVGCL5GT.js";var n=class{_box;_destroyed=new i;_resizeSubject=new i;_resizeObserver;_elementObservables=new Map;constructor(r){this._box=r,typeof ResizeObserver<"u"&&(this._resizeObserver=new ResizeObserver(e=>this._resizeSubject.next(e)))}observe(r){return this._elementObservables.has(r)||this._elementObservables.set(r,new b(e=>{let s=this._resizeSubject.subscribe(e);return this._resizeObserver?.observe(r,{box:this._box}),()=>{this._resizeObserver?.unobserve(r),s.unsubscribe(),this._elementObservables.delete(r)}}).pipe(d(e=>e.some(s=>s.target===r)),c({bufferSize:1,refCount:!0}),v(this._destroyed))),this._elementObservables.get(r)}destroy(){this._destroyed.next(),this._destroyed.complete(),this._resizeSubject.complete(),this._elementObservables.clear()}},y=(()=>{class o{_observers=new Map;_ngZone=a(f);constructor(){typeof ResizeObserver<"u"}ngOnDestroy(){for(let[,e]of this._observers)e.destroy();this._observers.clear(),typeof ResizeObserver<"u"}observe(e,s){let t=s?.box||"content-box";return this._observers.has(t)||this._observers.set(t,new n(t)),this._observers.get(t).observe(e)}static \u0275fac=function(s){return new(s||o)};static \u0275prov=l({token:o,factory:o.\u0275fac,providedIn:"root"})}return o})();export{y as a};
