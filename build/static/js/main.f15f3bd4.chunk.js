(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(13),l=t.n(r),c=(t(19),t(2)),u=function(e){return console.log("FilterSection pelaa",e),o.a.createElement("p",null,"Filter shown with ",o.a.createElement("input",{value:e.filter,onChange:e.onChange}))},i=function(e){var n=e.handlerForSubmit,t=e.handlerForName,a=e.handlerForNumber,r=e.newName,l=e.newNumber;return console.log("FormSection toimii"),o.a.createElement("form",{onSubmit:n},o.a.createElement("div",null,"Name: ",o.a.createElement("input",{value:r,onChange:t})),o.a.createElement("div",null,"Number: ",o.a.createElement("input",{value:l,onChange:a})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"Add")))},m=function(e){var n=e.person,t=(e.number,e.handleRemove);return console.log("Luettelo pelaa"),o.a.createElement("tbody",null,o.a.createElement("tr",null,o.a.createElement("td",null,n.name),o.a.createElement("td",null,n.number),o.a.createElement("td",null,o.a.createElement("button",{onClick:function(){return t(n)}},"Remove"))))},s=function(e){var n=e.persons,t=e.rajausEhto,a=e.handlerForRemove;return console.log("PhonebookSection pelaa",n),o.a.createElement("div",null,o.a.createElement("table",null,n.filter(t).map((function(e){return o.a.createElement(m,{key:e.number,person:e,handleRemove:a})}))))},d=t(3),f=t.n(d),h="/api/persons",b=function(){return f.a.get(h)},p=function(e){return f.a.post(h,e)},v=function(e,n){return console.log(e,n),f.a.put("".concat(h,"/").concat(e),n)},E=function(e){return f.a.delete("".concat(h,"/").concat(e))},g=function(e){var n=e.message,t=e.status;return null===n?null:"created"===t?o.a.createElement("div",{className:"created"},n):"modified"===t?o.a.createElement("div",{className:"modified"},n):"deleted"===t?o.a.createElement("div",{className:"deleted"},n):"removed"===t?o.a.createElement("div",{className:"removed"},n):o.a.createElement("div",{className:"error"},o.a.createElement("p",null))},w=function(){var e=Object(a.useState)(""),n=Object(c.a)(e,2),t=n[0],r=n[1],l=Object(a.useState)(""),m=Object(c.a)(l,2),d=m[0],f=m[1],h=Object(a.useState)(""),w=Object(c.a)(h,2),N=w[0],j=w[1],O=Object(a.useState)([]),S=Object(c.a)(O,2),k=S[0],F=S[1],y=Object(a.useState)(""),C=Object(c.a)(y,2),R=C[0],T=C[1],A=Object(a.useState)(""),B=Object(c.a)(A,2),D=B[0],J=B[1];Object(a.useEffect)((function(){console.log("effect"),b().then((function(e){console.log("promise fulfilled"),F(e.data)}))}),[]);return o.a.createElement("div",null,o.a.createElement("h2",null,"Phonebook"),o.a.createElement(g,{message:R,status:D}),o.a.createElement(u,{filter:N,onChange:function(e){j(e.target.value)}}),o.a.createElement("h3",null,"Add a new person to the phonebook"),o.a.createElement(i,{newName:t,newNumber:d,handlerForSubmit:function(e){e.preventDefault();var n={name:t,number:d},a=k.find((function(e){return e.name===t}));a&&window.confirm("".concat(t," is already in the phonebook, would you like to update the number?"))?(a.number=d,v(a.id,a).then((function(e){F(k.map((function(n){return n.id!==e.id?n:e})))})).catch((function(e){console.log("failed to update"),J("removed"),T("".concat(t," has been already been removed from the server"))})),J("modified"),T("".concat(t,"'s number has been changed")),setTimeout((function(){T(null)}),5e3)):(p(n).then((function(e){F(k.concat(e.data)),r(""),f("")})).catch((function(e){console.log("fail")})),J("created"),T("".concat(t," has been added")),setTimeout((function(){T(null)}),5e3))},handlerForName:function(e){r(e.target.value)},handlerForNumber:function(e){f(e.target.value)}}),o.a.createElement("h2",null,"Numbers"),o.a.createElement(s,{persons:k,rajausEhto:function(e){return e.name.toUpperCase().includes(N.toUpperCase())},handlerForRemove:function(e){!0===window.confirm("Delete ".concat(e.name," from the phonebook?"))&&E(e.id).then(F(k.filter((function(n){return n.id!==e.id})))),J("deleted"),T("".concat(e.name,"'s number has been deleted")),setTimeout((function(){T(null)}),5e3)}}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(w,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[14,1,2]]]);
//# sourceMappingURL=main.f15f3bd4.chunk.js.map