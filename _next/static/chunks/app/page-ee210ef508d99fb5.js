(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{6684:function(e,s,l){Promise.resolve().then(l.bind(l,6774))},6774:function(e,s,l){"use strict";l.r(s),l.d(s,{default:function(){return i}});var c=l(7437),t=l(2265),a=l(9905);function i(){let[e,s]=(0,t.useState)([]),[l,i]=(0,t.useState)([]),[n,r]=(0,t.useState)(!0);(0,t.useEffect)(()=>{!async function(){try{let e=await fetch("/test-nextjs/imageConfig.yaml"),l=await e.text(),c=a.ZP.load(l);s(c.images),r(!1)}catch(e){console.error("Failed to load configuration:",e),r(!1)}}()},[]);let o=(0,t.useMemo)(()=>Array.from(new Set(e.flatMap(e=>e.colors))).sort(),[e]),d=e=>{i(s=>s.includes(e)?s.filter(s=>s!==e):[...s,e])},m=(0,t.useMemo)(()=>0===l.length?e:e.filter(e=>l.every(s=>e.colors.includes(s))),[l,e]);return n?(0,c.jsx)("div",{children:"Loading..."}):(0,c.jsxs)("div",{className:"container mx-auto p-4",children:[(0,c.jsx)("h1",{className:"text-3xl font-bold mb-6",children:"Geoguessr Bollard Findr"}),(0,c.jsxs)("div",{className:"flex flex-col md:flex-row gap-8",children:[(0,c.jsxs)("div",{className:"w-full md:w-1/4",children:[(0,c.jsx)("h2",{className:"text-2xl font-semibold mb-4",children:"Filter"}),(0,c.jsx)("div",{className:"space-y-2",children:o.map(e=>(0,c.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,c.jsx)("input",{type:"checkbox",id:e,checked:l.includes(e),onChange:()=>d(e),className:"form-checkbox h-5 w-5 text-blue-600"}),(0,c.jsx)("label",{htmlFor:e,className:"text-gray-700",children:e})]},e))})]}),(0,c.jsx)("div",{className:"w-full md:w-3/4",children:(0,c.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4",children:m.map((e,s)=>(0,c.jsxs)("div",{className:"border rounded-lg overflow-hidden",children:[(0,c.jsx)("img",{src:""+e.src,alt:e.alt,className:"w-full h-48 object-cover"}),(0,c.jsxs)("div",{className:"p-2 text-center",children:[(0,c.jsx)("p",{className:"font-semibold",children:e.name}),(0,c.jsxs)("p",{className:"text-sm text-gray-500",children:["Colors: ",e.colors.join(", ")]})]})]},s))})})]}),(0,c.jsxs)("div",{className:"mt-8",children:[(0,c.jsx)("h2",{className:"text-xl font-semibold mb-2",children:"Debugging Information:"}),(0,c.jsxs)("p",{children:["Number of images: ",e.length]}),(0,c.jsxs)("p",{children:["Number of filtered images: ",m.length]}),(0,c.jsxs)("p",{children:["Selected filters: ",l.join(", ")||"None"]})]})]})}}},function(e){e.O(0,[905,971,23,744],function(){return e(e.s=6684)}),_N_E=e.O()}]);