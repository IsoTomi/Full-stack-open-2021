(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var r=t(15),c=t.n(r),u=t(6),i=t(3),a=t(1),o=t(0),l=function(e){var n=e.filter,t=e.filterHandler;return Object(o.jsxs)("div",{children:["Filter with: ",Object(o.jsx)("input",{value:n,onChange:t})]})},d=function(e){var n=e.message,t=e.error;if(null===n)return null;var r=!0===t?"error":"notification";return Object(o.jsx)("div",{className:r,children:n})},s=function(e){var n=e.people,t=e.filter,r=e.removeHandler,c=new RegExp(t,"i"),u=n.filter((function(e){return e.name.match(c)}));return Object(o.jsx)("div",{children:Object(o.jsx)("ul",{children:u.map((function(e){return Object(o.jsxs)("li",{children:[e.name," ",e.number,Object(o.jsx)("button",{onClick:function(){return r(e.id)},children:"Delete"})]},e.id)}))})})},f=function(e){return Object(o.jsxs)("form",{onSubmit:e.add,children:[Object(o.jsxs)("div",{children:["Name: ",Object(o.jsx)("input",{value:e.newName,onChange:e.personChanger})]}),Object(o.jsxs)("div",{children:["Number: ",Object(o.jsx)("input",{value:e.newNumber,onChange:e.numberChanger})]}),Object(o.jsx)("div",{children:Object(o.jsx)("button",{type:"submit",children:"add"})})]})},j=t(4),b=t.n(j),h="https://evening-fjord-64727.herokuapp.com/api/people",m={getAll:function(){return b.a.get(h).then((function(e){return e.data}))},create:function(e){return b.a.post(h,e).then((function(e){return e.data}))},update:function(e,n){return b.a.put("".concat(h,"/").concat(e),n).then((function(e){return e.data}))},remove:function(e){return b.a.delete("".concat(h,"/").concat(e)).then((function(e){return e.data}))}},O=function(){var e=Object(a.useState)([]),n=Object(i.a)(e,2),t=n[0],r=n[1],c=Object(a.useState)(""),j=Object(i.a)(c,2),b=j[0],h=j[1],O=Object(a.useState)(""),p=Object(i.a)(O,2),v=p[0],x=p[1],g=Object(a.useState)(""),w=Object(i.a)(g,2),C=w[0],N=w[1],S=Object(a.useState)(null),k=Object(i.a)(S,2),T=k[0],y=k[1],A=Object(a.useState)(!1),D=Object(i.a)(A,2),H=D[0],E=D[1];Object(a.useEffect)((function(){m.getAll().then((function(e){r(e)}))}),[]);return Object(o.jsxs)("div",{children:[Object(o.jsx)("h2",{children:"Phonebook"}),Object(o.jsx)(d,{message:T,error:H}),Object(o.jsx)(l,{filter:C,filterHandler:function(e){N(e.target.value)}}),Object(o.jsx)("h2",{children:"Add new"}),Object(o.jsx)(f,{newName:b,newNumber:v,add:function(e){e.preventDefault();var n={name:b,number:v},c=t.find((function(e){return e.name===b}));if(""===b||""===v)return y("Please give a name and a number."),void setTimeout((function(){y(null)}),5e3);void 0!==c?!0===window.confirm("".concat(b," is already added to phonebook, \n      replace the old number with a new one?"))&&m.update(c.id,n).then((function(e){var n=t.map((function(e){return e.id===c.id?Object(u.a)(Object(u.a)({},e),{},{number:v}):e}));r(n),E(!1),y("Changed the number for ".concat(e.name)),setTimeout((function(){y(null)}),5e3),h(""),x("")})).catch((function(e){E(!0),y("Information of ".concat(b," has already been removed from the server")),setTimeout((function(){y(null)}),5e3),r(t.filter((function(e){return e.id!==c.id})))})):m.create(n).then((function(e){r(t.concat(e)),h(""),x(""),E(!1),y("Added ".concat(e.name)),setTimeout((function(){y(null)}),5e3)})).catch((function(e){E(!0),y(e.response.data.error),setTimeout((function(){y(null)}),5e3)}))},personChanger:function(e){h(e.target.value)},numberChanger:function(e){x(e.target.value)}}),Object(o.jsx)("h2",{children:"Numbers"}),Object(o.jsx)(s,{people:t,filter:C,removeHandler:function(e){var n=t.find((function(n){return n.id===e})).name;!0===window.confirm("Delete ".concat(n))&&m.remove(e).then((function(c){var u=t.filter((function(n){return n.id!==e}));r(u),E(!1),y("Deleted ".concat(n)),setTimeout((function(){y(null)}),5e3)}))}})]})};t(39);c.a.render(Object(o.jsx)(O,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.15947448.chunk.js.map